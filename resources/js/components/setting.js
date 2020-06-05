import React, { useEffect, useState } from "react";
import { Breadcrumb, Table, Layout, Tag, Space } from "antd";
import Axios from "axios";
import api from "../api/api";

const { Content } = Layout;
const setting = () => {
    const [data, setdata] = useState([]);
    useEffect(() => {
        Axios.get(api.allUser, {
            headers: {
                Authorization: "Bearer " + localStorage.token
            }
        })
            .then(ress => {
                console.log(ress);
                setdata(ress.data);
            })
            .catch(error => {
                console.log(error);
                alert(error);
            });
    }, []);
    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id"
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            render: text => <a>{text}</a>
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email"
        },
        {
            title: "Email Verified",
            dataIndex: "email_verified_at",
            key: "email_verified_at"
        },
        {
            title: "Created",
            dataIndex: "created_at",
            key: "created_at"
        },
        {
            title: "Last Update",
            dataIndex: "updated_at",
            key: "updated_at"
        },
        {
            title: "Action",
            key: "action",
            render: (text, record) => (
                <Space size="middle">
                    <a>Edit</a>
                    <a>Delete</a>
                </Space>
            )
        }
    ];

    return (
        <div>
            <Breadcrumb style={{ margin: "16px 0" }}>
                <Breadcrumb.Item>Setting</Breadcrumb.Item>
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
        </div>
    );
};

export default setting;
