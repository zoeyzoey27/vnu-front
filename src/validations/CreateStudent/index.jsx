import * as Yup from "yup";
import { PHONE_REG_EXP } from "../../constants";

export const schemaValidate = Yup.object().shape({
  id: Yup.string().trim().required("Vui lòng nhập mã sinh viên!"),
  name: Yup.string().trim().required("Vui lòng nhập tên sinh viên!"),
  gender: Yup.string().trim().required("Vui lòng chọn giới tính!"),
  email: Yup.string()
    .trim()
    .email("Địa chỉ email không hợp lệ!")
    .required("Vui lòng nhập địa chỉ email!"),
  major: Yup.string().trim().required("Vui lòng chọn chuyên ngành!"),
  phone: Yup.string()
    .nullable()
    .matches(PHONE_REG_EXP, "Số điện thoại không hợp lệ!")
    .length(10, "Số điện thoại không hợp lệ!"),
});
