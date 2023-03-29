import * as Yup from "yup";

export const schemaValidate = Yup.object().shape({
  id: Yup.string().trim().required("Vui lòng nhập mã sinh viên!"),
  name: Yup.string().trim().required("Vui lòng nhập tên sinh viên!"),
  gender: Yup.string().trim().required("Vui lòng chọn giới tính!"),
  email: Yup.string()
    .trim()
    .email("Địa chỉ email không hợp lệ!")
    .required("Vui lòng nhập địa chỉ email!"),
  major: Yup.string().trim().required("Vui lòng chọn chuyên ngành!"),
});
