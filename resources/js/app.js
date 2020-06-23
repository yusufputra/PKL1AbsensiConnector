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

import React, { useEffect, useState, useContext } from "react";
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
import totalGaji from "./components/totalGaji";
import backgound from "./assets/img/BGHalaman.svg";
import Dashboard from "./components/Dashboard";
import setting from "./components/setting";
import tambahUser from "./components/tambahUser";
import editUser from "./components/editUser";
import AuthContextProvider, { UserContext } from "./authContextProvider";
import tambahAbsensi from "./components/tambahAbsensi";
import editAbsensi from "./components/editAbsensi";
import daftarKaryawan from "./components/daftarKaryawan";
import tambahKaryawan from "./components/tambahKaryawan";
import editKaryawan from "./components/editKaryawan";
import inputGaji from "./components/inputGaji";
import editGaji from "./components/editGaji";

function App() {
    // const [verified, setverified] = useState(false);
    const [collapsed, setcollapsed] = useState(false);
    // const [user, setUser] = useState({});
    const { user, verified } = useContext(UserContext);
    // useEffect(() => {
    //     const checking = async () => {
    //         await Axios.get(api.cekToken, {
    //             headers: {
    //                 Authorization: "Bearer " + localStorage.token
    //             }
    //         })
    //             .then(ress => {
    //                 console.log(ress);
    //                 if (
    //                     ress.data.status != "Token is Invalid" ||
    //                     ress.data.status != "Token is Expired" ||
    //                     ress.data.status != "Authorization Token not found"
    //                 ) {
    //                     setverified(true);
    //                     setUser(ress.data.user);
    //                     console.log(user);
    //                 } else {
    //                     alert(ress.data.status);
    //                     localStorage.clear();
    //                 }
    //             })
    //             .catch(error => {
    //                 console.log(error);
    //                 localStorage.clear();
    //             });
    //     };
    //     if (localStorage.token != null) {
    //         checking();
    //     }
    // });
    console.log(user);
    console.log(verified);

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
                <Header className="header" style={{backgroundColor:"#47a2bf"}}>
                    {/* <div className="logo" /> */}
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        style={{ float: "right",backgroundColor:"#47a2bf" }}
                    >
                        <Menu.Item key="1">Welcome!</Menu.Item>
                        <Menu.Item key="2">
                            <Button style={{backgroundColor:"#f05d32"}} onClick={logout} type="primary" danger>
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
                                    <Link to={"/daftarKaryawan"}>
                                        Daftar Karyawan
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="3">
                                    <Link to={"/absensi"}>Absensi</Link>
                                </Menu.Item>

                                <Menu.Item key="4">
                                    <Link to={"/rekap"}>Rekap Absensi</Link>
                                </Menu.Item>
                            </SubMenu>
                            <SubMenu
                                key="sub2"
                                icon={<MoneyCollectOutlined />}
                                title="Data Gaji"
                            >

                                <Menu.Item key="5">
                                    <Link to={"/totalgaji"}>Total Gaji</Link>
                                </Menu.Item>
                            </SubMenu>
                            <Menu.Item key="6" icon={<SettingOutlined />}>
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
                            <Route path="/absensi" component={absensi} />
                            <Route path="/rekap" component={rekap} />
                            <Route path="/totalgaji" component={totalGaji} />
                            <Route path="/setting" component={setting} />
                            <Route path="/tambahUser" component={tambahUser} />
                            <Route path="/editUser/:id" component={editUser} />
                            <Route
                                path="/editKaryawan/:nik"
                                component={editKaryawan}
                            />
                            <Route
                                path="/tambahAbsensi"
                                component={tambahAbsensi}
                            />
                            <Route
                                path="/editAbsensi/:id"
                                component={editAbsensi}
                            />
                            <Route
                                path="/daftarKaryawan"
                                component={daftarKaryawan}
                            />
                            <Route
                                path="/tambahKaryawan"
                                component={tambahKaryawan}
                            />
                            <Route path="/inputGaji" component={inputGaji} />
                            <Route path="/editGaji/:id" component={editGaji} />
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
        <AuthContextProvider>
            <App />
        </AuthContextProvider>
    </BrowserRouter>,
    document.getElementById("app")
);
