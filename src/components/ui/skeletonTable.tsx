export function ToolTableSkeleton() {
    return (
      <div className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 12 }).map((_, index) => (
            <div
              key={index}
              className="cursor-pointer flex flex-col items-center border rounded-xl p-4 animate-pulse"
            >
              <div className="w-12 h-12 mb-2 bg-gray-300 rounded-full" />
              <div className="w-24 h-4 bg-gray-300 rounded mt-2" />
            </div>
          ))}
        </div>
      </div>
    );
}