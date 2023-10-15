import * as React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PrintIcon from '@mui/icons-material/Print';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { DataGrid} from '@mui/x-data-grid';
import {
  randomCreatedDate,
  randomTraderName,
  randomEmail,
  randomUpdatedDate,
} from '@mui/x-data-grid-generator';

export default function ColumnPinningDynamicRowHeight() {
  const [showEditDelete, setShowEditDelete] = React.useState(true);

  const columns = React.useMemo(
    () => [
      { field: 'name', headerName: 'Name', width: 160, editable: true },
      { field: 'email', headerName: 'Email', width: 200, editable: true },
      { field: 'age', headerName: 'Age', type: 'number', editable: true },
      {
        field: 'dateCreated',
        headerName: 'Date Created',
        type: 'date',
        width: 180,
        editable: true,
      },
      {
        field: 'lastLogin',
        headerName: 'Last Login',
        type: 'dateTime',
        width: 220,
        editable: true,
      },

      {
        field: 'statut',
        headerName: 'Statut',
        width: 160,
        renderCell: () => (
          <Stack spacing={1} sx={{ width: 1, py: 1 }}>
             
              <React.Fragment>
              <Button
                // color="primary"
                sx={ { borderRadius: 28 , color:'orange', borderColor:'orange'}}
                variant="outlined"
              >En attente</Button>
              </React.Fragment>
          </Stack>
        ),
      },
      {
        field: 'actions',
        headerName: 'Actions',
        width: 100,
        renderCell: () => (
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

            <Button variant="outlined" size="small" startIcon={<PrintIcon />}>
              Print
            </Button>
          </Stack>
        ),
      },
    ],
    // [showEditDelete],
  );

  // const [professeurs, setProfesseurs] = useState([]);
  
  // const fetchProfessor = async () => {
  //   try {
  //     const response = await axios.get(
  //       `http://localhost:4000/prof/professeurs` // Replace with your actual API endpoint
  //     );
  //     setProfesseurs(response.data);
  //   } catch (error) {
  //     console.error('Error fetching title:', error);
  //   }
  // };

  // useEffect(() => {
  //   // Fetch the title from the backend API

  //   fetchProfessor(); // Call the fetchTitle function when the component mounts
  // }, []);

  return (
    <div style={{ width: '100%' }}>
      {/* <Button sx={{ mb: 1 }} onClick={handleToggleClick}>
        Toggle edit & delete
      </Button> */}
      <div style={{ height: 400 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          getRowHeight={() => 'auto'}
          initialState={{ pinnedColumns: { left: ['name'], right: ['actions'] } }}
        />
      </div>
    </div>
  );
}

const rows = [
  {
    id: 1,
    name: randomTraderName(),
    email: randomEmail(),
    age: 25,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
    statut: "En attente"
  },
  {
    id: 2,
    name: randomTraderName(),
    email: randomEmail(),
    age: 36,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
    statut: "En attente"
  },
  {
    id: 3,
    name: randomTraderName(),
    email: randomEmail(),
    age: 19,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
    statut: "En attente"
  }
];