import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Characters from "../components/Characters";
import AddChar from "../components/AddChar";
import axios from "axios";

function Home() {
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [characters, setCharacters] = useState([]);
  let apiUrl = "https://6836b640664e72d28e41c577.mockapi.io/char";

  useEffect(() => {
    axios.get(apiUrl).then((res) => setCharacters(res.data));
  }, [openAddDialog]);

  return (
    <section className="home-section">
      <div className="home-content">
        <Navbar openAdd={setOpenAddDialog} />
        <Characters characters={characters} />
        <Footer />
        <AddChar open={openAddDialog} setOpen={setOpenAddDialog} />
      </div>
    </section>
  );
}

export default Home;
