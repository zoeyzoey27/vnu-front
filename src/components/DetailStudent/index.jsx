import { Modal, Row } from "antd";
import { GrFormClose } from "react-icons/gr";
import { useQuery } from "@apollo/client";
import { GET_STUDENT } from "./graphql";

const DetailStudent = ({ isOpen, onClose, studentId, setLoading }) => {
  const { data } = useQuery(GET_STUDENT, {
    variables: {
      getStudentId: studentId,
    },
    skip: studentId === null,
    onCompleted: () => {
      setLoading(false);
    },
  });
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
            <Row>{data?.getStudent?.studentId}</Row>
          </Row>
          <Row className="px-2 py-2.5 my-2 flex flex-col rounded-lg bg-[#F2F2F2]">
            <Row className="font-bold">Tên sinh viên</Row>
            <Row>{data?.getStudent?.name}</Row>
          </Row>
          <Row className="px-2 py-2.5 my-2 flex flex-col rounded-lg bg-[#F2F2F2]">
            <Row className="font-bold">Giới tính</Row>
            <Row>{data?.getStudent?.gender !== "MALE" ? "Nữ" : "Nam"}</Row>
          </Row>
          <Row className="px-2 py-2.5 my-2 flex flex-col rounded-lg bg-[#F2F2F2]">
            <Row className="font-bold">Lớp</Row>
            <Row>{data?.getStudent?.class?.name}</Row>
          </Row>
          <Row className="px-2 py-2.5 my-2 flex flex-col rounded-lg bg-[#F2F2F2]">
            <Row className="font-bold">Chuyên ngành</Row>
            <Row>{data?.getStudent?.major?.name}</Row>
          </Row>
          <Row className="px-2 py-2.5 my-2 flex flex-col rounded-lg bg-[#F2F2F2]">
            <Row className="font-bold">Email</Row>
            <Row>{data?.getStudent?.email}</Row>
          </Row>
          <Row className="px-2 py-2.5 my-2 flex flex-col rounded-lg bg-[#F2F2F2]">
            <Row className="font-bold">Số điện thoại</Row>
            <Row>{data?.getStudent?.phone || "Không"}</Row>
          </Row>
          <Row className="px-2 py-2.5 my-2 flex flex-col rounded-lg bg-[#F2F2F2]">
            <Row className="font-bold">Địa chỉ</Row>
            <Row>{data?.getStudent?.address || "Không"}</Row>
          </Row>
        </Row>
      </Row>
    </Modal>
  );
};

export default DetailStudent;