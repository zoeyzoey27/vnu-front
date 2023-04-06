import { useState, useEffect } from "react";
import { Modal, Row, Form, Input, Button, Select, message } from "antd";
import { GrFormClose } from "react-icons/gr";
import { schemaValidate } from "../../validations/CreateStudent";
import { converSchemaToAntdRule } from "../../validations";
import { useMutation, useQuery } from "@apollo/client";
import {
  CREATE_STUDENT,
  GET_MAJOR_LIST,
  GET_STUDENT,
  UPDATE_STUDENT,
} from "./graphql";
import { DATE_TIME_FORMAT } from "../../constants";
import moment from "moment";
import FormSelectClass from "../FormSelectClass";

const FormCreateStudent = ({
  isOpen,
  onClose,
  isEdit,
  listClass,
  refetchQueries,
  setLoading,
  currentId,
}) => {
  const [form] = Form.useForm();
  const [dataMajors, setDataMajors] = useState([]);
  const [isSelectClass, setIsSelectClass] = useState(false);
  const [classSelected, setClassSelected] = useState();
  const [createStudent] = useMutation(CREATE_STUDENT);
  const [updateStudent] = useMutation(UPDATE_STUDENT);
  const yupSync = converSchemaToAntdRule(schemaValidate);
  const { data } = useQuery(GET_MAJOR_LIST, {
    variables: {
      name: "",
      skip: null,
      take: null,
    },
  });
  const { data: dataStudent } = useQuery(GET_STUDENT, {
    variables: {
      getStudentId: currentId,
    },
    skip: currentId === null || currentId === undefined,
    onCompleted: () => {
      setLoading(false);
    },
  });
  useEffect(() => {
    if (data) {
      const items = data?.getAllMajors?.map((item) => {
        return {
          id: item.id,
          name: item.name,
        };
      });
      setDataMajors(items);
    }
  }, [data]);
  const onSubmit = async (values) => {
    setLoading(true);
    await createStudent({
      variables: {
        createStudentInput: {
          studentId: values.id,
          name: values.name,
          gender: values.gender,
          email: values.email,
          phoneNumber: values.phone,
          address: values.address,
          classId: values.classId,
          majorId: values.major,
          createdAt: moment().format(DATE_TIME_FORMAT),
          updatedAt: moment().format(DATE_TIME_FORMAT),
        },
      },
      onCompleted: () => {
        setLoading(false);
        message.success("Thêm sinh viên thành công!");
        form.resetFields();
        onClose();
      },
      onError: (error) => {
        setLoading(false);
        message.error(`${error.message}`);
      },
      refetchQueries: refetchQueries(),
    });
  };
  const onUpdate = async (values) => {
    setLoading(true);
    await updateStudent({
      variables: {
        updateStudentId: currentId,
        updateStudentInput: {
          studentId: values.id,
          name: values.name,
          gender: values.gender,
          email: values.email,
          phoneNumber: values.phone,
          address: values.address,
          classId: values.classId,
          majorId: values.major,
          updatedAt: moment().format(DATE_TIME_FORMAT),
        },
      },
      onCompleted: () => {
        setLoading(false);
        message.success("Chỉnh sửa sinh viên thành công!");
        onClose();
      },
      onError: (error) => {
        setLoading(false);
        message.error(`${error.message}`);
      },
    });
  };
  useEffect(() => {
    if (dataStudent) {
      form.setFieldsValue({
        id: dataStudent?.getStudent?.studentId,
        name: dataStudent?.getStudent?.name,
        gender: dataStudent?.getStudent?.gender,
        email: dataStudent?.getStudent?.email,
        phone: dataStudent?.getStudent?.phoneNumber,
        address: dataStudent?.getStudent?.address,
        major: dataStudent?.getStudent?.major?.id,
        class: dataStudent?.getStudent?.class?.name,
        classId: dataStudent?.getStudent?.class?.id,
      });
      setClassSelected(dataStudent?.getStudent?.class?.id);
    }
  }, [dataStudent, form]);
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
        <Row className="mt-5 max-h-[400px] scrollbar -mx-[24px]">
          <Form
            layout="vertical"
            autoComplete="off"
            form={form}
            className="w-full px-[24px]"
            onFinish={isEdit ? onUpdate : onSubmit}
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
              <Input
                placeholder="CLASS001"
                className="rounded-[10px] h-[48px]"
              />
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
              <Input
                placeholder="Student"
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
                placeholder="student@gmail.com"
                className="rounded-[10px] h-[48px]"
              />
            </Form.Item>
            <Form.Item
              name="phone"
              className="w-full"
              label={<Row>Số điện thoại</Row>}
              required={false}
              rules={[yupSync]}
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
            <Form.Item
              name="major"
              className="w-full"
              label={
                <Row>
                  Chuyên ngành
                  <Row className="text-red-500 ml-1">*</Row>
                </Row>
              }
              required={false}
              rules={[yupSync]}
            >
              <Select
                className="customSelect"
                placeholder="Công nghệ thông tin"
                popupClassName="!rounded-[10px]"
              >
                {dataMajors.map((item) => (
                  <Select.Option
                    value={item.id}
                    className="!py-2.5 m-2 !rounded-[10px]"
                    key={item.id}
                  >
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="class"
              className="w-full"
              label={<Row>Lớp</Row>}
              required={false}
            >
              <Input
                placeholder="Class A"
                readOnly
                className="rounded-[10px] h-[48px]"
                onClick={() => setIsSelectClass(true)}
              />
            </Form.Item>
            <Form.Item name="classId" className="hidden" required={false}>
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
        </Row>
      </Modal>
      <FormSelectClass
        isOpen={isSelectClass}
        onClose={() => setIsSelectClass(false)}
        formCreateStudent={form}
        classList={listClass}
        studentClass={classSelected}
      />
    </>
  );
};

export default FormCreateStudent;
