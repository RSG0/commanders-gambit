import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeButton from "../components/HomeButton";
import Header from "../components/Header";
import '../style/MainPage.css'

export default function MainPage() {

  
  const navigate = useNavigate();

  const Introduction = (() => {
    return(
      <p className="flex justify-self-center self-center text mb-1 w-lg p-2 bg-blue-400 rounded-2xl">
Welcome to Commander’s Gambit! A quick and fun way to randomly select your Magic: The Gathering commanders, ensuring every game feels fresh and exciting.      </p>
    )
  })

  const handleNavigate = (numOfPlayers) => // should navigate to search page
  {
    console.log("Num of Players Selected:", numOfPlayers);
    navigate("/search", {state: {mainPageData: numOfPlayers}} );
  }
  return (
    <>
      <Header />
      {Introduction()}
      <p>Select how many players are in the game</p>
      <div className="flex flex-wrap justify-center items-center bg-blue-400 rounded-2xl  p-5 gap-2">
      <button onClick={() => handleNavigate(2)} className="main-page-button">2 Players</button>
      <button onClick={() => handleNavigate(3)} className="main-page-button">3 Players</button>
      <button onClick={() => handleNavigate(4)} className="main-page-button">4 Players</button>
      </div>
    </>
  );
}