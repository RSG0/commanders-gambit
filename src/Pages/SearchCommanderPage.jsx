import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import '../style/SearchCommanderPage.css'
import Header from "../components/Header";
import AddButton from "../components/AddButton";
import BackButton from "../components/BackButton";
import NextButton from "../components/NextButton";


export default function SearchCommanderPage() 
{

  const [allCommanders, setAllCommanders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [playerCount, setPlayerCount] = useState(1); // track which player's turn it is to choose
  const [playerChosenCommanders, setPlayerChosenCommanders] = useState({});


  const navigate = useNavigate();
  const location = useLocation();
  const {mainPageData} = (location.state || 1); // get number of players passed from main page. Default is 2

  const numOfPlayers = mainPageData


  const [selected, setSelected] = useState([]);

  const handleClick = (count, commander) => {
    setSelected( [...selected, commander.name]);
    handlePlayerChoice(count, commander);
  };

  useEffect(() => 
    {
      console.log(`Player ${playerCount} turn to choose commanders`);
      console.log(playerChosenCommanders)
    },  [playerCount])



  
  useEffect(() => 
  {
    console.log("Player Chosen Commanders Updated:", playerChosenCommanders);
  }, [playerChosenCommanders.commanders]);


  const handleNavigate = () => // should navigate to search page
  {
    navigate("/randomize", {state: {searchPageData: playerChosenCommanders}} );

  }
  const handleNextPlayer = () =>
  {
    if (playerCount < numOfPlayers)
    {
      setSelected([]); // reset selected for next player
      setPlayerCount( (prev) => prev + 1 ); // increment to next player
    }
    else
    {
      console.log("All players have chosen their commanders");
      handleNavigate(); // navigate to randomize page
    }
  }


  
  const handlePlayerChoice = (playerNum, commander) => {
    setPlayerChosenCommanders((prev) => {
      const currentPlayerCommanders = prev[playerNum] || [];
      return {
        ...prev,
        [playerNum]: [...currentPlayerCommanders, commander],
      };
    });
  };


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
            disabled={selected.includes(commander.name)} // Disable button if already selected
            className="p-2 flex flex-col items-center rounded bg-white hover:bg-blue-300 focus:bg-blue-300 disabled:bg-blue-200 transition-colors duration-500 ease-in"
            onClick={() => handleClick(playerCount, commander)} // Pass player number and selected commander
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
        <NextButton handleNext={() =>handleNextPlayer()} />
      </div>
    </div>
  );
}
