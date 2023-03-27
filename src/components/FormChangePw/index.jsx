import { Modal, Row, Form, Input, Button } from "antd";
import { GrFormClose } from "react-icons/gr";
import { schemaValidate } from "../../validations/ResetPw";
import { converSchemaToAntdRule } from "../../validations";

const FormChangePw = ({ isOpen, onClose }) => {
  const [form] = Form.useForm();
  const yupSync = converSchemaToAntdRule(schemaValidate);
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
          <Input placeholder="******" className="rounded-[10px] h-[48px]" />
        </Form.Item>
        <Form.Item
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
          <Input placeholder="******" className="rounded-[10px] h-[48px]" />
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
          <Input placeholder="******" className="rounded-[10px] h-[48px]" />
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
