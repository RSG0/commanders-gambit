import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../MainPage.css"

export default function MainPage() {
        
  const navigate = useNavigate();

  const handleNavigate = () => // should navigate to search page
  {
    navigate("/search");
  }
  return (
    <>
      <p className="font-bold text-center text-5xl mb-5">
        Commander's Gambit
      </p>
      <p>Select how many players are in the game</p>
      <div className="flex flex-wrap justify-center items-center bg-blue-400 p-5 gap-2">
        {console.log("Dragon")}
      <button onClick={handleNavigate} className="button">2 Players</button>
      <button onClick={handleNavigate} className="button">3 Players</button>
      <button onClick={handleNavigate} className="button">4 Players</button>
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