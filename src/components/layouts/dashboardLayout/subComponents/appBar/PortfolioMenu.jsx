import React, { useEffect, useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { Menu, MenuItem, Fade } from "@mui/material";
import Divider from "@mui/material/Divider";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Stack, Typography, Avatar, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { selectUserDetails } from "../../../../../redux/action/userSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getPorfolioCount,
  getPortfolios,
} from "../../../../../api/modules/porfolioModule";
import { stringAvatar } from "../../../../../helpers/stringAvatar";
import portfolioImage from "../../../../../assets/images/person.png";
import PerfectScrollbar from "react-perfect-scrollbar";
import { useDispatch } from "react-redux";
import { getPortfolioDetailsAsync, getPortfolioTeamMembersAsync, getProjectAndTaskCountAsync } from "../../../../../redux/action/portfolioSlice";
import { getPackageDetails } from "../../../../../api/modules/dashboardModule";
import { toast } from "react-toastify";

const StyledMenu = styled((props) => (
  <Menu
    elevation={2}
    TransitionComponent={Fade}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "left",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "left",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    border: "0",
    borderRadius: 6,
    marginTop: theme.spacing(1.5),
    overflowX: "hidden",
    minWidth: 180,
    color: theme.palette.mode === "light" ? "rgb(55, 65, 81)" : theme.palette.grey[300],

    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },

      "&:active": {
        backgroundColor: alpha(theme.palette.primary.dark, theme.palette.action.selectedOpacity),
      },
    },
  },
}));

export default function PortfolioMenu() {
  const user = useSelector(selectUserDetails);
  const packageId = user?.package_id;
  const [anchorEl, setAnchorEl] = useState(null);
  const [portfolios, setPortfolios] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const email = user?.email_address;

  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const storedPortfolioId = JSON.parse(localStorage.getItem("portfolioId"));

  const fetchPorfolios = async () => {
    try {
      const response = await getPortfolios({ email });
      setPortfolios(response);
    } catch (error) {}
  };

  useEffect(() => {
    fetchPorfolios();
  }, [email, storedPortfolioId]);

  useEffect(() => {
    if (storedPortfolioId && portfolios) {
      const portfolioIndex = portfolios?.findIndex(
        (p) => p?.portfolio_id === storedPortfolioId
      );

      if (portfolioIndex !== -1) {
        setSelectedIndex(portfolioIndex);
      } else {
      }
    }
  }, [storedPortfolioId, portfolios]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const isValidPortfolioCount = (count, packCount) => {
    return (
      typeof count === "number" &&
      typeof packCount === "number" &&
      count === packCount
    );
  };

  const handleCreatePortfolioClick = async (event) => {
    const porfolioCountResponse = await getPorfolioCount(79);
    const packageDetailsResponse = await getPackageDetails(packageId);

    if (isValidPortfolioCount(porfolioCountResponse?.portfolio_count_rows, packageDetailsResponse?.pack_portfolio)) {
      navigate("/portfolio-create");
      handleClose();
    } else {
      handleClose();
      toast.warn("Please Upgrade your plan!");
    }
  };

  const handleMenuItemClick = (event, index, portfolioId) => {
    navigate("/portfolio-view");
    setSelectedIndex(index);
    setAnchorEl(null);
    // Save the new portfolioId to localStorage
    localStorage.setItem("portfolioId", portfolioId);
    dispatch(getProjectAndTaskCountAsync(portfolioId));
    dispatch(getPortfolioDetailsAsync(portfolioId));
    dispatch(getPortfolioTeamMembersAsync(portfolioId)); // we have to remove from here
  };

  return (
    <div>
      <Button
        sx={{ color: "#B9B8B9" }}
        id="demo-customized-button"
        aria-controls={open ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="text"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        <Avatar alt="portfolio" src={selectedIndex < 0 ? portfolioImage : portfolios[selectedIndex]?.photo} sx={{ bgcolor: "black", height: "30px", width: "30px", fontSize: "0.7rem" }}>
          {selectedIndex < 0 && portfolioImage}
          {typeof portfolios[selectedIndex]?.photo === "string" && portfolios[selectedIndex]?.photo ? null : stringAvatar(portfolios[selectedIndex]?.portfolio_name?.toUpperCase())}
        </Avatar>
        <Typography component="div" variant="subtitle2" sx={{ textTransform: "capitalize", paddingLeft: "5px", color: "#B9B8B9" }}>
          {selectedIndex < 0 ? "Portfolio" : portfolios[selectedIndex]?.portfolio_name}
        </Typography>
      </Button>

      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {/* <PerfectScrollbar style={{ overflowX: "hidden" }}> */}
        <Box sx={{ height: "100%" }}>
          {portfolios && portfolios.length > 0 ? (
            portfolios.map((p, index) => (
              <MenuItem
                onClick={(event) => handleMenuItemClick(event, index, p?.portfolio_id)}
                value={p?.portfolio_name}
                key={index}
                sx={{
                  color: selectedIndex === index ? "#C7DF19" : "",
                  bgcolor: selectedIndex === index ? "#F2F2F2" : "",
                }}
              >
                <Stack direction="row" justifyContent="start" alignItems="center" spacing={1}>
                  <Avatar
                    alt={p?.portfolio_name}
                    src={p?.photo}
                    sx={{
                      bgcolor: "#383838",
                      height: "30px",
                      width: "30px",
                      fontSize: "0.7rem",
                    }}
                  >
                    {p?.photo ? null : stringAvatar(p?.portfolio_name?.toUpperCase())}
                  </Avatar>
                  <Typography component="h6" sx={{ textTransform: "capitalize", fontSize: "0.8rem" }}>
                    {p?.portfolio_name}
                  </Typography>
                </Stack>
              </MenuItem>
            ))
          ) : (
            <Typography sx={{ fontSize: "12px", color: "gray", p: 1 }}>No portfolios available</Typography>
          )}
        </Box>
        {/* </PerfectScrollbar> */}

        <Divider />

        <MenuItem
          onClick={handleCreatePortfolioClick}
          disableRipple
          sx={{
            fontSize: "13px",
            fontWeight: "700",
            color: "#383838",
          }}
        >
          <AddIcon />
          Create New Portfolio
        </MenuItem>
      </StyledMenu>
    </div>
  );
}
