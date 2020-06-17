import React, { useEffect, useState } from "react";
import { Breadcrumb, Table, Layout, Tag, Space } from "antd";
import Axios from "axios";
import api from "../api/api";

const { Content } = Layout;
const absensi = () => {
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
                <Table columns={columns} dataSource={data} />
            </Content>
        </div>
    );
};

export default absensi;
