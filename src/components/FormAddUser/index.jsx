import { Modal, Row, Form, Input, Button, Select } from "antd";
import { GrFormClose } from "react-icons/gr";
import { schemaValidate } from "../../validations/AddUser";
import { converSchemaToAntdRule } from "../../validations";

const FormAddUser = ({ isOpen, onClose }) => {
  const [form] = Form.useForm();
  const yupSync = converSchemaToAntdRule(schemaValidate);
  return (
    <Modal
      title={<Row className="text-xl">Thêm người dùng</Row>}
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
          name="name"
          className="w-full"
          label={
            <Row>
              Họ tên
              <Row className="text-red-500 ml-1">*</Row>
            </Row>
          }
          required={false}
          rules={[yupSync]}
        >
          <Input
            placeholder="Admin Admin"
            className="rounded-[10px] h-[48px]"
          />
        </Form.Item>
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
        <Form.Item
          name="role"
          className="w-full"
          label={
            <Row>
              Quyền
              <Row className="text-red-500 ml-1">*</Row>
            </Row>
          }
          required={false}
        >
          <Select
            className="customSelect"
            defaultValue="ADMIN"
            popupClassName="!rounded-[10px]"
          >
            <Select.Option
              value="ADMIN"
              className="!py-2.5 m-2 !rounded-[10px]"
            >
              Quản trị viên
            </Select.Option>
            <Select.Option
              value="TEACHER"
              className="!py-2.5 m-2 mt-0 !rounded-[10px]"
            >
              Giảng viên
            </Select.Option>
          </Select>
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

export default FormAddUser;
