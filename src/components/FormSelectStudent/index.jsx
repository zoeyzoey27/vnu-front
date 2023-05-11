import { useState, useEffect } from "react";
import { Modal, Row, Form, Input, Button } from "antd";
import { GrFormClose } from "react-icons/gr";

const FormSelectStudent = ({
  isOpen,
  onClose,
  studentList,
  formCreateClass,
  studentListSelected,
}) => {
  const [form] = Form.useForm();
  const [listItems, setListItems] = useState();
  const [studentSelected, setStudentSelected] = useState([]);
  const onSubmit = () => {
    if (studentSelected.length > 0) {
      formCreateClass?.setFieldValue("students", studentSelected?.length);
      formCreateClass?.setFieldValue("studentId", studentSelected);
    }
    onClose();
  };
  const onSearch = (values) => {
    const items = studentList.filter((item) =>
      item?.name?.toLowerCase().match(values?.searchInput?.toLowerCase())
    );
    setListItems(items);
  };
  const onClickItem = (value) => {
    const index = studentSelected.findIndex(
      (item) => item.toString() === value.toString()
    );
    if (index >= 0) {
      studentSelected.splice(index, 1);
      setStudentSelected([...studentSelected]);
    } else {
      studentSelected.push(value);
      setStudentSelected([...studentSelected]);
    }
  };
  useEffect(() => {
    if (studentList && !formCreateClass.getFieldsValue().searchInput)
      setListItems(studentList);
  }, [studentList, formCreateClass]);
  useEffect(() => {
    if (studentListSelected) setStudentSelected(studentListSelected);
  }, [studentListSelected]);
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
        onFinish={onSearch}
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
          {listItems?.map((item) => (
            <Row
              className={`${
                studentSelected.includes(item.id) && "bg-[#A4D3EE]/30"
              } px-2 py-2.5 hover:bg-[#A4D3EE]/30 cursor-pointer rounded-[10px] my-1 !grid-cols-12 flex justify-between`}
              key={item.id}
              onClick={() => onClickItem(item.id)}
            >
              <Row className="w-[30%]">{item.studentId}</Row>
              <Row className="w-[70%] flex justify-end">{item.name}</Row>
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

export default FormSelectStudent;
