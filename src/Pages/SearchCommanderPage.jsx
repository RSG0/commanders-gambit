import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import '../style/SearchCommanderPage.css'
import Header from "../components/Header";
import AddButton from "../components/AddButton";
import BackButton from "../components/BackButton";


export default function SearchCommanderPage() 
{

  const [allCommanders, setAllCommanders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const {mainPageData} = (location.state || {}); // get number of players passed from main page

  const numOfPlayers = mainPageData

  let playerCount = 0

  const [selected, setSelected] = useState(false);

  const handleClick = (commander) => {
    handlePlayerChoice(playerCount, commander);
    setSelected(true);
  };


  const playerChosenCommanders =
  {
    playerNum: 0,
    commanders: [],
  }
  
  useEffect(() => 
  {
    console.log("Player Chosen Commanders Updated:", playerChosenCommanders);
  }, [playerChosenCommanders.commanders]);


  const handleNavigate = () => // should navigate to search page
  {
    navigate("/randomize");
  }
  const handleNextPlayer = () =>
  {
    if (playerCount < numOfPlayers)
    {
      playerCount++;

    }
    else
    {
      console.log("All players have chosen their commanders");
      handleNavigate(); // navigate to randomize page
    }
  }

  const handlePlayerChoice = (playerNum, commander) =>
  {
    const alreadyChosen = playerChosenCommanders.commanders.some(
      // (c) => c.commander.name === commander
      (c) => 
      {
        console.log("Commander Name:", commander.name);
        if (c.commander.name === commander.name) return true; 
        else return false;
      }
    );

    if (alreadyChosen) {
      console.log("Already Chosen:", alreadyChosen); // true
      console.log("Player already chose this commander");
      return; // stop early
    }
      const newCommander = {playerNum, commander};
    playerChosenCommanders.commanders.push(newCommander);
    // console.log("Player Chosen Commander:", playerChosenCommanders.commanders);
  }

  useEffect(() => {
    console.log("Received Num of Players:", mainPageData);
    if  (mainPageData == 1)
    {
      
    }

  }, [mainPageData]);

  // Fetch Legendary Creatures
    useEffect(() => {
    async function fetchCommanders(pages = 2) {
        let commanders = [];
        const seenNames = new Set(); // track commander names already added

        for (let i = 1; i <= pages; i++) {
        const res = await fetch(
            `https://api.magicthegathering.io/v1/cards?page=${i}&pageSize=100&type=creature&supertypes=legendary`
        );
        const data = await res.json();

        // Only add commanders with an image URL and unique name
        const legendaryCreatures = data.cards.filter((card) => 
            {
            const isLegendaryCreature =
            card.supertypes?.includes("Legendary") &&
            card.types?.includes("Creature") &&
            card.imageUrl;

            const isUnique = !seenNames.has(card.name); // check if name already exists

            if (isLegendaryCreature && isUnique) 
            {
                seenNames.add(card.name); // mark name as seen
                return true;
            }
            return false;
        });

        commanders = commanders.concat(legendaryCreatures);
        }

        setAllCommanders(commanders);
        console.log(`Fetched ${commanders.length} unique commanders`);
    }

    fetchCommanders();
    }, []);

  // Filter results based on search
  const filteredCommanders = allCommanders.filter((commander) =>
    commander.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4">
      <Header/>
      {/* Search Bar */}
      <p>Player {playerCount} - Search for your commander(s):</p>
      <div className="flex justify-center items-center mb-4">
        <BackButton back={"/home"} />

        <input
          type="text"
          placeholder="Search for a commander..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border-2 border-gray-400 rounded p-3 w-1/2 text-sm"
        />
      </div>

      {/* Search Results */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {filteredCommanders.map((commander) => (
          <button
            key={commander.id}
            className="p-2 flex flex-col items-center rounded bg-white hover:bg-gray-200 focus:bg-gray-200 transition-colors duration-500 ease-in"
            onClick={() => {handlePlayerChoice(playerCount, commander)}} // Pass player number and selected commander
          >
            <img
              src={commander.imageUrl}
              alt={commander.name}
              className="w-40 h-auto rounded"
            />
            <p className="mt-2 font-bold text-center text-black">{commander.name}</p>
          </button>
        ))}
      </div>
      <div className="parent">
        <AddButton />
        <button onClick={() => handleNextPlayer()} className="button">Next</button>
      </div>
    </div>
  );
}
