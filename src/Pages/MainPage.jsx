import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeButton from "../components/HomeButton";
import Header from "../components/Header";
import '../style/MainPage.css'

export default function MainPage() {

  
  const navigate = useNavigate();

  const handleNavigate = (numOfPlayers) => // should navigate to search page
  {
    console.log("Num of Players Selected:", numOfPlayers);
    navigate("/search", {state: {mainPageData: numOfPlayers}} );
  }
  return (
    <>
      <Header />
      {/* <HomeButton /> */}
      <p>Select how many players are in the game</p>
      <div className="flex flex-wrap justify-center items-center bg-blue-400 p-5 gap-2">
        {console.log("Dragon")}
      <button onClick={() => handleNavigate(2)} className="main-page-button">2 Players</button>
      <button onClick={() => handleNavigate(3)} className="main-page-button">3 Players</button>
      <button onClick={() => handleNavigate(4)} className="main-page-button">4 Players</button>
      </div>
    </>
  );
}


/*
        {commanders.map((card, idx) => (
          <img
            key={idx}
            className="bg-transparent w-60 h-auto"
            src={card.imageUrl || placeholder}
            alt={card.name || `Commander ${idx + 1}`}
          />
        ))}
*/