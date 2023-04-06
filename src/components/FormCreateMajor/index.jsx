import { useEffect } from "react";
import { Modal, Row, Form, Input, Button, message } from "antd";
import { GrFormClose } from "react-icons/gr";
import { schemaValidate } from "../../validations/CreateMajor";
import { converSchemaToAntdRule } from "../../validations";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_MAJOR, GET_MAJOR, UPDATE_MAJOR } from "./graphql";
import moment from "moment";
import { DATE_TIME_FORMAT } from "../../constants";

const FormCreateMajor = ({ isOpen, onClose, isEdit, currentId, setLoading, refetchQueries }) => {
  const [form] = Form.useForm();
  const [createMajor] = useMutation(CREATE_MAJOR);
  const [updateMajor] = useMutation(UPDATE_MAJOR);
  const yupSync = converSchemaToAntdRule(schemaValidate);
  const { data } = useQuery(GET_MAJOR, {
    variables: {
      getMajorId: currentId,
    },
    skip: currentId === null || currentId === undefined,
    onCompleted: () => {
      setLoading(false);
    },
  });
  const onSubmit = (values) => {
    setLoading(true);
    createMajor({
      variables: {
        majorInput: {
          majorId: values.id,
          name: values.name,
          graduationDiploma: values.graduationDiploma,
          time: parseFloat(values.time, 10),
          createdAt: moment().format(DATE_TIME_FORMAT),
          updatedAt: moment().format(DATE_TIME_FORMAT),
        },
      },
      onCompleted: () => {
        setLoading(false);
        message.success("Thêm chuyên ngành thành công!");
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
  const onUpdate = (values) => {
    setLoading(true);
    updateMajor({
      variables: {
        updateMajorId: currentId,
        updateMajorInput: {
          majorId: values.id,
          name: values.name,
          graduationDiploma: values.graduationDiploma,
          time: parseFloat(values.time, 10),
          updatedAt: moment().format(DATE_TIME_FORMAT),
        },
      },
      onCompleted: () => {
        setLoading(false);
        message.success("Chỉnh sửa chuyên ngành thành công!");
        form.resetFields();
        onClose();
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
        id: data?.getMajor?.majorId,
        name: data?.getMajor?.name,
        graduationDiploma: data?.getMajor?.graduationDiploma,
        time: data?.getMajor?.time,
      });
    }
  }, [data, form]);
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
        onFinish={isEdit ? onUpdate : onSubmit}
      >
        <Form.Item
          name="id"
          className="w-full"
          label={
            <Row>
              Mã chuyên ngành
              <Row className="text-red-500 ml-1">*</Row>
            </Row>
          }
          required={false}
          rules={[yupSync]}
        >
          <Input placeholder="CN001" className="rounded-[10px] h-[48px]" />
        </Form.Item>
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
