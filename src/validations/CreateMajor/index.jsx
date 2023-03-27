import * as Yup from "yup";

export const schemaValidate = Yup.object().shape({
  name: Yup.string().trim().required("Vui lòng nhập họ tên!"),
  graduationDiploma: Yup.string()
    .trim()
    .required("Vui lòng nhập văn bằng tốt nghiệp!"),
  time: Yup.number()
    .required("Vui lòng nhập thời gian đào tạo!")
    .typeError("Thời gian đào tạo không hợp lệ!")
    .min(0, "Thời gian đào tạo từ 3-5 năm!")
    .max(5, "Thời gian đào tạo từ 3-5 năm!"),
});
