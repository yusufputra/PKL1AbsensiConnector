import React, { useEffect, useState } from "react";
import { Breadcrumb, Table, Layout, Button } from "antd";
import JsonToExcel from "./JsonToExcel";
import Axios from "axios";
import api from "../api/api";

const { Content } = Layout;
const rekap = () => {
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
    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id"
        },
        {
            title: "ID Member",
            dataIndex: "idKaryawan",
            key: "idKaryawan"
        },
        {
            title: "Date",
            dataIndex: "date",
            key: "date"
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
                {data.length != 0 && (
                    <JsonToExcel
                        id={"exportXLS"}
                        data={data}
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
                <Table columns={columns} dataSource={data} />
            </Content>
        </div>
    );
};

export default rekap;
