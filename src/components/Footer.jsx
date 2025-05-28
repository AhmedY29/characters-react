import React from "react";

function Footer() {
  return (
    <footer className="flex justify-center w-full bg-gray-50">
      <div className="footer-content flex flex-col items-center w-[80%]">
        {" "}
        <img
          src="https://cdn-icons-png.flaticon.com/512/189/189533.png"
          width={60}
          alt=""
        />
        <hr />
        copy
      </div>
    </footer>
  );
}

export default Footer;
