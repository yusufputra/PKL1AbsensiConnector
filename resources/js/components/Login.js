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

const { Title } = Typography;

const Login = () => {
    const [error, setError] = useState(false);
    const handleSubmit = values => {
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
                window.location.reload();
            })
            .catch(error => {
                setError(true);
                console.log(error);
            });
    };
    return (
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
                                { valuePropName: "checked", initialValue: true }
                            ]}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    flex: 1,
                                    justifyContent: "space-between"
                                }}
                            >
                                <Checkbox>Remember me</Checkbox>
                                <a href="">Forgot password</a>
                            </div>
                            <div style={{ textAlign: "center" }}>
                                <Button
                                    block
                                    type="primary"
                                    htmlType="submit"
                                    loading={false}
                                >
                                    Log in
                                </Button>
                                Or <a href="">register now!</a>
                            </div>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </Fragment>
    );
};
export default Login;
