import { useState } from "react";
import { Modal, Row, Form, Input, Button } from "antd";
import { GrFormClose } from "react-icons/gr";
import { schemaValidate } from "../../validations/Login";
import { converSchemaToAntdRule } from "../../validations";
import FormResetPw from "../FormResetPw";

const FormEmailForgotPw = ({ isOpen, setIsOpen }) => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const yupSync = converSchemaToAntdRule(schemaValidate);
  const onSubmit = () => {
    form.resetFields();
    setIsOpen(false);
    setIsModalOpen(true);
  }
  return (
    <>
      <Modal
        title={<Row className="text-xl">Quên mật khẩu?</Row>}
        open={isOpen}
        footer={null}
        centered
        closeIcon={<GrFormClose onClick={() => setIsOpen(false)} className="text-3xl" />}
      >
        <Row className="my-5 opacity-60">
          Hãy nhập địa chỉ email đã được đăng ký trước đó vào ô bên dưới. Chúng
          tôi sẽ gửi cho bạn một mã xác nhận.
        </Row>
        <Form
          layout="vertical"
          autoComplete="off"
          form={form}
          className="w-full"
          onFinish={onSubmit}
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
          <Form.Item>
            <Button
              htmlType="submit"
              className="w-full rounded-[10px] bg-[#4F94CD] h-[55px] !text-[16px] !text-white font-bold !border-none !outline-0 shadow-lg hover:opacity-90"
            >
              Xác nhận
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <FormResetPw isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default FormEmailForgotPw;
