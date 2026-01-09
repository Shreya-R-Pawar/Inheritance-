import { X } from "lucide-react";

const STATUS_FILTERS = ["Live", "Up for Sale", "Sold"];

const YourArtFilters = ({ status, setStatus }) => {
  return (
    <div className="mt-6 flex items-center gap-3">
      {STATUS_FILTERS.map((item) => {
        const isActive = status === item;

        return (
          <button
            key={item}
            onClick={() => setStatus(isActive ? null : item)}
            className={`
              flex items-center gap-2
              px-4 py-2 rounded-full text-sm
              border transition cursor-pointer
              ${
                isActive
                  ? "border-white text-white"
                  : "border-neutral-800 text-gray-500 hover:border-neutral-600"
              }
            `}
          >
            {item}

            {isActive && (
              <X
                size={14}
                className="opacity-70 hover:opacity-100"
              />
            )}
          </button>
        );
      })}
    </div>
  );
};

export default YourArtFilters;
