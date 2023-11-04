import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { Redirect } from "react-router-dom";
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios'; // Import Axios
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import { useProf } from '../context/ProfContext';

const columns = [
  {
    field: 'prenom',
    headerName: 'First name',
    width: 150,
    editable: true,
  },
  {
    field: 'nom',
    headerName: 'Last name',
    width: 150,
    editable: false,
  },
  {
    field: 'cadre',
    headerName: 'Cadre',
    sortable: true,
    width: 100,
  },
  {
    field: 'num_loyer',
    headerName: 'Numéro de loyer',
    type: 'number',
    width: 160,
    editable: false,
  },
  {
    field: 'num_ref',
    headerName: 'Numéro de preuve',
    type: 'number',
    width: 160,
    editable: false,
  },
  {
    field: 'date_visa',
    headerName: 'Date du visa',
    type: 'Date',
    width: 160,
    editable: false,
  },
  {
    field: 'date_effective',
    headerName: 'Date effective',
    type: 'Date',
    width: 160,
    editable: false,
  },
  {
    field: 'moreActions',
    headerName: 'More Actions',
    sortable: false,
    width: 120,
    renderCell: (params) => {
      return <MoreActionsCell rowParams={params} />;
    },
  },
];


function MoreActionsCell({ rowParams }) {
  const navigate = useNavigate();
  const { updateProf } = useProf();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleHistoriqueClick = () => {
    updateProf(rowParams.row);
    
    navigate("/historiques");
    handleMenuClose();
  };

  const handleProfileClick = () => {
    updateProf(rowParams.row);
    
    navigate("/prof-profile");
    handleMenuClose();
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls="more-menu"
        aria-haspopup="true"
        onClick={handleMenuOpen}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="more-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleHistoriqueClick}>Historique</MenuItem>
        <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
      </Menu>
    </div>
  );
}


export default function DataGridDemo() {
  const [professeurs, setProfesseurs] = useState([]);
  
  const fetchProfessor = async () => {
    try {
      const response = await axios.get(
        `http://human-resource-management-backend.vercel.app:4000/prof/professeurs` // Replace with your actual API endpoint
      );
      setProfesseurs(response.data);
    } catch (error) {
      console.error('Error fetching title:', error);
    }
  };

  useEffect(() => {
    // Fetch the title from the backend API

    fetchProfessor(); // Call the fetchTitle function when the component mounts
  }, []);

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={professeurs} // Use the fetched data for rows
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
