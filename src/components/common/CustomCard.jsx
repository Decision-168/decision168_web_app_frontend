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
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { VisibilityOutlined } from "@mui/icons-material";
import { CardActionArea } from "@mui/material";
import { stringAvatar } from "../../helpers/stringAvatar";

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

const CustomCard = ({}) => {
  const [expanded, setExpanded] = React.useState(false);
  const theme = useTheme();
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card
      sx={{
        maxWidth: "100%",
        borderTop: `7px solid ${theme.palette.primary.main}`,
        borderRadius: "10px",
      }}
    >
      <CardActionArea>
        <CardHeader
          avatar={
            <Avatar
              sx={{ bgcolor: theme.palette.primary.main }}
              aria-label="goal"
            >
              {...stringAvatar("Demo Goal")}
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <VisibilityOutlined />
            </IconButton>
          }
        />
        <CardContent>
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
          <Typography
            variant="body2"
            sx={{
              color: "#555a5f",
              fontWeight: "400",
              fontSize: "12px",
            }}
            textAlign={"start"}
          >
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and
            set aside for 10 minutes.
          </Typography>
          <Typography
            sx={{
              color: "#b5b5b5",
              textTransform: "uppercase",
              fontSize: "12px",
            }}
            textAlign={"end"}
          >
            END: 2023-04-30
          </Typography>
        </CardContent>
      </CardActionArea>
      {/* <CardActions disableSpacing>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
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
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and
            set aside for 10 minutes.
          </Typography>
        </CardContent>
      </Collapse> */}
    </Card>
  );
};
export default memo(CustomCard);
