import React, { memo } from "react";
import { useTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { VisibilityOutlined } from "@mui/icons-material";
import { Box, CardActionArea } from "@mui/material";
import { stringAvatar } from "../../../../helpers/stringAvatar";
import { useDispatch } from "react-redux";
import { openModal } from "../../../../redux/action/modalSlice";

const CustomCard = ({ handleClick }) => {
  const [expanded, setExpanded] = React.useState(false);
  const theme = useTheme();
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
            <Typography
              sx={{
                color: "#b5b5b5",
                textTransform: "uppercase",
                fontSize: "12px",
                pl: 1,
                textAlign:'end'
              }}
            >
              END: 2023-04-30
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions sx={{ justifyContent: "end" }}>
            <IconButton
              aria-label="settings"
              onClick={() => dispatch(openModal("overview-goals-kpis"))}
            >
              <VisibilityOutlined />
            </IconButton>
        </CardActions>
      </Card>
    </>
  );
};
export default memo(CustomCard);
