/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

require("./bootstrap");

/**
 * Next, we will create a fresh React component instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

require("./components/Example");

import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import ReactDOM from "react-dom";
import { Layout, Button, Menu } from "antd";
import {
    UserOutlined,
    MoneyCollectOutlined,
    PieChartOutlined,
    SettingOutlined
} from "@ant-design/icons";
import Login from "./components/Login";
import "antd/dist/antd.css";
// import Home from "./components/Home";
import Axios from "axios";
import api from "./api/api";
import "./css/menu.css";
import absensi from "./components/absensi";
import rekap from "./components/rekap";
import gaji from "./components/gaji";
import totalGaji from "./components/totalGaji";
import tunjangan from "./components/tunjangan";
import backgound from "./assets/img/BGHalaman.svg";
import Dashboard from "./components/Dashboard";
import setting from "./components/setting";

function App() {
    const [verified, setverified] = useState(false);
    const [collapsed, setcollapsed] = useState(false);
    useEffect(() => {
        const checking = async () => {
            await Axios.get(api.cekToken, {
                headers: {
                    Authorization: "Bearer " + localStorage.token
                }
            })
                .then(ress => {
                    console.log(ress);
                    if (ress.data.status != "Token is Invalid") {
                        setverified(true);
                    } else {
                        alert(ress.data.status);
                        localStorage.clear();
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        };
        if (localStorage.token != null) {
            checking();
        }
    });

    if (localStorage.token == null || verified == false) {
        return (
            <div>
                <Login></Login>
            </div>
        );
    } else {
        const { SubMenu } = Menu;
        const { Header, Sider } = Layout;
        const logout = () => {
            localStorage.clear();
            window.location.reload();
        };
        return (
            <Layout>
                <Header className="header">
                    {/* <div className="logo" /> */}
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        style={{ float: "right" }}
                    >
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
                            style={{ height: "100%", borderRight: 0 }}
                        >
                            <Menu.Item key="1" icon={<PieChartOutlined />}>
                                <Link to={"/"}>Dashboard</Link>
                            </Menu.Item>
                            <SubMenu
                                key="sub1"
                                icon={<UserOutlined />}
                                title="Karyawan"
                            >
                                <Menu.Item key="2">
                                    <Link to={"/absensi"}>Absensi</Link>
                                </Menu.Item>

                                <Menu.Item key="3">
                                    <Link to={"/rekap"}>Rekap Absensi</Link>
                                </Menu.Item>
                            </SubMenu>
                            <SubMenu
                                key="sub2"
                                icon={<MoneyCollectOutlined />}
                                title="Data Gaji"
                            >
                                <Menu.Item key="4">
                                    <Link to={"/gaji"}>Gaji</Link>
                                </Menu.Item>

                                <Menu.Item key="5">
                                    <Link to={"/tunjangan"}>Tujangan</Link>
                                </Menu.Item>

                                <Menu.Item key="6">
                                    <Link to={"/totalgaji"}>Total Gaji</Link>
                                </Menu.Item>
                            </SubMenu>
                            <Menu.Item key="7" icon={<SettingOutlined />}>
                                <Link to={"/setting"}>Setting</Link>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout
                        style={{
                            padding: "0 24px 24px",
                            backgroundImage: `url(${backgound})`,
                            height: "90vh",
                            width: "auto",
                            backgroundSize: "cover",
                            backgroundPosition: "bottom"
                        }}
                    >
                        <Switch>
                            <Route exact path="/" component={Dashboard} />
                            <Route exact path="/absensi" component={absensi} />
                            <Route path="/rekap" component={rekap} />
                            <Route path="/gaji" component={gaji} />
                            <Route path="/tunjangan" component={tunjangan} />
                            <Route path="/totalgaji" component={totalGaji} />
                            <Route path="/setting" component={setting} />
                        </Switch>
                    </Layout>
                </Layout>
            </Layout>
        );
    }
}

export default App;

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById("app")
);
