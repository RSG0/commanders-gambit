import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeButton from "../components/HomeButton";
import Header from "../components/Header";
import '../style/MainPage.css'

export default function MainPage() 
{
  const [players, setPlayers] = useState(4)
  
  const navigate = useNavigate();


  const handleChange = (event) => // update number of players useState
  {
    setPlayers(event.target.value)
  }

  useEffect(() =>
  {
    // console.log("# of players:", players)
  },[players])

  const Introduction = (() => {
    return(
      <p data-test="introduction" className="flex justify-self-center self-center text mb-1 w-lg p-2 bg-blue-400 rounded-2xl">
Welcome to Commander’s Gambit! A quick and fun way to randomly select your Magic: The Gathering commanders, ensuring every game feels fresh and exciting.      </p>
    )
  })

  const handleNavigate = (numOfPlayers) => // should navigate to search page
  {
    if (!Number(numOfPlayers)) 
      {
        alert("Input must be a number")
        return;
      }
    else if (numOfPlayers <= 1)
    {
      alert("Input must be 2 players or more")
      return
    }
    console.log("Num of Players Selected:", numOfPlayers);
    navigate("/search", {state: {mainPageData: numOfPlayers}} );
  }
  return (
    <>
      <Header />
      {Introduction()}
      <br></br>
      {/* <p>Select how many players are in the game</p> */}
      <div className="flex flex-wrap justify-center items-center bg-blue-400 rounded-2xl  p-5 gap-2">
      <label>Number of Players: </label>
      <input data-test="select-num-of-players" className="input" type="text" onChange={handleChange} value={players}></input>
      <button data-test="main-page-button" className="button" onClick={() => handleNavigate(players)}>Next</button>
      {/* <button onClick={() => handleNavigate(2)} className="main-page-button">2 Players</button>
      <button onClick={() => handleNavigate(3)} className="main-page-button">3 Players</button>
      <button onClick={() => handleNavigate(4)} className="main-page-button">4 Players</button> */}
      </div>
    </>
  );
}