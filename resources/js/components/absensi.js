import React, { useEffect, useState, useContext } from "react";
import {
    Breadcrumb,
    Table,
    Layout,
    Tag,
    Space,
    Button,
    notification
} from "antd";
import { FieldTimeOutlined } from "@ant-design/icons";
import Axios from "axios";
import api from "../api/api";
import { Link } from "react-router-dom";
import { UserContext } from "../authContextProvider";

const { Content } = Layout;
const toggleNotif = (type, message) => {
    notification[type]({
        message: message,
        description: "will be disappear in 4 seconds"
    });
};
const absensi = () => {
    const { user } = useContext(UserContext);
    const [data, setdata] = useState([]);
    useEffect(() => {
        Axios.get(api.getAllAbsen)
            .then(ress => {
                console.log(ress);
                setdata(ress.data);
            })
            .catch(error => {
                console.log(error);
                alert(error);
            });
    }, []);
    const deleteAbsensi = record => {
        let body = {
            id: record
        };
        Axios.post(api.deleteAbsen, body, {
            headers: {
                Authorization: "Bearer " + localStorage.token
            }
        })
            .then(ress => {
                toggleNotif("success", "Berhasil menghapus absensi");
                setdata(
                    data.filter(item => {
                        return item.id != record;
                    })
                );
            })
            .catch(error => {
                console.log(error.response);
                toggleNotif("error", error.response.statusText);
            });
    };
    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id"
        },
        {
            title: "ID Member",
            dataIndex: "nik",
            key: "nik"
        },
        {
            title: "Date",
            dataIndex: "date",
            key: "date"
        },
        {
            title: "Late Tag",
            dataIndex: "date",
            key: "date",
            render: date => {
                const hour = date.split(" ")[1].split(":")[0];
                return hour >= 8 && <Tag color={"red"}>Late</Tag>;
            }
        },
        {
            title: "Serial Number",
            dataIndex: "serial_no",
            key: "serial_no"
        },
        {
            title: "Action",
            key: "action",
            render: record => {
                return (
                    user.role == 1 && (
                        <Space size="middle">
                            <Link to={`/editAbsensi/${record.id}`}>Edit</Link>
                            <Link
                                onClick={() => {
                                    deleteAbsensi(record.id);
                                }}
                            >
                                Delete
                            </Link>
                        </Space>
                    )
                );
            }
        }
    ];
    return (
        <div>
            <Breadcrumb style={{ margin: "16px 0" }}>
                <Breadcrumb.Item>Karyawan</Breadcrumb.Item>
                <Breadcrumb.Item>Absensi</Breadcrumb.Item>
            </Breadcrumb>
            <Content
                className="site-layout-background"
                style={{
                    padding: 24,
                    margin: 0,
                    minHeight: 280
                }}
            >
                {user.role == 1 && (
                    <Link to={"/tambahAbsensi"}>
                        <Button type="primary" icon={<FieldTimeOutlined />}>
                            Tambah Absensi
                        </Button>
                    </Link>
                )}
                <Table columns={columns} dataSource={data} />
            </Content>
        </div>
    );
};

export default absensi;
