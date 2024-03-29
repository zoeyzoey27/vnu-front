import * as Yup from "yup";

export const schemaValidate = Yup.object().shape({
  name: Yup.string().trim().required("Vui lòng nhập họ tên!"),
  email: Yup.string()
    .trim()
    .email("Địa chỉ email không hợp lệ!")
    .required("Vui lòng nhập địa chỉ email!"),
  password: Yup.string()
    .trim()
    .required("Vui lòng nhập mật khẩu!")
    .min(6, "Mật khẩu có ít nhất 6 ký tự!")
    .max(50, "Mật khẩu có tối đa 50 ký tự!"),
  role: Yup.string().trim().required("Vui lòng chọn quyền cho người dùng!"),
});
