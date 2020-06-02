import React, { useState } from "react";
import { Layout, Button, Menu } from "antd";
import { Route, Switch, Link } from "react-router-dom";
import { UserOutlined, MoneyCollectOutlined } from "@ant-design/icons";
import "../css/menu.css";
import absensi from "./absensi";
import rekap from "./rekap";
import gaji from "./gaji";
import totalGaji from "./totalGaji";
import tunjangan from "./tunjangan";

const { SubMenu } = Menu;
const { Header, Sider } = Layout;

const Home = () => {
    const [collapsed, setcollapsed] = useState(false);
    const logout = () => {
        localStorage.clear();
        window.location.reload();
    };
    return (
        <Layout>
            <Header className="header">
                {/* <div className="logo" /> */}
                <Menu theme="dark" mode="horizontal" style={{ float: "right" }}>
                    <Menu.Item key="1">Welcome!</Menu.Item>
                    <Menu.Item key="2">
                        <Button onClick={logout} type="primary" danger>
                            Logout
                        </Button>
                    </Menu.Item>
                </Menu>
            </Header>
            <Layout>
                <Sider
                    width={200}
                    className="site-layout-background"
                    collapsed={collapsed}
                >
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={["1"]}
                        defaultOpenKeys={["sub1"]}
                        style={{ height: "100%", borderRight: 0 }}
                    >
                        <SubMenu
                            key="sub1"
                            icon={<UserOutlined />}
                            title="Karyawan"
                        >
                            <Menu.Item key="1">
                                <Link to={"/"}>Absensi</Link>
                            </Menu.Item>

                            <Menu.Item key="2">
                                <Link to={"/rekap"}>Rekap Absensi</Link>
                            </Menu.Item>
                        </SubMenu>
                        <SubMenu
                            key="sub2"
                            icon={<MoneyCollectOutlined />}
                            title="Data Gaji"
                        >
                            <Menu.Item key="3">
                                <Link to={"/gaji"}>Gaji</Link>
                            </Menu.Item>

                            <Menu.Item key="4">
                                <Link to={"/tunjangan"}>Tujangan</Link>
                            </Menu.Item>

                            <Menu.Item key="5">
                                <Link to={"/totalgaji"}>Total Gaji</Link>
                            </Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
                <Layout style={{ padding: "0 24px 24px" }}>
                    <Switch>
                        <Route exact path="/" component={absensi} />
                        <Route path="/rekap" component={rekap} />
                        <Route path="/gaji" component={gaji} />
                        <Route path="/tunjangan" component={tunjangan} />
                        <Route path="/totalgaji" component={totalGaji} />
                    </Switch>
                </Layout>
            </Layout>
        </Layout>
    );
};

export default Home;
