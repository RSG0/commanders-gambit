import { useEffect, useState } from "react";
import '../style/RandomizeCommanderPage.css'
import Header from "../components/Header";
import AddButton from "../components/AddButton";
import BackButton from "../components/BackButton";
import { useLocation } from "react-router-dom";

export default function App() {
  const [cards, setCards] = useState([]); // all fetched cards
  const [commanders, setCommanders] = useState([]); // 3 displayed cards
  const placeholder = "https://via.placeholder.com/200x280?text=No+Image";

  const location = useLocation();
  const {searchPageData} = (location.state || -1); // get commanders from previous page

  const numOfPlayers = Object.keys(searchPageData).length;
  // Fetch cards once when the component mounts
  useEffect(() => {
    console.log("Search Page Data Received:", searchPageData);
    console.log("Number of Players Chose Commanders:", Object.keys(searchPageData).length);

    async function fetchCommanders(pages = 10) { //Need to find solve to long load times
      let allCommanders = [];

      for (let i = 1; i <= pages; i++) {
        const res = await fetch(
          `https://api.magicthegathering.io/v1/cards?page=${i}&pageSize=100`
        );
        const data = await res.json();

        // Filter for Legendary Creatures
        const legendaryCreatures = data.cards.filter(card =>
          card.supertypes?.includes("Legendary") &&
          card.types?.includes("Creature") && 
          card.imageUrl?.includes('') //Removes Empty Images
        );

        allCommanders = allCommanders.concat(legendaryCreatures);
      }

      console.log(`Fetched ${allCommanders.length} commanders`);
      setCards(allCommanders);
      pickRandomCommanders(allCommanders); // show 3 random immediately
    }

    fetchCommanders();
  }, []);


  // Picks 3 random unique cards
  function pickRandomCommanders(sourceCards = cards) {
    if (sourceCards.length === 0) return;

    const chosen = [];
    const usedIndexes = new Set();

    while (chosen.length < 3) {
      const randomIndex = Math.floor(Math.random() * sourceCards.length);
      if (!usedIndexes.has(randomIndex)) {
        usedIndexes.add(randomIndex);
        chosen.push(sourceCards[randomIndex]);
      }
    }
    function pickRandomCommanders()
    {
      const randomIndex = Math.floor(Math.random() * sourceCards.length);
      Object.keys(searchPageData).forEach((key, index) => {
        searchPageData[key] = sourceCards[(randomIndex + index) % sourceCards.length];
      })
    }

    setCommanders(chosen);
  }

  return (
    <>
      <Header/>
      <BackButton back={"/search"} />

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
