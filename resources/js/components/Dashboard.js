import React, { useState, useEffect } from "react";
import { Breadcrumb, Layout, Row, Col, Divider, Statistic } from "antd";
import { StackedColumn } from "@ant-design/charts";
import { CloseCircleOutlined, CheckCircleOutlined } from "@ant-design/icons";
import Axios from "axios";
import api from "../api/api";

const { Content } = Layout;
const Dashboard = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        Axios.get(api.statistik, {
            headers: {
                Authorization: "Bearer " + localStorage.token
            }
        })
            .then(ress => {
                console.log(ress);
                setData(ress.data);
            })
            .catch(error => {
                alert(error.response);
                console.log(error.response);
            });
    }, []);
    const config = {
        forceFit: true,
        title: {
            visible: true,
            text: "Statistik Kehadiran"
        },
        description: {
            visible: true,
            text:
                "Kehadiran berdasarkan hari dan jam selama satu mingggu terakhir"
        },
        padding: "auto",
        data: data.statistik,
        xField: "tanggal",
        yField: "jumlah",
        stackField: "jam",
        Color: ["# ae331b", "# f27957", "#dadada", "# 609db7", "# 1a6179"],
        yAxis: { min: 0 },
        xAxis: { max: 7 },
        label: { visible: false },
        connectedArea: {
            visible: true,
            triggerOn: false
        }
    };
    return (
        <div>
            <Breadcrumb style={{ margin: "16px 0" }}>
                <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
            </Breadcrumb>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col span={18}>
                    <Content
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280
                        }}
                    >
                        <StackedColumn {...config} />
                    </Content>
                </Col>
                <Col span={6}>
                    <Content
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280
                        }}
                    >
                        <Row>
                            <Col>
                                {Date()} <br />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Statistic
                                    title="In Time"
                                    value={
                                        data.length == 0
                                            ? 0
                                            : data.intime[0].intime == null
                                            ? 0
                                            : data.intime[0].intime
                                    }
                                    prefix={<CheckCircleOutlined />}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Statistic
                                    title="Late"
                                    value={
                                        data.length == 0
                                            ? 0
                                            : data.late[0].late == null
                                            ? 0
                                            : data.late[0].late
                                    }
                                    prefix={<CloseCircleOutlined />}
                                />
                            </Col>
                        </Row>
                    </Content>
                </Col>
            </Row>
        </div>
    );
};

export default Dashboard;
