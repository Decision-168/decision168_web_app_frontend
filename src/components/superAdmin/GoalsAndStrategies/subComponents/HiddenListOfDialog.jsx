import { Grid, Typography } from '@mui/material';
import React,{memo} from 'react'
import ProgressBar from './ProgressBar';

const HiddenListOfDialog = ({ heading,title,value, children }) => {
  const data = [1, 2];
  return (
    <>
      <Grid item xs={12} md={12} lg={12}>
        <Typography
          sx={{
            color: "#495057",
            fontSize: 15,
            fontWeight: "600",
            ml: 0.5,
            textAlign: "left",
          }}
        >
          {heading}
        </Typography>
      </Grid>
      <Grid item xs={12} md={12} lg={12}>
        {data.map((item, index) => {
          return (
            <Grid
              container
              key={index}
              p={1}
              sx={{ borderBottom: "1px solid #f5f5f5" }}
            >
              <Grid item xs={7} md={7} lg={7} textAlign={"left"}>
                <Typography
                  sx={{
                    fontSize: 13,
                    display: "inline",
                    fontWeight: "700",
                    textAlign: "left",
                  }}
                >
                  {title}:
                  <Typography
                    sx={{
                      fontSize: 13,
                      mx: 1,

                      display: "inline",
                    }}
                  >
                    {value}
                  </Typography>
                </Typography>
              </Grid>
              <Grid xs={4} alignSelf={"center"}>
                <ProgressBar />
              </Grid>
              <Grid xs={1}>
              {children}
              </Grid>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default memo(HiddenListOfDialog);
