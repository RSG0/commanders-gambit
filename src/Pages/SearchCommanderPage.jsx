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


  const [selected, setSelected] = useState([false]);

  const handleClick = (count, commander) => 
  {
    const isAlreadySelected = selected.includes(commander.name);
    
    if (isAlreadySelected)
    {
      // Deselect commander
      setSelected(selected.filter(name => name !== commander.name));

      setPlayerChosenCommanders(prev => {
        const updatedList = (prev[count] || []).filter(c => c.name !== commander.name);
        return {
          ...prev,
          [count]: updatedList,
        };
      });
    }
    else
    {
      setSelected( [...selected, commander.name]);
      console.log("Selected:", commander.name)
      console.log(selected)
      handlePlayerChoice(count, commander);
    }
    
  };

  const handleToggle = (itemDeselected) =>
  {
    const updatedItems = (selected.filter(card => itemDeselected != card))
    setSelected(updatedItems)
  }

  useEffect(() => 
    {
      // console.log(`Player ${playerCount} turn to choose commanders`);
      // console.log(playerChosenCommanders)
    },  [playerCount])



  
  useEffect(() => 
  {
    if (Array.isArray(playerChosenCommanders[1]))
    {
     console.log("Player Chosen Commanders Updated:", playerChosenCommanders[1]);
     console.log("Commander Length:", playerChosenCommanders[1].length)
    }
    else
    {

    }

  }, [playerChosenCommanders[1]]);


  const handleNavigate = () => // should navigate to search page
  {
    navigate("/randomize", {state: {searchPageData: playerChosenCommanders}} );

  }
  const handleNextPlayer = (playerNum) =>
  {
    if (playerChosenCommanders[playerNum] == 0 || playerChosenCommanders[playerNum] == null)
    {
      //Player needs to choose a commander
      console.log("Player needs to select a button")
      return;
    }
    if (playerCount < numOfPlayers)
    {
      setSelected([]); // reset selected for next player
      setPlayerCount( (prev) => prev + 1 ); // increment to next player
    }
    else
    {
      // console.log("All players have chosen their commanders");
      handleNavigate(); // navigate to randomize page
    }
  }


  
  const handlePlayerChoice = (playerNum, commander) => {
    setPlayerChosenCommanders((prev) => {
      const currentPlayerCommanders = prev[playerNum] || [];
      return {
        ...prev, //spreads all existing key pairs
        [playerNum]: [...currentPlayerCommanders, commander],
      };
    });
  };


  useEffect(() => {
    // console.log("Received Num of Players:", mainPageData);
    if  (mainPageData == 1)
    {
      
    }

  }, [mainPageData]);

useEffect(() => {
  async function fetchCommandersStream() {
    const response = await fetch("http://localhost:4000/search");

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });

      let lines = buffer.split("\n");
      buffer = lines.pop(); // incomplete last line stays in buffer

      for (const line of lines) {
        if (!line.trim()) continue;
        

        try {
          const commander = JSON.parse(line);
          console.log("Commander:", commander.name)

          // Add commander immediately to state
        setAllCommanders(prev => {
          // Only append if not already present
          if (prev.some(c => c.name === commander.name)) return prev;
          return [...prev, commander].sort((a, b) => a.name.localeCompare(b.name));
        });
        } catch (err) {
          console.error("Failed to parse line", err);
        }
      }
    }
  }

  fetchCommandersStream();
}, []);



  // Filter results based on search
  const filteredCommanders =  
    allCommanders.filter((commander) =>
      searchTerm.length >= 3 && // if the user input is over 3 characters
      commander.name.toLowerCase().includes(searchTerm.toLowerCase())
    );


  return (
    <div className="p-4 flex justify-center items-center flex-col">
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
          className="border-2 border-gray-400 rounded p-3 w-3/4 text-sm"
        />
      </div>

      {/* Search Results */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {filteredCommanders.map((commander) => (
          <button
            key={commander.id}
            disabled={selected.includes(commander.name)} // Disable button if already selected
            className="w-50 m-1 p-2 flex flex-col items-center rounded bg-white hover:bg-blue-300 focus:bg-blue-300 disabled:bg-blue-200 transition-transform duration-300 ease-in hover:scale-130"
            onClick={() => handleClick(playerCount, commander)} // Pass player number and selected commander
          >
            <img
              // src={commander.image_uris.normal || commander.card_faces?.[0]?.image_uris?.normal}
              src={commander.imageUrl}
              alt={commander.name}
              className="w-40 h-auto"
            />
            <p className="mt-2 font-bold text-center text-black">{commander.name}</p>
          </button>
        ))}
      </div>
      <div className="parent">
        <NextButton handleNext={() =>handleNextPlayer(playerCount)} />
      </div>
    </div>
  );
}
