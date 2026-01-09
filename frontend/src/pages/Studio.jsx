import React from 'react'
import { useState } from 'react';
import StudioTabs from '../components/studio/StudioTabs'
import YourArt from '../components/studio/YourArt'
import Purchased from '../components/studio/Purchased'
import Favorites from '../components/studio/Favorites'


const Studio = () => {

  const [activeTab, setActiveTab] = useState(0);
  return (

    <div className="min-h-screen px-10 py-6 text-white">
      <h1 className="text-3xl text-neutral-300 mt-1 mb-4 font-serif">
        Manage your Creations & Collections
      </h1>

      <StudioTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {activeTab === 0 && <YourArt />}
      {activeTab === 1 && <Purchased />}
      {activeTab === 2 && <Favorites />}

      
    </div>
  )
}

export default Studio