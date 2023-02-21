import { Modal, Row, Form, Input, Button } from "antd";
import { GrFormClose } from "react-icons/gr";
import { schemaValidate } from "../../validations/ResetPw";
import { converSchemaToAntdRule } from "../../validations";

const FormResetPw = ({ isOpen, onClose }) => {
  const [form] = Form.useForm();
  const yupSync = converSchemaToAntdRule(schemaValidate);
  return (
    <Modal
      title={<Row className="text-xl">Đặt lại mật khẩu</Row>}
      open={isOpen}
      footer={null}
      centered
      closeIcon={<GrFormClose onClick={onClose} className="text-3xl" />}
    >
      <Form layout="vertical" autoComplete="off" form={form} className="w-full mt-5">
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
          <Input
            placeholder="******"
            className="rounded-[10px] h-[48px]"
          />
        </Form.Item>
        <Form.Item
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
            className="rounded-[10px] h-[48px]"
          />
        </Form.Item>
        <Form.Item
          name="otp"
          className="w-full"
          label={
            <Row>
              Nhập mã xác nhận
              <Row className="text-red-500 ml-1">*</Row>
            </Row>
          }
          required={false}
          rules={[yupSync]}
        >
          <Input
            placeholder="12345"
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
  );
};

export default FormResetPw;