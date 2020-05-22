import React, { useState } from "react";
import { Layout, Menu, Breadcrumb, Table, Tag, Space } from "antd";
import {
    UserOutlined,
    LaptopOutlined,
    NotificationOutlined
} from "@ant-design/icons";
import "../css/menu.css";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const Home = () => {
    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            render: text => <a>{text}</a>
        },
        {
            title: "Age",
            dataIndex: "age",
            key: "age"
        },
        {
            title: "Address",
            dataIndex: "address",
            key: "address"
        },
        {
            title: "Tags",
            key: "tags",
            dataIndex: "tags",
            render: tags => (
                <>
                    {tags.map(tag => {
                        let color = tag.length > 5 ? "geekblue" : "green";
                        if (tag === "loser") {
                            color = "volcano";
                        }
                        return (
                            <Tag color={color} key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            )
        },
        {
            title: "Action",
            key: "action",
            render: (text, record) => (
                <Space size="middle">
                    <a>Invite {record.name}</a>
                    <a>Delete</a>
                </Space>
            )
        }
    ];

    const data = [
        {
            key: "1",
            name: "John Brown",
            age: 32,
            address: "New York No. 1 Lake Park",
            tags: ["nice", "developer"]
        },
        {
            key: "2",
            name: "Jim Green",
            age: 42,
            address: "London No. 1 Lake Park",
            tags: ["loser"]
        },
        {
            key: "3",
            name: "Joe Black",
            age: 32,
            address: "Sidney No. 1 Lake Park",
            tags: ["cool", "teacher"]
        }
    ];
    const [collapsed, setcollapsed] = useState(false);
    return (
        <Layout>
            <Header className="header">
                {/* <div className="logo" /> */}
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={["2"]}
                    style={{float: 'right'}}
                >
                    <Menu.Item key="1">nav 1</Menu.Item>
                    <Menu.Item key="2">nav 2</Menu.Item>
                    <Menu.Item key="3">nav 3</Menu.Item>
                </Menu>
            </Header>
            <Layout>
                <Sider
                    width={200}
                    className="site-layout-background"
                    collapsed={collapsed}
                >
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={["1"]}
                        defaultOpenKeys={["sub1"]}
                        style={{ height: "100%", borderRight: 0 }}
                    >
                        <SubMenu
                            key="sub1"
                            icon={<UserOutlined />}
                            title="subnav 1"
                        >
                            <Menu.Item key="1">option1</Menu.Item>
                            <Menu.Item key="2">option2</Menu.Item>
                            <Menu.Item key="3">option3</Menu.Item>
                            <Menu.Item key="4">option4</Menu.Item>
                        </SubMenu>
                        <SubMenu
                            key="sub2"
                            icon={<LaptopOutlined />}
                            title="subnav 2"
                        >
                            <Menu.Item key="5">option5</Menu.Item>
                            <Menu.Item key="6">option6</Menu.Item>
                            <Menu.Item key="7">option7</Menu.Item>
                            <Menu.Item key="8">option8</Menu.Item>
                        </SubMenu>
                        <SubMenu
                            key="sub3"
                            icon={<NotificationOutlined />}
                            title="subnav 3"
                        >
                            <Menu.Item key="9">option9</Menu.Item>
                            <Menu.Item key="10">option10</Menu.Item>
                            <Menu.Item key="11">option11</Menu.Item>
                            <Menu.Item key="12">option12</Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
                <Layout style={{ padding: "0 24px 24px" }}>
                    <Breadcrumb style={{ margin: "16px 0" }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <Content
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280
                        }}
                    >
                        <Table columns={columns} dataSource={data} />
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
};

export default Home;
