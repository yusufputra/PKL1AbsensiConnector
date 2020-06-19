import React, { useEffect, useState, useContext } from "react";
import { Breadcrumb, Table, Layout, Tag, Space, Button } from "antd";
import { FieldTimeOutlined } from "@ant-design/icons";
import Axios from "axios";
import api from "../api/api";
import { Link } from "react-router-dom";
import { UserContext } from "../authContextProvider";

const { Content } = Layout;
const daftarKaryawan = () => {
    const { user } = useContext(UserContext);
    const [data, setdata] = useState([]);
    useEffect(() => {
        Axios.get(api.getAllKaryawan, {
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
    const deleteKaryawan = record => {
        console.log(record);
        let body = {
            nik: record
        };
        Axios.post(api.deleteKaryawan, body, {
            headers: {
                Authorization: "Bearer " + localStorage.token
            }
        })
            .then(ress => {
                console.log(ress.data)
                alert("Absensi deleted");
                setdata(
                    data.filter(item => {
                        return item.nik != record;
                    })
                );
            })
            .catch(error => {
                console.log(error.response);
                alert(error);
            });
    };
    const columns = [
        {
            title: "NIK",
            dataIndex: "nik",
            key: "nik"
        },
        {
            title: "Nama",
            dataIndex: "nama",
            key: "nama"
        },
        {
            title: "NIP",
            dataIndex: "nip",
            key: "nip"
        },
        {
            title: "Alamat",
            dataIndex: "alamat",
            key: "alamat"
        },
        {
            title: "No. Teleppon",
            dataIndex: "no_telepon",
            key: "no_telepon"
        },
        {
            title: "Jabatan",
            dataIndex: "jabatan",
            key: "jabatan"
        },
        {
            title: "Status",
            dataIndex: "status_pegawai",
            key: "status_pegawai",
            render: status => {
                return status == 1 ? "Aktif" : "Tidak Aktif";
            }
        },
        {
            title: "Action",
            key: "action",
            render: record => {
                return (
                    user.role == 1 && (
                        <Space size="middle">
                            <Link to={`/editKaryawan/${record.nik}`}>Edit</Link>
                            <Link
                                onClick={() => {
                                    deleteKaryawan(record.nik);
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
                <Breadcrumb.Item>Daftar Karyawan</Breadcrumb.Item>
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
                    <Link to={"/tambahKaryawan"}>
                        <Button type="primary" icon={<FieldTimeOutlined />}>
                            Tambah Karyawan
                        </Button>
                    </Link>
                )}
                <Table columns={columns} dataSource={data} />
            </Content>
        </div>
    );
};

export default daftarKaryawan;
