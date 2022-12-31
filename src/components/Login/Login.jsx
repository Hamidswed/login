import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
import { ReactComponent as Image } from "../../assets/pic.svg";
import { ReactComponent as Background } from "../../assets/pic2.svg";
import Logout from "../Logout/Logout";

export default function Login() {
  const [isLogin, setIsLogin] = useState(false);
  const [isUser, setIsUser] = useState(true);
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    email: "",
    password: "",
  });
  const { email, password } = watch();

  useEffect(() => {
    if (cookies.token) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [cookies.token]);

  const handle = (token, name) => {
    setCookie("token", token);
    setCookie("name", name);
  };
  const logOut = () => {
    removeCookie("token");
    removeCookie("name");
    setIsLogin(false);
    setIsUser(true);
  };
  const submitBtn = () => {

    fetch("https://test.zyax.se/access/", {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.accessToken?.length > 0) {
          handle(data.accessToken, email);
          setIsLogin(true);
        } else if (data.error) {
          console.log(data.error);
          setIsUser(false);
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      {isLogin ? (
        <div className="flex flex-col gap-3 rounded-lg mt-6 shadow-lg overflow-hidden bg-white w-[830px] h-[545px] relative">
          <Logout logOut={logOut}/>
        </div>
      ) : (
        <div className="flex rounded-lg mt-6 shadow-lg overflow-hidden bg-white">
          <div className="w-[500px] ">
            <Image />
          </div>
          <div className="flex flex-col gap-5 items-center p-10">
            <h3 className="text-center text-2xl font-bold tracking-tight text-gray-900">
              Sign in to your account
            </h3>
            <form
              onSubmit={handleSubmit(submitBtn)}
              className="flex flex-col gap-5 w-[250px]"
            >
              <input
                {...register("email", { required: true })}
                type="email"
                name="email"
                placeholder="Email"
                className="rounded-md"
              />
              {errors.email && (
                <span className="text-red-500" title="error">
                  Email is required!
                </span>
              )}
              <input
                {...register("password", { required: true })}
                type="password"
                name="password"
                placeholder="Password"
                className="rounded-md"
              />
              {errors.password && (
                <span className="text-red-500">Password is required!</span>
              )}

              <input
                type="submit"
                className="bg-[#9F59F5] py-2 rounded-md text-white cursor-pointer hover:bg-[#7651D5] duration-200"
                value="Log in"
              />
            </form>
            {!isUser ? (
              <p className="text-red-500">Invalid username or password!</p>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}
