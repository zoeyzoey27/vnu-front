import * as Yup from "yup";

export const schemaValidate = Yup.object().shape({
  id: Yup.string().trim().required("Vui lòng nhập mã lớp!"),
  name: Yup.string().trim().required("Vui lòng nhập tên lớp!"),
});
