import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import Stack from '@mui/joy/Stack';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Grid from '@mui/joy/Grid';

export default function UserCard({ agent }) {

  const isAdmin = agent && agent.__t === 'Admin';
  const isProfesseur = agent && agent.__t === 'Professeur';

  const handleValidate = () => {
    setOpenAtt2(true);
  }

  const handleClose = () => {
    setOpenAtt2(false);
  }

  const [openAtt2, setOpenAtt2] = React.useState(false);

  

  return (
    <Box
      sx={{
        width: '100%',
        position: 'relative',
        overflow: { xs: 'auto', sm: 'initial' },
      }}
    >
      <Box
      />
      <Card
        orientation="horizontal"
        sx={{
          width: '100%',
          flexWrap: 'wrap',
          [`& > *`]: {
            '--stack-point': '500px',
            minWidth:
              'clamp(0px, (calc(var(--stack-point) - 2 * var(--Card-padding) - 2 * var(--variant-borderWidth, 0px)) + 1px - 100%) * 999, 100%)',
          },
          // make the card resizable for demo
          overflow: 'auto',
          resize: 'horizontal',
        }}
      >
        <AspectRatio flex ratio="1" maxHeight={182} sx={{ minWidth: 182 }}>
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286"
            srcSet="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286&dpr=2 2x"
            loading="lazy"
            alt=""
          />
        </AspectRatio>
        <CardContent>
          <Typography fontSize="xl" fontWeight="lg">
          {agent ? agent.prenom.split('|')[0]  + " " + agent.nom.split('|')[0] + "   |   " +  agent.prenom.split('|')[1]  + " " + agent.nom.split('|')[1] : 'Loading...'} 
          </Typography>
          <Typography level="body-sm" fontWeight="lg" textColor="text.tertiary">
          {isAdmin ? agent.fonction : 'Professeur'} 
          </Typography>
          <Sheet
            sx={{
              bgcolor: 'background.level1',
              borderRadius: 'sm',
              p: 1.5,
              my: 1.5,
              display: 'flex',
              gap: 2,
              '& > div': { flex: 1 },
            }}
          >
            <div>
              <Typography level="body-xs" fontWeight="lg">
                CIN
              </Typography>
              <Typography fontWeight="lg">{agent ? agent.cin : 'Loading...'} </Typography>
            </div>
            <div>
              <Typography level="body-xs" fontWeight="lg">
                Email
              </Typography>
              <Typography fontWeight="lg">{agent ? agent.email : 'Loading...'}</Typography>
            </div>
            <div>
              <Typography level="body-xs" fontWeight="lg">
                Tel
              </Typography>
              <Typography fontWeight="lg">{agent ? "+212 "+agent.tel.replace(/^0+/, '') : 'Loading...'}</Typography>
            </div>
          </Sheet>
          { localStorage.getItem('type') === 'Admin' ? (
          <Box sx={{ display: 'flex', gap: 1.5, '& > button': { flex: 1 } }}>
            <Button variant="solid" color="primary"
            onClick={handleValidate}>
              Edit
            </Button>
          </Box>
          ) : localStorage.getItem('type') === 'Professeur' ? (
            <></>
          ) : null}
        </CardContent>
      </Card>

      { agent && agent.__t === 'Admin' ? (
      <Modal open={openAtt2} onClose={() => handleClose()}>
        <ModalDialog>
          <DialogTitle> تحديث بيانات المستخدم</DialogTitle>
          <DialogContent>Modifier les données utilisateur</DialogContent>
          <form
            onSubmit={(event) => {
              event.preventDefault();

              handleClose();
            }}
          >
            <Stack spacing={2}>
            <FormControl>
              <Grid container spacing={2} style={{marginTop:"2%"}}>
              <Grid item xs={6} >
                <FormLabel>Nom : </FormLabel>
                <TextField variant="outlined" value={agent ? agent.nom.split('|')[0] : 'Loading...'}/>
              </Grid>
              <Grid item xs={6} >
                <FormLabel>Prenom : </FormLabel>
                <TextField variant="outlined" value={agent ? agent.prenom.split('|')[0] : 'Loading...'}/>
              </Grid>
              </Grid>
              <Grid container spacing={2} style={{marginTop:"2%"}}>
              <Grid item xs={6} >
                <FormLabel>النسب :</FormLabel>
                <TextField variant="outlined" value={agent ? agent.nom.split('|')[1] : 'Loading...'}/>
              </Grid>
              <Grid item xs={6} >
                <FormLabel>الأسم :</FormLabel>
                <TextField variant="outlined" value={agent ? agent.prenom.split('|')[1] : 'Loading...'}/>
              </Grid>
              </Grid>
              <Grid container spacing={2} style={{marginTop:"2%"}}>
              <Grid item xs={6} >
                <FormLabel> CIN (رقم ب.ت.وطنية) :</FormLabel>
                <TextField variant="outlined" value={agent ? agent.cin : 'Loading...'}/>
              </Grid>
              <Grid item xs={6} >
                <FormLabel>Numéro téléphone (رقم الهاتف) :</FormLabel>
                <TextField variant="outlined" value={agent ? agent.tel : 'Loading...'}/>
              </Grid>
              </Grid>
              <Grid container style={{marginTop:"4%"}} xs={12}>
                <FormLabel> Email (البريد الإلكتروني) :</FormLabel>
                <TextField variant="outlined" value={agent ? agent.email : 'Loading...'} fullWidth/>
              </Grid>
              </FormControl>
            </Stack>
            <Box sx={{ display: 'flex', gap: 1.5, '& > button': { flex: 1 } }} style={{marginTop:"12%"}}>
            <Button variant="solid" color="primary">
              Valider
            </Button>
          </Box>
          </form>
        </ModalDialog>
      </Modal>
      ) : agent && agent.__t === 'Professeur' ? (
        <Modal open={openAtt2} onClose={() => handleClose()}>
        <ModalDialog>
          <DialogTitle> تحديث بيانات المستخدم</DialogTitle>
          <DialogContent>Modifier les données utilisateur</DialogContent>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              handleClose();
            }}
          >
            <Stack spacing={2}>
            <FormControl>
            <Grid container spacing={2} style={{marginTop:"2%"}}>
              <Grid item xs={6} >
                <FormLabel>Nom : </FormLabel>
                <TextField variant="outlined" value={agent ? agent.nom.split('|')[0] : 'Loading...'}/>
              </Grid>
              <Grid item xs={6} >
                <FormLabel>Prenom : </FormLabel>
                <TextField variant="outlined" value={agent ? agent.prenom.split('|')[0] : 'Loading...'}/>
              </Grid>
              </Grid>
              <Grid container spacing={2} style={{marginTop:"2%"}}>
              <Grid item xs={6} >
                <FormLabel>النسب :</FormLabel>
                <TextField variant="outlined" value={agent ? agent.nom.split('|')[1] : 'Loading...'}/>
              </Grid>
              <Grid item xs={6} >
                <FormLabel>الأسم :</FormLabel>
                <TextField variant="outlined" value={agent ? agent.prenom.split('|')[1] : 'Loading...'}/>
              </Grid>
              </Grid>
              <Grid container spacing={2} style={{marginTop:"2%"}}>
              <Grid item xs={6} >
                <FormLabel> CIN (رقم ب.ت.وطنية) :</FormLabel>
                <TextField variant="outlined" value={agent ? agent.cin : 'Loading...'}/>
              </Grid>
              <Grid item xs={6} >
                <FormLabel>Numéro téléphone (رقم الهاتف) :</FormLabel>
                <TextField variant="outlined" value={agent ? agent.tel : 'Loading...'}/>
              </Grid>
              </Grid>
              <Grid container style={{marginTop:"4%"}} xs={12}>
                <FormLabel> Email (البريد الإلكتروني) :</FormLabel>
                <TextField variant="outlined" value={agent ? agent.email : 'Loading...'} fullWidth/>
              </Grid>
              </FormControl>
            </Stack>
            <Box sx={{ display: 'flex', gap: 1.5, '& > button': { flex: 1 } }} style={{marginTop:"12%"}}>
            <Button variant="solid" color="primary">
              Valider
            </Button>
          </Box>
          </form>
        </ModalDialog>
      </Modal>
      ) : null}
    </Box>

    
  );
}