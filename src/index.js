import React, { useState } from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./index.css";
import { Layout, Menu, Avatar } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UnorderedListOutlined,
  ContactsOutlined,
} from "@ant-design/icons";
import Task from "./Task";

const { Header, Sider, Content } = Layout;

function SiderDemo() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout className="layout">
      <Header className="header">
        <div className="logo">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Bosch-Logo.svg/2560px-Bosch-Logo.svg.png"
            width="100%"
          />
        </div>
        {collapsed ? (
          <MenuUnfoldOutlined
            className="trigger"
            onClick={() => {
              setCollapsed(!collapsed);
            }}
          />
        ) : (
          <MenuFoldOutlined
            className="trigger"
            onClick={() => {
              setCollapsed(!collapsed);
            }}
          />
        )}
        <span className="profile">
          Albert <Avatar className="avatar">A</Avatar>
        </span>
      </Header>
      <Layout>
        <Sider width="200" trigger={null} collapsible collapsed={collapsed}>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1" icon={<UnorderedListOutlined />}>
              Task
            </Menu.Item>
            <Menu.Item key="2" icon={<ContactsOutlined />}>
              Contect us
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            <Task />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

ReactDOM.render(<SiderDemo />, document.getElementById("container"));
