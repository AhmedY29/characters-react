import axios from "axios";
import React, { useEffect, useState } from "react";

function Characters(props) {
  const [filterCharacters, setFilterCharacters] = useState([]);
  const [search, setSearch] = useState("");
  let apiUrl = "https://6836b640664e72d28e41c577.mockapi.io/char";

  useEffect(() => {
    axios
      .get(`${apiUrl}?name=${search}`)
      .then((res) => setFilterCharacters(res.data))
      .catch((err) => setFilterCharacters([]));
  }, [search, props.characters]);

  console.log(filterCharacters);

  return (
    <section className="flex flex-col items-center justify-center w-full ">
      <div className="search w-[50%] my-10">
        <input
          className="w-full p-3 rounded-xl"
          type="text"
          placeholder="Search For Character"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      </div>
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center gap-3 w-[80%]">
        {filterCharacters.length > 0 ? (
          filterCharacters.map((char) => (
            <div key={char.id} className="character">
              <div className="img">
                <img src={char.avatar} alt="" />
              </div>
              <div className="title">
                <h1>{char.name}</h1>
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
