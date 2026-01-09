import { useRef } from "react";

const TABS = ["Your Art", "Purchased", "Favorites"];

const StudioTabs = ({ activeTab, setActiveTab }) => {
  const prevTab = useRef(activeTab);

  return (
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
  );
};

export default StudioTabs;
