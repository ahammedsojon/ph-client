import { Button } from "antd";
import Password from "antd/es/input/Password";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";

const Login = () => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      userId: "",
      password: "",
    },
  });

  const [login, { data, isError, isLoading, isSuccess, error }] =
    useLoginMutation();

  const onSubmit = async (data: { userId: string; password: string }) => {
    console.log(isLoading, isError, isSuccess, error);
    const res = await login(data).unwrap();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="id">Email:</label>
        <input type="text" id="id" {...register("userId")} />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" {...register("password")} />
      </div>
      <Button htmlType="submit">Login</Button>
    </form>
  );
};

export default Login;
