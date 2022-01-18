import React from "react";
import { Box, Typography } from "@mui/material";
import Logo from "../images/logo.png";
import { useLocalStorage } from "../utils/useLocalStorage";
import { saveLocalType } from "../Types";

function Home() {
  const [localState] = useLocalStorage<saveLocalType[]>('data',[]);
  return (
    <Box
      sx={{
        px: "20px",
        pt: "50px",
        mx: "auto",
        maxWidth: 500,
        background:
          "linear-gradient(0deg, rgba(0,59,114,1) 0%, rgba(12,42,77,1) 100%)",
        height: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}>
        <img src={Logo} alt='' style={{ width: "250px" }} />
        <Typography sx={{ color: "white" }}>The Game</Typography>
      </Box>
      <Box sx={{ px: "20px", mt: "50px" }}>
        <Box
          sx={{
            backgroundColor: "white",
            height: "200px",
            borderRadius: "20px",
            boxSizing: "border-box",
            p: "25px 10px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center"
          }}>
          <Typography variant="h5" sx={{textAlign: "center"}}>MY COLLECTION</Typography>
          <Typography variant="h2" sx={{textAlign: "center"}}>{localState === undefined ? "" : localState.length}</Typography>
          <Typography variant="h5" sx={{textAlign: "center"}}>Monsters</Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Home;
