import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import { BusquedaAvanzadaPersonas } from './BusquedaPerosnas/BusquedaPerosnas';
import { BusquedaCasas } from './BusquedaCasas/BusquedaCasas';
import { BusquedaConjuntos } from './BusquedaConjuntos/BusquedaConjuntos';

// Función para renderizar un panel de pestaña
const TabPanel = (props: any) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <div>
          {children}
        </div>
      )}
    </div>
  );
}

// Componente principal de pestañas con íconos y etiquetas
export const OpcionesBusquedaAvanzada = () => {
  // Estado para el valor actual de la pestaña activa
  const [value, setValue] = React.useState(0);

  // Función para cambiar el valor de la pestaña activa
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div style={{ width: '100%' }}>
      {/* Pestañas con íconos y etiquetas */}
      <Tabs value={value} onChange={handleChange} aria-label="icon label tabs example" centered>
        <Tab icon={<HomeIcon />} label="CASAS" />
        <Tab icon={<GroupIcon />} label="conjuntos" />
        <Tab icon={<PersonPinIcon />} label="PERSONA" />
      </Tabs>
      {/* Paneles de contenido para cada pestaña */}
      <TabPanel value={value} index={0}>
        <BusquedaCasas />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <BusquedaConjuntos/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <BusquedaAvanzadaPersonas />
      </TabPanel>
    </div>
  );
}
