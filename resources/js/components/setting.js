import React, { useEffect, useState } from "react";
import { Breadcrumb, Table, Layout, Space, Button } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import Axios from "axios";
import api from "../api/api";
import { Link } from "react-router-dom";

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

    const deleteUser = record => {
        let body = {
            id: record
        };
        Axios.post(api.deleteUser, body, {
            headers: {
                Authorization: "Bearer " + localStorage.token
            }
        })
            .then(ress => {
                alert("deleted");
                setdata(
                    data.filter(item => {
                        return item.id != record;
                    })
                );
            })
            .catch(error => {
                alert(error);
            });
    };

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
            render: record => (
                <Space size="middle">
                    <Link>Edit</Link>
                    <Link
                        onClick={() => {
                            deleteUser(record.id);
                        }}
                    >
                        Delete
                    </Link>
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
                <Link to={"/tambahUser"}><Button type="primary" icon={<UserAddOutlined />}>
                    Tambah User
                </Button></Link>
                <Table columns={columns} dataSource={data} />
            </Content>
        </div>
    );
};

export default setting;
