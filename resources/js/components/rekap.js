import React from "react";
import { Breadcrumb, Table, Layout, Button } from "antd";
import JsonToExcel from "./JsonToExcel";

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
            keluar: "2 Juni 2020, 15.13"
        },
        {
            key: "2",
            name: "John Brown",
            nip: 12312312312312312,
            masuk: "2 Juni 2020, 08.13",
            keluar: "2 Juni 2020, 15.13"
        },
        {
            key: "3",
            name: "John Brown",
            nip: 12312312312312312,
            masuk: "2 Juni 2020, 08.13",
            keluar: "2 Juni 2020, 15.13"
        }
    ];
    const filename = "rekap" + Date.now(),
        fields = {
            key: "ID",
            name: "Nama",
            nip: "NIP",
            masuk: "Presensi Masuk",
            keluar: "Presensi Keluar"
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
                <Table columns={columns} dataSource={data} />
            </Content>
        </div>
    );
};

export default rekap;
