import { Grid, } from '@mui/material';
import { OpcionesBusquedaAvanzada } from './Components/PantallaOpacionesBusqueda';

export const Busqueda = () => {


  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
       
        <OpcionesBusquedaAvanzada/>
      </Grid> 
    </Grid>
  );
};
