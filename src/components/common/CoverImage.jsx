import { Box } from "@mui/material";
import CoverImg from "../../assets/images/cover-image.png";

export default function CoverImage() {
  return (
    <Box
      sx={{
        height: "200px",
        width: "100%",
        border: "1px solid gray",
        borderRadius: "3px",
        overflow: "hidden",
      }}>
      <img
        src={CoverImg}
        alt="cover image"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "50% 35%",
        }}
      />
    </Box>
  );
}
