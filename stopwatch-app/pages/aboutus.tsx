import Layout from "@/components/Layouts/Layout";
import { Paper } from "@mui/material";
import React from "react";
import Iframe from "react-iframe";

type Props = {};

const AboutUs = ({}: Props) => {
  return (
    <Layout>
      <Paper sx={{ height: "86vh" }}>
        <Iframe
          url="https://billowdev.com"
          width="100%"
          height="100%"
          id="myId"
          display="inline"
          position="relative"
        />
      </Paper>
    </Layout>
  );
};

export default AboutUs;
