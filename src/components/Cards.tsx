import { Box, Divider, Typography, Button } from "@mui/material";
import React from "react";
import { cardPropsType } from "../Types";

function Cards({
  name,
  photos,
  abilities,
  moves,
  stats,
  types,
  play,
  isDisable
}: cardPropsType) {

  const convertText = (name: string) => {
    if (name === "hp") {
      return "HP";
    } else if (name === "attack") {
      return "ATK";
    } else if (name === "defense") {
      return "DEF";
    } else if (name === "special-attack") {
      return "Sp-ATK";
    } else if (name === "special-defense") {
      return "Sp-DEF";
    } else if (name === "speed") {
      return "SPD";
    } else {
      return "";
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "white",
        borderRadius: "10px",
        p: "20px",
        boxSizing: "border-box",
      }}>
      <Box sx={{display: "flex", alignItems: "center"}}>
        <Typography variant='h5' sx={{mr: "10px"}}>{name.toUpperCase()}</Typography>
        {types?.map((value, index)=>{
          if(index === types.length-1){
            return <span key={index}>{value.type.name.toUpperCase()}</span>
          }else{
            return <span key={index}>{value.type.name.toUpperCase()}{"-"}</span>
          }
        })}
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <img
          style={{ width: "40%" }}
          src={photos === undefined ? "" : `${photos.depan}`}
          alt={name}
        />
        <img
          style={{ width: "40%" }}
          src={photos === undefined ? "" : `${photos.belakang}`}
          alt=''
        />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-around" }}>
        {stats?.map((value, index) => (
          <Box key={index} sx={{}}>
            <p style={{ textAlign: "center" }}>
              {convertText(value.stat.name)}
            </p>
            <p style={{ textAlign: "center" }}>{value.base_stat}</p>
          </Box>
        ))}
      </Box>
      <Divider />
      <Box sx={{mt: "15px", display: "flex", justifyContent: "space-around" }}>
        <Box>
          <Typography>ABILITIES</Typography>
          <ul>
            {abilities?.map((value, index) => (
              <li key={index}>{value.ability.name.toUpperCase()}</li>
            ))}
          </ul>
        </Box>
        <Box>
          <Typography>MOVES</Typography>
          <ul>
            {moves?.map((value, index) => (
              <li key={index}>{value.move.name.toUpperCase()}</li>
            ))}
          </ul>
        </Box>
      </Box>
      <Button variant="contained" color="primary" onClick={play} disabled={isDisable}>Catch !</Button>
    </Box>
  );
}

export default Cards;
