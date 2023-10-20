import React from "react";
import { Typography } from "@mui/material";

import CustomLink from "../../common/CustomLink";

export default function Copyright() {

  return (
    <Typography component="div" variant="caption" display="block" gutterBottom textAlign="center" p={1}>
      © Copyright 2013 - {new Date().getFullYear()} | <CustomLink path="/">DECISION 168, Inc</CustomLink> | <CustomLink path="/">Cookies Policy</CustomLink> | <CustomLink path="/">Terms & Conditions</CustomLink> | <CustomLink path="/">Privacy Policy</CustomLink>
      <br />
      All Rights Reserved | <CustomLink path="/">Powered by z2 Squared </CustomLink>
    </Typography>
  );
}
