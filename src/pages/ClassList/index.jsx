import { useState, useEffect } from "react";
import {
  Row,
  Form,
  Tooltip,
  Button,
  Input,
  Dropdown,
  Table,
  Pagination,
  message,
} from "antd";
import { FiSearch, FiEdit } from "react-icons/fi";
import { MdDelete, MdAddCircle } from "react-icons/md";
import { CiCircleMore } from "react-icons/ci";
import { BiDetail } from "react-icons/bi";
import ModalConfirm from "../../components/ModalConfirm";
import FormCreateClass from "../../components/FormCreateClass";
import DetailClass from "../../components/DetailClass";
import { useMutation, useQuery } from "@apollo/client";
import { DELETE_CLASS, DELETE_CLASSES, GET_CLASS_LIST } from "./graphql";
import { PAGE_DEFAULT, PAGE_SIZE_DEFAULT, SKIP_DEFAULT } from "../../constants";
import { useOutletContext } from "react-router-dom";

const ClassList = () => {
  const [form] = Form.useForm();
  const [setLoading] = useOutletContext();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isDeleteMulti, setIsDeleteMulti] = useState(false);
  const [isDeleteClass, setIsDeleteClass] = useState(false);
  const [isCreateClass, setIsCreateClass] = useState(false);
  const [isEditClass, setIsEditClass] = useState(false);
  const [isOpenDetail, setIsOpenDetail] = useState(false);
  const [dataClasses, setDataClasses] = useState([]);
  const [currentId, setCurrentId] = useState();
  const [searchCondition, setSearchCondition] = useState({
    className: "",
    pageIndex: PAGE_DEFAULT,
    pageSize: PAGE_SIZE_DEFAULT,
  });
  const [deleteClass] = useMutation(DELETE_CLASS);
  const [deleteClasses] = useMutation(DELETE_CLASSES);
  const { data: dataInit } = useQuery(GET_CLASS_LIST, {
    variables: {
      className: searchCondition.className,
      skip: null,
      take: null,
    },
  });
  const { data } = useQuery(GET_CLASS_LIST, {
    variables: {
      className: searchCondition.className,
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
  const columns = [
    {
      title: "Mã lớp",
      dataIndex: "classId",
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
      render: (_, record) => (
        <Dropdown
          placement="bottomRight"
          dropdownRender={() => (
            <Row className="flex flex-col bg-white rounded-[15px] shadow-lg w-[150px] p-2">
              <Row
                onClick={() => {
                  setLoading(true);
                  setCurrentId(record.id);
                  setIsOpenDetail(true);
                }}
                className="flex items-center p-2 cursor-pointer rounded-[15px] hover:bg-gray-400/20"
              >
                <Row className="p-2 bg-black text-white text-[16px] rounded-full mr-2">
                  <BiDetail />
                </Row>
                Xem chi tiết
              </Row>
              <Row
                onClick={() => {
                  setCurrentId(record.id);
                  setIsEditClass(true);
                }}
                className="flex items-center p-2 cursor-pointer rounded-[15px] hover:bg-gray-400/20"
              >
                <Row className="p-2 bg-black text-white text-[16px] rounded-full mr-2">
                  <FiEdit />
                </Row>
                Chỉnh sửa
              </Row>
              <Row
                onClick={() => {
                  setCurrentId(record.id);
                  setIsDeleteClass(true);
                }}
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
  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const onSearch = (values) => {
    setLoading(true);
    setSearchCondition((pre) => ({
      ...pre,
      className: values.searchInput,
      pageIndex: PAGE_DEFAULT, 
    }));
  };
  const onChangePagination = (page, limit) => {
    setLoading(true);
    setSearchCondition({
      ...searchCondition,
      pageIndex: page,
      pageSize: limit,
    });
  };
  const onDelete = async () => {
    setLoading(true);
    await deleteClass({
      variables: {
        deleteClassId: currentId,
      },
      onCompleted: () => {
        setLoading(false);
        message.success("Xóa dữ liệu thành công!");
        setIsDeleteClass(false);
        window.location.reload();
      },
      onError: (err) => {
        setLoading(false);
        message.error(`${err.message}`);
        setIsDeleteClass(false);
      },
    });
  };
  const onDeleteMulti = async () => {
    if (selectedRowKeys.length > 0) {
      setLoading(true);
      await deleteClasses({
        variables: {
          ids: selectedRowKeys,
        },
        onCompleted: () => {
          setLoading(false);
          message.success("Xóa dữ liệu thành công!");
          setIsDeleteMulti(false);
          window.location.reload();
        },
        onError: (err) => {
          setLoading(false);
          message.error(`${err.message}`);
          setIsDeleteMulti(false);
        },
      });
    } else message.error("Vui lòng chọn lớp cần xóa!");
  };
  useEffect(() => {
    if (data) {
      const items = data?.getAllClasses?.map((item) => {
        return {
          id: item?.id,
          classId: item?.classId,
          name: item?.name,
          teacher: item?.teacher?.fullName,
          students: item?.students?.length || 0,
        };
      });
      setDataClasses(items);
    }
  }, [data]);
  useEffect(() => {
    setLoading(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Row className="flex flex-col w-full h-full bg-white p-5 !rounded-[15px] shadow-lg relative">
      <Row className="text-[20px] font-bold">Quản lý lớp</Row>
      <Row className="flex items-center justify-end my-5">
        <Form form={form} className="mr-5" onFinish={onSearch}>
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
        dataSource={dataClasses}
        pagination={false}
        scroll={{ x: "max-content" }}
      />
      <Pagination
        current={searchCondition?.pageIndex}
        pageSize={searchCondition?.pageSize}
        total={dataInit?.getAllClasses?.length}
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
        isOpen={isDeleteClass}
        setIsOpen={setIsDeleteClass}
        message="Bạn có chắc chắn muốn xóa lớp này không?"
        onSubmit={onDelete}
      />
      <FormCreateClass
        isOpen={isCreateClass}
        onClose={() => setIsCreateClass(false)}
        setLoading={setLoading}
      />
      <FormCreateClass
        isOpen={isEditClass}
        onClose={() => setIsEditClass(false)}
        isEdit
        setLoading={setLoading}
        currentId={currentId}
      />
      <DetailClass
        isOpen={isOpenDetail}
        onClose={() => setIsOpenDetail(false)}
        currentId={currentId}
        setLoading={setLoading}
      />
    </Row>
  );
};

export default ClassList;
