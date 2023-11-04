import React, { memo } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { VisibilityOutlined } from "@mui/icons-material";
import { Box, CardActionArea } from "@mui/material";
import { stringAvatar } from "../../helpers/stringAvatar";
import { useDispatch } from "react-redux";
import { openModal } from "../../redux/action/modalSlice";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const CustomCard = ({ handleClick }) => {
  const [expanded, setExpanded] = React.useState(false);
  const theme = useTheme();
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const dispatch = useDispatch();
  return (
    <>
      <Card
        sx={{
          maxWidth: "100%",
          borderLeft: `7px solid ${theme.palette.primary.main}`,
          borderRadius: "10px",
        }}
      >
        <CardActionArea onClick={handleClick}>
          <CardHeader
            sx={{ pb: 0 }}
            avatar={
              <Avatar
                sx={{ bgcolor: theme.palette.primary.main }}
                aria-label="goal"
              >
                {...stringAvatar("Demo Goal")}
              </Avatar>
            }
            title={
              <Typography
                sx={{
                  color: "#343a40",
                  fontWeight: "900",
                  fontSize: "18px",
                }}
                textAlign={"start"}
              >
                Demo Goal
              </Typography>
            }
          />
          <CardContent>
            <Typography
              variant="body2"
              sx={{
                color: "#555a5f",
                fontWeight: "400",
                fontSize: "12px",
              }}
              textAlign={"start"}
            >
              Heat 1/2 cup of the broth in a pot until simmering, add saffron
              and set aside for 10 minutes.
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions sx={{ justifyContent: "space-between" }}>
          <Typography
            sx={{
              color: "#b5b5b5",
              textTransform: "uppercase",
              fontSize: "12px",
              pl: 1,
            }}
          >
            END: 2023-04-30
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              aria-label="settings"
              onClick={() => dispatch(openModal("overview-goals-kpis"))}
            >
              <VisibilityOutlined />
            </IconButton>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </Box>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography
              variant="body2"
              sx={{
                color: "#343a40",
                fontWeight: "900",
                fontSize: "13px",
              }}
              textAlign={"start"}
            >
              Description:
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              textAlign={"start"}
            >
              Heat 1/2 cup of the broth in a pot until simmering, add saffron
              and set aside for 10 minutes.
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    </>
  );
};
export default memo(CustomCard);
