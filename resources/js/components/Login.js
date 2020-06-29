import React, { Fragment, useState } from "react";
import {
    Form,
    Input,
    Button,
    Checkbox,
    Alert,
    Row,
    Col,
    Typography
} from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import Axios from "axios";
import "../css/formlogin.css";
import api from "../api/api";
import backgound from "../assets/img/HalamanLogin.svg";

const { Title } = Typography;

const Login = () => {
    const [error, setError] = useState(false);
    const [loading, setloading] = useState(false);
    const handleSubmit = values => {
        setloading(true);
        console.log(values);
        const data = {
            email: values.email,
            password: values.password
        };
        Axios.post(api.login, data)
            .then(ress => {
                if (ress.status == 200) {
                    localStorage.token = ress.data.token;
                }
                setloading(false);
                window.location.reload();
            })
            .catch(error => {
                setError(true);
                console.log(error.response);
                setloading(false);
            });
    };
    return (
        <div
            style={{
                backgroundImage: `url(${backgound})`,
                height: "100vh",
                width: "100vw",
                backgroundSize: "cover"
            }}
        >
            <Fragment>
                <Row>
                    <Col span={12} offset={6}>
                        <Title>Login</Title>
                        {error && <Alert message="Login Gagal" type="error" />}

                        <Form onFinish={handleSubmit} className="login-form">
                            <Form.Item
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input your email!"
                                    }
                                ]}
                            >
                                <Input
                                    prefix={<UserOutlined />}
                                    placeholder="email@domain.com"
                                />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input your password!"
                                    }
                                ]}
                            >
                                <Input
                                    prefix={<LockOutlined />}
                                    type="password"
                                    placeholder="Password"
                                />
                            </Form.Item>
                            <Form.Item
                                name="remember"
                                rules={[
                                    {
                                        valuePropName: "checked",
                                        initialValue: true
                                    }
                                ]}
                            >
                                <div style={{ textAlign: "center" }}>
                                    <Button
                                        block
                                        type="primary"
                                        htmlType="submit"
                                        loading={loading}
                                    >
                                        Log in
                                    </Button>
                                </div>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </Fragment>
        </div>
    );
};
export default Login;
