import { Modal, Row, Form, Input, Button, Select, message } from "antd";
import { GrFormClose } from "react-icons/gr";
import { schemaValidate } from "../../validations/AddUser";
import { converSchemaToAntdRule } from "../../validations";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "./graphql";
import moment from "moment";
import { ACTIVE, DATE_TIME_FORMAT } from "../../constants";

const FormAddUser = ({ isOpen, onClose }) => {
  const [form] = Form.useForm();
  const [addUser] = useMutation(ADD_USER);
  const yupSync = converSchemaToAntdRule(schemaValidate);
  const onSubmit = (values) => {
    const customId = "US" + Math.floor(Math.random() * Date.now());
    addUser({
      variables: {
        userRegisterInput: {
          userId: customId,
          fullName: values.name,
          email: values.email,
          password: values.password,
          role: values.role,
          status: ACTIVE,
          createdAt: moment().format(DATE_TIME_FORMAT),
          updatedAt: moment().format(DATE_TIME_FORMAT),
        },
      },
      onCompleted: () => {
        message.success("Thêm người dùng thành công!");
        form.resetFields();
      },
      onError: (error) => {
        message.error(`${error.message}`);
      },
    });
  };
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
        onFinish={onSubmit}
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
            placeholder="Quản trị viên"
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
