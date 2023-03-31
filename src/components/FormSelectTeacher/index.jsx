import { useState, useEffect } from "react";
import { Modal, Row, Form, Input, Button } from "antd";
import { GrFormClose } from "react-icons/gr";

const FormSelectTeacher = ({
  isOpen,
  onClose,
  teacherList,
  formCreateClass,
  userSelected,
}) => {
  const [form] = Form.useForm();
  const [listItems, setListItems] = useState();
  const [teacherSelected, setTeacherSelected] = useState();
  const onSubmit = () => {
    const teacher = teacherList.find((item) => item?.id === teacherSelected);
    formCreateClass?.setFieldValue("teacher", teacher?.name);
    formCreateClass?.setFieldValue("teacherId", teacher?.id);
    onClose();
  };
  const onSearch = (values) => {
    const items = teacherList.filter((item) =>
      item.name.match(values.searchInput)
    );
    setListItems(items);
  };
  useEffect(() => {
    if (teacherList && !formCreateClass.getFieldsValue().searchInput)
      setListItems(teacherList);
  }, [teacherList, formCreateClass]);
  useEffect(() => {
    if (userSelected) setTeacherSelected(userSelected);
  }, [userSelected]);
  return (
    <Modal
      title={<Row className="text-xl">Chọn cố vấn học tập</Row>}
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
        onFinish={onSearch}
      >
        <Form.Item
          name="searchInput"
          className="w-full"
          required={false}
          onFinish={onSearch}
        >
          <Input
            placeholder="Tìm kiếm..."
            className="rounded-[10px] h-[48px]"
          />
        </Form.Item>
      </Form>
      <Row className="max-h-[350px] scrollbar -mx-[24px]">
        <Row className="px-[24px] !grid w-full">
          {listItems?.map((item) => (
            <Row
              className={`${
                teacherSelected === item.id && "bg-[#A4D3EE]/30"
              } px-2 py-2.5 hover:bg-[#A4D3EE]/30 cursor-pointer rounded-[10px] my-1 !grid-cols-12`}
              key={item.id}
              onClick={() => setTeacherSelected(item.id)}
            >
              {item.name}
            </Row>
          ))}
        </Row>
      </Row>
      <Button
        onClick={onSubmit}
        className="w-full mt-5 rounded-[10px] bg-[#4F94CD] h-[55px] !text-[16px] !text-white font-bold !border-none !outline-0 shadow-lg hover:opacity-90"
      >
        Lưu
      </Button>
    </Modal>
  );
};

export default FormSelectTeacher;
