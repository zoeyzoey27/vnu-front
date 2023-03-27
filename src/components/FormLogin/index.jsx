import { useState } from "react";
import { Row, Form, Input, Button } from "antd";
import logo from "../../assets/logo.png";
import FormEmailForgotPw from "../FormEmailForgotPw";
import { schemaValidate } from '../../validations/Login';
import { converSchemaToAntdRule } from '../../validations';

const FormLogin = () => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const yupSync = converSchemaToAntdRule(schemaValidate);
  return (
    <Row className="w-full h-full flex flex-col lg:flex-row items-center justify-between p-[10vw] md:p-[7vw]">
      <Row className="flex flex-col items-center justify-center w-full lg:w-[40%]">
        <img src={logo} alt="" className="w-[200px]" />
        <Row className="mt-5 font-bold block text-2xl text-center">
          Trường Đại học Công nghệ, Đại học Quốc gia Hà Nội - VNU - University
          of Engineering and Technology
        </Row>
      </Row>
      <Row className="mt-5 lg:mt-0 w-full lg:flex-1 lg:ml-[20px] flex items-center justify-center">
        <Row className="w-full lg:w-4/5 h-auto p-[40px] bg-white rounded-[30px] shadow-lg">
          <Form
            layout="vertical"
            autoComplete="off"
            form={form}
            className="w-full"
          >
            <Form.Item
              name="email"
              className="w-full"
              label={
                <Row>
                  Email
                  <Row className="text-red-500 ml-1">*</Row>
                </Row>
              }
              required={false}
              rules={[yupSync]}
            >
              <Input
                placeholder="admin@gmail.com"
                className="rounded-[10px] h-[48px]"
              />
            </Form.Item>
            <Form.Item
              name="password"
              className="w-full"
              label={
                <Row>
                  Mật khẩu
                  <Row className="text-red-500 ml-1">*</Row>
                </Row>
              }
              required={false}
              rules={[yupSync]}
            >
              <Input placeholder="******" className="rounded-[10px] h-[48px]" />
            </Form.Item>
            <Row
              onClick={() => setIsModalOpen(true)}
              className="mb-5 font-bold text-[#4F94CD] hover:cursor-pointer hover:opacity-90"
            >
              Quên mật khẩu?
            </Row>
            <Form.Item className="!mb-0">
              <Button
                htmlType="submit"
                className="w-full rounded-[10px] bg-[#4F94CD] h-[55px] !text-[16px] !text-white font-bold !border-none !outline-0 shadow-lg hover:opacity-90"
              >
                Đăng nhập
              </Button>
            </Form.Item>
          </Form>
        </Row>
      </Row>
      <FormEmailForgotPw isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
    </Row>
  );
};

export default FormLogin;
