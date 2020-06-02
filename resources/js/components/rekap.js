import React from "react";
import { Breadcrumb, Table, Layout, Tag, Space } from "antd";

const { Content } = Layout;
const rekap = () => {
    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            render: text => <a>{text}</a>
        },
        {
            title: "NIP",
            dataIndex: "nip",
            key: "nip"
        },
        {
            title: "Jam Masuk",
            dataIndex: "masuk",
            key: "masuk"
        },
        {
            title: "Jam Keluar",
            dataIndex: "keluar",
            key: "keluar"
        }
    ];

    const data = [
        {
            key: "1",
            name: "John Brown",
            nip: 12312312312312312,
            masuk: "2 Juni 2020, 08.13",
            keluar: "2 Juni 2020, 15.13",
        },
        {
            key: "1",
            name: "John Brown",
            nip: 12312312312312312,
            masuk: "2 Juni 2020, 08.13",
            keluar: "2 Juni 2020, 15.13",
        },
        {
            key: "1",
            name: "John Brown",
            nip: 12312312312312312,
            masuk: "2 Juni 2020, 08.13",
            keluar: "2 Juni 2020, 15.13",
        }
    ];
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
                <Table columns={columns} dataSource={data} />
            </Content>
        </div>
    );
};

export default rekap;
