import * as Yup from "yup";

export const schemaValidate = Yup.object().shape({
  otp: Yup.string().trim().required("Vui lòng nhập mã xác nhận!"),
  password: Yup.string()
    .trim()
    .required("Vui lòng nhập mật khẩu!")
    .min(6, "Mật khẩu có ít nhất 6 ký tự!")
    .max(50, "Mật khẩu có tối đa 50 ký tự!"),
  newPassword: Yup.string()
    .trim()
    .required("Vui lòng nhập mật khẩu mới!")
    .min(6, "Mật khẩu có ít nhất 6 ký tự!")
    .max(50, "Mật khẩu có tối đa 50 ký tự!"),
  passwordConfirm: Yup.string().trim().required("Vui lòng nhập lại mật khẩu!"),
});
