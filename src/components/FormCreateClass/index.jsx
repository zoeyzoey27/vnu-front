import { Modal, Row, Form, Input, Button } from "antd";
import { GrFormClose } from "react-icons/gr";
import { schemaValidate } from "../../validations/CreateClass";
import { converSchemaToAntdRule } from "../../validations";
import { useState } from "react";
import FormSelectTeacher from "../FormSelectTeacher";
import FormSelectStudent from "../FormSelectStudent";

const FormCreateClass = ({ isOpen, onClose, isEdit = false }) => {
  const [form] = Form.useForm();
  const [isSelectTeacher, setIsSelectTeacher] = useState(false);
  const [isSelectStudent, setIsSelectStudent] = useState(false);
  const yupSync = converSchemaToAntdRule(schemaValidate);
  return (
    <>
      <Modal
        title={
          <Row className="text-xl">
            {isEdit ? "Chỉnh sửa thông tin lớp" : "Thêm lớp"}
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
                Mã lớp
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
                Tên lớp
                <Row className="text-red-500 ml-1">*</Row>
              </Row>
            }
            required={false}
            rules={[yupSync]}
          >
            <Input placeholder="Class A" className="rounded-[10px] h-[48px]" />
          </Form.Item>
          <Form.Item
            name="teacher"
            className="w-full"
            label={<Row>Cố vấn học tập</Row>}
            required={false}
          >
            <Input
              onClick={() => setIsSelectTeacher(true)}
              placeholder="Cố vấn học tập"
              className="rounded-[10px] h-[48px]"
            />
          </Form.Item>
          <Form.Item
            name="students"
            className="w-full"
            label={<Row>Sinh viên</Row>}
            required={false}
          >
            <Input
              onClick={() => setIsSelectStudent(true)}
              placeholder="30"
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
      <FormSelectTeacher
        isOpen={isSelectTeacher}
        onClose={() => setIsSelectTeacher(false)}
      />
      <FormSelectStudent
        isOpen={isSelectStudent}
        onClose={() => setIsSelectStudent(false)}
      />
    </>
  );
};

export default FormCreateClass;
