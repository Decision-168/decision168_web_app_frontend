import { LinearProgress, useTheme } from "@mui/material";
import { Suspense, lazy } from "react";
const RouteIndex = lazy(() => import("./route"));

function App() {
      const theme = useTheme();
  return (
    <Suspense
      fallback={
        <LinearProgress
          sx={{
            height: "10px",
            background: `linear-gradient(45deg, ${theme.palette.primary.dark} 30%,${theme.palette.secondary.dark} 90%)`,
          }}
        />
      }
      timeout={1000}
    >
      <RouteIndex />
    </Suspense>
  );
}

export default App;
