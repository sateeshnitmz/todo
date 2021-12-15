import React, { useState } from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./index.css";
import { Form, Input, Button, Radio, Select } from "antd";

const projectList = [
  "Java Project",
  "Python Projerct",
  "JavaScript Project",
  "React Project",
  "CSS Project",
];

export default ({ setNewTask, addNewTask, onCancel, onFinish, submitText }) => {
  const { Option } = Select;
  const { TextArea } = Input;
  const [form] = Form.useForm();

  const onChange = (event) => {
    const { name, value } = event.target;
    const newTask = { ...addNewTask };
    newTask[name] = value;
    setNewTask(newTask);
  };

  return (
    <Form
      layout={"vertical"}
      form={form}
      initialValues={addNewTask}
      onFinish={onFinish}
    >
      <Form.Item
        label="Task Name"
        name="taskName"
        rules={[
          {
            required: true,
            message: "Please input Task Name",
          },
        ]}
      >
        <Input placeholder="Task Name" name="taskName" onChange={onChange} />
      </Form.Item>
      <Form.Item
        name="project"
        label="Project Name"
        rules={[
          {
            required: true,
            message: "Please Select Project",
          },
        ]}
      >
        <Select
          placeholder="Select Project"
          allowClear
          onChange={(value) => {
            const target = { name: "project", value };
            onChange({ target });
          }}
          name="project"
        >
          {projectList.map((v, key) => {
            return (
              <Option value={v} key={key}>
                {v}
              </Option>
            );
          })}
        </Select>
      </Form.Item>

      <Form.Item name="comments" label="Comments">
        <TextArea
          showCount
          maxLength={500}
          placeholder="add comments"
          name="comments"
          onChange={onChange}
        />
      </Form.Item>
      <Form.Item className="submit-button">
        <Button type="ghost" onClick={onCancel} shape="round">
          Cancel
        </Button>
        <Button type="primary" htmlType="submit" shape="round">
          {submitText}
        </Button>
      </Form.Item>
    </Form>
  );
};
