import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

// React Icon
import { IoCloseCircleOutline } from "react-icons/io5";

function DeleteChar(props) {
  const handleCloseDialog = () => {
    props.setOpen(false);
  };

  const handleDeleteChar = () => {
    axios
      .delete(
        `https://6836b640664e72d28e41c577.mockapi.io/char/${props.character?.id}`
      )
      .then(() => toast.success("delete successfully"), handleCloseDialog());
  };

  return (
    <dialog
      open={props.open}
      className={` ${
        props.open ? "flex" : ""
      } justify-center items-center bg-black/50 w-full h-screen fixed top-0 z-10 `}
    >
      <div className="dialog-content bg-white rounded-xl p-3 px-5">
        <h1
          onClick={handleCloseDialog}
          className="text-5xl cursor-pointer w-fit px-2"
        >
          <IoCloseCircleOutline />
        </h1>
        <div className="form flex flex-col gap-5">
          <div className="input-group flex flex-col">
            <h1 className="text-3xl font-bold">Are You Sure?</h1>
            <p>
              Do You Wants Delete{" "}
              <span className="font-bold">"{props.character?.name}"</span>{" "}
              Character ?
            </p>
          </div>
          <div className="btns">
            <button
              onClick={handleCloseDialog}
              className="border-black border p-2 px-4 rounded-2xl text-black cursor-pointer"
            >
              Cancel
            </button>{" "}
            <button
              onClick={handleDeleteChar}
              className="bg-red-300 p-2 px-4 rounded-2xl  cursor-pointer"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
}

export default DeleteChar;
