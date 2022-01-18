import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import BottomNavbar from "../components/BottomNavbar";
import Home from "../pages/Home"
import Catch from "../pages/Catch"
import DetailsPokemon from "../pages/DetailsPokemon";
import MyCollection from "../pages/MyCollection";

function RoutesWeb() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<BottomNavbar />}>
               <Route path="/home" element={<Home />} />
               <Route path="/catch" element={<Catch />} />
               <Route path="/mycollection" element={<MyCollection />} />
               <Route path="/catch/:id" element={<DetailsPokemon />} />
            </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default RoutesWeb;
