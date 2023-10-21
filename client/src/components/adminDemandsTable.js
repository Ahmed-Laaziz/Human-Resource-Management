import React, { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PrintIcon from '@mui/icons-material/Print';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { DataGrid} from '@mui/x-data-grid';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Textarea from '@mui/joy/Textarea';
import Input from '@mui/joy/Input';
import Grid from '@mui/joy/Grid';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { useNavigate } from 'react-router-dom';
// import Dialog from '@mui/material/Dialog';
// import DialogTitle from '@mui/material/DialogTitle';
// import DialogContent from '@mui/material/DialogContent';

import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';

export default function ColumnPinningDynamicRowHeight() {
    const [openModal, setOpenModal] = useState(false);
  const [selectedDemand, setSelectedDemand] = useState(null);
    const [agent, setAgent] = useState(null);
  const handlePreviewClick = async (demand) => {
    setSelectedDemand(demand);
    try {
        const response = await axios.get(`http://localhost:4000/agent/agents/${demand.professeur}`);
        setAgent(response.data);
      } catch (error) {
        console.error('Error fetching agent data:', error);
      }
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleApprouverClick = async () => {
    if (selectedDemand) {
      try {
        const response = await axios.put(`http://localhost:4000/demandes/updateStatut/${selectedDemand._id}`, {
          statut: 'Approuvée', // Set the new statut here
        });
        // Handle the response as needed (e.g., update UI, show a notification, etc.)
        console.log('Statut updated successfully:', response.data);

        // You can also close the modal or update the demand list after updating the statut.
        // For example:
        setOpenModal(false);
        fetchDemandes(); // Fetch updated demand list
      } catch (error) {
        console.error('Error updating statut:', error);
        // Handle the error appropriately (e.g., show an error message).
      }
    }
  };

  const handleRefuserClick = async () => {
    if (selectedDemand) {
      try {
        const response = await axios.put(`http://localhost:4000/demandes/updateStatut/${selectedDemand._id}`, {
          statut: 'Non approuvée', // Set the new statut here
        });
        // Handle the response as needed (e.g., update UI, show a notification, etc.)
        console.log('Statut updated successfully:', response.data);

        // You can also close the modal or update the demand list after updating the statut.
        // For example:
        setOpenModal(false);
        fetchDemandes(); // Fetch updated demand list
      } catch (error) {
        console.error('Error updating statut:', error);
        // Handle the error appropriately (e.g., show an error message).
      }
    }
  };
  

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
            
            <Button
              variant="outlined"
              size="small"
              startIcon={<RemoveRedEyeIcon />}
            //   disabled={params.row.statut !== 'Approuvée'}
            //   onClick={() => handlePrintClick(params.row)}
            onClick={() => handlePreviewClick(params.row)}
            >
              Preview
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
        `http://localhost:4000/demandes/enAttenteDemands` // Replace with your actual API endpoint
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
          // onCellClick={(params) => {
          //   if (params.field === 'actions') {
          //     handlePrintClick(params.row);
          //   }
          // }}
          initialState={{ pinnedColumns: { left: ['name'], right: ['actions'] } }}
        />
      </div>
      

{openModal ? (
    <Modal open={openModal} onClose={handleCloseModal}>
        { (selectedDemand.__t === 'DemandeQuitterTerritoire') ? (
            <ModalDialog>
            <DialogTitle>  الإذن بمغادرة التراب الوطني
  </DialogTitle>
            <DialogContent>Autorisation de quitter le territoire</DialogContent>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                setOpenModal(false);
              }}
            >
              <Stack spacing={2}>
              <FormControl>
              <Grid container spacing={2} style={{marginTop:"2%"}}>
              <Grid item xs={6} >
                  <FormLabel>Demandeur :</FormLabel>
                  <Input autoFocus required defaultValue={agent.prenom.split('|')[0] + " " + agent.nom.split('|')[0]} disabled/>
                </Grid>
                <Grid item xs={6} >
                  <FormLabel>مقدم الطلب :</FormLabel>
                  <Input autoFocus required defaultValue={agent.prenom.split('|')[1] + " " + agent.nom.split('|')[1]} disabled/>
                </Grid>
                </Grid>
                <Grid container spacing={2} style={{marginTop:"2%"}}>
                <Grid item xs={6} >
                  <FormLabel>De : من</FormLabel>
                  <Input autoFocus required defaultValue={selectedDemand.de_date} disabled/>
                </Grid>
                <Grid item xs={6} >
                  <FormLabel>À : الى</FormLabel>
                  <Input autoFocus required defaultValue={selectedDemand.a_date} disabled/>
                </Grid>
                </Grid>
                <Grid item xs={12} >
                  <FormLabel>Université : جامعة</FormLabel>
                  <Input autoFocus required defaultValue={selectedDemand.universite} disabled/>
                </Grid>
                </FormControl>
                <FormControl>
                  <FormLabel>Description : وصف</FormLabel>
                  <Textarea 
                  required 
                  minRows={3}
                  defaultValue={selectedDemand.description}
                  disabled
                  />
                </FormControl>
                
                
                <Grid container spacing={2} style={{marginTop:"2%"}}>
                <Grid item xs={2} >
                <b></b>
                </Grid>
                <Grid item xs={5} >
                <Button type="submit" onClick={handleApprouverClick} sx={{backgroundColor:"#196F3D ", color:"white",  '&:hover': {
            backgroundColor: '#196F3D ', // Change text color on hover
          },}}>Approuver</Button>
                </Grid>
                <Grid item xs={5} >
                <Button type="submit" onClick={handleRefuserClick} sx={{backgroundColor:"#A93226", color:"white", '&:hover': {
            backgroundColor: '#A93226', // Change text color on hover
          },}}>Refuser</Button>
                </Grid>
                </Grid>
              </Stack>
            </form>
          </ModalDialog>
        ):(selectedDemand.__t === 'DemandeConge')?(
            <ModalDialog>
            <DialogTitle>  إجازة إدارية
  </DialogTitle>
            <DialogContent>Décision de congé administratif</DialogContent>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                setOpenModal(false);
              }}
            >
              <Stack spacing={2}>
              <FormControl>
              <Grid container spacing={2} style={{marginTop:"2%"}}>
              <Grid item xs={6} >
                  <FormLabel>Demandeur :</FormLabel>
                  <Input autoFocus required defaultValue={agent.prenom.split('|')[0] + " " + agent.nom.split('|')[0]} disabled/>
                </Grid>
                <Grid item xs={6} >
                  <FormLabel>مقدم الطلب :</FormLabel>
                  <Input autoFocus required defaultValue={agent.prenom.split('|')[1] + " " + agent.nom.split('|')[1]} disabled/>
                </Grid>
                </Grid>
                <Grid container spacing={2} style={{marginTop:"2%"}}>
                <Grid item xs={6} >
                  <FormLabel>De : من</FormLabel>
                  <Input autoFocus required defaultValue={selectedDemand.de_date} disabled/>
                </Grid>
                <Grid item xs={6} >
                  <FormLabel>À : الى</FormLabel>
                  <Input autoFocus required defaultValue={selectedDemand.a_date} disabled/>
                </Grid>
                </Grid>
                </FormControl>
                <FormControl>
                  <FormLabel>Description : وصف</FormLabel>
                  <Textarea 
                  required 
                  minRows={3}
                  defaultValue={selectedDemand.description}
                  disabled
                  />
                </FormControl>
                
                
                <Grid container spacing={2} style={{marginTop:"2%"}}>
                <Grid item xs={2} >
                <b></b>
                </Grid>
                <Grid item xs={5} >
                <Button type="submit" onClick={handleApprouverClick} sx={{backgroundColor:"#196F3D ", color:"white",  '&:hover': {
            backgroundColor: '#196F3D ', // Change text color on hover
          },}}>Approuver</Button>
                </Grid>
                <Grid item xs={5} >
                <Button type="submit" onClick={handleRefuserClick} sx={{backgroundColor:"#A93226", color:"white", '&:hover': {
            backgroundColor: '#A93226', // Change text color on hover
          },}}>Refuser</Button>
                </Grid>
                </Grid>
              </Stack>
            </form>
          </ModalDialog>
        ):<></>}
        
      </Modal>
):<></>}
      
    </div>
  );
}

