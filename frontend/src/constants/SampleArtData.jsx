import art1 from "../assets/sampleArts/art1.jpg";
import art2 from "../assets/sampleArts/art2.jpg";
import art3 from "../assets/sampleArts/art3.jpg";
import art4 from "../assets/sampleArts/art4.jpg";
import art5 from "../assets/sampleArts/art5.jpg";
import art6 from "../assets/sampleArts/art6.jpg";

const SampleArtData = [
  {
    id: 1,
    title: "Ethereal Drift",
    artist: "A. Rao",
    seller: "A. Rao",
    image: art1,

    saleType: "auction",
    price: 2.4,
    currency: "ETH",
    currentBid: 2.9,
    endDate: "2026-01-10T09:00:00Z",

    genre: "fantasy",
    tags: ["fantasy", "sci-fi", "digital"],

    uploadedAt: "2026-01-02",
    status: "unsold",
  },
  {
    id: 2,
    title: "Silent Protagonist",
    artist: "N. Verma",
    seller: "N. Verma",
    image: art2,

    saleType: "direct",
    price: 1.1,
    currency: "ETH",

    genre: "character",
    tags: ["character", "portrait"],

    uploadedAt: "2026-01-01",
    status: "unsold",
  },
  {
    id: 3,
    title: "Concept No. 07",
    artist: "K. Mehta",
    seller: "K. Mehta",
    image: art3,

    saleType: "fractional",
    price: 0.25,
    currency: "ETH",

    genre: "concept",
    tags: ["concept", "environment"],

    uploadedAt: "2025-12-30",
    status: "sold",
  },
  {
    id: 4,
    title: "Fragmented Thought",
    artist: "R. Sharma",
    seller: "R. Sharma",
    image: art4,

    saleType: "auction",
    price: 3.2,
    currency: "ETH",
    currentBid: 3.8,
    endDate: "2026-01-11T18:30:00Z",

    genre: "abstract",
    tags: ["abstract", "modern"],

    uploadedAt: "2026-01-03",
    status: "unsold",
  },
  {
    id: 5,
    title: "Still Form",
    artist: "S. Iyer",
    seller: "S. Iyer",
    image: art5,

    saleType: "direct",
    price: 0.9,
    currency: "ETH",

    genre: "modern",
    tags: ["minimal", "modern"],

    uploadedAt: "2025-12-29",
    status: "sold",
  },
  {
    id: 6,
    title: "Ink & Light",
    artist: "P. Khanna",
    seller: "P. Khanna",
    image: art6,

    saleType: "fractional",
    price: 0.4,
    currency: "ETH",

    genre: "illustration",
    tags: ["illustration", "ink"],

    uploadedAt: "2026-01-01",
    status: "unsold",
  },
];

export default SampleArtData;
