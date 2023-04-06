import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import {
  Layout,
  Menu,
  Row,
  Avatar,
  Button,
  Dropdown,
  Spin,
  message,
} from "antd";
import React, { useState, useEffect } from "react";
import logo from "../../assets/logo.png";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import avatarUser from "../../assets/Teacher.svg";
import useMediaQuery from "use-media-antd-query";
import FormUpdateInfo from "../FormUpdateInfo";
import { menuList, roles } from "../../constants";
import { Buffer } from "buffer";
import { INIT_INDEX, BASE64, ASCII, DATE_TIME_FORMAT } from "../../constants";
import { useMutation, useQuery } from "@apollo/client";
import { GET_USER, UPDATE_USER } from "./graphql";
import moment from "moment";

const { Sider, Content } = Layout;
const LayoutAdmin = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isMediumScreen = useMediaQuery();
  const [updateUser] = useMutation(UPDATE_USER);
  const [collapsed, setCollapsed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [dataUser, setDataUser] = useState({
    userId: "",
    fullName: "",
    email: "",
    gender: "",
    phoneNumber: "",
    address: "",
    role: "",
  });
  const [role, setRole] = useState();
  let token = localStorage.getItem("token");
  const valueToken = token
    ? Buffer.from(token.split(".")[INIT_INDEX], BASE64).toString(ASCII)
    : "";
  const userId = valueToken && JSON.parse(valueToken).user_id;
  const { data } = useQuery(GET_USER, {
    variables: {
      getUserId: userId,
    },
    skip: userId === null || userId === undefined,
  });
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    message.success("Đăng xuất thành công!");
  };
  const onSubmit = async (values) => {
    setLoading(true);
    updateUser({
      variables: {
        updateUserId: userId,
        updateUserInput: {
          fullName: values.name,
          gender: values.gender,
          phoneNumber: values.phone,
          address: values.address,
          role: dataUser.role,
          updatedAt: moment().format(DATE_TIME_FORMAT),
        },
      },
      onCompleted: () => {
        setLoading(false);
        message.success("Chỉnh sửa thông tin thành công!");
        setIsOpenModal(false);
      },
      onError: (error) => {
        setLoading(false);
        message.error(`${error.message}`);
      },
    })
  }
  useEffect(() => {
    if (isMediumScreen === "xl" || isMediumScreen === "xxl")
      setCollapsed(false);
    else setCollapsed(true);
  }, [isMediumScreen]);
  useEffect(() => {
    if (data) {
      const roleUser = data?.getUser?.role;
      setDataUser({
        userId: data?.getUser?.userId,
        fullName: data?.getUser?.fullName,
        email: data?.getUser?.email,
        gender: data?.getUser?.gender,
        phoneNumber: data?.getUser?.phoneNumber,
        address: data?.getUser?.address,
        role: roleUser,
      });
      const item = roles.find((item) => item.id === roleUser);
      if (item) setRole(item.name);
    }
  }, [data]);
  return (
    <Spin spinning={loading} size="large">
      <Layout className="!bg-[#F0F0F0] max-w-screen h-screen overflow-hidden">
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          className={`${
            collapsed ? "!min-w-[120px]" : "!min-w-[330px]"
          } !bg-transparent py-5`}
        >
          <Row className="flex items-center justify-center px-5">
            <img
              src={logo}
              alt=""
              className={`${collapsed ? "w-[50px]" : "w-[18%]"}`}
            />
            <Row
              className={`${
                collapsed ? "hidden" : "text-[#015198] flex-1 ml-2 block"
              }`}
            >
              <Row className="text-[11px] font-semibold">
                ĐẠI HỌC QUỐC GIA HÀ NỘI
              </Row>
              <Row className="text-[13px] font-bold">
                TRƯỜNG ĐẠI HỌC CÔNG NGHỆ
              </Row>
            </Row>
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "!text-[18px] !w-fit text-[#015198] ml-2.5",
                onClick: () => setCollapsed(!collapsed),
              }
            )}
          </Row>
          <Menu
            className="!bg-transparent !border-r-0 !mt-5"
            mode="inline"
            defaultSelectedKeys={["/majors"]}
            selectedKeys={[location.pathname]}
          >
            {menuList.map((item) => (
              <Menu.Item
                key={item.key}
                onClick={() => navigate(item.key)}
                className="!flex !items-center !justify-center"
              >
                <Row className="flex items-center w-full">
                  <Row className="!text-[20px]">{item.icon}</Row>
                  <Row className={`${collapsed ? "hidden" : "ml-2"}`}>
                    {item.label}
                  </Row>
                </Row>
              </Menu.Item>
            ))}
          </Menu>
          <hr className="mt-5" />
          <Row
            className={`${
              collapsed
                ? "hidden"
                : "bg-[#015198] flex flex-col !rounded-[15px] m-5 p-5 text-white !shadow-2xl"
            }`}
          >
            <Row className="font-bold">Thông tin tài khoản</Row>
            <Row className="flex items-center my-3.5">
              <Avatar
                shape="square"
                src={avatarUser}
                className="w-[52px] h-[52px] !rounded-[15px] bg-[#E0E0E0]"
              />
              <Row className="flex flex-col ml-2">
                <Row className="font-bold">{dataUser?.fullName}</Row>
                <Row className="opacity-60">{role}</Row>
              </Row>
            </Row>
            <Row className="flex justify-between">
              <Button
                onClick={() => setIsOpenModal(true)}
                className="!bg-[#E0E0E0] !text-black h-[35px] flex-1 mr-3.5 !rounded-[8px] outline-0 border-0 hover:opacity-90"
              >
                Chỉnh sửa
              </Button>
              <Button
                onClick={logout}
                className="!bg-[#E0E0E0] !text-black h-[35px] flex-1 !rounded-[8px] outline-0 border-0 hover:opacity-90"
              >
                Đăng xuất
              </Button>
            </Row>
          </Row>
          {collapsed && (
            <Row className="m-5 !flex !items-center justify-center">
              <Dropdown
                placement="topLeft"
                arrow
                dropdownRender={() => (
                  <Row className="flex flex-col bg-white !rounded-[15px] p-5 !shadow-lg">
                    <Row className="font-bold">Thông tin tài khoản</Row>
                    <Row className="flex items-center my-3.5">
                      <Avatar
                        shape="square"
                        src={avatarUser}
                        className="w-[52px] h-[52px] !rounded-[15px] bg-[#E0E0E0]"
                      />
                      <Row className="flex flex-col ml-2">
                        <Row className="font-bold">{dataUser?.fullName}</Row>
                        <Row className="opacity-60">{role}</Row>
                      </Row>
                    </Row>
                    <Row className="flex justify-between">
                      <Button
                        onClick={() => setIsOpenModal(true)}
                        className="!bg-[#E0E0E0] !text-black h-[35px] flex-1 mr-3.5 !rounded-[8px] outline-0 border-0 hover:opacity-90"
                      >
                        Chỉnh sửa
                      </Button>
                      <Button className="!bg-[#E0E0E0] !text-black h-[35px] flex-1 !rounded-[8px] outline-0 border-0 hover:opacity-90">
                        Đăng xuất
                      </Button>
                    </Row>
                  </Row>
                )}
              >
                <Avatar
                  shape="square"
                  src={avatarUser}
                  className="w-[52px] h-[52px] !rounded-[15px] bg-[#E0E0E0] cursor-pointer"
                />
              </Dropdown>
            </Row>
          )}
        </Sider>
        <Layout className="site-layout">
          <Content className="m-5">
            <Outlet context={[setLoading]} />
          </Content>
          <FormUpdateInfo
            isOpen={isOpenModal}
            setIsOpen={setIsOpenModal}
            dataUser={dataUser}
            onSubmit={onSubmit}
            setLoading={setLoading}
            userId={userId}
          />
        </Layout>
      </Layout>
    </Spin>
  );
};
export default LayoutAdmin;
