import * as Yup from "yup";

export const schemaValidate = Yup.object().shape({
  name: Yup.string().trim().required("Vui lòng nhập họ tên!"),
  gender: Yup.string().nullable().required("Vui lòng chọn giới tính!"),
});
