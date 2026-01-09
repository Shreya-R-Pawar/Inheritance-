import React from 'react'
import { useState } from 'react';
import { useRef } from "react";
import { X } from "lucide-react"



const Studio = () => {

  const [activeTab, setActiveTab] = useState(0);
  const prevTab = useRef(activeTab);
  const TABS = ["Your Art", "Purchased", "Favorites"];
  const STATUS_FILTERS = ["Live", "Up for Sale", "Sold"];
  const [status, setStatus] = useState(null);


  return (

    <div className="min-h-screen px-10 py-6 text-white">
      <h1 className="text-3xl text-neutral-300 mt-1 mb-4 font-serif">
        Manage your Creations & Collections
      </h1>

      {/*Tabs*/}
      <div className="border-b border-white/10 mt-8">
        <div className="grid grid-cols-3 w-full">
          {TABS.map((label, index) => {
            const isActive = activeTab === index;

            // determine direction PER TAB
            const isMovingRight = activeTab > prevTab.current;

            return (
              <button
                key={label}
                onClick={() => {
                  prevTab.current = activeTab;
                  setActiveTab(index);
                }}
                className="relative flex justify-center pb-4 text-sm tracking-wide"
              >
                <span
                  className={`transition-colors ${
                    isActive
                      ? "text-white"
                      : "text-white/50 hover:text-white"
                  }`}
                >
                  {label}
                </span>

                {/* underline (always rendered) */}
                <span
                  className="
                    pointer-events-none
                    absolute bottom-0 h-[2px] w-1/3 bg-white
                    transition-transform duration-200 ease-out
                    will-change-transform
                  "
                  style={{
                    transform: `scaleX(${isActive ? 1 : 0})`,
                    transformOrigin: isMovingRight
                      ? "left center"
                      : "right center"
                  }}
                />
              </button>
            );
          })}
        </div>
      </div>

      {activeTab === 0 && (
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
      )}
      {activeTab === 1 && <Purchased />}
      {activeTab === 2 && <Favorites />}

      
    </div>
  )
}

export default Studio