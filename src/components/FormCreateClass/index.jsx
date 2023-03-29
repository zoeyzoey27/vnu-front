import { useEffect } from "react";
import { Modal, Row, Form, Input, Button, message } from "antd";
import { GrFormClose } from "react-icons/gr";
import { schemaValidate } from "../../validations/CreateClass";
import { converSchemaToAntdRule } from "../../validations";
import { useState } from "react";
import FormSelectTeacher from "../FormSelectTeacher";
import FormSelectStudent from "../FormSelectStudent";
import { useMutation } from "@apollo/client";
import { CREATE_CLASS, GET_USER_LIST } from "./graphql";
import { DATE_TIME_FORMAT } from "../../constants";
import moment from "moment";
import { useQuery } from "@apollo/client";

const FormCreateClass = ({ isOpen, onClose, isEdit = false }) => {
  const [form] = Form.useForm();
  const [createClass] = useMutation(CREATE_CLASS);
  const [isSelectTeacher, setIsSelectTeacher] = useState(false);
  const [isSelectStudent, setIsSelectStudent] = useState(false);
  const [teacherList, setTeacherList] = useState([]);
  const [studentList, setStudentList] = useState([]);
  const yupSync = converSchemaToAntdRule(schemaValidate);
  const { data: dataUser } = useQuery(GET_USER_LIST, {
    variables: {
      userInput: {
        fullName: "",
        role: "TEACHER",
      },
      skip: null,
      take: null,
    },
  });
  const onSubmit = (values) => {
    createClass({
      variables: {
        createClassInput: {
          classId: values.id,
          name: values.name,
          teacherId: values.teacherId,
          studentIds: [],
          createdAt: moment().format(DATE_TIME_FORMAT),
          updatedAt: moment().format(DATE_TIME_FORMAT),
        },
      },
      onCompleted: () => {
        message.success("Thêm lớp thành công!");
        form.resetFields();
        onClose();
      },
      onError: (error) => {
        message.error(`${error.message}`);
      },
    });
  };
  useEffect(() => {
    if (dataUser) {
      const items = dataUser?.getAllUsers?.map((item) => {
        return {
          id: item.id,
          name: item.fullName,
          userClass: item.userClass
        };
      });
      setTeacherList(
        items.filter(
          (item) => item.userClass === null || item.userClass === undefined
        )
      );
    }
  }, [dataUser]);
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
          onFinish={onSubmit}
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
              readOnly
              className="rounded-[10px] h-[48px]"
            />
          </Form.Item>
          <Form.Item name="teacherId" className="hidden" required={false}>
            <Input readOnly className="rounded-[10px] h-[48px]" />
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
              readOnly
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
        teacherList={teacherList}
        onClose={() => setIsSelectTeacher(false)}
        formCreateClass={form}
      />
      <FormSelectStudent
        isOpen={isSelectStudent}
        studentList={studentList}
        onClose={() => setIsSelectStudent(false)}
      />
    </>
  );
};

export default FormCreateClass;
