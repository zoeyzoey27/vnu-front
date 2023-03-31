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
  Select,
  message,
} from "antd";
import { FiSearch, FiEdit } from "react-icons/fi";
import { MdDelete, MdAddCircle } from "react-icons/md";
import { CiCircleMore } from "react-icons/ci";
import { BiDetail } from "react-icons/bi";
import ModalConfirm from "../../components/ModalConfirm";
import FormCreateStudent from "../../components/FormCreateStudent";
import DetailStudent from "../../components/DetailStudent";
import { useMutation, useQuery } from "@apollo/client";
import { DELETE_STUDENT, DELETE_STUDENTS, GET_CLASS_LIST, GET_STUDENT_LIST } from "./graphql";
import { PAGE_DEFAULT, PAGE_SIZE_DEFAULT, SKIP_DEFAULT } from "../../constants";
import { useOutletContext } from "react-router-dom";

const StudentList = () => {
  const [form] = Form.useForm();
  const [deleteStudent] = useMutation(DELETE_STUDENT);
  const [deleteStudents] = useMutation(DELETE_STUDENTS);
  const [setLoading] = useOutletContext();
  const [currentId, setCurrentId] = useState();
  const [classSelected, setClassSelected] = useState();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isDeleteMulti, setIsDeleteMulti] = useState(false);
  const [isDeleteStudent, setIsDeleteStudent] = useState(false);
  const [isCreateStudent, setIsCreateStudent] = useState(false);
  const [isEditStudent, setIsEditStudent] = useState(false);
  const [isOpenDetail, setIsOpenDetail] = useState(false);
  const [dataClasses, setDataClasses] = useState([]);
  const [dataStudents, setDataStudents] = useState([]);
  const [searchCondition, setSearchCondition] = useState({
    items: {},
    pageIndex: PAGE_DEFAULT,
    pageSize: PAGE_SIZE_DEFAULT,
  });
  const { data: dataClass } = useQuery(GET_CLASS_LIST, {
    variables: {
      className: "",
      skip: null,
      take: null,
    },
  });
  const { data: dataInit } = useQuery(GET_STUDENT_LIST, {
    variables: {
      studentInput: searchCondition.items,
      skip: null,
      take: null,
    },
  });
  const { data } = useQuery(GET_STUDENT_LIST, {
    variables: {
      studentInput: searchCondition.items,
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
  const refetchQueries = () => {
    return [
      {
        query: GET_STUDENT_LIST,
        variables: {
          studentInput: searchCondition.items,
          skip: searchCondition?.pageSize
            ? searchCondition.pageSize * (searchCondition.pageIndex - 1)
            : SKIP_DEFAULT,
          take: searchCondition?.pageSize || PAGE_SIZE_DEFAULT,
        },
      },
      {
        query: GET_STUDENT_LIST,
        variables: {
          studentInput: searchCondition.items,
          skip: null,
          take: null,
        },
      },
    ];
  };
  const columns = [
    {
      title: "Mã sinh viên",
      dataIndex: "studentId",
    },
    {
      title: "Tên sinh viên",
      dataIndex: "name",
    },
    {
      title: "Giới tính",
      dataIndex: "gender",
      render: (gender) => <Row>{gender !== "MALE" ? "Nữ" : "Nam"}</Row>,
    },
    {
      title: "Chuyên ngành",
      dataIndex: "major",
    },
    {
      title: "Lớp",
      dataIndex: "class",
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
                  setLoading(true);
                  setCurrentId(record.id);
                  setIsEditStudent(true);
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
                  setIsDeleteStudent(true);
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
  useEffect(() => {
    if (dataClass) {
      const items = dataClass?.getAllClasses?.map((item) => {
        return {
          id: item?.id,
          name: item?.name,
        };
      });
      setDataClasses(items);
    }
  }, [dataClass]);
  const onChangeSelect = (value) => {
    setLoading(true);
    setClassSelected(value);
    setSearchCondition((pre) => ({
      ...pre,
      items: {
        name: form.getFieldsValue().searchInput,
        classId: value,
      },
      skip: SKIP_DEFAULT,
    }));
  };
  const onSearch = (values) => {
    setLoading(true);
    setSearchCondition((pre) => ({
      ...pre,
      items: {
        name: values.searchInput,
        classId: classSelected,
      },
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
  useEffect(() => {
    if (data) {
      const items = data?.getAllStudents?.map((item) => {
        return {
          id: item?.id,
          studentId: item?.studentId,
          name: item?.name,
          gender: item?.gender,
          class: item?.class?.name,
          major: item?.major?.name,
        };
      });
      setDataStudents(items);
    }
  }, [data]);
  useEffect(() => {
    setLoading(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const onDelete = async () => {
    setLoading(true);
    await deleteStudent({
      variables: {
        deleteStudentId: currentId,
      },
      onCompleted: () => {
        setLoading(false);
        message.success("Xóa dữ liệu thành công!");
        setIsDeleteStudent(false);
      },
      onError: (err) => {
        setLoading(false);
        message.error(`${err.message}`);
        setIsDeleteStudent(false);
      },
      refetchQueries: refetchQueries(),
    });
  };
  const onDeleteMulti = async () => {
    setLoading(true);
    await deleteStudents({
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
  };
  return (
    <Row className="flex flex-col w-full h-full bg-white p-5 !rounded-[15px] shadow-lg relative">
      <Row className="text-[20px] font-bold">Quản lý sinh viên</Row>
      <Row className="my-5 flex items-center justify-between">
        <Select
          className="w-[150px] selectRole"
          placeholder="Lọc theo lớp"
          value={classSelected}
          allowClear
          onClear={() => {}}
          onChange={(value) => onChangeSelect(value)}
        >
          {dataClasses.map((item) => (
            <Select.Option key={item?.id} value={item?.id}>
              {item?.name}
            </Select.Option>
          ))}
        </Select>
        <Row className="flex items-center">
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
              onClick={() => setIsCreateStudent(true)}
              icon={<MdAddCircle className="!text-white text-[20px]" />}
              className="!border-0 !outline-0 bg-black shadow-lg hover:opacity-80 ml-2 flex items-center justify-center"
            />
          </Tooltip>
        </Row>
      </Row>
      <Table
        rowKey="id"
        rowSelection={rowSelection}
        columns={columns}
        dataSource={dataStudents}
        pagination={false}
        scroll={{ x: "max-content" }}
      />
      <Pagination
        current={searchCondition?.pageIndex}
        pageSize={searchCondition?.pageSize}
        total={dataInit?.getAllStudents?.length}
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
        isOpen={isDeleteStudent}
        setIsOpen={setIsDeleteStudent}
        message="Bạn có chắc chắn muốn xóa sinh viên này không?"
        onSubmit={onDelete}
      />
      <FormCreateStudent
        isOpen={isCreateStudent}
        listClass={dataClasses}
        onClose={() => setIsCreateStudent(false)}
        setLoading={setLoading}
        refetchQueries={refetchQueries}
      />
      <FormCreateStudent
        isOpen={isEditStudent}
        onClose={() => setIsEditStudent(false)}
        setLoading={setLoading}
        listClass={dataClasses}
        isEdit
        currentId={currentId}
      />
      <DetailStudent
        isOpen={isOpenDetail}
        onClose={() => setIsOpenDetail(false)}
        studentId={currentId}
        setLoading={setLoading}
      />
    </Row>
  );
};

export default StudentList;
