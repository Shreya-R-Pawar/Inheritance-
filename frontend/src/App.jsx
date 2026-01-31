import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Studio from "./pages/Studio";
import Analytics from "./pages/Analytics";
import Profile from "./pages/Profile";
import ArtPage from "./pages/ArtPage";
import SignUp from "./pages/SignUp";
import MainLayout from "./MainLayout";
import DirectSaleCheckout from "./pages/DirectSaleCheckout";
import AuctionCheckout from "./pages/AuctionCheckout";

function App() {
  return (
   
      <Routes>
        {/* NO NAVBAR */}
        <Route path="/landing" element={<Landing />} />

        {/* WITH NAVBAR */}
        <Route element={<MainLayout />}>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/studio" element={<Studio />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/art/:id" element={<ArtPage />} />
          <Route path="/directcheckout/:id" element={<DirectSaleCheckout />} />
          <Route path="/auctioncheckout/:id" element={<AuctionCheckout />} />
        </Route>
      </Routes>
   
  );
}

export default App;

