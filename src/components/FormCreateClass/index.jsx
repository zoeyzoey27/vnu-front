import { useEffect } from "react";
import { Modal, Row, Form, Input, Button, message } from "antd";
import { GrFormClose } from "react-icons/gr";
import { schemaValidate } from "../../validations/CreateClass";
import { converSchemaToAntdRule } from "../../validations";
import { useState } from "react";
import FormSelectTeacher from "../FormSelectTeacher";
import FormSelectStudent from "../FormSelectStudent";
import { useMutation, useQuery } from "@apollo/client";
import {
  CREATE_CLASS,
  GET_CLASS,
  GET_STUDENT_LIST,
  GET_USER_LIST,
  UPDATE_CLASS,
} from "./graphql";
import { DATE_TIME_FORMAT } from "../../constants";
import moment from "moment";

const FormCreateClass = ({
  isOpen,
  onClose,
  isEdit,
  setLoading,
  currentId,
}) => {
  const [form] = Form.useForm();
  const [createClass] = useMutation(CREATE_CLASS);
  const [updateClass] = useMutation(UPDATE_CLASS);
  const [isSelectTeacher, setIsSelectTeacher] = useState(false);
  const [isSelectStudent, setIsSelectStudent] = useState(false);
  const [teacherList, setTeacherList] = useState([]);
  const [studentList, setStudentList] = useState([]);
  const [studentListSelected, setStudentListSelected] = useState([]);
  const [teacherSelected, setTeacherSelected] = useState([]);
  const yupSync = converSchemaToAntdRule(schemaValidate);
  const { data } = useQuery(GET_CLASS, {
    variables: {
      getClassId: currentId,
    },
    skip: currentId === null,
    onCompleted: () => {
      setLoading(false);
    },
  });
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
  const { data: dataStudent } = useQuery(GET_STUDENT_LIST, {
    variables: {
      studentInput: {
        classId: "",
        name: "",
      },
      skip: null,
      take: null,
    },
  });
  const onSubmit = (values) => {
    setLoading(true);
    createClass({
      variables: {
        createClassInput: {
          classId: values.id,
          name: values.name,
          teacherId: values.teacherId,
          studentIds: values.studentId,
          createdAt: moment().format(DATE_TIME_FORMAT),
          updatedAt: moment().format(DATE_TIME_FORMAT),
        },
      },
      onCompleted: () => {
        setLoading(false);
        message.success("Thêm lớp thành công!");
        form.resetFields();
        onClose();
        window.location.reload();
      },
      onError: (error) => {
        setLoading(false);
        message.error(`${error.message}`);
      },
    });
  };
  const onUpdate = (values) => {
    setLoading(true);
    updateClass({
      variables: {
        updateClassId: currentId,
        updateClassInput: {
          classId: values.id,
          name: values.name,
          teacherId: values.teacherId,
          studentIds: values.studentId,
          updatedAt: moment().format(DATE_TIME_FORMAT),
        },
      },
      onCompleted: () => {
        setLoading(false);
        message.success("Chỉnh sửa lớp thành công!");
        onClose();
        window.location.reload();
      },
      onError: (error) => {
        setLoading(false);
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
          userClass: item.userClass,
        };
      });
      if (isEdit && currentId) {
        setTeacherList(
          items.filter(
            (item) =>
              item.userClass === null || item?.userClass?.id === currentId
          )
        );
      } else {
        setTeacherList(items.filter((item) => item.userClass === null));
      }
    }
  }, [dataUser, currentId, isEdit]);
  useEffect(() => {
    if (dataStudent) {
      const items = dataStudent?.getAllStudents?.map((item) => {
        return {
          id: item.id,
          studentId: item.studentId,
          name: item.name,
          class: item.class,
        };
      });
      if (isEdit && currentId) {
        setStudentList(
          items.filter(
            (item) => item.class === null || item?.class?.id === currentId
          )
        );
      } else {
        setStudentList(items.filter((item) => item.class === null));
      }
    }
  }, [dataStudent, currentId, isEdit]);
  useEffect(() => {
    if (data) {
      const studentIds = [];
      data?.getClass?.students?.forEach((item) => {
        studentIds.push(item.id);
      });
      form.setFieldsValue({
        id: data?.getClass?.classId,
        name: data?.getClass?.name,
        teacher: data?.getClass?.teacher?.fullName,
        teacherId: data?.getClass?.teacher?.id,
        students: studentIds.length > 0 ? studentIds.length : "",
        studentId: studentIds,
      });
      setStudentListSelected(studentIds);
      setTeacherSelected(data?.getClass?.teacher?.id);
    }
  }, [data, form]);
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
          onFinish={isEdit ? onUpdate : onSubmit}
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
          <Form.Item name="studentId" className="hidden" required={false}>
            <Input readOnly className="rounded-[10px] h-[48px]" />
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
        userSelected={teacherSelected}
      />
      <FormSelectStudent
        isOpen={isSelectStudent}
        studentList={studentList}
        onClose={() => setIsSelectStudent(false)}
        formCreateClass={form}
        studentListSelected={studentListSelected}
      />
    </>
  );
};

export default FormCreateClass;
