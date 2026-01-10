import { ClockFading } from "lucide-react";
import { useEffect, useState } from "react";

const ArtCard = ({ art, page }) => {
    const [tick, setTick] = useState(0);

    useEffect(() => {
    if (art.saleType !== "auction") return;

    const interval = setInterval(() => {
        setTick((t) => t + 1);
    }, 1000);

    return () => clearInterval(interval);
    }, [art.saleType]);


    const getTimeRemaining = (endDate) => {
        const now = new Date();
        const end = new Date(endDate);
        const diff = end - now;

        if (diff <= 0) {
            return null; // auction ended
        }

        const totalSeconds = Math.floor(diff / 1000);

        const days = Math.floor(totalSeconds / (24 * 3600));
        const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        return { days, hours, minutes, seconds };
    };

    const timeRemaining = art.saleType === "auction" ? getTimeRemaining(art.endDate) : null;

    const auctionEnded = art.saleType === "auction" && timeRemaining === null;
    if (auctionEnded && page === "explore") {
      return null;
    }

    

  return (
    <div className="group cursor-pointer"
      >
      
      {/* Image */}
      <div className="relative overflow-hidden rounded-lg bg-neutral-900">
        <img src={art.image} alt={art.title} className=" w-full h-72 object-cover transition-transform duration-300 group-hover:scale-105 " />

        {/* Sale Type Badge */}
        <span
          className="
            absolute top-3 left-3
            px-3 py-1 text-xs rounded-full
            bg-black/70 text-white
            backdrop-blur
          "
        >
          {art.saleType}
        </span>

        {/* Ends in Badge for Auction only */}
        {art.saleType === "auction" && (
          <div className="absolute top-3 right-3 group/ends">
            <div
              className=" flex items-center gap-1 px-3 py-1 text-xs text-white rounded-full bg-black/70 backdrop-blur overflow-hidden max-w-[80px] group-hover/ends:max-w-[260px] transition-all duration-300 ease-out origin-right"
            >
              

              {/* Compact */}
              {timeRemaining ? (
              <>
                <ClockFading size={14} className="shrink-0 opacity-80" />
                <span className="whitespace-nowrap">
                  {timeRemaining.days}d {timeRemaining.hours}h
                </span>
              </>
              ) : (
                <span className="whitespace-nowrap text-red-400">
                  Ended
                </span>
              )}

              {/* Expanded (only if still live) */}
              {timeRemaining && (
                <span
                  className="
                    whitespace-nowrap
                    opacity-0
                    group-hover/ends:opacity-100
                    transition-opacity duration-200 delay-100
                  "
                >
                  {timeRemaining.minutes}m {timeRemaining.seconds}s
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="mt-3 space-y-1">
        <h3 className="font-serif text-lg text-white">
          {art.title}
        </h3>

        <p className="text-sm text-gray-400">
          {art.artist}
        </p>

        <p className="text-sm text-gray-300">
          {art.saleType === "auction" && <span className="text-gray-500">Current Bid: </span>}
          {art.price} {art.currency}
        </p>
      </div>
    </div>
  );
};

export default ArtCard;
