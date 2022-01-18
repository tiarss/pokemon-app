import { Box, Typography, Button } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import React, { useEffect, useState, ChangeEvent } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Cards from "../components/Cards";
import {
  dataDetailsType,
  alertType,
  catchFormPropsType,
  saveLocalType,
} from "../Types";
import { useLocalStorage } from "../utils/useLocalStorage";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

function DetailsPokemon() {
  const dataDetailsDefault: dataDetailsType[] = [];
  const param = useParams();
  const [dataDetails, setDataDetails] = useState(dataDetailsDefault);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [isCatch, setIsCatch] = useState<boolean>(false);
  const [isExist, setIsExist] = useState<boolean>(false);
  const [textName, setTextName] = useState<string>("");
  const [alert, setAlert] = useState<alertType>({
    message: "",
    status: "info",
  });
  const [open, setOpen] = useState(false);
  const [localState] = useLocalStorage<saveLocalType[]>('data',[]);

  useEffect(() => {
    fetchDataID();
  }, []);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const fetchDataID = async () => {
    await axios
      .get(`https://pokeapi.co/api/v2/pokemon/${param.id}`)
      .then((res) => {
        const { data } = res;
        console.log(data);
        setDataDetails([
          {
            name: data.name,
            photos: {
              depan: data.sprites.front_default,
              belakang: data.sprites.back_default,
            },
            abilities: data.abilities,
            moves: data.moves.splice(0, 5),
            stats: data.stats,
            types: data.types,
          },
        ]);
        setIsReady(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handlePlay = () => {
    const gacha = Math.floor(Math.random() * (2 - 1 + 1)) + 1;
    if (gacha === 1) {
      setIsCatch(true);
      setAlert({
        message: "Pokemon Berhasil di Tangkap",
        status: "success",
      });
      setOpen(true);
    } else {
      setAlert({
        message: "Pokemon Gagal di Tangkap",
        status: "error",
      });
      setOpen(true);
    }
    console.log(gacha);
  };

  const handleSave = () => {
    const temp = {
      nickname: textName,
      data: dataDetails,
    };
    console.log(temp)
    const saveLocal = localState
    if(saveLocal !== undefined){
       saveLocal.push(temp);
       localStorage.setItem("data", JSON.stringify(saveLocal))
    }
    setAlert({
      message: "Pokemon Berhasil di Simpan",
      status: "success",
    });
    setOpen(true);
    setIsCatch(false);
  };

  const handleSaveName = (e: ChangeEvent<HTMLInputElement>) => {
     const text = e.target.value;
     const filtered = localState?.find(value => value.nickname === text)
     console.log(text)
     console.log(filtered)
     if(filtered !== undefined){
      setIsExist(true)
     }else{
      setIsExist(false)
      setTextName(text);
     }
  };


  if (isReady) {
    return (
      <Box
        sx={{
          px: "20px",
          pt: "50px",
          pb: "20vh",
          mx: "auto",
          maxWidth: 500,
          background:
            "linear-gradient(0deg, rgba(0,59,114,1) 0%, rgba(12,42,77,1) 100%)",
        }}>
        <Typography
          variant='h4'
          sx={{ textAlign: "center", color: "white", pb: "20px" }}>
          Details Pokemon
        </Typography>
        <Cards
          name={dataDetails[0].name}
          photos={dataDetails[0].photos}
          abilities={dataDetails[0].abilities}
          moves={dataDetails[0].moves}
          stats={dataDetails[0].stats}
          types={dataDetails[0].types}
          play={handlePlay}
          isDisable={isCatch}
        />
        <Box sx={{ mt: "10px" }}>
          {isCatch ? (
            <CatchForm
              saveClick={handleSave}
              saveName={(e) => handleSaveName(e)}
              isExist={isExist}
            />
          ) : (
            ""
          )}
        </Box>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            color={alert.status}
            sx={{ width: "100%" }}>
            {alert.message}
          </Alert>
        </Snackbar>
      </Box>
    );
  } else {
    return <p>Loading</p>;
  }
}

const CatchForm = ({ saveClick, saveName, isExist }: catchFormPropsType) => {
  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "white",
        borderRadius: "10px",
        p: "20px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
      }}>
      <label style={{ textAlign: "center", marginBottom: "10px" }} htmlFor='nama'>
        Name
      </label>
      <input style={{ padding: "7px 10px"}} type='text' onChange={saveName} />
      {isExist ? <p style={{fontSize: "12px", padding: "5px 0px", margin: "0px", color: "red"}}>Nama Sudah Ada</p> : ""}
      <Button sx={{mt: "10px"}} variant='contained' color='primary' onClick={saveClick} disabled={isExist}>
        Save
      </Button>
    </Box>
  );
};

export default DetailsPokemon;
