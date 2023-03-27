import { useState } from "react";
import {
  Row,
  Select,
  Form,
  Input,
  Tooltip,
  Table,
  Pagination,
  Dropdown,
  Button,
} from "antd";
import { roles } from "../../constants";
import "./style.css";
import { FiSearch, FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { RiUserAddFill } from "react-icons/ri";
import { CiCircleMore } from "react-icons/ci";
import { TbLock, TbLockOpen } from "react-icons/tb";
import ModalConfirm from "../../components/ModalConfirm";
import FormAddUser from "../../components/FormAddUser";
import FormEditUser from "../../components/FormEditUser";

const UserList = () => {
  const [form] = Form.useForm();
  const [isDeleteMulti, setIsDeleteMulti] = useState(false);
  const [isAddUser, setIsAddUser] = useState(false);
  const [isDeleteUser, setIsDeleteUser] = useState(false);
  const [isSuspendUser, setIsSuspendUser] = useState(false);
  const [isActiveUser, setIsActiveUser] = useState(false);
  const [isEditUser, setIsEditUser] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const columns = [
    {
      title: "Họ tên",
      dataIndex: "name",
    },
    {
      title: "Quyền",
      dataIndex: "role",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Lớp quản lý",
      dataIndex: "classes",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
    },
    {
      title: "",
      dataIndex: "menu",
      render: (_, record) => (
        <Dropdown
          placement="bottomRight"
          dropdownRender={() => (
            <Row className="flex flex-col bg-white rounded-[15px] shadow-lg w-[150px] p-2">
              <Row
                onClick={() => setIsEditUser(true)}
                className="flex items-center p-2 cursor-pointer rounded-[15px] hover:bg-gray-400/20"
              >
                <Row className="p-2 bg-black text-white text-[16px] rounded-full mr-2">
                  <FiEdit />
                </Row>
                Chỉnh sửa
              </Row>
              <Row
                onClick={
                  record?.status !== "Khóa"
                    ? () => setIsSuspendUser(true)
                    : () => setIsActiveUser(true)
                }
                className="flex items-center p-2 cursor-pointer rounded-[15px] hover:bg-gray-400/20"
              >
                <Row className="p-2 bg-black text-white text-[16px] rounded-full mr-2">
                  {record?.status !== "" ? <TbLock /> : <TbLockOpen />}
                </Row>
                {record?.status !== "Khóa" ? "Khóa" : "Kích hoạt"}
              </Row>
              <Row
                onClick={() => setIsDeleteUser(true)}
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
      name: "John Brown",
      role: "Quản trị viên",
      email: "admin@gmail.com",
      classes: "",
      status: "Đã kích hoạt",
    },
    {
      key: "2",
      name: "Jim Green",
      role: "Quản trị viên",
      email: "admin@gmail.com",
      classes: "",
      status: "Đã kích hoạt",
    },
    {
      key: "3",
      name: "Joe Black",
      role: "Giảng viên",
      email: "teacher@gmail.com",
      classes: "Class A",
      status: "Đã kích hoạt",
    },
    {
      key: "4",
      name: "Disabled User",
      role: "Giảng viên",
      email: "teacher@gmail.com",
      classes: "",
      status: "Khóa",
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
      <Row className="text-[20px] font-bold">Quản lý người dùng</Row>
      <Row className="my-5 flex items-center justify-between">
        <Select defaultValue="ALL" className="w-[150px] selectRole">
          {roles.map((role) => (
            <Select.Option
              className={`${role?.id === "SUPER_ADMIN" && "!hidden"}`}
              key={role?.id}
            >
              {role?.name}
            </Select.Option>
          ))}
        </Select>
        <Row className="flex items-center">
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
              onClick={() => setIsAddUser(true)}
              icon={<RiUserAddFill className="!text-white text-[20px]" />}
              className="!border-0 !outline-0 bg-black shadow-lg hover:opacity-80 ml-2 flex items-center justify-center"
            />
          </Tooltip>
        </Row>
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
        isOpen={isDeleteUser}
        setIsOpen={setIsDeleteUser}
        message="Bạn có chắc chắn muốn xóa người dùng này không?"
      />
      <ModalConfirm
        isOpen={isSuspendUser}
        setIsOpen={setIsSuspendUser}
        message="Bạn có chắc chắn muốn hạn chế người dùng này không?"
      />
      <ModalConfirm
        isOpen={isActiveUser}
        setIsOpen={setIsActiveUser}
        message="Bạn có chắc chắn muốn kích hoạt người dùng này không?"
      />
      <FormAddUser isOpen={isAddUser} onClose={() => setIsAddUser(false)} />
      <FormEditUser isOpen={isEditUser} setIsOpen={setIsEditUser} />
    </Row>
  );
};
export default UserList;
