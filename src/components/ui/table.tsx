import { useState, useCallback } from "react";
import { useToolContext } from "../../context/context";
import ToolModal from "./modal";
import ToolFilter from "./filter";
import { ITool } from "@/interfaces/ITool";
import { Heart } from "lucide-react";
import React from 'react'

const ITEMS_PER_PAGE = 12;

export default function ToolTable() {
  const { filteredTools, favoriteTools } = useToolContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTool, setSelectedTool] = useState<ITool | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const totalPages = Math.ceil(filteredTools.length / ITEMS_PER_PAGE);
  const paginatedData = filteredTools.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const isFavorite = useCallback(
    (tool: ITool) => {
      return favoriteTools.some((fav) => fav.app_id === tool.app_id);
    },
    [favoriteTools]
  );

  return (
    <div className="p-4">
      <ToolFilter />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" data-testid="tool-table">
        {paginatedData.map((tool: ITool) => (
          <div
            key={tool.app_id}
            onClick={() => {
              setSelectedTool(tool);
              setIsModalOpen(true);
            }}
            className="cursor-pointer relative flex flex-col items-center border rounded-xl p-4 hover:shadow-lg transition"
            style={{ backgroundColor: tool.color + "20" }}
          >
            {isFavorite(tool) && (
              <div className="absolute top-2 right-2">
                <Heart className="text-red-500 fill-red-500 w-5 h-5" />
              </div>
            )}

            <img src={tool.icon} alt={tool.name} className="w-12 h-12 mb-2" />
            <span className="text-center font-medium">{tool.name}</span>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-4 mt-6">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Anterior
        </button>
        <span className="self-center">
          Página {currentPage} de {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Próxima
        </button>
      </div>

      {selectedTool && (
        <ToolModal
          tool={selectedTool}
          open={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
          }}
        />
      )}
    </div>
  );
}
