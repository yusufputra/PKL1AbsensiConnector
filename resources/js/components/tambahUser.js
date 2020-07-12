import React from "react";
import { Breadcrumb, Form, Layout, Input, Button, Select, notification } from "antd";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import api from "../api/api";

const { Option } = Select;
const { Content } = Layout;
const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 10 }
};
const tailLayout = {
    wrapperCol: { offset: 4, span: 10 }
};
const toggleNotif = (type, message) => {
    notification[type]({
        message: message,
        description: "will be disappear in 4 seconds"
    });
};
const tambahUser = () => {
    const history = useHistory();
    const onFinish = values => {
        const body = {
            email: values.email,
            name: values.name,
            password: values.password,
            password_confirmation: values.password_confirmation,
            role: values.role || 0
        };
        Axios.post(api.register, body, {
            headers: {
                Authorization: "Bearer " + localStorage.token
            }
        })
            .then(ress => {
                toggleNotif("success", "Berhasil menambahkan user");
                history.push("/setting");
            })
            .catch(error => {
                console.log(error.response);
                toggleNotif("error", error.response.statusText);
            });
    };

    const onFinishFailed = errorInfo => {
        console.log("Failed:", errorInfo);
    };
    return (
        <div>
            <Breadcrumb style={{ margin: "16px 0" }}>
                <Breadcrumb.Item>Setting</Breadcrumb.Item>
                <Breadcrumb.Item>Tambah User</Breadcrumb.Item>
            </Breadcrumb>
            <Content
                className="site-layout-background"
                style={{
                    padding: 24,
                    margin: 0,
                    minHeight: 280
                }}
            >
                <Form
                    {...layout}
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="fullname"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: "Please input your name!"
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: "Please input your email!"
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item label="Role" name="role">
                        <Select defaultValue="admin" style={{ width: 240 }}>
                            <Option value={0}>admin</Option>
                            <Option value={1}>super admin</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Please input your password!"
                            }
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        label="Confirmation Password"
                        name="password_confirmation"
                        rules={[
                            {
                                required: true,
                                message: "Please input your password again!"
                            }
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Content>
        </div>
    );
};

export default tambahUser;
