import React, { useContext, useEffect, useState } from "react";
import { Breadcrumb, Table, Layout, Tag, Space, Button } from "antd";
import { Link } from "react-router-dom";
import { MoneyCollectOutlined } from "@ant-design/icons";
import { UserContext } from "../authContextProvider";
import Axios from "axios";
import api from "../api/api";
import currencyFormatter from "currency-formatter";

const { Content } = Layout;
const totalGaji = () => {
    const [gaji, setgaji] = useState([]);
    useEffect(() => {
        Axios.get(api.getGaji, {
            headers: {
                Authorization: "Bearer " + localStorage.token
            }
        }).then(ress => {
            setgaji(ress.data);
        });
    }, []);
    const { user } = useContext(UserContext);
    const deleteGaji = id => {
        console.log("clicked " + id);
        Axios.post(
            api.deleteGaji,
            { id: id },
            {
                headers: {
                    Authorization: "Bearer " + localStorage.token
                }
            }
        )
            .then(ress => {
                alert("deleted");
                setgaji(
                    gaji.filter(item => {
                        return item.id != id;
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
            title: "NIK",
            dataIndex: "nik",
            key: "nik"
        },
        {
            title: "Bulan",
            dataIndex: "bulan",
            key: "bulan",
            render: data => {
                const months = [
                    "Januari",
                    "Februari",
                    "Maret",
                    "April",
                    "Mei",
                    "Juni",
                    "Juli",
                    "Agustus",
                    "September",
                    "Oktober",
                    "November",
                    "Desember"
                ];
                return months[parseInt(data)];
            }
        },
        {
            title: "Gaji Pokok",
            dataIndex: "gaji_pokok",
            key: "gaji_pokok",
            render: record => {
                return currencyFormatter.format(record, { code: "IDR" });
            }
        },
        {
            title: "BPJS",
            dataIndex: "bpjs",
            key: "bpjs",
            render: record => {
                return currencyFormatter.format(record, { code: "IDR" });
            }
        },
        {
            title: "PPh21",
            dataIndex: "pph21",
            key: "pph21",
            render: record => {
                return currencyFormatter.format(record, { code: "IDR" });
            }
        },
        {
            title: "Total Gaji",
            key: "total",
            render: record => {
                return currencyFormatter.format(
                    record.gaji_pokok + record.bpjs - record.pph21,
                    { code: "IDR" }
                );
            }
        },
        {
            title: "Action",
            key: "action",
            render: record => {
                return (
                    user.role == 1 && (
                        <Space size="middle">
                            <Link to={`/editgaji/${record.id}`}>Edit</Link>
                            <Link
                                onClick={() => {
                                    deleteGaji(record.id);
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
                <Breadcrumb.Item>Data Gaji</Breadcrumb.Item>
                <Breadcrumb.Item>Total Gaji</Breadcrumb.Item>
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
                    <Link to={"/inputgaji"}>
                        <Button type="primary" icon={<MoneyCollectOutlined />}>
                            Input Gaji
                        </Button>
                    </Link>
                )}
                <Table columns={columns} dataSource={gaji} />
            </Content>
        </div>
    );
};

export default totalGaji;
