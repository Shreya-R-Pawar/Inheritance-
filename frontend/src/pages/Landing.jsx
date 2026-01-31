import { useEffect, useState } from "react";
import SignUp from "./SignUp";

import art1 from "../assets/sampleArts/art1.jpg";
import art2 from "../assets/sampleArts/art2.jpg";
import art3 from "../assets/sampleArts/art3.jpg";
import art4 from "../assets/sampleArts/art4.jpg";
import art5 from "../assets/sampleArts/art5.jpg";
import art6 from "../assets/sampleArts/art6.jpg";
import art7 from "../assets/sampleArts/art7.jpg";
import art8 from "../assets/sampleArts/art8.jpg";
import art9 from "../assets/sampleArts/art9.jpg";

const images = [art1, art2, art3, art4, art5, art6, art7, art8, art9];

const boxes = [
    // top-left cluster
    { top: "8%", left: "30%", size: 90},
    { top: "20%", left: "38%", size: 120 },

    // top-right cluster
    { top: "7%", left: "58%", size: 80 },
    

    { top: "64%", left: "32%", size: 130 },

    // center connector
    { top: "35%", left: "46%", size: 180 },

    // mid-right
    { top: "20%", left: "64%", size: 140 },

    // bottom-left
    

    // bottom-right (largest)
    { top: "62%", left: "60%", size: 160 },

    { top: "9%", left: "80%", size: 60 },
];


export default function App() {
    const [authMode, setAuthMode] = useState(null);

    const [activeImages, setActiveImages] = useState(
        boxes.map(() => randomImage())
    );

    useEffect(() => {
        boxes.forEach((_, index) => loopImageChange(index));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function randomImage() {
        return images[Math.floor(Math.random() * images.length)];
    }

    function loopImageChange(index) {
        const delay = Math.random() * 8000 + 4000; // 8–20 sec

        setTimeout(() => {
            setActiveImages((prev) => {
            const updated = [...prev];
            updated[index] = randomImage();
            return updated;
            });

            loopImageChange(index);
        }, delay);
    }
    return (
        <div className="bg-black min-h-screen">

            {/* NAVBAR */}
            <nav className="bg-black sticky top-0 z-50">
                <div className="mx-auto px-8 py-4 flex items-center justify-between">
                    <h1 className="text-white tracking-wider">CURA</h1>
                    <div className="flex gap-4">
                        <button onClick={() => setAuthMode("login")} className="text-white/70 hover:text-white">Login</button>
                        <button onClick={() => setAuthMode("signup")} className="px-6 py-2 bg-gray-700 text-white rounded hover:bg-gray-600">
                            Sign Up
                        </button>
                    </div>
                </div>
            </nav>

            {/* Modal */}
            {authMode && (
                <SignUp mode={authMode} onClose={() => setAuthMode(null)} switchMode={(mode) => setAuthMode(mode)} />
            )}

            {/* HERO */}
            <main className="relative overflow-hidden">
                <div className="mx-auto px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 py-32">

                        {/* LEFT TEXT */}
                        <div className="space-y-8 lg:pl-20 text-center lg:text-left">
                            <h2 className="text-white max-w-lg leading-tight text-5xl lg:text-6xl mx-auto lg:mx-0">
                                Bid, Buy and Own Exclusive Digital Art
                            </h2>

                            <p className="text-gray-400 max-w-md mx-auto lg:mx-0">
                                Discover a curated marketplace where creativity meets blockchain technology.
                                Explore unique digital masterpieces from talented artists around the world.
                                Collect, trade, and showcase your exclusive NFT collection.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                <button className="px-8 py-3 bg-gray-700 rounded hover:bg-gray-600">
                                    Explore Gallery
                                </button>
                                <button className="px-8 py-3 border border-gray-700 rounded hover:bg-gray-700">
                                    Get Started
                                </button>
                            </div>
                        </div>

                        {/* RIGHT COLLAGE */}
                        <div className="relative w-full h-[520px] -mt-10">
                            {boxes.map((box, i) => (
                                <div
                                    key={i}
                                    className="absolute overflow-hidden shadow-md"
                                    style={{
                                        top: box.top,
                                        left: box.left,
                                        width: box.size,
                                        height: box.size,
                                    }}
                                >
                                    <img
                                        src={activeImages[i]}
                                        className="w-full h-full object-cover"
                                        alt=""
                                    />
                                </div>
                            ))}
                        </div>


                    </div>
                </div>
            </main>
        </div>
    );
}
