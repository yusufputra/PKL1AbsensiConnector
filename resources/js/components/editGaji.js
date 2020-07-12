import React, { useState, useEffect } from "react";
import {
    Breadcrumb,
    Form,
    Layout,
    Input,
    Button,
    Select,
    AutoComplete,
    notification
} from "antd";
import { useHistory, useParams } from "react-router-dom";
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
const editGaji = () => {
    const history = useHistory();
    const [search, setSearch] = useState([]);
    // const [data, setData] = useState([])
    const [form] = Form.useForm();
    const { id } = useParams();
    useEffect(() => {
        Axios.get(api.getGajibyId + id, {
            headers: {
                Authorization: "Bearer " + localStorage.token
            }
        })
            .then(ress => {
                console.log(ress.data);
                // setdata(ress.data.gaji);
                form.setFieldsValue({
                    nik: ress.data.gaji.nik,
                    bulan: ress.data.gaji.bulan.toString(),
                    tahun: ress.data.gaji.tahun,
                    gaji_pokok: ress.data.gaji.gaji_pokok,
                    bpjs: ress.data.gaji.bpjs,
                    pph21: ress.data.gaji.pph21
                });
            })
            .catch(error => {
                console.log(error);
                alert(error);
            });
    }, []);
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
            id:id,
            nik: values.nik.toString(),
            bulan: values.bulan,
            tahun: values.tahun.toString(),
            gaji_pokok: values.gaji_pokok.toString(),
            bpjs: values.bpjs.toString(),
            pph21: values.pph21.toString()
        };
        console.log(body);
        Axios.post(api.editGaji, body, {
            headers: {
                Authorization: "Bearer " + localStorage.token
            }
        })
            .then(ress => {
                toggleNotif("success", "Berhasil mengedit gaji");
                history.push("/totalgaji");
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
                <Breadcrumb.Item>Data Gaji</Breadcrumb.Item>
                <Breadcrumb.Item>Edit Gaji</Breadcrumb.Item>
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
                        name="nik"
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
                            disabled
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
                    <Form.Item label="Bulan" name="bulan">
                        <Select style={{ width: 240 }}>
                            <Option value="0">Januari</Option>
                            <Option value="1">Februari</Option>
                            <Option value="2">Maret</Option>
                            <Option value="3">April</Option>
                            <Option value="4">Mei</Option>
                            <Option value="5">Juni</Option>
                            <Option value="6">Juli</Option>
                            <Option value="7">Agustus</Option>
                            <Option value="8">September</Option>
                            <Option value="9">Oktober</Option>
                            <Option value="10">November</Option>
                            <Option value="11">Desember</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Tahun"
                        name="tahun"
                        rules={[
                            {
                                required: true,
                                message: "Please input tahun"
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Gaji Pokok"
                        name="gaji_pokok"
                        rules={[
                            {
                                required: true,
                                message: "Please input gaji pokok"
                            }
                        ]}
                    >
                        <Input
                            onChange={e => {
                                console.log(e.target.value);
                                if (e.target.value <= 50000000) {
                                    form.setFieldsValue({
                                        pph21: Math.ceil(
                                            (e.target.value * 0.05) / 12
                                        )
                                    });
                                } else if (e.target.value <= 250000000) {
                                    form.setFieldsValue({
                                        pph21: Math.ceil(
                                            (e.target.value * 0.15) / 12
                                        )
                                    });
                                } else if (e.target.value <= 500000000) {
                                    form.setFieldsValue({
                                        pph21: Math.ceil(
                                            (e.target.value * 0.25) / 12
                                        )
                                    });
                                } else {
                                    form.setFieldsValue({
                                        pph21: Math.ceil(
                                            (e.target.value * 0.3) / 12
                                        )
                                    });
                                }
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        label="BPJS"
                        name="bpjs"
                        rules={[
                            {
                                required: true,
                                message: "Please input tunjangan bpjs"
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="PPh21"
                        name="pph21"
                        rules={[
                            {
                                required: true,
                                message: "Please input pph21"
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

export default editGaji;
