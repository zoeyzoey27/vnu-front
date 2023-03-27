import { Modal, Row } from "antd";
import { GrFormClose } from "react-icons/gr";

const DetailClass = ({ isOpen, onClose }) => {
  const listTeacher = [
    {
      id: "1",
      name: "Student 1",
    },
    {
      id: "2",
      name: "Student 2",
    },
    {
      id: "3",
      name: "Student 3",
    },
    {
      id: "4",
      name: "Student 4",
    },
    {
      id: "5",
      name: "Student 5",
    },
  ];
  return (
    <Modal
      title={<Row className="text-xl">Class A</Row>}
      open={isOpen}
      footer={null}
      centered
      closeIcon={<GrFormClose onClick={onClose} className="text-3xl" />}
    >
      <Row className="max-h-[350px] scrollbar -mx-[24px]">
        <Row className="px-[24px] !grid w-full">
          <Row className="px-2 py-2.5 !grid-cols-12 flex justify-between opacity-60">
            <Row className="w-[30%]">Mã sinh viên</Row>
            <Row className="w-[70%] flex justify-end">Tên sinh viên</Row>
          </Row>
          {listTeacher.map((item) => (
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
    </Modal>
  );
};

export default DetailClass;