import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios'; // Import Axios
import { useLocation } from 'react-router-dom';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useProf } from '../context/ProfContext';

const columns = [
  {
    field: 'cadre',
    headerName: 'Cadre',
    width: 250,
    editable: false,
  },
  {
    field: 'grade',
    headerName: 'Grade',
    width: 250,
    editable: true,
  },
  {
    field: 'classe',
    headerName: 'Classe',
    width: 250,
    editable: false,
  },
  
  {
    field: 'date',
    headerName: 'Date',
    type: 'Date',
    width: 300,
    editable: false,
  },
];



export function DataHist() {

  const [hists, setHistoriques] = useState([]);
  const { prof } = useProf();

  console.log(prof._id)
  const fetchHist = async () => {
    try {
      const response = await axios.post(
        `https://human-resource-management-backend.vercel.app/hist/prof-hist`, {"prof": prof._id} // Replace with your actual API endpoint
      );
      setHistoriques(response.data);
      const histData = response.data;

      if (histData){
        try {
          const professorResponse = await axios.get(`https://human-resource-management-backend.vercel.app/agent/agents/${prof._id}`);
          const professorCadre = professorResponse.data.cadre; // Replace 'nom' with the actual professor name field
          const histWithProfessorCadre = histData.map((hist) => ({
            ...hist,
            cadre: professorCadre || 'N/A', // Provide a default value if name not found
          })
          );
          setHistoriques(histWithProfessorCadre)
        } catch (error) {
          console.error('Error fetching professor cadre:', error);
        }
      }

      

     

    } catch (error) {
      console.error('Error fetching title:', error);
    }

    
  };

  useEffect(() => {
    // Fetch the title from the backend API

    fetchHist(); // Call the fetchTitle function when the component mounts
  }, []);

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={hists} // Use the fetched data for rows
        columns={columns}
        getRowId={(row) => row._id}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}
