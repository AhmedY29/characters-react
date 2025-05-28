import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

function AddChar(props) {
  const [formData, setFormData] = useState({
    name: "",
    avatar: "",
    gender: "",
  });

  const handleCloseDialog = () => {
    props.setOpen(false);
  };
  const handleAddChar = () => {
    if (formData.name.trim() == "") {
      toast.error("Please Filed Name Character");
      return;
    }
    if (formData.avatar.trim() == "") {
      toast.error("Please Filed Avatar Character");
      return;
    }
    if (formData.gender.trim() == "") {
      toast.error("Please Filed Gender Character");
      return;
    }

    axios
      .post("https://6836b640664e72d28e41c577.mockapi.io/char", formData)
      .then((res) =>
        toast.success(
          `Add Character: ${formData.name} Successfully`,
          setFormData({
            name: "",
            avatar: "",
            gender: "",
          })
          //   handleCloseDialog()
        )
      );
  };
  return (
    <dialog
      open={props.open}
      className={` ${
        props.open ? "flex" : ""
      } justify-center items-center bg-black/50 w-full h-screen fixed top-0 `}
    >
      <div className="dialog-content bg-white p-3 px-5">
        <h1
          onClick={handleCloseDialog}
          className="text-3xl cursor-pointer border rounded-full w-fit px-2"
        >
          X
        </h1>
        <div className="form flex flex-col gap-5">
          <div className="input-group flex flex-col">
            <label htmlFor="char-name">Character Name</label>
            <input
              type="text"
              id="char-name"
              placeholder="Enter Character Name "
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>
          <div className="input-group flex flex-col">
            <label htmlFor="char-image">Character image Url</label>
            <input
              type="text"
              id="char-image"
              placeholder="Enter Character image Url "
              value={formData.avatar}
              onChange={(e) =>
                setFormData({ ...formData, avatar: e.target.value })
              }
            />
          </div>
          <div className="input-group flex flex-col">
            <label htmlFor="char-gender">Character gender</label>
            <div className="radio-group">
              <input
                type="radio"
                name="char-gender"
                id="male"
                value={formData.gender}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    gender: e.target.checked ? "male" : "",
                  })
                }
              />
              <label htmlFor="male">Male</label>
            </div>
            <div className="radio-group">
              <input
                type="radio"
                name="char-gender"
                id="female"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    gender: e.target.checked ? "female" : "",
                  })
                }
              />
              <label htmlFor="female">Female</label>
            </div>
          </div>
          <button
            onClick={handleAddChar}
            className="bg-black p-2 px-4 rounded-2xl text-white cursor-pointer"
          >
            Add Character
          </button>
        </div>
      </div>
    </dialog>
  );
}

export default AddChar;
