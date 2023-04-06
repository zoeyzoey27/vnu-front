import { Modal, Row, Form, Input, Button, Select } from "antd";
import { GrFormClose } from "react-icons/gr";
import { schemaValidate } from "../../validations/UpdateInfo";
import { converSchemaToAntdRule } from "../../validations";
import { useEffect, useState } from "react";
import FormChangePw from "../FormChangePw";
import "./style.css";

const FormUpdateInfo = ({
  isOpen,
  setIsOpen,
  dataUser,
  onSubmit,
  setLoading,
  userId,
}) => {
  const [form] = Form.useForm();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const yupSync = converSchemaToAntdRule(schemaValidate);
  const onOpenModal = () => {
    setIsOpen(false);
    setIsOpenModal(true);
  };
  useEffect(() => {
    if (dataUser) {
      form.setFieldsValue({
        email: dataUser.email,
        name: dataUser.fullName,
        gender: dataUser.gender,
        phone: dataUser.phoneNumber,
        address: dataUser.address,
      });
    }
  }, [dataUser, form]);
  return (
    <>
      <Modal
        title={<Row className="text-xl">Chỉnh sửa thông tin cá nhân</Row>}
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
          <Form.Item>
            <Button
              onClick={onOpenModal}
              className="!bg-[#E0E0E0] !text-black h-[35px] flex-1 !rounded-[8px] outline-0 border-0 hover:opacity-90"
            >
              Thay đổi mật khẩu
            </Button>
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
              <Select.Option
                value="MALE"
                className="!py-2.5 m-2 !rounded-[10px]"
              >
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
          >
            <Input
              placeholder="0123456789"
              className="rounded-[10px] h-[48px]"
            />
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
      <FormChangePw
        isOpen={isOpenModal}
        setLoading={setLoading}
        userId={userId}
        onClose={() => setIsOpenModal(false)}
      />
    </>
  );
};

export default FormUpdateInfo;
