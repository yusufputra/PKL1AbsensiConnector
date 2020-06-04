import React from "react";
import { Breadcrumb, Layout, Row, Col, Divider } from "antd";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from "recharts";

const { Content } = Layout;
const data = [
    {
        name: "Page A",
        late: 4000,
        early: 2400,
        amt: 2400
    },
    {
        name: "Page B",
        late: 3000,
        early: 1398,
        amt: 2210
    },
    {
        name: "Page C",
        late: 2000,
        early: 9800,
        amt: 2290
    },
    {
        name: "Page D",
        late: 2780,
        early: 3908,
        amt: 2000
    },
    {
        name: "Page E",
        late: 1890,
        early: 4800,
        amt: 2181
    },
    {
        name: "Page F",
        late: 2390,
        early: 3800,
        amt: 2500
    },
    {
        name: "Page G",
        late: 3490,
        early: 4300,
        amt: 2100
    }
];
const Dashboard = () => {
    return (
        <div>
            <Breadcrumb style={{ margin: "16px 0" }}>
                <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
            </Breadcrumb>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col span={12}>
                    <Content
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280
                        }}
                    >
                        Early and Late Results <br />
                        <LineChart
                            width={500}
                            height={300}
                            data={data}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="early"
                                stroke="#8884d8"
                                activeDot={{ r: 8 }}
                            />
                            <Line
                                type="monotone"
                                dataKey="late"
                                stroke="#82ca9d"
                            />
                        </LineChart>
                    </Content>
                </Col>
                <Col span={12}>
                    <Content
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280
                        }}
                    >
                        Early and Late Results <br />
                        <LineChart
                            width={500}
                            height={300}
                            data={data}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="early"
                                stroke="#8884d8"
                                activeDot={{ r: 8 }}
                            />
                            <Line
                                type="monotone"
                                dataKey="late"
                                stroke="#82ca9d"
                            />
                        </LineChart>
                    </Content>
                </Col>
            </Row>
            <Divider
                orientation="left"
                style={{ color: "#333", fontWeight: "normal" }}
            />
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col span={24}>
                    <Content
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280
                        }}
                    >
                        ini konten
                    </Content>
                </Col>
            </Row>
        </div>
    );
};

export default Dashboard;
