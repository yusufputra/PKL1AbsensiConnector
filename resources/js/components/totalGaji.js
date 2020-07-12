import React, { useContext, useEffect, useState } from "react";
import {
    Breadcrumb,
    Table,
    Layout,
    Select,
    Space,
    Button,
    Input,
    notification
} from "antd";
import { Link } from "react-router-dom";
import { MoneyCollectOutlined } from "@ant-design/icons";
import { UserContext } from "../authContextProvider";
import Axios from "axios";
import api from "../api/api";
import currencyFormatter from "currency-formatter";

const { Content } = Layout;
const { Option } = Select;
const toggleNotif = (type, message) => {
    notification[type]({
        message: message,
        description: "will be disappear in 4 seconds"
    });
};
const totalGaji = () => {
    const [tempgaji, setTempgaji] = useState([]);
    const [gaji, setgaji] = useState([]);
    const [filter, setFilter] = useState({
        bulan: "All",
        tahun: "All"
    });
    useEffect(() => {
        Axios.get(api.getGaji, {
            headers: {
                Authorization: "Bearer " + localStorage.token
            }
        }).then(ress => {
            setgaji(ress.data);
            setTempgaji(ress.data);
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
                toggleNotif("success", "Berhasil menghapus gaji");
                setgaji(
                    gaji.filter(item => {
                        return item.id != id;
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
            title: "NIK",
            dataIndex: "nik",
            key: "nik"
        },
        {
            title: "Bulan",
            key: "bulan",
            render: record => {
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
                return `${months[parseInt(record.bulan)]} - ${record.tahun}`;
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
                <br />
                <Space style={{ marginTop: 10 }}>
                    Bulan :
                    <Select
                        placeholder="All"
                        style={{ width: 120 }}
                        onChange={value => {
                            console.log(value);
                            setFilter({
                                bulan: value,
                                tahun: filter.tahun
                            });
                            if (filter.tahun == "All") {
                                if (value == "All") {
                                    setgaji(tempgaji);
                                } else {
                                    setgaji(
                                        tempgaji.filter(item => {
                                            return item.bulan == value;
                                        })
                                    );
                                }
                            } else {
                                if (value == "All") {
                                    setgaji(
                                        tempgaji.filter(item => {
                                            return item.tahun == filter.tahun;
                                        })
                                    );
                                } else {
                                    setgaji(
                                        tempgaji.filter(item => {
                                            return (
                                                item.tahun == filter.tahun &&
                                                item.bulan == value
                                            );
                                        })
                                    );
                                }
                            }
                        }}
                    >
                        <Option value="All">All</Option>
                        <Option value="0">Januari</Option>
                        <Option value="1">Februari</Option>
                        <Option value="2">Maret</Option>
                        <Option value="3">April</Option>
                        <Option value="4">Mei</Option>
                        <Option value="5">Juni</Option>
                        <Option value="6">Juli</Option>
                        <Option value="7">Agustus</Option>
                        <Option value="8">September</Option>
                        <Option value="9">Oktober</Option>
                        <Option value="10">November</Option>
                        <Option value="11">Desember</Option>
                    </Select>
                    Tahun :
                    <Input
                        onChange={e => {
                            console.log(e.target.value == "");
                            setFilter({
                                bulan: filter.bulan,
                                tahun:
                                    e.target.value == ""
                                        ? "All"
                                        : e.target.value
                            });
                            if (e.target.value == "") {
                                if (filter.bulan == "All") {
                                    setgaji(tempgaji);
                                } else {
                                    setgaji(
                                        tempgaji.filter(item => {
                                            return item.bulan == filter.bulan;
                                        })
                                    );
                                }
                            } else {
                                if (filter.bulan == "All") {
                                    setgaji(
                                        tempgaji.filter(item => {
                                            return item.tahun == e.target.value;
                                        })
                                    );
                                } else {
                                    setgaji(
                                        tempgaji.filter(item => {
                                            return (
                                                item.tahun == e.target.value &&
                                                item.bulan == filter.bulan
                                            );
                                        })
                                    );
                                }
                            }
                        }}
                    />
                </Space>
                <Table columns={columns} dataSource={gaji} />
            </Content>
        </div>
    );
};

export default totalGaji;
