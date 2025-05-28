import React, { useEffect, useState } from "react";
import Characters from "../components/Characters";
import axios from "axios";

function Home() {
  const [characters, setCharacters] = useState([]);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openDelDialog, setOpenDelDialog] = useState(false);
  useEffect(() => {
    let apiUrl = "https://6836b640664e72d28e41c577.mockapi.io/char";
    axios.get(apiUrl).then((res) => setCharacters(res.data));
  }, [openAddDialog, openDelDialog]);
  return (
    <section className="home-section">
      <div className="home-content">
        <Characters
          characters={characters}
          openAddDialog={openAddDialog}
          setOpenAddDialog={setOpenAddDialog}
          openDelDialog={openDelDialog}
          setOpenDelDialog={setOpenDelDialog}
        />
      </div>
    </section>
  );
}

export default Home;
