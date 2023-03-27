import { useState } from "react";
import {
  Row,
  Form,
  Tooltip,
  Button,
  Input,
  Dropdown,
  Table,
  Pagination,
} from "antd";
import { FiSearch, FiEdit } from "react-icons/fi";
import { MdDelete, MdAddCircle } from "react-icons/md";
import { CiCircleMore } from "react-icons/ci";
import { BiDetail } from "react-icons/bi";
import ModalConfirm from "../../components/ModalConfirm";
import FormCreateClass from "../../components/FormCreateClass";
import DetailClass from "../../components/DetailClass";

const ClassList = () => {
  const [form] = Form.useForm();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isDeleteMulti, setIsDeleteMulti] = useState(false);
  const [isDeleteClass, setIsDeleteClass] = useState(false);
  const [isCreateClass, setIsCreateClass] = useState(false);
  const [isEditClass, setIsEditClass] = useState(false);
  const [isOpenDetail, setIsOpenDetail] = useState(false);
  const columns = [
    {
      title: "Mã lớp",
      dataIndex: "id",
    },
    {
      title: "Tên lớp",
      dataIndex: "name",
    },
    {
      title: "Cố vấn học tập",
      dataIndex: "teacher",
    },
    {
      title: "Tổng số sinh viên",
      dataIndex: "students",
    },
    {
      title: "",
      dataIndex: "menu",
      render: () => (
        <Dropdown
          placement="bottomRight"
          dropdownRender={() => (
            <Row className="flex flex-col bg-white rounded-[15px] shadow-lg w-[150px] p-2">
              <Row
                onClick={() => setIsOpenDetail(true)}
                className="flex items-center p-2 cursor-pointer rounded-[15px] hover:bg-gray-400/20"
              >
                <Row className="p-2 bg-black text-white text-[16px] rounded-full mr-2">
                  <BiDetail />
                </Row>
                Xem chi tiết
              </Row>
              <Row
                onClick={() => setIsEditClass(true)}
                className="flex items-center p-2 cursor-pointer rounded-[15px] hover:bg-gray-400/20"
              >
                <Row className="p-2 bg-black text-white text-[16px] rounded-full mr-2">
                  <FiEdit />
                </Row>
                Chỉnh sửa
              </Row>
              <Row
                onClick={() => setIsDeleteClass(true)}
                className="flex items-center p-2 cursor-pointer rounded-[15px] hover:bg-gray-400/20"
              >
                <Row className="p-2 bg-red-500 text-white text-[16px] rounded-full mr-2">
                  <MdDelete />
                </Row>
                Xóa
              </Row>
            </Row>
          )}
        >
          <CiCircleMore className="text-[25px] cursor-pointer text-[#015198]" />
        </Dropdown>
      ),
      width: "20px",
    },
  ];
  const data = [
    {
      key: "1",
      id: "1",
      name: "Class A",
      teacher: "Teacher Teacher",
      students: 30,
    },
    {
      key: "2",
      id: "2",
      name: "Class B",
      teacher: "Teacher Teacher",
      students: 30,
    },
    {
      key: "3",
      id: "3",
      name: "Class C",
      teacher: "Teacher Teacher",
      students: 30,
    },
  ];
  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  return (
    <Row className="flex flex-col w-full h-full bg-white p-5 !rounded-[15px] shadow-lg relative">
      <Row className="text-[20px] font-bold">Quản lý lớp</Row>
      <Row className="flex items-center justify-end my-5">
        <Form form={form} className="mr-5">
          <Form.Item className="!my-0">
            <Input
              name="searchInput"
              placeholder="Tìm kiếm..."
              className="!rounded-[30px]"
              suffix={<FiSearch className="text-[#d9d9d9] text-[16px]" />}
            />
          </Form.Item>
        </Form>
        <Tooltip placement="top" title="Xóa">
          <Button
            shape="circle"
            size="large"
            onClick={() => setIsDeleteMulti(true)}
            icon={<MdDelete className="!text-white text-[20px]" />}
            className="!border-0 !outline-0 bg-red-500 shadow-lg hover:opacity-80 flex items-center justify-center"
          />
        </Tooltip>
        <Tooltip placement="top" title="Thêm mới">
          <Button
            shape="circle"
            size="large"
            onClick={() => setIsCreateClass(true)}
            icon={<MdAddCircle className="!text-white text-[20px]" />}
            className="!border-0 !outline-0 bg-black shadow-lg hover:opacity-80 ml-2 flex items-center justify-center"
          />
        </Tooltip>
      </Row>
      <Table
        rowKey="id"
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        pagination={false}
        scroll={{ x: "max-content" }}
      />
      <Pagination
        current={1}
        pageSize={10}
        total={4}
        onChange={() => {}}
        className="mt-10 w-full flex justify-end absolute bottom-5 right-5"
      />
      <ModalConfirm
        isOpen={isDeleteMulti}
        setIsOpen={setIsDeleteMulti}
        message="Bạn có chắc chắn muốn xóa dữ liệu không?"
      />
      <ModalConfirm
        isOpen={isDeleteClass}
        setIsOpen={setIsDeleteClass}
        message="Bạn có chắc chắn muốn xóa lớp này không?"
      />
      <FormCreateClass
        isOpen={isCreateClass}
        onClose={() => setIsCreateClass(false)}
      />
      <FormCreateClass
        isOpen={isEditClass}
        onClose={() => setIsEditClass(false)}
        isEdit
      />
      <DetailClass
        isOpen={isOpenDetail}
        onClose={() => setIsOpenDetail(false)}
      />
    </Row>
  );
};

export default ClassList;
