import DemandesTable from '../components/profDemandesTable';
import Drawer from '../components/drawer';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Breadcrumb from '../components/breadcrumb';
export default function profDemandes(){
    return(
        <Box sx={{ display: 'flex' }}>
        <Drawer role='Professeur'/>
        
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