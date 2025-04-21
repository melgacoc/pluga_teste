import { createContext, useContext, useEffect, useState } from "react";
import { fetchData } from "../utils/functions";
import { ITool } from "@/interfaces/ITool";

export type Tool = {
  app_id: string;
  name: string;
  color: string;
  icon: string;
  link: string;
};

type ToolContextType = {
  tools: Tool[];
  recentTools: Tool[];
  filteredTools: Tool[];
  fetchTools: () => Promise<void>;
  addRecentTool: (tool: Tool) => void;
  setFilteredTools: React.Dispatch<React.SetStateAction<Tool[]>>;
  loading: boolean;
  error: string | null;
  toggleFavoriteTool: (tool: Tool) => void;
  favoriteTools: Tool[];
  attFavoriteTools: (tools: Tool[]) => void;
};

const ToolContext = createContext<ToolContextType | undefined>(undefined);

const LOCAL_STORAGE_EXPIRATION = 12 * 60 * 60 * 1000;

const isExpired = (timestamp: number) => {
  return Date.now() - timestamp > LOCAL_STORAGE_EXPIRATION;
};

export const ToolProvider = ({ children }: { children: React.ReactNode }) => {
  const [tools, setTools] = useState<Tool[]>([]);
  const [recentTools, setRecentTools] = useState<Tool[]>([]);
  const [filteredTools, setFilteredTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [favoriteTools, setFavoriteTools] = useState<Tool[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchTools = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchData();
      setTools(result);
      setFilteredTools(result);
      setLoading(false);
    } catch (err) {
      setError("Erro ao carregar ferramentas. Tente novamente mais tarde.");
      setLoading(false);
    }
  };

  const loadRecentTools = () => {
    const stored = localStorage.getItem("recentTools");
    if (stored) {
      const { data, timestamp } = JSON.parse(stored);
      if (!isExpired(timestamp)) {
        setRecentTools(data);
      } else {
        localStorage.removeItem("recentTools");
      }
    }
  };

  const loadFavoriteTools = () => {
    const stored = localStorage.getItem("favoriteTools");
    if (stored) {
      const { data, timestamp } = JSON.parse(stored);
      if (!isExpired(timestamp)) {
        setFavoriteTools(data);
      } else {
        localStorage.removeItem("favoriteTools");
      }
    }
  };

  const saveRecentTools = (tools: Tool[]) => {
    const timestamp = Date.now();
    localStorage.setItem(
      "recentTools",
      JSON.stringify({ data: tools, timestamp })
    );
  };

  const saveFavoriteTools = (tools: Tool[]) => {
    const timestamp = Date.now();
    localStorage.setItem(
      "favoriteTools",
      JSON.stringify({ data: tools, timestamp })
    );
  };

  const addRecentTool = (tool: Tool) => {
    const updated = [tool, ...recentTools].slice(0, 10);
    saveRecentTools(updated);
    setRecentTools(updated);
  };

  const attFavoriteTools = (tools: Tool[]) => {
    const updated = [tools[0], ...favoriteTools.filter(fav => fav.app_id !== tools[0].app_id)];
    saveFavoriteTools(updated);
    setFavoriteTools(updated);
  };

  const toggleFavoriteTool = (tool: ITool) => {
    const isFav = favoriteTools.some((fav) => fav.app_id === tool.app_id);
    if (isFav) {
      const updated = favoriteTools.filter((fav) => fav.app_id !== tool.app_id);
      saveFavoriteTools(updated);
      setFavoriteTools(updated);
    } else {
      const updated = [...favoriteTools, tool];
      saveFavoriteTools(updated);
      setFavoriteTools(updated);
    }
  };

  useEffect(() => {
    fetchTools();
    loadRecentTools();
    loadFavoriteTools();
  }, []);

  return (
    <ToolContext.Provider
      value={{
        tools,
        recentTools,
        filteredTools,
        fetchTools,
        addRecentTool,
        setFilteredTools,
        loading,
        favoriteTools,
        toggleFavoriteTool,
        attFavoriteTools,
        error,
      }}
    >
      {children}
    </ToolContext.Provider>
  );
};

export const useToolContext = () => {
  const context = useContext(ToolContext);
  if (!context) {
    throw new Error("useToolContext must be used within a ToolProvider");
  }
  return context;
};
