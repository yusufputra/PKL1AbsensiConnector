import React, { useState, useEffect } from "react";
import {
    Breadcrumb,
    Form,
    Layout,
    Input,
    Button,
    Select,
    DatePicker,
    notification
} from "antd";
import { useHistory, useParams } from "react-router-dom";
import Axios from "axios";
import moment from "moment";
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
const editAbsensi = () => {
    let { id } = useParams();
    const history = useHistory();
    const [datestring, setDatestring] = useState();
    const [form] = Form.useForm();

    useEffect(() => {
        Axios.get(api.getAbsenbyId + id, {
            headers: {
                Authorization: "Bearer " + localStorage.token
            }
        })
            .then(ress => {
                console.log(ress.data.user);
                setDatestring(ress.data.user.date);
                form.setFieldsValue({
                    id: ress.data.user.nik,
                    date: moment(ress.data.user.date, "YYYY-MM-DD h:mm:ss"),
                    serial_no: ress.data.user.serial_no
                });
            })
            .catch(error => {
                console.log(error);
                alert(error);
            });
    }, []);

    function onChange(value, dateString) {
        console.log("Selected Time: ", value);
        console.log("Formatted Selected Time: ", dateString);
        setDatestring(dateString);
    }
    const onFinish = values => {
        const body = {
            id: id,
            nik: values.id.toString(),
            date: datestring,
            serial_no: values.serial_no
        };
        console.log(body);
        Axios.post(api.editAbsen, body, {
            headers: {
                Authorization: "Bearer " + localStorage.token
            }
        })
            .then(ress => {
                toggleNotif("success", "Berhasil mengedit absensi");
                history.push("/absensi");
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
                <Breadcrumb.Item>Karyawan</Breadcrumb.Item>
                <Breadcrumb.Item>Absensi</Breadcrumb.Item>
                <Breadcrumb.Item>Edit Absensi</Breadcrumb.Item>
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
                    form={form}
                >
                    <Form.Item
                        label="NIK"
                        name="id"
                        rules={[
                            {
                                required: true,
                                message: "Please NIK!"
                            }
                        ]}
                    >
                        <Input disabled />
                    </Form.Item>
                    <Form.Item
                        label="Date Time"
                        name="date"
                        rules={[
                            {
                                required: true,
                                message: "Please date time!"
                            }
                        ]}
                    >
                        <DatePicker showTime onChange={onChange} />
                    </Form.Item>
                    <Form.Item
                        label="Serial No."
                        name="serial_no"
                        rules={[
                            {
                                required: true,
                                message: "Please serial number!"
                            }
                        ]}
                    >
                        <Input />
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

export default editAbsensi;
