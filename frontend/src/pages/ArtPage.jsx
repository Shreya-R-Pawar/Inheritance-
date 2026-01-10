import { useParams } from "react-router-dom";
import SampleArtData from "../constants/SampleArtData";
import { useMemo } from "react";

const getTimeRemaining = (endDate) => {
  if (!endDate) return null;

  const diff = new Date(endDate) - new Date();
  if (diff <= 0) return null;

  const totalSeconds = Math.floor(diff / 1000);

  return {
    days: Math.floor(totalSeconds / (24 * 3600)),
    hours: Math.floor((totalSeconds % (24 * 3600)) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
  };
};

const ArtPage = () => {
  const { id } = useParams();

  const art = SampleArtData.find((a) => a.id === Number(id));

  const remainingTime = useMemo(
    () =>
      art?.saleType === "auction"
        ? getTimeRemaining(art.endDate)
        : null,
    [art]
  );

  if (!art) {
    return <div className="p-10 text-white">Art not found</div>;
  }

  return (
    <div className="min-h-screen text-white px-8 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* LEFT: Artwork */}
        
        <div className="max-h-[85vh] overflow-y-auto rounded-xl bg-neutral-900">
        <img
            src={art.image}
            alt={art.title}
            className="w-full object-contain cursor-zoom-in"
            onClick={() => window.open(image, "_blank")}
        />
        </div>
           
        {/* RIGHT: Details */}
        <div className="space-y-6">

        {/* Title */}
        <div>
            <h1 className="text-3xl font-semibold">{art.title}</h1>
            <p className="text-sm text-neutral-400 mt-1">
            By {art.artist} · Seller: {art.seller}
            </p>
        </div>

        {/* Sale Type */}
        <span className="inline-block px-3 py-1 text-xs rounded-full bg-neutral-800">
            {art.saleType.toUpperCase()}
        </span>

        {/* Auction Info */}
        {art.saleType === "auction" && remainingTime && (
            <div className="space-y-1">
            <p className="text-lg">
                Current Bid: ₹{art.currentBid}
            </p>
            <p className="text-sm text-neutral-400">
                Base Price: ₹{art.basePrice}
            </p>
            <p className="text-sm text-neutral-400">
                Ends in: {remainingTime.days}d {remainingTime.hours}h{" "}
                {remainingTime.minutes}m
            </p>
            <p className="text-xs text-neutral-500">
                Ends on {new Date(art.endDate).toDateString()}
            </p>
            </div>
        )}

        {/* Direct Sale */}
        {art.saleType === "direct" && (
            <p className="text-2xl font-semibold">₹{art.price}</p>
        )}

        {/* Metadata */}
        <div className="text-sm text-neutral-400 space-y-1">
            <p>Uploaded on {new Date(art.uploadedAt).toDateString()}</p>
            <p>Status: {art.status}</p>
            <p>Likes: {art.likes ?? 0}</p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
            {art.tags.map((tag) => (
            <span
                key={tag}
                className="text-xs px-3 py-1 rounded-full bg-neutral-800"
            >
                #{tag}
            </span>
            ))}
        </div>
        </div>
      </div>
    </div>
  );
};

export default ArtPage;
