import React from "react";
import { Link } from "react-router-dom";
import MainLayout from "../../components/MainLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faPlus } from "@fortawesome/free-solid-svg-icons";

function Home() {
  return (
    <MainLayout>
      <h2>Good morning, Guest!</h2>
      <hr />
      <h4 className="pb-2">Here's what you can do right now:</h4>
      <Link 
        to="/available-numbers" 
        className="btn btn-lg btn-primary m-1"
      >
        <FontAwesomeIcon icon={faSearch} /> See all available numbers
      </Link>
      <Link 
        to="/available-numbers/add" 
        className="btn btn-lg btn-primary m-1"
      >
        <FontAwesomeIcon icon={faPlus} /> Add a new available number
      </Link>
    </MainLayout>
  );
}

export default Home;