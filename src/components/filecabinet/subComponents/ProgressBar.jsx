import * as React from "react";
import Box from "@mui/material/Box";
import { LinearProgressWithLabel } from "../../GoalsAndStrategies/subComponents/style-functions";

const ProgressBar = () => {
  const [progress, setProgress] = React.useState(10);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 10 : prevProgress + 10
      );
    }, 800);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Box sx={{ width: "100%" }}>
      <LinearProgressWithLabel value={progress} />
    </Box>
  );
};
export default ProgressBar;