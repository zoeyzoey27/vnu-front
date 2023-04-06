import { useState } from "react";
import { Modal, Row, Form, Input, Button, message } from "antd";
import { GrFormClose } from "react-icons/gr";
import { schemaValidate } from "../../validations/Login";
import { converSchemaToAntdRule } from "../../validations";
import FormResetPw from "../FormResetPw";
import { useQuery } from "@apollo/client";
import { GET_USER } from "./graphql";
import emailjs from "@emailjs/browser";

const FormEmailForgotPw = ({ isOpen, setIsOpen, setLoading }) => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userCode, setUserCode] = useState();
  const [userId, setUserId] = useState();
  const yupSync = converSchemaToAntdRule(schemaValidate);
  const { fetchMore } = useQuery(GET_USER, {
    variables: {
      userInput: {},
      skip: null,
      take: 1,
    },
    onCompleted: () => {
      setLoading(false);
    },
    onError: () => {
      setLoading(false);
    },
  });
  const onSubmit = async (values) => {
    setLoading(true);
    const userRes = await fetchMore({
      variables: {
        userInput: {
          email: values.email,
        },
      },
    });
    if (userRes?.data?.getAllUsers[0]) {
      const templateParams = {
        email: values.email,
        message: Math.floor(Math.random() * Date.now())
          .toString()
          .slice(0, 5),
      };
      emailjs
        .send(
          "service_3j0uyuv",
          "template_32ytcha",
          templateParams,
          "kRmmE_FN69-XkGUuX"
        )
        .then(
          () => {
            setLoading(false);
            setUserCode(templateParams.message);
            setUserId(userRes?.data?.getAllUsers[0]?.id);
            form.resetFields();
            setIsOpen(false);
            setIsModalOpen(true);
          },
          (error) => {
            setLoading(false);
            message.error(`${error.text}`);
          }
        );
    } else {
      setLoading(false);
      message.error("Email chưa được đăng ký!");
    }
  };
  return (
    <>
      <Modal
        title={<Row className="text-xl">Quên mật khẩu?</Row>}
        open={isOpen}
        footer={null}
        centered
        closeIcon={
          <GrFormClose onClick={() => setIsOpen(false)} className="text-3xl" />
        }
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
          <Form.Item className="!mb-0">
            <Button
              htmlType="submit"
              className="w-full rounded-[10px] bg-[#4F94CD] h-[55px] !text-[16px] !text-white font-bold !border-none !outline-0 shadow-lg hover:opacity-90"
            >
              Xác nhận
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <FormResetPw
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        userCode={userCode}
        userId={userId}
        setLoading={setLoading}
      />
    </>
  );
};

export default FormEmailForgotPw;
