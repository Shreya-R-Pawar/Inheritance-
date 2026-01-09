import ArtCard from "./ArtCard";

const ArtGrid = ({ artworks }) => {
  return (
    <div
      className="
        mt-10
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-4
        gap-6
      "
    >
      {artworks.map((art) => (
        <ArtCard key={art.id} art={art} />
      ))}
    </div>
  );
};

export default ArtGrid;
