import React from "react";
import { Breadcrumb, Table, Layout, Tag, Space } from "antd";

const { Content } = Layout;
const gaji = () => {
    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            render: text => <a>{text}</a>
        },
        {
            title: "Jabatan",
            dataIndex: "jabatan",
            key: "jabatan"
        },
        {
            title: "Gaji Pokok",
            dataIndex: "pokok",
            key: "pokok"
        },
        {
            title: "Tunjangan",
            dataIndex: "tunjangan",
            key: "tunjangan"
        },
        {
            title: "Total Gaji",
            dataIndex: "total",
            key: "total"
        },
        {
            title: "Action",
            key: "action",
            render: (text, record) => (
                <Space size="middle">
                    <a>Detail</a>
                </Space>
            )
        }
    ];

    const data = [
        {
            key: "1",
            name: "John Brown",
            jabatan: "CEO",
            pokok: "Rp 10.000.000",
            tunjangan: "Rp 5.000.000",
            total: "Rp 15.000.000"
        },
        {
            key: "2",
            name: "John Brown",
            jabatan: "CEO",
            pokok: "Rp 10.000.000",
            tunjangan: "Rp 5.000.000",
            total: "Rp 15.000.000"
        },
        {
            key: "3",
            name: "John Brown",
            jabatan: "CEO",
            pokok: "Rp 10.000.000",
            tunjangan: "Rp 5.000.000",
            total: "Rp 15.000.000"
        },
    ];
    return (
        <div>
            <Breadcrumb style={{ margin: "16px 0" }}>
                <Breadcrumb.Item>Data Gaji</Breadcrumb.Item>
                <Breadcrumb.Item>Gaji</Breadcrumb.Item>
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

export default gaji;
