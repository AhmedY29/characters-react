import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";

function Navbar() {
  const [user, setUser] = useState("");
  const [openLogout, setOpenLogout] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleCheckUser = () => {
      let user = localStorage.getItem("UserName-Account");
      if (user) {
        setUser(JSON.parse(user));
      }
    };
    handleCheckUser();
  }, [localStorage.getItem("UserName-Account")]);
  const handleLogout = () => {
    toast.success("Logout Successfully"), localStorage.clear(), setUser("");
    navigate("/");
    setOpenLogout(false);
  };

  return (
    <nav className="flex justify-center w-full bg-gray-50">
      <div className="flex justify-between items-center gap-3 w-[80%]">
        <div className="flex items-center gap-3 ">
          <img
            src="https://cdn-icons-png.flaticon.com/512/189/189533.png"
            width={60}
            alt=""
          />
          <ul>
            <Link
              className="hover:font-bold transition-all duration-200"
              to={"/"}
            >
              <li>Home</li>
            </Link>
          </ul>
        </div>
        <div className={`${user ? "hidden" : "flex"} gap-3`}>
          <button
            onClick={() => navigate("/login")}
            className="bg-black hover:bg-[#333] transition-all duration-200 p-2 px-4 rounded-2xl text-white cursor-pointer"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/register")}
            className="border-black hover:bg-black hover:text-white border-1 p-2 px-4 rounded-2xl text-black cursor-pointer transition-all duration-200"
          >
            Register
          </button>
        </div>
        <div className={`${user ? "block" : "hidden"} relative`}>
          <h1
            className="cursor-pointer"
            onClick={() => {
              setOpenLogout(!openLogout);
            }}
          >
            Welcome, {user.username}!{" "}
          </h1>
          <ul
            className={`${
              !openLogout ? "hidden " : ""
            } absolute top-7 bg-black rounded-md text-white w-full py-2 p-1`}
          >
            <li onClick={handleLogout} className="cursor-pointer">
              Logout
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
