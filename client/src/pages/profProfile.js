import React from "react";

import Drawer from '../components/drawer';
import Box from '@mui/material/Box';
import Breadcrumb from '../components/breadcrumb';
import ProfileBar from '../components/profileBar';
import ProfileData from '../components/profileData';
import { useProf } from '../context/ProfContext';

export default function Home() {
  const { prof } = useProf();

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer role={prof._t} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          marginTop: "8%",
          marginLeft: "5%",
          marginRight: "5%",
          // boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Add the boxShadow property
        }}
      >
        <Breadcrumb />
        <>&nbsp;</>
        <ProfileBar agent={prof} />
        <ProfileData agent={prof} />
      </Box>
    </Box>
  );
}
