import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

// React Icon
import { IoCloseCircleOutline } from "react-icons/io5";

function AddChar(props) {
  const [formData, setFormData] = useState({
    name: "",
    avatar: "",
    gender: "",
    authorId: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  console.log(props.id);

  const handleCloseDialog = () => {
    props.setOpen(false);
  };
  const handleAddChar = () => {
    let user = JSON.parse(localStorage.getItem("UserName-Account"));
    if (!user) {
      toast.error("You have to login");
      return;
    }
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
    let urlRegex =
      /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
    let checkUrl = urlRegex.test(formData.avatar);

    setIsLoading(true);
    if (!checkUrl) {
      toast.error("Please Write Correct Avatar Url");
      return;
    }
    axios
      .post("https://6836b640664e72d28e41c577.mockapi.io/char", {
        name: formData.name,
        avatar: formData.avatar,
        gender: formData.gender,
        authorId: props.id,
      })
      .then(
        (res) => setIsLoading(false),
        toast.success(
          `Add Character: ${formData.name} Successfully`,
          setFormData({
            name: "",
            avatar: "",
            gender: "",
            authorId: "",
          }),
          handleCloseDialog()
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
      <div className="dialog-content bg-white p-3 px-5 rounded-2xl lg:w-[50%]">
        <div className="actions">
          <h1
            onClick={handleCloseDialog}
            className="text-5xl cursor-pointer w-fit px-2"
          >
            <IoCloseCircleOutline />
          </h1>
        </div>
        <div className="title text-center font-bold text-4xl">
          Add Character
        </div>
        <div className="form flex flex-col gap-5">
          <div className="input-group flex flex-col">
            <label className="font-bold" htmlFor="char-name">
              Character Name
            </label>
            <input
              className="border rounded-lg p-2"
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
            <label className="font-bold" htmlFor="char-image">
              Character image Url
            </label>
            <input
              className="border rounded-lg p-2"
              type="text"
              id="char-image"
              placeholder="Enter Character image Url "
              value={formData.avatar}
              onChange={(e) =>
                setFormData({ ...formData, avatar: e.target.value })
              }
            />
          </div>
          <div className="input-group ">
            <label className="font-bold" htmlFor="char-gender">
              Character gender
            </label>
            <div className="group flex gap-5">
              <div className="radio-group">
                <input
                  type="radio"
                  name="char-gender"
                  id="male"
                  value={formData.gender == "male" ? true : false}
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
                  value={formData.gender == "female" ? true : false}
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
          </div>
          <button
            onClick={handleAddChar}
            disabled={isLoading}
            className="bg-black hover:bg-[#333] transition-all duration-200 p-2 px-4 rounded-2xl text-white cursor-pointer"
          >
            Add Character
          </button>
        </div>
      </div>
    </dialog>
  );
}

export default AddChar;
