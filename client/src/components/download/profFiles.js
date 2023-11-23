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
import { Link } from 'react-router-dom';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
const backLink = "https://human-resource-management-backend.vercel.app";

export default function ColumnPinningDynamicRowHeight({prof}) {

  const [showEditDelete, setShowEditDelete] = React.useState(true);
  const navigate = useNavigate();
  const columns = React.useMemo(
    () => [
      { field: 'fileType', headerName: 'Type de Fichier', width: 250, editable: false },
      { field: 'createdAt', headerName: "Date d'envoi", width: 250, type: 'Date',editable: false },
      { field: 'title', headerName: 'Titre',width: 250, type: 'String'},
      {
        field: 'actions',
        headerName: 'Actions',
        width: 210,
        renderCell: (params) => (
          <Stack spacing={1} sx={{ width: 1, py: 1 }}>
            {showEditDelete && (
              <React.Fragment>
                <Button 
                  variant="outlined" 
                  size="small" 
                  startIcon={<RemoveRedEyeIcon />}
                  component={Link}
                  to={`https://human-resource-management-backend.vercel.app/files/${params.row.pdf}`} // Assuming 'pdf' is the column name for PDF name
                  target="_blank"
                >
                  Voir
                </Button>
              </React.Fragment>
            )}
          </Stack>
        ),
      },
      
    ],
  );

  const [demandes, setDemandes] = useState([]);
  
  const fetchDemandes = async () => {
    try {
      const response = await axios.get(
        backLink+`/FilesManagement/profFiles/${prof._id}` // Replace with your actual API endpoint
      );  
      setDemandes(response.data);
    } catch (error) {
      console.error('Error fetching demandes:', error);
    }
  };

  useEffect(() => {
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

