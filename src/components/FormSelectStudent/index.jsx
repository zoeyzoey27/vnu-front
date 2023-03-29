import { Modal, Row, Form, Input, Button } from "antd";
import { GrFormClose } from "react-icons/gr";

const FormSelectStudent = ({ isOpen, onClose, studentList }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      title={<Row className="text-xl">Thêm sinh viên</Row>}
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
        <Form.Item name="searchInput" className="w-full" required={false}>
          <Input
            placeholder="Tìm kiếm..."
            className="rounded-[10px] h-[48px]"
          />
        </Form.Item>
      </Form>
      <Row className="max-h-[350px] scrollbar -mx-[24px]">
        <Row className="px-[24px] !grid w-full">
          <Row className="px-2 py-2.5 !grid-cols-12 flex justify-between opacity-60">
            <Row className="w-[30%]">Mã sinh viên</Row>
            <Row className="w-[70%] flex justify-end">Tên sinh viên</Row>
          </Row>
          {studentList?.map((item) => (
            <Row
              className="px-2 py-2.5 hover:bg-[#A4D3EE]/30 cursor-pointer rounded-[10px] my-1 !grid-cols-12 flex justify-between"
              key={item.id}
            >
              <Row className="w-[30%]">{item.id}</Row>
              <Row className="w-[70%] flex justify-end">{item.name}</Row>
            </Row>
          ))}
        </Row>
      </Row>
      <Button
        onClick={() => {}}
        className="w-full mt-5 rounded-[10px] bg-[#4F94CD] h-[55px] !text-[16px] !text-white font-bold !border-none !outline-0 shadow-lg hover:opacity-90"
      >
        Lưu
      </Button>
    </Modal>
  );
};

export default FormSelectStudent;
