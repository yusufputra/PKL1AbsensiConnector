import React, { Fragment } from "react";
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
import axios from "axios";
import "../css/formlogin.css";

const { Title } = Typography;
function handleSubmit() {
    window.location.href="/home";
}
const Login = () => {
    return (
        <Fragment>
            <Row>
                <Col span={12} offset={6}>
                    <Title>Login</Title>
                    <Alert message="Login Gagal" type="error" />

                    <Form onSubmitCapture={handleSubmit} className="login-form">
                        <Form.Item
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your username!"
                                }
                            ]}
                        >
                            <Input
                                prefix={<UserOutlined />}
                                placeholder="Username"
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
