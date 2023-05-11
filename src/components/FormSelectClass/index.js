import { useState, useEffect } from "react";
import { Modal, Row, Form, Input, Button } from "antd";
import { GrFormClose } from "react-icons/gr";

const FormSelectClass = ({
  isOpen,
  onClose,
  classList,
  formCreateStudent,
  studentClass,
}) => {
  const [form] = Form.useForm();
  const [listItems, setListItems] = useState([]);
  const [classSelected, setClassSelected] = useState();
  const onSubmit = () => {
    const classItem = classList.find((item) => item?.id === classSelected);
    formCreateStudent?.setFieldValue("class", classItem?.name);
    formCreateStudent?.setFieldValue("classId", classItem?.id);
    setClassSelected();
    onClose();
  };
  const onSearch = (values) => {
    const items = classList.filter((item) =>
      item?.name?.toLowerCase().match(values?.searchInput?.toLowerCase())
    );
    setListItems(items);
  };
  useEffect(() => {
    if (classList && !formCreateStudent.getFieldsValue().searchInput)
      setListItems(classList);
  }, [classList, formCreateStudent]);
  useEffect(() => {
    if (studentClass) {
      setClassSelected(studentClass);
    }
  }, [studentClass]);
  return (
    <Modal
      title={<Row className="text-xl">Chọn lớp</Row>}
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
                classSelected === item.id && "bg-[#A4D3EE]/30"
              } px-2 py-2.5 hover:bg-[#A4D3EE]/30 cursor-pointer rounded-[10px] my-1 !grid-cols-12`}
              key={item.id}
              onClick={() => setClassSelected(item.id)}
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

export default FormSelectClass;
