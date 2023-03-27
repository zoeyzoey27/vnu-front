import { Modal, Row, Form, Input, Button, Select } from "antd";
import { GrFormClose } from "react-icons/gr";
import { schemaValidate } from "../../validations/CreateClass";
import { converSchemaToAntdRule } from "../../validations";

const FormCreateStudent = ({ isOpen, onClose, isEdit = false }) => {
  const [form] = Form.useForm();
  const yupSync = converSchemaToAntdRule(schemaValidate);
  return (
    <>
      <Modal
        title={
          <Row className="text-xl">
            {isEdit ? "Chỉnh sửa thông tin sinh viên" : "Thêm sinh viên"}
          </Row>
        }
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
            name="id"
            className="w-full"
            label={
              <Row>
                Mã sinh viên
                <Row className="text-red-500 ml-1">*</Row>
              </Row>
            }
            required={false}
            rules={[yupSync]}
          >
            <Input placeholder="CLASS001" className="rounded-[10px] h-[48px]" />
          </Form.Item>
          <Form.Item
            name="name"
            className="w-full"
            label={
              <Row>
                Tên sinh viên
                <Row className="text-red-500 ml-1">*</Row>
              </Row>
            }
            required={false}
            rules={[yupSync]}
          >
            <Input placeholder="Class A" className="rounded-[10px] h-[48px]" />
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
          name="class"
          className="w-full"
          label={<Row>Lớp</Row>}
          required={false}
        >
          <Input
            placeholder="Class A"
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
    </>
  );
};

export default FormCreateStudent;
