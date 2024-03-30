import React, { useState, useEffect } from 'react';
import { Grid, TextField, Button, MenuItem, Select, FormControl, InputLabel, IconButton } from '@mui/material';
import axios from 'axios';
import { control_success } from '../../../../Elements/alertas/alertaSucces';
import { baseUrl } from '../../../../varaibles/black';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HouseIcon from '@mui/icons-material/House';

interface FormData {
  T002nombre_casa: string;
  T002propietario: string;
  T002ponderacion: string;
  id_conjunto: string;
  id_tipo_casa: string;
}

interface TipoCasa {
  id: string;
  T007NombreTipoo: string;
}

interface ConjuntoData {
  id: string;
  T003nombre: string;
}

export const ConfiguracionCasa = () => {
  const [formData, setFormData] = useState<FormData>({
    T002nombre_casa: '',
    T002propietario: '',
    T002ponderacion: '',
    id_conjunto: '',
    id_tipo_casa: ''
  });

  const [tiposCasa, setTiposCasa] = useState<TipoCasa[]>([]);
  const [selectedTipoCasa, setSelectedTipoCasa] = useState('');

  const [conjuntos, setConjuntos] = useState<ConjuntoData[]>([]);
  const [selectedConjunto, setSelectedConjunto] = useState('');

  const handleInputChange = (event:any) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleTipoCasaChange = (event: any) => {
    setSelectedTipoCasa(event.target.value as string);
  };

  const handleConjuntoChange = (event: any) => {
    setSelectedConjunto(event.target.value as string);
  };

  useEffect(() => {
    const fetchTiposCasa = async () => {
      try {
        const url = `${baseUrl}/encuestas/listar-t007tipos-de-casa/`;
        const response = await axios.get<{ data: TipoCasa[] }>(url);
        setTiposCasa(response.data.data);
      } catch (error) {
        console.error('Error al obtener los tipos de casa:', error);
      }
    };

    const fetchConjuntos = async () => {
      try {
        const url = `${baseUrl}/encuestas/listar-t003datos-conjunto/`;
        const response = await axios.get<{ data: ConjuntoData[] }>(url);
        setConjuntos(response.data.data);
      } catch (error) {
        console.error('Error al obtener los conjuntos:', error);
      }
    };

    fetchTiposCasa();
    fetchConjuntos();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
  
      const response = await axios.post(`${baseUrl}/encuestas/crear-t002datos-casa/`, {
        ...formData,
        id_tipo_casa: selectedTipoCasa,
        id_conjunto: selectedConjunto
      });
      console.log('Respuesta del servidor:', response.data);
      control_success('¡Registro de casa creado correctamente!');
    } catch (error) {
      console.error('Error al enviar los datos:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} style={{ marginTop: 15 }}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Nombre de la Casa"
            name="T002nombre_casa"
            value={formData.T002nombre_casa}
            onChange={handleInputChange}
            required
            InputProps={{
              startAdornment: (
                <IconButton>
                  <HouseIcon />
                </IconButton>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Propietario"
            name="T002propietario"
            value={formData.T002propietario}
            onChange={handleInputChange}
            required
            InputProps={{
              startAdornment: (
                <IconButton>
                  <AccountCircleIcon />
                </IconButton>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Ponderación"
            name="T002ponderacion"
            value={formData.T002ponderacion}
            onChange={handleInputChange}
            required
            InputProps={{
              startAdornment: (
                <IconButton>
                  <HouseIcon />
                </IconButton>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel id="tipo-casa-label">Tipo de Casa</InputLabel>
            <Select
              labelId="tipo-casa-label"
              id="tipo-casa"
              value={selectedTipoCasa}
              onChange={handleTipoCasaChange}
              required
            >
              {tiposCasa.map((tipoCasa) => (
                <MenuItem key={tipoCasa.id} value={tipoCasa.id}>
                  {tipoCasa.T007NombreTipoo}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel id="conjunto-label">Conjunto</InputLabel>
            <Select
              labelId="conjunto-label"
              id="conjunto"
              value={selectedConjunto}
              onChange={handleConjuntoChange}
              required
            >
              {conjuntos.map((conjunto) => (
                <MenuItem key={conjunto.id} value={conjunto.id}>
                  {conjunto.T003nombre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
          >
          
            Guardar
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

