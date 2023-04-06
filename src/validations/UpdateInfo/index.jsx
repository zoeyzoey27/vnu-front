import * as Yup from "yup";
import { PHONE_REG_EXP } from "../../constants";

export const schemaValidate = Yup.object().shape({
  name: Yup.string().trim().required("Vui lòng nhập họ tên!"),
  gender: Yup.string().nullable().required("Vui lòng chọn giới tính!"),
  role: Yup.string().trim().required("Vui lòng chọn quyền cho người dùng!"),
  phone: Yup.string()
    .nullable()
    .matches(PHONE_REG_EXP, "Số điện thoại không hợp lệ!")
    .length(10, "Số điện thoại không hợp lệ!"),
});
