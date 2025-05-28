import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import bcrypt from "bcryptjs";

function Register() {
  const navigate = useNavigate("/signin");
  const [formErrMsg, setFormErr] = useState({
    usernameErr: "",
    emailErr: "",
    passwordErr: "",
    confirmPasswordErr: "",
    agreementErr: "",
  });
  const [formData, setFormDate] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreement: "",
  });

  const handleSignUp = async () => {
    setFormErr({
      usernameErr: "",
      emailErr: "",
      passwordErr: "",
      confirmPasswordErr: "",
      agreementErr: "",
    });
    if (formData.username.trim() == "") {
      toast.error("Please Filed Full Name!");
      setFormErr({ ...formErrMsg, usernameErr: "Please Filed Full Name!" });
      return;
    }
    if (formData.email.trim() == "") {
      toast.error("Please Filed Email!");
      setFormErr({ ...formErrMsg, emailErr: "Please Filed Email!" });

      return;
    }
    let emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Email Invalid!");
      setFormErr({ ...formErrMsg, emailErr: "Email Invalid!" });

      return;
    }

    if (formData.password.trim() == "") {
      toast.error("Please Filed Password!");
      setFormErr({ ...formErrMsg, passwordErr: "Please Filed Password!" });
      return;
    }
    if (formData.confirmPassword.trim() == "") {
      toast.error("Please Filed Confirm Password!");
      setFormErr({
        ...formErrMsg,
        confirmPasswordErr: "Please Filed Confirm Password!",
      });

      return;
    }
    if (!formData.agreement) {
      toast.error("Please Check Agreement!");
      setFormErr({ ...formErrMsg, agreementErr: "Please Check Agreement!" });

      return;
    }
    console.log(formData.username.length);
    if (formData.username.length < 4) {
      toast.error("Full Name Must be more than 3 letters");
      setFormErr({
        ...formErrMsg,
        usernameErr: "Full Name Must be more than 3 letters",
      });
      return;
    }
    if (formData.username.length > 51) {
      toast.error("Full Name Must be less than 50 letters");
      setFormErr({
        ...formErrMsg,
        usernameErr: "Full Name Must be less than 50 letters",
      });

      return;
    }
    if (formData.password.length < 6) {
      toast.error("Password Must be more 6 letters");
      setFormErr({
        ...formErrMsg,
        passwordErr: "Password Must be more 6 letters",
      });

      return;
    }

    if (formData.confirmPassword != formData.password) {
      toast.error("Password Doesn't Match!");
      setFormErr({
        ...formErrMsg,
        confirmPasswordErr: "Password Doesn't Match!",
      });
      return;
    }

    let hashPassword = await bcrypt.hash(formData.password, 10);
    console.log(hashPassword);

    let newUser = {
      username: formData.username,
      email: formData.email.toLowerCase(),
      password: hashPassword,
    };

    axios
      .post("https://68371fab664e72d28e43a55c.mockapi.io/users", newUser)
      .then(() =>
        toast.success(
          "Sign Up SuccessFully We Will Redirect You To Login Form..."
        )
      );

    setTimeout(() => {
      navigate("/login");
    }, 3000);
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setFormDate({ ...formData, [name]: value });
  };
  return (
    <section className="signup-section w-full h-screen flex justify-center">
      <div className="signup-content flex flex-col my-5 lg:flex-row lg:my-0 justify-center items-center w-[80%]">
        <div className="form bg-[#f9f9f9] shadow m-3 p-4 rounded-2xl flex flex-col gap-3 lg:w-[50%]">
          <h1 className="font-bold text-2xl">Register</h1>
          <div className="form-group flex flex-col">
            <label htmlFor="full-name">Name</label>
            <input
              className="border border-black rounded-lg p-2"
              type="text"
              id="full-name"
              name="username"
              maxLength={50}
              onChange={handleChangeInput}
              placeholder="Enter Your Name"
            />
            <span className="text-red-400 font-bold">
              {formErrMsg.usernameErr}
            </span>
          </div>
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
            <span className="text-red-400 font-bold">
              {formErrMsg.emailErr}
            </span>
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
            <span className="text-red-400 font-bold">
              {formErrMsg.passwordErr}
            </span>
          </div>
          <div className="form-group flex flex-col">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              className="border border-black rounded-lg p-2"
              type="password"
              id="confirm-password"
              name="confirmPassword"
              onChange={handleChangeInput}
              placeholder="Enter Your Confirm Password "
            />
            <span className="text-red-400 font-bold">
              {formErrMsg.confirmPasswordErr}
            </span>
          </div>
          <div className="form-group flex gap-2">
            <input
              className="border border-black rounded-lg p-2"
              type="checkbox"
              id="agreement"
              onChange={(e) => {
                setFormDate({ ...formData, agreement: e.target.checked });
              }}
              placeholder="Enter Your Confirm Password "
            />
            <label htmlFor="agreement">
              By registering, you agree to our Terms of Service and Privacy
              Policy.
            </label>
          </div>
          <span className="text-red-400 font-bold">
            {formErrMsg.agreementErr}
          </span>
          <button
            onClick={handleSignUp}
            className="uppercase py-3 px-2 my-5 bg-black hover:bg-[#333] rounded-xl text-white cursor-pointer transition-all duration-150"
          >
            Register
          </button>
          <h1>
            Do You have an account?{" "}
            <Link
              to={"/login"}
              className="text-blue-400 hover:underline transition-all duration-150"
            >
              Login
            </Link>
          </h1>
        </div>
      </div>
    </section>
  );
}

export default Register;
