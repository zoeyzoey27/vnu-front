import { Layout, Spin, message } from "antd";
import FormLogin from "../../components/FormLogin";
import { useMutation } from "@apollo/client";
import { USER_LOGIN } from "./graphql";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [loginUser] = useMutation(USER_LOGIN);
  const [loading, setLoading] = useState(false);
  const onSubmit = async (values) => {
    setLoading(true);
    await loginUser({
      variables: {
        loginInput: {
          email: values.email,
          password: values.password,
        },
      },
      onCompleted: (data) => {
        setLoading(false);
        message.success("Đăng nhập thành công!");
        localStorage.setItem("token", data?.loginUser?.token);
        navigate("/majors");
      },
      onError: (error) => {
        setLoading(false);
        message.error(`${error.message}`);
      },
    });
  };
  return (
    <Spin size="large" spinning={loading}>
      <Layout className="layout bg-gradient-to-t from-[#4F94CD] to-[#FDFDFD] max-w-screen min-h-screen">
        <FormLogin onSubmit={onSubmit} setLoading={setLoading} />
      </Layout>
    </Spin>
  );
};

export default Login;
