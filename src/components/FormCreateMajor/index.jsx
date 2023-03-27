import { Modal, Row, Form, Input, Button } from "antd";
import { GrFormClose } from "react-icons/gr";
import { schemaValidate } from "../../validations/CreateMajor";
import { converSchemaToAntdRule } from "../../validations";

const FormCreateMajor = ({ isOpen, onClose, isEdit }) => {
  const [form] = Form.useForm();
  const yupSync = converSchemaToAntdRule(schemaValidate);
  return (
    <Modal
      title={
        <Row className="text-xl">{`${
          isEdit ? "Chỉnh sửa chuyên ngành" : "Thêm chuyên ngành"
        }`}</Row>
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
          name="name"
          className="w-full"
          label={
            <Row>
              Tên chuyên ngành
              <Row className="text-red-500 ml-1">*</Row>
            </Row>
          }
          required={false}
          rules={[yupSync]}
        >
          <Input
            placeholder="Công nghệ thông tin"
            className="rounded-[10px] h-[48px]"
          />
        </Form.Item>
        <Form.Item
          name="graduationDiploma"
          className="w-full"
          label={
            <Row>
              Văn bằng tốt nghiệp
              <Row className="text-red-500 ml-1">*</Row>
            </Row>
          }
          required={false}
          rules={[yupSync]}
        >
          <Input placeholder="Cử nhân" className="rounded-[10px] h-[48px]" />
        </Form.Item>
        <Form.Item
          name="time"
          className="w-full"
          label={
            <Row>
              Thời gian đào tạo (năm)
              <Row className="text-red-500 ml-1">*</Row>
            </Row>
          }
          required={false}
          rules={[yupSync]}
        >
          <Input placeholder={4} className="rounded-[10px] h-[48px]" />
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

export default FormCreateMajor;
