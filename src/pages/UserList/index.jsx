import { useState, useEffect } from "react";
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
  message,
} from "antd";
import { ACTIVE, SUSPEND, roles } from "../../constants";
import "./style.css";
import { FiSearch, FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { RiUserAddFill } from "react-icons/ri";
import { CiCircleMore } from "react-icons/ci";
import { TbLock, TbLockOpen } from "react-icons/tb";
import ModalConfirm from "../../components/ModalConfirm";
import FormAddUser from "../../components/FormAddUser";
import FormEditUser from "../../components/FormEditUser";
import { useMutation, useQuery } from "@apollo/client";
import {
  DELETE_USER,
  DELETE_USERS,
  GET_USER_LIST,
  UPDATE_USER_STATUS,
} from "./graphql";
import { PAGE_DEFAULT, PAGE_SIZE_DEFAULT, SKIP_DEFAULT } from "../../constants";
import { useOutletContext } from "react-router-dom";

const UserList = () => {
  const [form] = Form.useForm();
  const [updateUserStatus] = useMutation(UPDATE_USER_STATUS);
  const [deleteUser] = useMutation(DELETE_USER);
  const [deleteUsers] = useMutation(DELETE_USERS);
  const [setLoading, role] = useOutletContext();
  const [dataUsers, setDataUsers] = useState([]);
  const [isDeleteMulti, setIsDeleteMulti] = useState(false);
  const [isAddUser, setIsAddUser] = useState(false);
  const [isDeleteUser, setIsDeleteUser] = useState(false);
  const [isSuspendUser, setIsSuspendUser] = useState(false);
  const [isActiveUser, setIsActiveUser] = useState(false);
  const [isEditUser, setIsEditUser] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [roleSelected, setRoleSelected] = useState(roles[0].id);
  const [currentId, setCurrentId] = useState();
  const [userStatus, setUserStatus] = useState();
  const [searchCondition, setSearchCondition] = useState({
    items: {},
    pageIndex: PAGE_DEFAULT,
    pageSize: PAGE_SIZE_DEFAULT,
  });
  const { data: dataInit } = useQuery(GET_USER_LIST, {
    variables: {
      userInput: searchCondition.items,
      skip: null,
      take: null,
    },
  });
  const { data } = useQuery(GET_USER_LIST, {
    variables: {
      userInput: searchCondition.items,
      skip: searchCondition?.pageSize
        ? searchCondition.pageSize * (searchCondition.pageIndex - 1)
        : SKIP_DEFAULT,
      take: searchCondition?.pageSize || PAGE_SIZE_DEFAULT,
    },
    onCompleted: () => {
      setLoading(false);
    },
    onError: (error) => {
      message.error(`${error.message}`);
      setLoading(false);
    },
  });
  const onChangeSelect = (value) => {
    setLoading(true);
    setRoleSelected(value);
    setSearchCondition((pre) => ({
      ...pre,
      items: {
        fullName: form.getFieldsValue().searchInput,
        role: value !== roles[0].id ? value : null,
        email: null,
      },
      skip: SKIP_DEFAULT,
    }));
  };
  const onDelete = async () => {
    setLoading(true);
    await deleteUser({
      variables: {
        deleteUserId: currentId,
      },
      onCompleted: () => {
        setLoading(false);
        message.success("Xóa dữ liệu thành công!");
        setIsDeleteUser(false);
      },
      onError: (err) => {
        setLoading(false);
        message.error(`${err.message}`);
        setIsDeleteUser(false);
      },
      refetchQueries: refetchQueries(),
    });
  };
  const onDeleteMulti = async () => {
    if (selectedRowKeys.length > 0) {
      setLoading(true);
      await deleteUsers({
        variables: {
          ids: selectedRowKeys,
        },
        onCompleted: () => {
          setLoading(false);
          message.success("Xóa dữ liệu thành công!");
          setIsDeleteMulti(false);
        },
        onError: (err) => {
          setLoading(false);
          message.error(`${err.message}`);
          setIsDeleteMulti(false);
        },
        refetchQueries: refetchQueries(),
      });
    } else message.error("Vui lòng chọn người dùng cần xóa!");
  };
  const handleUpdateStatus = async () => {
    setLoading(true);
    await updateUserStatus({
      variables: {
        updateUserStatusId: currentId,
        status: userStatus === ACTIVE ? SUSPEND : ACTIVE,
      },
      onCompleted: () => {
        setLoading(false);
        message.success("Chỉnh sửa thông tin người dùng thành công!");
        if (userStatus === ACTIVE) setIsSuspendUser(false);
        else setIsActiveUser(false);
      },
      onError: (error) => {
        setLoading(false);
        message.error(`${error.message}`);
      },
    });
  };
  const onSearch = (values) => {
    setLoading(true);
    setSearchCondition((pre) => ({
      ...pre,
      items: {
        fullName: values.searchInput,
        role: roleSelected !== roles[0].id ? roleSelected : null,
        email: null,
      },
      pageIndex: PAGE_DEFAULT,
    }));
  };
  const refetchQueries = () => {
    return [
      {
        query: GET_USER_LIST,
        variables: {
          userInput: searchCondition.items,
          skip: searchCondition?.pageSize
            ? searchCondition.pageSize * (searchCondition.pageIndex - 1)
            : SKIP_DEFAULT,
          take: searchCondition?.pageSize || PAGE_SIZE_DEFAULT,
        },
      },
      {
        query: GET_USER_LIST,
        variables: {
          userInput: searchCondition.items,
          skip: null,
          take: null,
        },
      },
    ];
  };
  const columns = [
    {
      title: "Họ tên",
      dataIndex: "name",
    },
    {
      title: "Quyền",
      dataIndex: "role",
      render: (role) => (
        <>
          {roles.map((item) =>
            item.id === role ? <Row key={item.id}>{item.name}</Row> : null
          )}
        </>
      ),
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
      render: (status) => (
        <Row
          className={`${status === ACTIVE ? "text-green-500" : "text-red-500"}`}
        >
          {status === ACTIVE ? "Đã kích hoạt" : "Đang khóa"}
        </Row>
      ),
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
                onClick={(e) => {
                  if (role !== "Giảng viên") {
                    setLoading(true);
                    setCurrentId(record.id);
                    setIsEditUser(true);
                  } else e.stopPropagation();
                }}
                className={`flex items-center p-2 ${
                  role !== "Giảng viên"
                    ? "cursor-pointer hover:bg-gray-400/20"
                    : "text-[#ccc] cursor-default"
                } rounded-[15px]`}
              >
                <Row
                  className={`p-2 ${
                    role !== "Giảng viên" ? "bg-black" : "bg-[#ccc]"
                  } text-white text-[16px] rounded-full mr-2`}
                >
                  <FiEdit />
                </Row>
                Chỉnh sửa
              </Row>
              <Row
                onClick={(e) => {
                  if (role !== "Giảng viên") {
                    setCurrentId(record.id);
                    if (record.status === ACTIVE) setIsSuspendUser(true);
                    else setIsActiveUser(true);
                    setUserStatus(record.status);
                  } else e.stopPropagation();
                }}
                className={`flex items-center p-2 ${
                  role !== "Giảng viên"
                    ? "cursor-pointer hover:bg-gray-400/20"
                    : "text-[#ccc] cursor-default"
                } rounded-[15px]`}
              >
                <Row
                  className={`p-2 ${
                    role !== "Giảng viên" ? "bg-black" : "bg-[#ccc]"
                  } text-white text-[16px] rounded-full mr-2`}
                >
                  {record?.status !== "" ? <TbLock /> : <TbLockOpen />}
                </Row>
                {record?.status !== ACTIVE ? "Kích hoạt" : "Khóa"}
              </Row>
              <Row
                onClick={() => {
                  setCurrentId(record.id);
                  setIsDeleteUser(true);
                }}
                className={`flex items-center p-2 ${
                  role !== "Giảng viên"
                    ? "cursor-pointer hover:bg-gray-400/20"
                    : "text-[#ccc] cursor-default"
                } rounded-[15px]`}
              >
                <Row
                  className={`p-2 ${
                    role !== "Giảng viên" ? "bg-red-500" : "bg-[#ccc]"
                  } text-white text-[16px] rounded-full mr-2`}
                >
                  <MdDelete />
                </Row>
                Xóa
              </Row>
            </Row>
          )}
        >
          <CiCircleMore
            className={`text-[25px] text-[#015198] cursor-pointer`}
          />
        </Dropdown>
      ),
      width: "20px",
    },
  ];
  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const onChangePagination = (page, limit) => {
    setLoading(true);
    setSearchCondition({
      ...searchCondition,
      pageIndex: page,
      pageSize: limit,
    });
  };
  useEffect(() => {
    if (data) {
      const items = data?.getAllUsers?.map((item) => {
        return {
          id: item?.id,
          name: item?.fullName,
          email: item?.email,
          classes: item?.userClass?.name,
          role: item?.role,
          status: item?.status,
        };
      });
      setDataUsers(items);
    }
  }, [data]);
  useEffect(() => {
    setLoading(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Row className="flex flex-col w-full h-full bg-white p-5 !rounded-[15px] shadow-lg relative">
      <Row className="text-[20px] font-bold">Quản lý người dùng</Row>
      <Row className="my-5 flex items-center justify-between">
        <Select
          value={roleSelected}
          className="w-[150px] selectRole"
          onChange={(value) => onChangeSelect(value)}
        >
          {roles.map((role) => (
            <Select.Option
              className={`${role?.id === "SUPER_ADMIN" && "!hidden"}`}
              key={role?.id}
              value={role?.id}
            >
              {role?.name}
            </Select.Option>
          ))}
        </Select>
        <Row className="flex items-center">
          <Form form={form} onFinish={onSearch} className="mr-5">
            <Form.Item className="!my-0" name="searchInput">
              <Input
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
              onClick={(e) =>
                role !== "Giảng viên"
                  ? setIsDeleteMulti(true)
                  : e.stopPropagation()
              }
              icon={<MdDelete className="!text-white text-[20px]" />}
              className={`!border-0 !outline-0 ${
                role !== "Giảng viên"
                  ? "bg-red-500 hover:opacity-80"
                  : "bg-[#ccc] !cursor-default"
              } shadow-lg flex items-center justify-center`}
            />
          </Tooltip>
          <Tooltip placement="top" title="Thêm mới">
            <Button
              shape="circle"
              size="large"
              onClick={(e) =>
                role !== "Giảng viên" ? setIsAddUser(true) : e.stopPropagation()
              }
              icon={<RiUserAddFill className="!text-white text-[20px]" />}
              className={`!border-0 !outline-0 ${
                role !== "Giảng viên"
                  ? "bg-red-500 hover:opacity-80"
                  : "bg-[#ccc] !cursor-default"
              } shadow-lg ml-2 flex items-center justify-center`}
            />
          </Tooltip>
        </Row>
      </Row>
      <Table
        rowKey="id"
        rowSelection={rowSelection}
        columns={columns}
        dataSource={dataUsers}
        pagination={false}
        scroll={{ x: "max-content" }}
      />
      <Pagination
        current={searchCondition?.pageIndex}
        pageSize={searchCondition?.pageSize}
        total={dataInit?.getAllUsers?.length}
        onChange={onChangePagination}
        className="mt-10 w-full flex justify-end absolute bottom-5 right-5"
      />
      <ModalConfirm
        isOpen={isDeleteMulti}
        setIsOpen={setIsDeleteMulti}
        message="Bạn có chắc chắn muốn xóa dữ liệu không?"
        onSubmit={onDeleteMulti}
      />
      <ModalConfirm
        isOpen={isDeleteUser}
        setIsOpen={setIsDeleteUser}
        message="Bạn có chắc chắn muốn xóa người dùng này không?"
        onSubmit={onDelete}
      />
      <ModalConfirm
        isOpen={isSuspendUser}
        setIsOpen={setIsSuspendUser}
        message="Bạn có chắc chắn muốn hạn chế người dùng này không?"
        onSubmit={handleUpdateStatus}
      />
      <ModalConfirm
        isOpen={isActiveUser}
        setIsOpen={setIsActiveUser}
        message="Bạn có chắc chắn muốn kích hoạt người dùng này không?"
        onSubmit={handleUpdateStatus}
      />
      <FormAddUser
        isOpen={isAddUser}
        onClose={() => setIsAddUser(false)}
        refetchQueries={refetchQueries}
        setLoading={setLoading}
      />
      <FormEditUser
        isOpen={isEditUser}
        setIsOpen={setIsEditUser}
        currentId={currentId}
        setLoading={setLoading}
      />
    </Row>
  );
};
export default UserList;
