import React, { useEffect, useState } from "react";
import { Breadcrumb, Form, Layout, Input, Button, Checkbox } from "antd";
import { useHistory, useParams } from "react-router-dom";
import Axios from "axios";
import api from "../api/api";

const { Content } = Layout;
const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 10 }
};
const tailLayout = {
    wrapperCol: { offset: 4, span: 10 }
};
const editUser = () => {
    let { id } = useParams();
    const history = useHistory();
    // const [data, setdata] = useState({ email: "test dulu", name: "test aja" });
    const [form] = Form.useForm();
    useEffect(() => {
        Axios.get(api.getSpecified + id, {
            headers: {
                Authorization: "Bearer " + localStorage.token
            }
        })
            .then(ress => {
                console.log(ress.data.user);
                // setdata(ress.data.user);
                form.setFieldsValue({
                    email: ress.data.user.email,
                    name: ress.data.user.name
                });
            })
            .catch(error => {
                console.log(error);
                alert(error);
            });
    }, []);
    const onFinish = values => {
        const body = {
            id: id,
            name: values.name,
            email: values.email,
            oldpassword: values.oldpassword,
            newpassword: values.newpassword,
            newpassword_confirmation: values.newpassword_confirmation
        };
        console.log(body);
        Axios.post(api.editUser, body, {
            headers: {
                Authorization: "Bearer " + localStorage.token
            }
        })
            .then(ress => {
                alert("User edited");
                history.push("/setting");
            })
            .catch(error => {
                console.log(error.response);
                alert(error);
            });
    };

    const onFinishFailed = errorInfo => {
        console.log("Failed:", errorInfo);
    };
    return (
        <div>
            <Breadcrumb style={{ margin: "16px 0" }}>
                <Breadcrumb.Item>Setting</Breadcrumb.Item>
                <Breadcrumb.Item>Edit User</Breadcrumb.Item>
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
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    form={form}
                >
                    <Form.Item
                        label="fullname"
                        name="name"
                        rules={[
                            {
                                required: false,
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
                                required: false,
                                message: "Please input your email!"
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Old Password"
                        name="oldpassword"
                        rules={[
                            {
                                required: false,
                                message: "Please input your old password!"
                            }
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        label="New Password"
                        name="newpassword"
                        rules={[
                            {
                                required: false,
                                message: "Please input your password!"
                            }
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        label="Confirmation New Password"
                        name="newpassword_confirmation"
                        rules={[
                            {
                                required: false,
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

export default editUser;
