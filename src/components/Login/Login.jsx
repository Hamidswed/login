import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
import { ReactComponent as Image } from "../../assets/pic.svg";

export default function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [isUser, setIsUser] = useState(true);
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (cookies.token) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [cookies.token]);

  const userNameHandler = (e) => {
    setUserName(e.target.value);
  };
  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  const handle = (token) => {
    setCookie("token", token);
  };
  const logOut = () => {
    removeCookie("token");
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
        email: userName,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.accessToken?.length > 0) {
          handle(data.accessToken);
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
        <div className="flex flex-col gap-3">
          <p>
            Welcome <strong>{userName}</strong>
          </p>
          <button
            onClick={logOut}
            className="bg-red-500 p-2 text-white rounded-md"
          >
            Log out
          </button>
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
                {...register("userName", {
                  required: true,
                  maxLength: 20,
                })}
                type="text"
                placeholder="Email"
                onChange={userNameHandler}
                className="rounded-md"
              />
              {errors.userName && (
                <span className="text-red-500">Email is required!</span>
              )}
              <input
                {...register("password", { required: true })}
                type="password"
                placeholder="Password"
                onChange={passwordHandler}
                className="rounded-md"
              />
              {errors.password && (
                <span className="text-red-500">Password is required!</span>
              )}

              <input
                type="submit"
                className="bg-[#9F59F5] py-2 rounded-md text-white"
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
