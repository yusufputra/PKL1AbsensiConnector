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
const tambahKaryawan = () => {
    const history = useHistory();
    const onFinish = values => {
        const body = {
            nik: values.nik,
            nama: values.nama,
            nip: values.nip,
            pendidikan: values.pendidikan,
            tempat_lahir: values.tempat_lahir,
            jenis_kelamin: values.jenis_kelamin,
            alamat: values.alamat,
            no_telepon: values.no_telepon,
            agama: values.agama,
            jabatan: values.jabatan,
            status: values.status
        };
        Axios.post(api.inputKaryawan, body, {
            headers: {
                Authorization: "Bearer " + localStorage.token
            }
        })
            .then(ress => {
                toggleNotif("success", "Berhasil menambahkan karyawan");
                history.push("/daftarKaryawan");
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
                <Breadcrumb.Item>Tambah Karyawan</Breadcrumb.Item>
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
                    initialValues={{ pendidikan: "SMA", jenis_kelamin: "Laki - Laki", agama:"Islam" }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
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
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Nama"
                        name="nama"
                        rules={[
                            {
                                required: true,
                                message: "Please input name!"
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="NIP"
                        name="nip"
                        rules={[
                            {
                                required: true,
                                message: "Please input NIP!"
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item label="Pendidikan" name="pendidikan">
                        <Select style={{ width: 240 }}>
                            <Option value={"SMA"}>SMA</Option>
                            <Option value={"S1"}>S1</Option>
                            <Option value={"S2"}>S2</Option>
                            <Option value={"S3"}>S3</Option>
                            <Option value={"Lainnya"}>Lainnya</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Tempat Lahir"
                        name="tempat_lahir"
                        rules={[
                            {
                                required: true,
                                message: "Please input Tempat Lahir!"
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item label="Jenis Kelamin" name="jenis_kelamin">
                        <Select style={{ width: 240 }}>
                            <Option value={"Laki - Laki"}>Laki - Laki</Option>
                            <Option value={"Perempuan"}>Perempuan</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Alamat"
                        name="alamat"
                        rules={[
                            {
                                required: true,
                                message: "Please input alamat!"
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="No. Telepon"
                        name="no_telepon"
                        rules={[
                            {
                                required: true,
                                message: "Please input No. Telepon!"
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item label="Agama" name="agama">
                        <Select style={{ width: 240 }}>
                            <Option value={"Islam"}>Islam</Option>
                            <Option value={"Protestan"}>Protestan</Option>
                            <Option value={"Katolik"}>Katolik</Option>
                            <Option value={"Budha"}>Budha</Option>
                            <Option value={"Hindu"}>Hindu</Option>
                            <Option value={"Other"}>Other</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Jabatan"
                        name="jabatan"
                        rules={[
                            {
                                required: true,
                                message: "Please input jabatan!"
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item label="Status Pegawai" name="status" rules={[
                            {
                                required: true,
                                message: "Please input status pegawai!"
                            }
                        ]}>
                        <Select placeholder={"Aktif"} style={{ width: 240 }}>
                            <Option value={1}>Aktif</Option>
                            <Option value={0}>Tidak Aktif</Option>
                        </Select>
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

export default tambahKaryawan;
