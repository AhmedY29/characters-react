import React from "react";

function Navbar(props) {
  const handleOpenAdd = () => {
    props.openAdd(true);
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
            <li>Home</li>
          </ul>
        </div>
        <button
          onClick={handleOpenAdd}
          className="bg-black p-2 px-4 rounded-2xl text-white cursor-pointer"
        >
          Add Character
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
