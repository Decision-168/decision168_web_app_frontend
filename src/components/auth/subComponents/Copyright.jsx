import React from "react";
import { Link, Typography } from "@mui/material";

export default function Copyright() {
  return (
    <Typography component="div" variant="caption" display="block" gutterBottom textAlign="center" p={1}>
      © Copyright 2013 - {new Date().getFullYear()} | <Link href="/">DECISION 168, Inc</Link> | <Link href="/">Cookies Policy</Link> | <Link href="/">Terms & Conditions</Link> | <Link href="/">Privacy Policy</Link>
      <br />
      All Rights Reserved | <Link href="/">Powered by z2 Squared </Link>
    </Typography>
  );
}
