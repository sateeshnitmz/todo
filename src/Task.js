import React, { useState } from "react";
import "./task.css";
import { Table, Tag, Space, Button, Modal } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import AddEditTask from "./AddEditTask";
import data from "./data";

const defaultTaskValue = {
  taskName: "",
  project: "",
  comments: "",
};

export default () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [taskData, setTaskData] = useState(data);

  const [addNewTask, setNewTask] = useState(defaultTaskValue);
  const [isEdit, setIsEdit] = useState(false);

  //Math.floor(Math.random()*90000) + 10000;

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    const newTaskData = [...taskData];
    if (!isEdit) {
      newTaskData.push({
        ...addNewTask,
        id: Math.floor(Math.random() * 90000) + 10000,
      });
    } else {
      const Index = newTaskData.findIndex((task) => {
        return task.id == addNewTask.id;
      });

      newTaskData[Index] = addNewTask;
    }

    setTaskData(newTaskData);
    setIsModalVisible(false);
    setNewTask(defaultTaskValue);
    setIsEdit(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setNewTask(defaultTaskValue);
    setIsEdit(false);
  };

  const editTask = (record) => {
    showModal();
    setIsEdit(true);
    setNewTask(record);
  };

  const onDelect = (id) => {
    const newTaskData = [...taskData].filter((task) => task.id !== id);
    setTaskData(newTaskData);
  };

  const columns = [
    {
      title: "Task Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Task Name",
      dataIndex: "taskName",
      key: "taskName",
    },
    {
      title: "Project",
      dataIndex: "project",
      key: "project",
    },
    {
      title: "Comments",
      dataIndex: "comments",
      key: "comments",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <a onClick={() => editTask(record)}>Edit </a>
          <a
            onClick={() => {
              console.log("record", record);
              onDelect(record.id);
            }}
          >
            Delete{" "}
          </a>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className="create-task">
        <Button
          type="primary"
          onClick={showModal}
          icon={<PlusCircleOutlined />}
        >
          Create Task
        </Button>
      </div>
      <Table columns={columns} dataSource={taskData} />

      {isModalVisible && (
        <Modal
          title={isEdit ? "Edit Task" : "Create Task "}
          visible={isModalVisible}
          footer={null}
          onCancel={handleCancel}
        >
          <AddEditTask
            addNewTask={addNewTask}
            setNewTask={setNewTask}
            onFinish={handleOk}
            onCancel={handleCancel}
            submitText={isEdit ? "Update" : "Create"}
          />
        </Modal>
      )}
    </>
  );
};
