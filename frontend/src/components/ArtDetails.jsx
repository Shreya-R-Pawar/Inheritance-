import { X } from "lucide-react";

const ArtDetails = ({ art, isOpen, onClose, context }) => {
  if (!isOpen || !art) return null;

  const { remainingTime } = art;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4">
      {/* Modal */}
      <div className="relative bg-neutral-900 w-full max-w-4xl max-h-[90vh] rounded-xl overflow-hidden">

        {/* Close button INSIDE modal */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-neutral-400 hover:text-white"
        >
          <X />
        </button>

        <div className="grid md:grid-cols-2 gap-6 p-6 overflow-y-auto max-h-[90vh]">

          {/* Image container */}
          <div className="flex items-center justify-center bg-neutral-800 rounded-lg">
            <img
              src={art.image}
              alt={art.title}
              className="max-h-[60vh] w-full object-contain rounded-lg"
            />
          </div>

          {/* Info */}
          <div className="flex flex-col gap-5 text-white">

            {/* Title */}
            <div>
              <h1 className="text-2xl font-semibold leading-tight">
                {art.title}
              </h1>
              <p className="text-sm text-neutral-400 mt-1">
                By {art.artist} · Seller: {art.seller}
              </p>
            </div>

            {/* Sale Type */}
            <span className="w-fit text-xs px-3 py-1 rounded-full bg-neutral-700">
              {art.saleType.toUpperCase()}
            </span>

            {/* Auction Info */}
            {art.saleType === "auction" && remainingTime && (
              <div className="space-y-1">
                <p className="text-lg font-medium">
                  Current Bid: ₹{art.currentBid}
                </p>
                <p className="text-sm text-neutral-400">
                  Ends in:{" "}
                  {remainingTime.days}d {remainingTime.hours}h{" "}
                  {remainingTime.minutes}m
                </p>
              </div>
            )}

            {/* Direct Price */}
            {art.saleType === "direct" && (
              <p className="text-2xl font-semibold">
                ₹{art.price}
              </p>
            )}

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {art.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1 bg-neutral-800 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Meta */}
            <div className="text-xs text-neutral-500 space-y-1">
              <p>
                Uploaded on{" "}
                {new Date(art.uploadedAt).toDateString()}
              </p>

              {context !== "explore" && (
                <p>
                  Status:{" "}
                  <span
                    className={
                      art.status === "sold"
                        ? "text-red-400"
                        : "text-green-400"
                    }
                  >
                    {art.status}
                  </span>
                </p>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtDetails;
