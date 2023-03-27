import { Modal, Row, Button } from "antd";
import { GrFormClose } from "react-icons/gr";

const ModalConfirm = ({ isOpen, setIsOpen, message }) => {
  return (
    <Modal
      title={<Row className="text-xl">Thông báo</Row>}
      open={isOpen}
      footer={null}
      centered
      closeIcon={
        <GrFormClose onClick={() => setIsOpen(false)} className="text-3xl" />
      }
    >
      <Row className="my-5 text-[16px]">{message}</Row>
      <Row className="flex items-center justify-end">
        <Button
          size="large"
          onClick={() => setIsOpen(false)}
          className="mr-2.5 bg-[#E0E0E0] !rounded-[15px] w-[100px] !text-black !border-0 !outline-0 hover:opacity-90"
        >
          Hủy
        </Button>
        <Button
          size="large"
          onClick={() => setIsOpen(false)}
          className="!rounded-[15px] bg-[#015198] w-[100px] !text-white !border-0 !outline-0 hover:opacity-90"
        >
          Xác nhận
        </Button>
      </Row>
    </Modal>
  );
};

export default ModalConfirm;
