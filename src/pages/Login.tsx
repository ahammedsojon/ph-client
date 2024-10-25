import { Button } from "antd";
import Password from "antd/es/input/Password";
import { useForm } from "react-hook-form";
import { jwtDecode } from "jwt-decode";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/features/auth/authSlice";

const Login = () => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      userId: "",
      password: "",
    },
  });

  const dispatch = useDispatch();

  const [login, { data, isError, isLoading, isSuccess, error }] =
    useLoginMutation();

  const onSubmit = async (data: { userId: string; password: string }) => {
    const userInfo = {
      id: data.userId,
      password: data.password,
    };
    const res = await login(userInfo).unwrap();
    const user = jwtDecode(res.data.accessToken);
    dispatch(setUser({ user: user, token: res.data.accessToken }));
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
