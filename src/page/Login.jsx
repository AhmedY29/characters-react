import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import bcrypt from "bcryptjs";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [formSignIn, setFormSignIn] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    let apiUrl = "https://68371fab664e72d28e43a55c.mockapi.io/users";
    axios.get(apiUrl).then((res) => setUsers(res.data));
  }, []);

  console.log(users, "users");
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setFormSignIn({ ...formSignIn, [name]: value });
  };
  const handleSignIn = async () => {
    let user = users.find(
      (user) => user.email == formSignIn.email.toLowerCase()
    );
    if (user) {
      let password = await bcrypt.compare(formSignIn.password, user.password);
      if (formSignIn.email.toLowerCase() == user.email && password) {
        toast.success(
          "Sign In Successfully We Will Redirect You To Hone Page ..."
        );
        localStorage.setItem(
          "UserName-Account",
          JSON.stringify({ username: user.username, email: user.email })
        );

        setTimeout(() => {
          navigate("/");
        }, 3000);
      } else {
        toast.error("Email Or Password Invalid");
        return;
      }
    } else {
      toast.error("Email Or Password Invalid");
      return;
    }
  };
  return (
    <section className="signin-section w-full h-[80vh] flex justify-center">
      <div className="signin-content flex flex-col my-5 lg:flex-row lg:my-0 justify-center items-center w-[80%]">
        <div className="form bg-[#f9f9f9] shadow m-3 p-4 rounded-2xl flex flex-col gap-3 lg:w-[50%]">
          <h1 className="font-bold text-2xl">Login</h1>

          <div className="form-group flex flex-col">
            <label htmlFor="email">Email</label>
            <input
              className="border border-black rounded-lg p-2"
              type="text"
              id="email"
              name="email"
              onChange={handleChangeInput}
              placeholder="Enter Your Email "
            />
          </div>
          <div className="form-group flex flex-col">
            <label htmlFor="password">Password</label>
            <input
              className="border border-black rounded-lg p-2"
              type="password"
              id="password"
              name="password"
              onChange={handleChangeInput}
              placeholder="Enter Your Password "
            />
          </div>
          <div className="flex justify-between">
            <div className="form-group flex gap-2">
              <input
                className="border border-black rounded-lg p-2"
                type="checkbox"
                id="check-me"
              />
              <label htmlFor="check-me">Check Me</label>
            </div>
            <h1 className="underline hover:no-underline text-sky-600 cursor-pointer">
              Forget Password?
            </h1>
          </div>
          <button
            onClick={handleSignIn}
            className="uppercase py-3 px-2 my-5 bg-black hover:bg-[#333] rounded-xl text-white cursor-pointer transition-all duration-150"
          >
            Login
          </button>
          <h1>
            Don't You have an account?{" "}
            <Link
              to={"/register"}
              className="text-blue-400 hover:underline transition-all duration-150"
            >
              Register
            </Link>
          </h1>
        </div>
      </div>
    </section>
  );
}

export default Login;
