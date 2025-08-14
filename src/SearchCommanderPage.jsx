import { useEffect, useState } from "react";

export default function SearchCommanderPage() {
  const [allCommanders, setAllCommanders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch Legendary Creatures
    useEffect(() => {
    async function fetchCommanders(pages = 3) {
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
      <p className="font-bold text-center text-5xl mb-5">Commander's Gambit</p>

      {/* Search Bar */}
      <div className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="Search for a commander..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-400 rounded p-2 w-1/2"
        />
      </div>

      {/* Search Results */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {filteredCommanders.map((commander) => (
          <div
            key={commander.id}
            className="bg-white shadow p-2 flex flex-col items-center rounded"
          >
            <img
              src={commander.imageUrl}
              alt={commander.name}
              className="w-40 h-auto rounded"
            />
            <p className="mt-2 font-bold text-center text-black">{commander.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
