import { useEffect } from "react";
import { Modal, Row, Form, Input, Button, Select, message } from "antd";
import { GrFormClose } from "react-icons/gr";
import { schemaValidate } from "../../validations/UpdateInfo";
import { converSchemaToAntdRule } from "../../validations";
import { useMutation, useQuery } from "@apollo/client";
import { GET_USER, UPDATE_USER } from "./graphql";
import moment from "moment";
import { DATE_TIME_FORMAT } from "../../constants";

const FormEditUser = ({ isOpen, setIsOpen, currentId, setLoading }) => {
  const [form] = Form.useForm();
  const [updateUser] = useMutation(UPDATE_USER);
  const yupSync = converSchemaToAntdRule(schemaValidate);
  const { data } = useQuery(GET_USER, {
    variables: {
      getUserId: currentId,
    },
    skip: currentId === null || currentId === undefined,
    onCompleted: () => {
      setLoading(false);
    },
    onError: () => {
      setLoading(false);
    }
  });
  const onSubmit = async (values) => {
    setLoading(true);
    await updateUser({
      variables: {
        updateUserId: currentId,
        updateUserInput: {
          fullName: values.name,
          gender: values.gender,
          phoneNumber: values.phone,
          address: values.address,
          role: values.role,
          updatedAt: moment().format(DATE_TIME_FORMAT),
        },
      },
      onCompleted: () => {
        setLoading(false);
        message.success("Chỉnh sửa thông tin người dùng thành công!");
        setIsOpen(false);
      },
      onError: (error) => {
        setLoading(false);
        message.error(`${error.message}`);
      },
    });
  };
  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        name: data?.getUser?.fullName,
        email: data?.getUser?.email,
        gender: data?.getUser?.gender,
        phone: data?.getUser?.phoneNumber,
        address: data?.getUser?.address,
        role: data?.getUser?.role,
      });
    }
  }, [data, form]);
  return (
    <Modal
      title={<Row className="text-xl">Chỉnh sửa thông tin người dùng</Row>}
      open={isOpen}
      footer={null}
      centered
      closeIcon={
        <GrFormClose onClick={() => setIsOpen(false)} className="text-3xl" />
      }
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
          >
            <Input
              defaultValue="admin@gmail.com"
              className="rounded-[10px] h-[48px]"
              disabled
            />
          </Form.Item>
        <Form.Item
          name="gender"
          className="w-full"
          label={
            <Row>
              Giới tính
              <Row className="text-red-500 ml-1">*</Row>
            </Row>
          }
          required={false}
          rules={[yupSync]}
        >
          <Select
            className="customSelect"
            placeholder="Nam/Nữ"
            popupClassName="!rounded-[10px]"
          >
            <Select.Option value="MALE" className="!py-2.5 m-2 !rounded-[10px]">
              Nam
            </Select.Option>
            <Select.Option
              value="FEMALE"
              className="!py-2.5 m-2 mt-0 !rounded-[10px]"
            >
              Nữ
            </Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="phone"
          className="w-full"
          label={<Row>Số điện thoại</Row>}
          required={false}
          rules={[yupSync]}
        >
          <Input placeholder="0123456789" className="rounded-[10px] h-[48px]" />
        </Form.Item>
        <Form.Item
          name="address"
          className="w-full"
          label={<Row>Địa chỉ</Row>}
          required={false}
        >
          <Input
            placeholder="144 đường Xuân Thuỷ, quận Cầu Giấy, Thành phố Hà Nội"
            className="rounded-[10px] h-[48px]"
          />
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

export default FormEditUser;
