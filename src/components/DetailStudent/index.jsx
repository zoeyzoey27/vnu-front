import { Modal, Row } from "antd";
import { GrFormClose } from "react-icons/gr";

const DetailStudent = ({ isOpen, onClose }) => {
  return (
    <Modal
      title={<Row className="text-xl">Thông tin chi tiết</Row>}
      open={isOpen}
      footer={null}
      centered
      closeIcon={<GrFormClose onClick={onClose} className="text-3xl" />}
    >
      <Row className="max-h-[400px] scrollbar -mx-[24px]">
        <Row className="px-[24px] mt-5 flex flex-col w-full">
          <Row className="px-2 py-2.5 my-2 flex flex-col rounded-lg bg-[#F2F2F2]">
            <Row className="font-bold">Mã sinh viên</Row>
            <Row>Tên sinh viên</Row>
          </Row>
          <Row className="px-2 py-2.5 my-2 flex flex-col rounded-lg bg-[#F2F2F2]">
            <Row className="font-bold">Tên sinh viên</Row>
            <Row>Tên sinh viên</Row>
          </Row>
          <Row className="px-2 py-2.5 my-2 flex flex-col rounded-lg bg-[#F2F2F2]">
            <Row className="font-bold">Giới tính</Row>
            <Row>Tên sinh viên</Row>
          </Row>
          <Row className="px-2 py-2.5 my-2 flex flex-col rounded-lg bg-[#F2F2F2]">
            <Row className="font-bold">Lớp</Row>
            <Row>Tên sinh viên</Row>
          </Row>
          <Row className="px-2 py-2.5 my-2 flex flex-col rounded-lg bg-[#F2F2F2]">
            <Row className="font-bold">Số điện thoại</Row>
            <Row>Tên sinh viên</Row>
          </Row>
          <Row className="px-2 py-2.5 my-2 flex flex-col rounded-lg bg-[#F2F2F2]">
            <Row className="font-bold">Địa chỉ</Row>
            <Row>Tên sinh viên</Row>
          </Row>
        </Row>
      </Row>
    </Modal>
  );
};

export default DetailStudent;