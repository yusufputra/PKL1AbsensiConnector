import React, { useEffect, useState, useContext } from "react";
import {
    Breadcrumb,
    Table,
    Layout,
    Button,
    DatePicker,
    Space,
    Select,
    Tag
} from "antd";
import JsonToExcel from "./JsonToExcel";
import Axios from "axios";
import api from "../api/api";
import { UserContext } from "../authContextProvider";

const { Content } = Layout;
const { Option } = Select;
const rekap = () => {
    const { user } = useContext(UserContext);
    const [state, setState] = useState({
        datee: "",
        dataa: "semua"
    });
    const [tempdata, setTempdata] = useState([]);
    const [data, setdata] = useState([]);
    function dateFilter(date, dateString) {
        console.log(date, dateString);
        setState({
            datee: dateString,
            dataa: state.dataa
        });
        console.log(state);
        if (dateString == "") {
            if (state.dataa == true) {
                setTempdata(
                    data.filter(item => {
                        return item.date.split(" ")[1].split(":")[0] >= 8;
                    })
                );
            } else if (state.dataa == false) {
                setTempdata(
                    data.filter(item => {
                        return item.date.split(" ")[1].split(":")[0] < 8;
                    })
                );
            } else {
                setTempdata(data);
            }
        } else {
            if (state.dataa == true) {
                setTempdata(
                    data.filter(item => {
                        return (
                            item.date.split(" ")[0] == dateString &&
                            item.date.split(" ")[1].split(":")[0] >= 8
                        );
                    })
                );
            } else if (state.dataa == false) {
                setTempdata(
                    data.filter(item => {
                        return (
                            item.date.split(" ")[0] == dateString &&
                            item.date.split(" ")[1].split(":")[0] < 8
                        );
                    })
                );
            } else {
                setTempdata(
                    data.filter(item => {
                        return item.date.split(" ")[0] == dateString;
                    })
                );
            }
        }
        console.log(data);
    }
    function dataFilter(value) {
        setState({
            datee: state.datee,
            dataa: value
        });
        console.log(value);
        if (state.datee == "") {
            if (value == true) {
                console.log("he1")
                setTempdata(
                    data.filter(item => {
                        return item.date.split(" ")[1].split(":")[0] >= 8;
                    })
                );
            } else if (value == false) {
                console.log("he3")
                setTempdata(
                    data.filter(item => {
                        return item.date.split(" ")[1].split(":")[0] < 8;
                    })
                );
            } else {
                console.log("heo")
                setTempdata(data);
            }
        } else {
            if (value == true) {
                setTempdata(
                    data.filter(item => {
                        return (
                            item.date.split(" ")[0] == state.datee &&
                            item.date.split(" ")[1].split(":")[0] >= 8
                        );
                    })
                );
            } else if (value == false) {
                setTempdata(
                    data.filter(item => {
                        return (
                            item.date.split(" ")[0] == state.datee &&
                            item.date.split(" ")[1].split(":")[0] < 8
                        );
                    })
                );
            } else {
                setTempdata(
                    data.filter(item => {
                        return item.date.split(" ")[0] == state.datee;
                    })
                );
            }
        }
    }
    useEffect(() => {
        Axios.get(api.getAllAbsen)
            .then(ress => {
                console.log(ress);
                setdata(ress.data);
                setTempdata(ress.data);
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
        }
    ];
    const filename = "rekap" + Date.now(),
        fields = {
            key: "key",
            id: "ID",
            idKaryawan: "Member ID",
            date: "Date",
            serial_no: "Serial Number",
            created_at: "Created At",
            updated_at: "Updated At"
        };

    return (
        <div>
            <Breadcrumb style={{ margin: "16px 0" }}>
                <Breadcrumb.Item>Karyawan</Breadcrumb.Item>
                <Breadcrumb.Item>Rekap Absensi</Breadcrumb.Item>
            </Breadcrumb>
            <Content
                className="site-layout-background"
                style={{
                    padding: 24,
                    margin: 0,
                    minHeight: 280
                }}
            >
                {tempdata.length != 0 && user.role == 1 && (
                    <JsonToExcel
                        id={"exportXLS"}
                        data={tempdata}
                        filename={filename}
                        fields={fields}
                        className={"ant-btn ant-btn-primary"}
                        text={
                            <div>
                                <span
                                    role="img"
                                    aria-label="download"
                                    className="anticon anticon-download"
                                >
                                    <svg
                                        viewBox="64 64 896 896"
                                        focusable="false"
                                        className=""
                                        data-icon="download"
                                        width="1em"
                                        height="1em"
                                        fill="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path d="M505.7 661a8 8 0 0012.6 0l112-141.7c4.1-5.2.4-12.9-6.3-12.9h-74.1V168c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v338.3H400c-6.7 0-10.4 7.7-6.3 12.9l112 141.8zM878 626h-60c-4.4 0-8 3.6-8 8v154H214V634c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v198c0 17.7 14.3 32 32 32h684c17.7 0 32-14.3 32-32V634c0-4.4-3.6-8-8-8z"></path>
                                    </svg>
                                </span>
                                <span>Export to Excel</span>
                            </div>
                        }
                    />
                )}
                <br />
                <Space style={{ marginTop: 10 }}>
                    Filter Date
                    <DatePicker onChange={dateFilter} />
                    Data :
                    <Select
                        placeholder="All"
                        style={{ width: 120 }}
                        onChange={dataFilter}
                    >
                        <Option value={"semua"}>All</Option>
                        <Option value={false}>On Time</Option>
                        <Option value={true}>Late</Option>
                    </Select>
                    Total Data : {tempdata.length}
                </Space>
                <Table columns={columns} dataSource={tempdata} />
            </Content>
        </div>
    );
};

export default rekap;
