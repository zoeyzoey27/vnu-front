import { Layout } from "antd";
import FormLogin from "../../components/FormLogin";

const Login = () => {
  return (
    <Layout className="layout bg-gradient-to-t from-[#4F94CD] to-[#FDFDFD] max-w-screen min-h-screen">
      <FormLogin/>
    </Layout>
  );
};

export default Login;
