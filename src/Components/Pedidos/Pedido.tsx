/* eslint-disable @typescript-eslint/no-unused-vars */
import { Grid } from '@mui/material';
import { IconLabelTabs } from './Components/PantallasOpciones';


export const PedidoPrincipal = () => {


  return (
    <div style={{ margin: '20px' }}> {/* Agregar margen alrededor del contenedor principal */}
      <Grid container spacing={2}>
        <Grid item xs={12}>
        <IconLabelTabs/>
        </Grid>
      </Grid>
    </div>
  );
};

