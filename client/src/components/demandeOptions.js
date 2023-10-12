import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Typography from '@mui/joy/Typography';
import Grid from '@mui/joy/Grid';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
export default function FAQCard() {
    const handleChange = (event, newValue) => {
        // alert(`You chose "${newValue}"`);
      };
  return (
    <Card
      size="lg"
      variant="plain"
      orientation="horizontal"
      sx={{
        textAlign: 'center',
        maxWidth: '100%',
        width: '90%',
        height: '90%',
        // to make the demo resizable
        // resize: 'horizontal',
        overflow: 'auto',
      }}
    >
      <CardOverflow
        variant="solid"
        color="primary"
        sx={{
          flex: '0 0 300px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          px: 'var(--Card-padding)',
        }}
      >
        <Typography fontSize="xl4" fontWeight="xl" textColor="#fff">
          Demandes
        </Typography>
        <Typography textColor="primary.200">
        Espace demandes administratives pour les professeurs de l'ENSAJ.
        </Typography>
      </CardOverflow>
      <CardContent sx={{ gap: 1.5, minWidth: 200 }}>
      <Grid container spacing={2} sx={{ flexGrow: 1 }}>
      <Grid xs={5}>
      <img src="https://cdn-07.9rayti.com/rsrc/cache/widen_750/uploads/2014/06/ENSA-El-Jadida-concours-dacc%C3%A8s-%C3%A0-la-1%C3%A8re-ann%C3%A9e-du-Cycle-dIng%C3%A9nieur-2014.jpg"
            width="70%"
            height='60%'
            />
            </Grid>
            <Grid xs ={2}>
<></>
            </Grid>
        <Grid xs={5}>
      <img src="https://www.enssup.gov.ma/storage/settings/October2021/TxyjqNRZ4NmJv8XIlkg4.png"
            width="80%"
            height='60%'
            />
            </Grid>
        </Grid>
        <AspectRatio ratio="19/4" objectFit="contain" variant="plain">
            
          <img
            alt=""
            src="https://cdn.dribbble.com/users/1874602/screenshots/5647628/send-icon.gif"
          />
        </AspectRatio>
        <CardContent>
          <Typography level="title-lg">Avez vous besoin d'un document administratif?</Typography>
          <Typography fontSize="sm" sx={{ mt: 0.5 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor.
          </Typography>
        </CardContent>
        <Select defaultValue="dog" onChange={handleChange}>
      <Option value="dog">Attestation de travail - شهادة عمل</Option>
      <Option value="cat">Autorisation de quitter le territoire - الإذن بمغادرة التراب الوطني</Option>
      <Option value="fish">décision de congé administratif - إجازة إدارية</Option>
      <Option value="bird">Attestation de reprise de travail - شهادةاستئناف العمل</Option>
    </Select>
        <Button
          variant="outlined"
          color="primary"
          sx={{
            '--variant-borderWidth': '2px',
            borderRadius: 40,
            borderColor: 'primary.500',
            mx: 'auto',
          }}
        >
          Valider
        </Button>
      </CardContent>
    </Card>
  );
}