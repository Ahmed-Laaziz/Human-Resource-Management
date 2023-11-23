import DemandesTable from '../components/adminDemandsTable';
import Drawer from '../components/drawer';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Breadcrumb from '../components/breadcrumb';
import jwt_decode from 'jwt-decode';
import axios from'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const backLink = "https://grh-ensaj-backend.adaptable.app";
export default function AdminDemandes(){

//   const [token, setToken] = useState('');
//     console.log(token);
// // Function to extract user ID from the JWT token
// const getUserIdFromToken = (token) => {
//   try {
//     const decoded = jwt_decode(token);
//     return decoded.id; // Assuming "id" is the key used in the token payload
//   } catch (error) {
//     console.error('Error decoding JWT token:', error);
//     return null;
//   }
// };

// // Get the user ID from the token
// const agentId = getUserIdFromToken(token);
// const [agent, setAgent] = useState(null);
// console.log('userId : ' + agentId);
// useEffect(() => {
//   const fetchAgentData = async () => {
//     try {
//       const response = await axios.get(`https://grh-ensaj-backend.adaptable.app/agent/agents/${agentId}`);
//       setAgent(response.data);
//     } catch (error) {
//       console.error('Error fetching agent data:', error);
//     }
//   };

//   if (agentId) {
//     fetchAgentData();
//   }
// }, [agentId]);


// // if (!agent) {
// //   return <div>Loading...</div>;
// // }

//   const navigate = useNavigate();

//     useEffect(() => {
//         // Retrieve the token from localStorage
//         const storedToken = localStorage.getItem('token');
//         if (storedToken) {
//           // Set the token in your component state
//           setToken(storedToken);
//         }
//         // } else {
//         //   // If no token is found, navigate to the login page
//         //   navigate('/');
//         // }
//       }, [navigate]);


    return(
        <Box sx={{ display: 'flex' }}>
        <Drawer role='Admin' pageTitle={"Demandes des Professeurs"}/>
        
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

  <DemandesTable sx={{marginTop:'10%'}}/>

  
</Box>

      </Box>
    )
}