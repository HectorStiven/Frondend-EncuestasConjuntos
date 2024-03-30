import React, { useState } from 'react';
import { Grid, TextField, Button, IconButton } from '@mui/material';
import axios from 'axios';
import { control_success } from '../../../../Elements/alertas/alertaSucces';
import { baseUrl } from '../../../../varaibles/black';
import SaveIcon from '@mui/icons-material/Save';
import PhoneIcon from '@mui/icons-material/Phone';
import PersonIcon from '@mui/icons-material/Person';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';

interface FormData {
  nit: string;
  nombre: string;
  direccion: string;
  numeroAdministracion: string;
  telefono: string;
}

export const ConfiguracionConjunto = () => {
    const [formData, setFormData] = useState({
        nit: '',
        nombre: '',
        direccion: '',
        numeroAdministracion: '',
        telefono: ''
    });

    const handleInputChange = (event:any) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.preventDefault();
      try {
          // Validar si todos los campos están llenos
          for (const key in formData) {
              if (Object.prototype.hasOwnProperty.call(formData, key) && formData[key as keyof FormData] === '') {
                  alert('Por favor, completa todos los campos.');
                  return;
              }
          }
  
          const requestData = {
              nit: parseInt(formData.nit),
              T003nombre: formData.nombre,
              T003direccion: formData.direccion,
              T003numero_administracion: parseInt(formData.numeroAdministracion),
              T003tel: parseInt(formData.telefono)
          };
  
          const response = await axios.post(`${baseUrl}/encuestas/crear-t003datos-conjunto/`, requestData);
          console.log('Respuesta del servidor:', response.data);
          control_success('¡Registro de conjunto creado correctamente!');
      } catch (error) {
          console.error('Error al enviar los datos:', error);
      }
  };
  

    return (
        <Grid container spacing={2} style={{ marginTop: 15 }}>
            <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    label="NIT"
                    name="nit"
                    value={formData.nit}
                    onChange={handleInputChange}
                    required
                    InputProps={{
                        startAdornment: (
                            <IconButton>
                                <AccountBoxIcon />
                            </IconButton>
                        ),
                    }}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    label="Nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    required
                    InputProps={{
                        startAdornment: (
                            <IconButton>
                                <PersonIcon />
                            </IconButton>
                        ),
                    }}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    label="Dirección"
                    name="direccion"
                    value={formData.direccion}
                    onChange={handleInputChange}
                    required
                    InputProps={{
                        startAdornment: (
                            <IconButton>
                                <LocationOnIcon />
                            </IconButton>
                        ),
                    }}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    label="Número de Administración"
                    name="numeroAdministracion"
                    value={formData.numeroAdministracion}
                    onChange={handleInputChange}
                    required
                    InputProps={{
                        startAdornment: (
                            <IconButton>
                                <PhoneIcon />
                            </IconButton>
                        ),
                    }}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    label="Teléfono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleInputChange}
                    required
                    InputProps={{
                        startAdornment: (
                            <IconButton>
                                <PhoneAndroidIcon />
                            </IconButton>
                        ),
                    }}
                />
            </Grid>
            <Grid item xs={12}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    startIcon={<SaveIcon />}
                >
                    Guardar
                </Button>
            </Grid>
        </Grid>
    );
};
