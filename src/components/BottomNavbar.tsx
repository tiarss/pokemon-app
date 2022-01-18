import React, { useState } from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Home from "../images/valor.png";
import Catch from "../images/catch.jpg";
import Collection from "../images/smartphone.png";
import { Box } from "@mui/material";
import Icons from "./Icons";
import { Outlet, useNavigate } from "react-router-dom";

function BottomNavbar() {
  const [value, setValue] = useState<string>("recents");
  const navigate = useNavigate()

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ mx: "auto", maxWidth: 500 }}>
      <Outlet />
      <Box sx={{ mx: "auto", maxWidth: 500 }}>
        <BottomNavigation
          sx={{
            width: "100%",
            maxWidth: "500px",
            height: "15vh",
            bgcolor: "#181820",
            position: "fixed",
            bottom: "0px",
          }}
          value={value}
          onChange={handleChange}>
          <BottomNavigationAction
            sx={{ color: "white" }}
            label='Home'
            value='home'
            icon={<Icons url={Home} />}
            onClick={()=> navigate("/home")}
          />
          <BottomNavigationAction
            label='Catch !'
            value='catch'
            icon={<Icons url={Catch} />}
            onClick={()=> navigate("/catch")}
          />
          <BottomNavigationAction
            label='My Collection'
            value='collection'
            icon={<Icons url={Collection} />}
            onClick={()=> navigate("/mycollection")}
          />
        </BottomNavigation>
      </Box>
    </Box>
  );
}

export default BottomNavbar;
