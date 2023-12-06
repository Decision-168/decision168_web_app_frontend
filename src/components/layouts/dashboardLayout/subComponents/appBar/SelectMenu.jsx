import React, { useEffect } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import AddIcon from "@mui/icons-material/Add";
import { Avatar, Divider, Box, Stack, Typography } from "@mui/material";
import { stringAvatar } from "../../../../../helpers/stringAvatar";
import { getPortfolios } from "../../../../../api/modules/porfolioModule";
import { selectUserDetails } from "../../../../../redux/action/userSlice";
import { useSelector } from "react-redux";
import portfolioImage from "../../../../../assets/images/person.png";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Link, useNavigate } from "react-router-dom";
import ListSubheader from "@mui/material/ListSubheader";

export default function SelectSmall() {
  const user = useSelector(selectUserDetails);
  const navigate = useNavigate();
  const [portfolios, setPortfolios] = React.useState([]);
  const [selectedPortfolio, setSelectedPortfolio] = React.useState("portfolio");
  // const email = user?.email_address;
  const email = "uzmakarjikar@gmail.com";

  const fetchPorfolios = async () => {
    try {
      const response = await getPortfolios(email);
      setPortfolios(response);
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    fetchPorfolios();
  }, [email]);

  const handleChange = (event) => {
    setSelectedPortfolio(event.target.value);
  };

  const handleCreatePortfolioClick = (event) => {
    navigate("/portfolio-create");
  };

  return (
    <FormControl
      sx={{
        m: 1,
        minWidth: "200px",
        "& .css-s2e3zd-MuiInputBase-root-MuiOutlinedInput-root-MuiSelect-root": {
          marginTop: "0px",
        },
      }}
      size="small">
      <Select
        id="demo-select-small"
        value={selectedPortfolio}
        onChange={handleChange}
        MenuProps={{
          PaperProps: {
            style: { maxHeight: "300px" },
          },
        }}>
        <MenuItem value="portfolio" disabled>
          <Stack direction="row" justifyContent="start" alignItems="center" spacing={1}>
            <Avatar
              alt="portfolio"
              src={portfolioImage}
              sx={{ bgcolor: "black", height: "30px", width: "30px", fontSize: "0.7rem" }}>
              {portfolioImage ? null : stringAvatar("Portfolio")}
            </Avatar>
            <Typography component="h6" sx={{ textTransform: "capitalize", fontSize: "0.8rem" }}>
              Portfolio
            </Typography>
          </Stack>
        </MenuItem>

        {portfolios?.map((p) => (
          <MenuItem
            value={p?.portfolio_name}
            key={p?.portfolio_id}
            sx={{
              color: selectedPortfolio === p?.portfolio_name && "#C7DF19",
              bgcolor: selectedPortfolio === p?.portfolio_name && "#F2F2F2",
            }}>
            <Stack direction="row" justifyContent="start" alignItems="center" spacing={1}>
              <Avatar
                alt={p?.portfolio_name}
                src={p?.photo}
                sx={{
                  bgcolor: "#383838",
                  height: "30px",
                  width: "30px",
                  fontSize: "0.7rem",
                }}>
                {p?.photo ? null : stringAvatar(p?.portfolio_name?.toUpperCase())}
              </Avatar>
              <Typography component="h6" sx={{ textTransform: "capitalize", fontSize: "0.8rem" }}>
                {p?.portfolio_name}
              </Typography>
            </Stack>
          </MenuItem>
        ))}

        <ListSubheader>
          <Box
            onClick={handleCreatePortfolioClick}
            sx={{
              fontSize: "12px",
              fontWeight: "700",
              color: "#383838",
              textDecoration: "none",
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
              cursor: "pointer",
      
           
            }}>
            <AddIcon />
            Create New Portfolio
          </Box>
        </ListSubheader>
      </Select>
    </FormControl>
  );
}
