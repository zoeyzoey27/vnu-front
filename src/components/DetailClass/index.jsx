import { useQuery } from "@apollo/client";
import { Modal, Row } from "antd";
import { useEffect, useState } from "react";
import { GrFormClose } from "react-icons/gr";
import { GET_CLASS } from "./graphql";

const DetailClass = ({ isOpen, onClose, currentId, setLoading }) => {
  const [listStudent, setListStudent] = useState([]);
  const { data } = useQuery(GET_CLASS, {
    variables: {
      getClassId: currentId,
    },
    skip: currentId === null || currentId === undefined,
    onCompleted: () => {
      setLoading(false);
    },
  });
  useEffect(() => {
    if (data) {
      const items = data?.getClass?.students?.map((item) => {
        return {
          id: item?.id,
          studentId: item?.studentId,
          name: item?.name,
        };
      });
      setListStudent(items);
    }
  }, [data]);
  return (
    <Modal
      title={<Row className="text-xl">{data?.getClass?.name}</Row>}
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
          {listStudent.map((item) => (
            <Row
              className="px-2 py-2.5 hover:bg-[#A4D3EE]/30 cursor-pointer rounded-[10px] my-1 !grid-cols-12 flex justify-between"
              key={item.id}
            >
              <Row className="w-[30%]">{item.studentId}</Row>
              <Row className="w-[70%] flex justify-end">{item.name}</Row>
            </Row>
          ))}
        </Row>
      </Row>
    </Modal>
  );
};

export default DetailClass;