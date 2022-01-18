import { Typography, Button } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { Box } from "@mui/system";
import { useLocalStorage } from "../utils/useLocalStorage";
import { saveLocalType, alertType } from "../Types";
import React, { useState } from "react";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

function MyCollection() {
  const [localState, setLocalState] = useLocalStorage<saveLocalType[]>(
    "data",
    []
  );
  const [expanded, setExpanded] = useState<string | false>(false);
  const [alert, setAlert] = useState<alertType>({
    message: "",
    status: "info",
  });
  const [open, setOpen] = useState(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleRelease = (name: string) => {
    const saveLocal = localState;
    if (saveLocal !== undefined) {
      const filtered = saveLocal.filter((value) => value.nickname !== name);
      setLocalState(filtered);
      setAlert({
        message: "Pokemon Berhasil di Lepas",
        status: "success",
      });
      setOpen(true);
    }
  };

  return (
    <Box
      sx={{
        px: "20px",
        pt: "50px",
        pb: "20vh",
        mx: "auto",
        minHeight: "70vh",
        maxWidth: 500,
        background:
          "linear-gradient(0deg, rgba(0,59,114,1) 0%, rgba(12,42,77,1) 100%)",
      }}>
      <Typography
        variant='h4'
        sx={{ textAlign: "center", color: "white", pb: "20px" }}>
        MyCollection
      </Typography>
      {localState !== undefined
        ? localState.map((value, index) => (
            <Accordion
              key={index}
              expanded={expanded === `${value.nickname}`}
              onChange={handleChange(`${value.nickname}`)}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`${value.nickname}bh-content`}
                id={`${value.nickname}bh-header1`}>
                <Typography sx={{ width: "33%", flexShrink: 0 }}>
                  No.{index + 1}
                </Typography>
                <Typography sx={{ color: "text.secondary" }}>
                  {value.nickname}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Monster Name : {value.data[0].name.toUpperCase()}
                </Typography>
                <Button
                  variant='contained'
                  color='primary'
                  sx={{ mt: "10px" }}
                  onClick={() => handleRelease(value.nickname)}>
                  Release
                </Button>
              </AccordionDetails>
            </Accordion>
          ))
        : ""}
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
}

export default MyCollection;
