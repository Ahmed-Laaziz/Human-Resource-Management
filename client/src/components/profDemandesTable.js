import React, { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PrintIcon from '@mui/icons-material/Print';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { DataGrid} from '@mui/x-data-grid';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  randomCreatedDate,
  randomTraderName,
  randomEmail,
  randomUpdatedDate,
} from '@mui/x-data-grid-generator';

export default function ColumnPinningDynamicRowHeight({profId}) {

  const [showEditDelete, setShowEditDelete] = React.useState(true);

  const columns = React.useMemo(
    () => [
      { field: '__t', headerName: 'Type', width: 210, editable: false },
      {
        field: 'statut',
        headerName: 'Statut',
        width: 210,
        renderCell: (params) => (
          <Stack spacing={1} sx={{ width: 1, py: 1 }}>
             {/* Display the value of the 'statut' field */}
            <React.Fragment>
              <Button
              size="small"
              sx={{
                borderRadius: 28,
                borderColor: (() => {
                  switch (params.value) {
                    case 'En attente':
                      return 'orange';
                    case 'Approuvée':
                      return 'green';
                    case 'Non approuvée':
                      return 'red';
                    default:
                      return 'orange'; // Default color (you can change this)
                  }
                })(),
                color: (() => {
                  switch (params.value) {
                    case 'En attente':
                      return 'orange';
                    case 'Approuvée':
                      return 'green';
                    case 'Non approuvée':
                      return 'red';
                    default:
                      return 'orange'; // Default color (you can change this)
                  }
                })(),
                }}
                variant="outlined"
              >
                {params.value} {/* Add your button content here */}
              </Button>
            </React.Fragment>
          </Stack>
        ),
      },
      { field: 'createdAt', headerName: 'Date Demande', width: 210, type: 'Date',editable: false },
      { field: 'updatedAt', headerName: 'Derniere modification',width: 210, type: 'Date', editable: true },
      
      
      {
        field: 'actions',
        headerName: 'Actions',
        width: 210,
        renderCell: (params) => (
          <Stack spacing={1} sx={{ width: 1, py: 1 }}>
            {showEditDelete && (
              <React.Fragment>
                <Button variant="outlined" size="small" startIcon={<EditIcon />}>
                  Edit
                </Button>
                <Button variant="outlined" size="small" startIcon={<DeleteIcon />}>
                  Delete
                </Button>
              </React.Fragment>
            )}
            <Button
              variant="outlined"
              size="small"
              startIcon={<PrintIcon />}
              disabled={params.row.statut !== 'Approuvée'}
            >
              Print
            </Button>
          </Stack>
        ),
      },
      
    ],
    // [showEditDelete],
  );

  const [demandes, setDemandes] = useState([]);
  
  const fetchDemandes = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/demandes/profDemandes/${profId}` // Replace with your actual API endpoint
      );
      setDemandes(response.data);
    } catch (error) {
      console.error('Error fetching demandes:', error);
    }
  };

  useEffect(() => {
    // Fetch the title from the backend API

    fetchDemandes(); // Call the fetchTitle function when the component mounts
  }, []);

  return (
    <div style={{ width: '100%' }}>
      {/* <Button sx={{ mb: 1 }} onClick={handleToggleClick}>
        Toggle edit & delete
      </Button> */}
      <div style={{ height: 500 }}>
        <DataGrid
          rows={demandes}
          columns={columns}
          getRowId={(row) => row._id}
          getRowHeight={() => 'auto'}
          initialState={{ pinnedColumns: { left: ['name'], right: ['actions'] } }}
        />
      </div>
    </div>
  );
}

