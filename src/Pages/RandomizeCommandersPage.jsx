import { useEffect, useState } from "react";
import '../style/RandomizeCommanderPage.css'
import Header from "../components/Header";
import AddButton from "../components/AddButton";
import BackButton from "../components/BackButton";
import { useLocation } from "react-router-dom";
import HomeButton from "../components/HomeButton";

export default function App() {
  const [cards, setCards] = useState([]); // all fetched cards
  const [commanders, setCommanders] = useState([]); // 3 displayed cards
  const placeholder = "https://via.placeholder.com/200x280?text=No+Image";

  const location = useLocation();
  const {searchPageData} = (location.state || -1); // get commanders from previous page
  //NOTE: Grabbing ALL COMMANDER INFORMATION, not just names

  const numOfPlayers = Object.keys(searchPageData).length;

  // On component mount, pick initial random commanders
  useEffect(() => {
    pickRandomCommanders();
  }, []);

  function pickRandomCommanders()
    {
      setCommanders([]); // reset commanders
      for (let i = 0; i < numOfPlayers; i++)
      {
        const randomIndex = Math.floor(Math.random() * searchPageData[i+1].length);
        setCommanders( (prev) => [...prev, searchPageData[i+1][randomIndex]] );
        // console.log(`Player ${i+1} Random Commander:`, searchPageData[i+1][randomIndex]);
      }
    }

  return (
    <>
      <Header/>
      <div className="display flex justify-center text-center">
        <BackButton back={"/search"} />
        <HomeButton />
      </div>

      <div className="flex flex-wrap justify-center items-center bg-blue-400 p-5 gap-2">
        {commanders.map((card, idx) => (
          <img
            key={idx}
            className="bg-transparent w-60 h-auto"
            src={card.imageUrl || placeholder}
            alt={card.name || `Commander ${idx + 1}`}
          />
        ))}
      </div>

      <button
        className="m-2 p-2 bg-red-500 text-white rounded-lg hover:bg-red-700"
        onClick={() => pickRandomCommanders()}
      >
        Randomize
      </button>
    </>
  );
}
