import React, { useState } from "react";
import {
    Breadcrumb,
    Form,
    Layout,
    Input,
    Button,
    Select,
    DatePicker,
    AutoComplete
} from "antd";
import { useHistory } from "react-router-dom";
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

const tambahAbsensi = () => {
    const history = useHistory();
    const [datestring, setDatestring] = useState();
    const [search, setSearch] = useState([]);
    function onChange(value, dateString) {
        console.log("Selected Time: ", value);
        console.log("Formatted Selected Time: ", dateString);
        setDatestring(dateString);
    }
    const handleSearch = value => {
        Axios.post(
            api.searchKaryawan,
            { nik: value },
            {
                headers: {
                    Authorization: "Bearer " + localStorage.token
                }
            }
        ).then(ress => {
            console.log(ress.data);
            if (ress.data.data) {
                setSearch(ress.data.data);
            } else {
                setSearch([]);
            }
        });
    };
    const onFinish = values => {
        const body = {
            id: values.id.toString(),
            date: datestring,
            serial_no: values.serial_no
        };
        console.log(body);
        Axios.post("/api/" + values.id + "/absen", body)
            .then(ress => {
                alert("Absensi Added");
                history.push("/absensi");
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
                <Breadcrumb.Item>Karyawan</Breadcrumb.Item>
                <Breadcrumb.Item>Absensi</Breadcrumb.Item>
                <Breadcrumb.Item>Tambah Absensi</Breadcrumb.Item>
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
                        label="NIK"
                        name="id"
                        rules={[
                            {
                                required: true,
                                message: "Please input NIK!"
                            }
                        ]}
                    >
                        <AutoComplete
                            onChange={handleSearch}
                            notFoundContent="Not Found"
                        >
                            {search.map(data => {
                                return (
                                    <AutoComplete.Option
                                        key={data.nik}
                                        value={data.nik}
                                    >
                                        {data.nik + " - " + data.nama}
                                    </AutoComplete.Option>
                                );
                            })}
                        </AutoComplete>
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

export default tambahAbsensi;
