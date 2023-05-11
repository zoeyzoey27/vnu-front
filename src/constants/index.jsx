import moment from "moment";
import { MdOutlineSchool } from "react-icons/md";
import { BiBookReader } from "react-icons/bi";
import { BsPeople } from "react-icons/bs";
import { RiShieldUserLine } from "react-icons/ri";

export const DATE_TIME_FORMAT = "DD/MM/YYYY HH:mm";
export const ACTIVE = "ACTIVE";
export const SUSPEND = "SUSPEND";
export const PAGE_DEFAULT = 1;
export const PAGE_SIZE_DEFAULT = 5;
export const SKIP_DEFAULT = 0;
export const INIT_INDEX = 1;
export const BASE64 = 'base64';
export const ASCII = 'ascii';

export const convertTimeToString = (value) => {
  return value ? moment(value).format("DD/MM/YYYY") : "";
};
export const PHONE_REG_EXP = /^(\+?\d{0,11})?\s?-?\s?(\(?\d{11}\)?)?$/;
export const menuList = [
  {
    key: "/majors",
    icon: <MdOutlineSchool />,
    label: "Quản lý chuyên ngành",
  },
  {
    key: "/classes",
    icon: <BiBookReader />,
    label: "Quản lý lớp",
  },
  {
    key: "/students",
    icon: <BsPeople />,
    label: "Quản lý sinh viên",
  },
  {
    key: "/users",
    icon: <RiShieldUserLine />,
    label: "Quản lý người dùng",
  },
];

export const roles = [
  {
    id: "ALL",
    name: "Tất cả",
  },
  {
    id: "SUPER_ADMIN",
    name: "Quản trị viên cấp cao",
  },
  {
    id: "ADMIN",
    name: "Quản trị viên",
  },
  {
    id: "TEACHER",
    name: "Giảng viên",
  },
];
export const majors = [
  {
    id: 1,
    name: "Khoa Công nghệ thông tin",
  },
  {
    id: 2,
    name: "Khoa Điện tử Viễn thông",
  },
  {
    id: 3,
    name: "Khoa Vật lý  kỹ thuật & Công nghệ Nano",
  },
  {
    id: 4,
    name: "Khoa Cơ học kỹ thụât & Tự động hoá",
  },
  {
    id: 5,
    name: "Khoa Công nghệ Nông nghiệp",
  },
  {
    id: 6,
    name: "Khoa Công nghệ Xây dựng – Giao thông",
  },
];
