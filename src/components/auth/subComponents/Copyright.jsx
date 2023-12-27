import React from "react";
import { Typography } from "@mui/material";

import CustomLink from "../../common/CustomLink";

export default function Copyright() {

  return (
    <Typography
      component="div"
      variant="caption"
      display="block"
      gutterBottom
      textAlign="center"
      p={1}
    >
      © Copyright 2013 - {new Date().getFullYear()} |
      <CustomLink path={"https://www.decision168.com/"}>
        DECISION 168, Inc
      </CustomLink>
      |
      <CustomLink path={"https://www.decision168.com/cookie-policy/"}>
        Cookies Policy
      </CustomLink>{" "}
      |
      <CustomLink path={"https://www.decision168.com/terms-conditions/"}>
        Terms & Conditions
      </CustomLink>
      |
      <CustomLink path={"https://www.decision168.com/privacy-policy/"}>
        Privacy Policy
      </CustomLink>
      <br />
      All Rights Reserved |
      <CustomLink path={"https://www.z2squared.com/"}>
        Powered by z2 Squared
      </CustomLink>
    </Typography>
  );
}
