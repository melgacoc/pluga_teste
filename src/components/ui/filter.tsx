import { useEffect, useState } from "react";
import { useToolContext } from "../../context/context";
import { Input } from "@/components/ui/input";
import { Heart } from "lucide-react";

export default function ToolFilter() {
  const { tools, setFilteredTools, filteredTools, favoriteTools } = useToolContext();
  const [search, setSearch] = useState("");
  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => {
    let filtered = tools;

    if (search) {
      filtered = filtered.filter((tool) =>
        tool.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (showFavorites) {
      filtered = filtered.filter((tool) =>
        favoriteTools.some((fav) => fav.app_id === tool.app_id)
      );
    }

    setFilteredTools(filtered);
  }, [search, tools, showFavorites, favoriteTools, setFilteredTools]);

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Input
            type="text"
            placeholder="Filtre pelo nome..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md"
          />
          <button
            onClick={() => setShowFavorites((prev) => !prev)}
            className="w-10 h-10 flex items-center justify-center bg-gray-400 hover:bg-gray-500 rounded-full"
          >
            {showFavorites ? (
              <Heart className="w-5 h-5 text-red-500 fill-red-500" />
            ) : (
              <Heart className="w-5 h-5 text-white" />
            )}
          </button>
        </div>
        <p className="text-sm text-gray-500 ml-4">
          {tools.length === 0
            ? "Carregando ferramentas..."
            : `Exibindo ${search ? `${filteredTools.length} de ` : ""}${tools.length} ferramentas`}
        </p>
      </div>
    </div>
  );
}
