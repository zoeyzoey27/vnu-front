import { Modal, Row, Form, Input, Button, message } from "antd";
import { GrFormClose } from "react-icons/gr";
import { schemaValidate } from "../../validations/ResetPw";
import { converSchemaToAntdRule } from "../../validations";
import { useMutation } from "@apollo/client";
import { CHANGE_PASSWORD } from "./graphql";

const FormChangePw = ({ isOpen, onClose, setLoading, userId }) => {
  const [form] = Form.useForm();
  const [changePassword] = useMutation(CHANGE_PASSWORD);
  const yupSync = converSchemaToAntdRule(schemaValidate);
  const onSubmit = async (values) => {
    if (values.newPassword === values.password) {
      message.error("Vui lòng nhập mật khẩu mới khác với mật khẩu hiện tại!");
    }
    else {
      if (values.newPassword === values.passwordConfirm){
        setLoading(true);
        await changePassword({
          variables: {
            userChangePasswordId: userId,
            oldPassword: values.password,
            newPassword: values.newPassword,
          },
          onCompleted: () => {
            setLoading(false);
            message.success("Đổi mật khẩu thành công!");
            form.resetFields();
            onClose();
          },
          onError: (error) => {
            setLoading(false);
            message.error(`${error.message}`);
          },
        });
      }
      else {
        message.error("Vui lòng nhập mật khẩu khớp với mật khẩu vừa nhập!");
      }
    }
  };
  return (
    <Modal
      title={<Row className="text-xl">Thay đổi mật khẩu</Row>}
      open={isOpen}
      footer={null}
      centered
      closeIcon={<GrFormClose onClick={onClose} className="text-3xl" />}
    >
      <Form
        layout="vertical"
        autoComplete="off"
        form={form}
        className="w-full mt-5"
        onFinish={onSubmit}
      >
        <Form.Item
          name="password"
          className="w-full"
          label={
            <Row>
              Mật khẩu hiện tại
              <Row className="text-red-500 ml-1">*</Row>
            </Row>
          }
          required={false}
          rules={[yupSync]}
        >
          <Input
            placeholder="******"
            type="password"
            className="rounded-[10px] h-[48px]"
          />
        </Form.Item>
        <Form.Item
          id="newPassword"
          name="newPassword"
          className="w-full"
          label={
            <Row>
              Mật khẩu mới
              <Row className="text-red-500 ml-1">*</Row>
            </Row>
          }
          required={false}
          rules={[yupSync]}
        >
          <Input
            placeholder="******"
            type="password"
            className="rounded-[10px] h-[48px]"
          />
        </Form.Item>
        <Form.Item
          id="passwordConfirm"
          name="passwordConfirm"
          className="w-full"
          label={
            <Row>
              Nhập lại mật khẩu
              <Row className="text-red-500 ml-1">*</Row>
            </Row>
          }
          required={false}
          rules={[yupSync]}
        >
          <Input
            placeholder="******"
            type="password"
            className="rounded-[10px] h-[48px]"
          />
        </Form.Item>
        <Form.Item className="!mb-0">
          <Button
            htmlType="submit"
            className="w-full rounded-[10px] bg-[#4F94CD] h-[55px] !text-[16px] !text-white font-bold !border-none !outline-0 shadow-lg hover:opacity-90"
          >
            Lưu
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default FormChangePw;
