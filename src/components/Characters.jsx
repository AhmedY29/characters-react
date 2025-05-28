import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import AddChar from "./AddChar";
import toast from "react-hot-toast";
import DeleteChar from "./DeleteChar";

// React Icon
import { CiSearch } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";

function Characters(props) {
  const [filterCharacters, setFilterCharacters] = useState([]);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const [char, setChar] = useState("");

  let apiUrl = "https://6836b640664e72d28e41c577.mockapi.io/char";

  useEffect(() => {
    axios
      .get(`${apiUrl}?name=${search}`)
      .then((res) => {
        setIsLoading(false), setFilterCharacters(res.data);
      })
      .catch(() => setFilterCharacters([]));
  }, [search, props.characters]);

  useEffect(() => {
    let apiUrl = "https://68371fab664e72d28e43a55c.mockapi.io/users";
    axios.get(apiUrl).then((res) => setUsers(res.data));
  }, []);

  useEffect(() => {
    let userInfo = JSON.parse(localStorage.getItem("UserName-Account"));
    setUser(
      users?.find((user) => user?.email == userInfo?.email.toLowerCase())
    );
  }, [users]);

  const handleAddChar = () => {
    if (user) {
      props.setOpenAddDialog(true);
    } else {
      toast.error("You have To Login to add New Character");
      return;
    }
  };

  const handleDeleteOpen = (character) => {
    let userInfo = JSON.parse(localStorage.getItem("UserName-Account"));
    if (!userInfo) {
      toast.error("You have to login");
      return;
    }
    setChar(character);
    props.setOpenDelDialog(true);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className="flex flex-col items-center justify-center w-full ">
      <div className="search flex justify-between gap-10 w-[80%] my-10">
        <div className=" flex items-center gap-3 border rounded-xl focus:border-2 transition-all duration-200">
          <input
            className="w-full p-3 rounded-xl outline-0"
            type="text"
            placeholder="Search For Character"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <CiSearch className="text-4xl" />
        </div>
        <button
          onClick={handleAddChar}
          className="flex items-center gap-3 bg-black hover:bg-[#333] transition-all duration-200 p-2 px-4 rounded-2xl text-white cursor-pointer"
        >
          Add Character <FaPlus />
        </button>
        <AddChar
          id={user?.id}
          open={props.openAddDialog}
          setOpen={props.setOpenAddDialog}
        />
        <DeleteChar
          character={char}
          open={props.openDelDialog}
          setOpen={props.setOpenDelDialog}
        />
      </div>
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center gap-3 mb-5 w-[80%]">
        {filterCharacters.length > 0 ? (
          filterCharacters.map((char) => (
            <div
              key={char.id}
              className={` character flex flex-col justify-between border-3 ${
                char.gender == "male" ? "border-sky-500" : "border-pink-300"
              } p-2 rounded-lg hover:shadow-lg hover:scale-102 transition-all duration-200`}
            >
              <div className="img">
                <img
                  src={char.avatar}
                  alt=""
                  className="h-[15rem] rounded-lg"
                  width={500}
                />
              </div>
              <div className="title">
                <h1 className="text-2xl font-bold">{char.name}</h1>
              </div>
              <div className="gender">
                <h1
                  className={`${
                    char.gender == "male" ? "bg-sky-500" : "bg-pink-300"
                  } uppercase text-center p-1 rounded-lg`}
                >
                  {char.gender}
                </h1>
              </div>
              <div
                className={`delete-btn  ${
                  user?.id == char.authorId ? "block" : "hidden"
                }`}
              >
                <button
                  onClick={() => handleDeleteOpen(char)}
                  className="bg-red-300 p-2 rounded-xl cursor-pointer mt-1"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <h2 className="text-xl">Oops Not Found</h2>
        )}
      </div>
    </section>
  );
}

export default Characters;
