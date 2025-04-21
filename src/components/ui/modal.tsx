import { useToolContext } from "@/context/context";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { ITool } from "@/interfaces/ITool";
import { Heart } from "lucide-react";

export default function ToolModal({ tool, open, onClose }: { tool: ITool, open: boolean, onClose: () => void }) {
  const { recentTools, addRecentTool, favoriteTools, toggleFavoriteTool } = useToolContext();

  const isFavorite = favoriteTools.some((fav) => fav.app_id === tool.app_id);

  const handleAccess = () => {
    if (tool) {
      addRecentTool(tool);
      window.open(tool.link, "_blank");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md flex flex-col items-center gap-4">
        {tool && (
          <>
            <div className="flex items-center gap-6 h-40">
              <div
                style={{ backgroundColor: tool.color + "20" }}
                className="w-32 h-32 rounded-full flex-shrink-0 flex items-center justify-center"
              >
                <img src={tool.icon} alt={tool.name} className="w-16 h-16" />
              </div>
              <div className="flex flex-col gap-3">
                <span className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md text-sm w-40 flex justify-center">
                  {tool.name}
                </span>
                <div className="flex w-40 gap-2">
                  <button
                    onClick={handleAccess}
                    className="flex-1 bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-full text-sm"
                  >
                    Acessar
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavoriteTool(tool);
                    }}
                    className="w-10 h-10 flex items-center justify-center bg-gray-400 hover:bg-gray-500 rounded-full"
                  >
                    {isFavorite ? (
                      <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                    ) : (
                      <Heart className="w-5 h-5 text-white" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <h3 className="text-sm text-black-500 mt-4">Últimas ferramentas visualizadas</h3>
            <Carousel className="w-full max-w-sm">
              <CarouselContent>
                {recentTools.map((tool, index) => (
                  <CarouselItem key={index} className="basis-1/3 text-center">
                    <div className="p-2 flex flex-col items-center">
                      <div style={{ backgroundColor: tool.color + "20" }} className="w-20 h-20 rounded-full">
                        <img src={tool.icon} alt={tool.name} />
                      </div>
                      <span className="text-xs mt-2 block truncate">{tool.name}</span>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
