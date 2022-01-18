import Box from "@mui/material/Box";
import axios from "axios";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React, { useEffect, useState } from "react";
import { dataCatchType } from "../Types";
import Skeleton from "@mui/material/Skeleton";

import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import { useNavigate } from "react-router-dom";

function Catch() {
  const dataCatchDefault: dataCatchType[] = [];
  const [expanded, setExpanded] = useState<string | false>(false);
  const [link] = useState<string>(
    "https://pokeapi.co/api/v2/pokemon?offset=0&limit=20"
  );
  const [data, setData] = useState(dataCatchDefault);
  const [isReady, setIsReady] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  useEffect(() => {
    fetchData(link);
  }, []);

  const fetchData = async (url: string) => {
    axios
      .get(`${url}`)
      .then((res) => {
        const datas = res.data;
        setData([
          {
            data: datas.results,
            prev: datas.previous,
            next: datas.next,
            count: datas.count,
          },
        ]);
        setIsReady(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleBackPage = () => {
    if (data[0].prev !== null) {
      fetchData(data[0].prev);
    }
  };
  const handleNextPage = () => {
    if (data[0].next !== null) {
      fetchData(data[0].next);
    }
  };

  const handleGoToDetails = (id: string) => {
    navigate(id);
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
          Pokemon List
        </Typography>
        {data[0].data.map((value) => (
          <Accordion
            key={value.name}
            expanded={expanded === `${value.name}`}
            onChange={handleChange(`${value.name}`)}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`${value.name}bh-content`}
              id={`${value.name}bh-header1`}>
              <Typography sx={{ width: "33%", flexShrink: 0 }}>
                No.{value.url.replace(/[^v\d]/g, "").slice(2)}
              </Typography>
              <Typography sx={{ color: "text.secondary" }}>
                {value.name.toUpperCase()}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Button
                variant='contained'
                color='primary'
                onClick={() =>
                  handleGoToDetails(value.url.replace(/[^v\d]/g, "").slice(2))
                }>
                Details
              </Button>
            </AccordionDetails>
          </Accordion>
        ))}
        <Box
          sx={{ mt: "20px", display: "flex", justifyContent: "space-between" }}>
          <Button
            color='primary'
            aria-label='back'
            startIcon={<ArrowBackIosNewRoundedIcon sx={{ color: "white" }} />}
            onClick={handleBackPage}
            disabled={data[0].prev === null ? true : false}>
            <Typography sx={{ marginLeft: "10px", color: "white" }}>
              Back
            </Typography>
          </Button>
          <Button
            color='primary'
            aria-label='forward'
            endIcon={<ArrowForwardIosRoundedIcon sx={{ color: "white" }} />}
            onClick={handleNextPage}>
            <Typography sx={{ marginRight: "10px", color: "white" }}>
              Next
            </Typography>
          </Button>
        </Box>
      </Box>
    );
  } else {
    return (
      <Box
        sx={{
          px: "20px",
          pt: "50px",
          pb: "20vh",
          mx: "auto",
          height: "80vh",
          maxWidth: 500,
          background:
            "linear-gradient(0deg, rgba(0,59,114,1) 0%, rgba(12,42,77,1) 100%)",
        }}>
        <Typography>Pokemon List</Typography>
        <Accordion
          key='a'
          expanded={expanded === `name`}
          onChange={handleChange(`name`)}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='bh-content'
            id='bh-header1'>
            <Typography sx={{ width: "33%", flexShrink: 0 }}>
              <Skeleton animation='wave' />
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              <Skeleton animation='wave' />
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Skeleton animation='wave' />
          </AccordionDetails>
        </Accordion>
      </Box>
    );
  }
}

export default Catch;
