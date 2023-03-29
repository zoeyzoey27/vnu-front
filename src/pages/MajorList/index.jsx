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
import ModalConfirm from "../../components/ModalConfirm";
import FormCreateMajor from "../../components/FormCreateMajor";
import { useQuery, useMutation } from "@apollo/client";
import { PAGE_DEFAULT, PAGE_SIZE_DEFAULT, SKIP_DEFAULT } from "../../constants";
import { DELETE_MAJOR, DELETE_MAJORS, GET_MAJOR_LIST } from "./graphql";

const MajorList = () => {
  const [form] = Form.useForm();
  const [deleteMajor] = useMutation(DELETE_MAJOR);
  const [deleteMajors] = useMutation(DELETE_MAJORS);
  const [dataMajors, setDataMajors] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isDeleteMulti, setIsDeleteMulti] = useState(false);
  const [isDeleteMajor, setIsDeleteMajor] = useState(false);
  const [isCreateMajor, setIsCreateMajor] = useState(false);
  const [isEditMajor, setIsEditMajor] = useState(false);
  const [currentId, setCurrentId] = useState();
  const [searchCondition, setSearchCondition] = useState({
    name: "",
    pageIndex: PAGE_DEFAULT,
    pageSize: PAGE_SIZE_DEFAULT,
  });
  const { data: dataInit } = useQuery(GET_MAJOR_LIST, {
    variables: {
      name: searchCondition.name,
      skip: null,
      take: null,
    },
  });
  const { data } = useQuery(GET_MAJOR_LIST, {
    variables: {
      name: searchCondition.name,
      skip: searchCondition?.pageSize
        ? searchCondition.pageSize * (searchCondition.pageIndex - 1)
        : SKIP_DEFAULT,
      take: searchCondition?.pageSize || PAGE_SIZE_DEFAULT,
    },
    onCompleted: () => {
      //loading false
    },
  });
  const columns = [
    {
      title: "Mã chuyên ngành",
      dataIndex: "majorId",
    },
    {
      title: "Tên chuyên ngành",
      dataIndex: "name",
    },
    {
      title: "Văn bằng tốt nghiệp",
      dataIndex: "graduationDiploma",
    },
    {
      title: "Thời gian đào tạo chuẩn (năm)",
      dataIndex: "time",
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
                  setIsEditMajor(true);
                  setCurrentId(record.id);
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
                  setIsDeleteMajor(true);
                  setCurrentId(record.id);
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
  const onSearch = (values) => {
    setSearchCondition((pre) => ({
      ...pre,
      name: values.searchInput,
      pageIndex: PAGE_DEFAULT,
    }));
  };
  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const onChangePagination = (page, limit) => {
    setSearchCondition({
      ...searchCondition,
      pageIndex: page,
      pageSize: limit,
    });
  };
  const onDelete = async () => {
    await deleteMajor({
      variables: {
        deleteMajorId: currentId,
      },
      onCompleted: () => {
        message.success("Xóa dữ liệu thành công!");
        setIsDeleteMajor(false);
      },
      onError: (err) => {
        message.success(`${err.message}`);
        setIsDeleteMajor(false);
      },
    });
  };
  const onDeleteMulti = async () => {
    await deleteMajors({
      variables: {
        ids: selectedRowKeys,
      },
      onCompleted: () => {
        message.success("Xóa dữ liệu thành công!");
        setIsDeleteMulti(false);
      },
      onError: (err) => {
        message.success(`${err.message}`);
        setIsDeleteMulti(false);
      },
    });
  };
  useEffect(() => {
    if (data) {
      const items = data?.getAllMajors?.map((item) => {
        return {
          id: item.id,
          majorId: item.majorId,
          name: item.name,
          graduationDiploma: item.graduationDiploma,
          time: item.time,
        };
      });
      setDataMajors(items);
    }
  }, [data]);
  return (
    <Row className="flex flex-col w-full h-full bg-white p-5 !rounded-[15px] shadow-lg relative">
      <Row className="text-[20px] font-bold">Quản lý chuyên ngành</Row>
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
            onClick={() => setIsCreateMajor(true)}
            icon={<MdAddCircle className="!text-white text-[20px]" />}
            className="!border-0 !outline-0 bg-black shadow-lg hover:opacity-80 ml-2 flex items-center justify-center"
          />
        </Tooltip>
      </Row>
      <Table
        rowKey="id"
        rowSelection={rowSelection}
        columns={columns}
        dataSource={dataMajors}
        pagination={false}
        scroll={{ x: "max-content" }}
      />
      <Pagination
        current={searchCondition?.pageIndex}
        pageSize={searchCondition?.pageSize}
        total={dataInit?.getAllMajors?.length}
        onChange={onChangePagination}
        className="mt-10 w-full flex justify-end absolute bottom-5 right-5"
      />
      <ModalConfirm
        isOpen={isDeleteMulti}
        setIsOpen={setIsDeleteMulti}
        onSubmit={onDeleteMulti}
        message="Bạn có chắc chắn muốn xóa dữ liệu không?"
      />
      <ModalConfirm
        isOpen={isDeleteMajor}
        setIsOpen={setIsDeleteMajor}
        onSubmit={onDelete}
        message="Bạn có chắc chắn muốn xóa chuyên ngành này không?"
      />
      <FormCreateMajor
        isOpen={isCreateMajor}
        onClose={() => setIsCreateMajor(false)}
      />
      <FormCreateMajor
        isOpen={isEditMajor}
        onClose={() => setIsEditMajor(false)}
        isEdit
        currentId={currentId}
      />
    </Row>
  );
};

export default MajorList;
