import React, { useState } from 'react';
import { Grid, TextField, Switch, FormControlLabel, Button, } from '@mui/material';
import axios from 'axios';
import { control_success } from '../../../../Elements/alertas/alertaSucces';
import { baseUrl } from '../../../../varaibles/black';
import SaveIcon from '@mui/icons-material/Save';

export const ConfiguracionPersona = () => {
    const [form, setForm] = useState({
        telefono: '',
        nombre: '',
        cedula: '',
        agregarCedula: false,
        correoElectronico: ''
    });
    const [validEmail, setValidEmail] = useState(true);
    const [acceptedTerms, setAcceptedTerms] = useState(false); // Estado para controlar si se aceptan los términos

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;
        setForm({
            ...form,
            [name]: newValue
        });
    };

    const handleSubmit = async () => {
        try {
            if (!validEmail) {
                alert('Por favor, ingresa un correo electrónico válido.');
                return;
            }

            // Verificar si los campos requeridos están llenos
            if (!form.telefono || !form.nombre || !form.correoElectronico) {
                alert('Por favor, completa todos los campos requeridos.');
                return;
            }

            const response = await axios.post(`${baseUrl}/encuestas/crear-t004personas/`, {
                T004cell: form.telefono,
                T004nombre: form.nombre,
                T004cc: form.agregarCedula ? form.cedula : '',
                T004correo: form.correoElectronico
            });
            console.log('Respuesta del servidor:', response.data);
            control_success('¡Datos guardados correctamente!');
        } catch (error) {
            console.error('Error al enviar los datos:', error);
        }
    };

    const handleEmailChange = (e: any) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setValidEmail(emailPattern.test(e.target.value));
        handleInputChange(e);
    };

    return (
        <Grid container spacing={2} style={{ marginTop: 15 }}>

            <Grid item xs={12} md={6}>
                <TextField
                    fullWidth
                    label="Número de Teléfono"
                    name="telefono"
                    value={form.telefono}
                    onChange={handleInputChange}
                    required
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                    fullWidth
                    label="Nombre"
                    name="nombre"
                    value={form.nombre}
                    onChange={handleInputChange}
                    required
                />
            </Grid>
            <Grid item xs={12}>
                <FormControlLabel
                    control={<Switch name="agregarCedula" checked={form.agregarCedula} onChange={handleInputChange} />}
                    label="Agregar Cédula"
                />
            </Grid>
            {form.agregarCedula && (
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Cédula"
                        name="cedula"
                        value={form.cedula}
                        onChange={handleInputChange}
                        required
                    />
                </Grid>
            )}
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    label="Correo Electrónico"
                    name="correoElectronico"
                    value={form.correoElectronico}
                    onChange={handleEmailChange}
                    required
                    error={!validEmail}
                    helperText={!validEmail ? 'Correo electrónico inválido' : ''}
                />
            </Grid>
            <Grid item xs={12}>
                <FormControlLabel
                    control={
                        <Switch
                            name="acceptedTerms"
                            checked={acceptedTerms}
                            onChange={(e) => setAcceptedTerms(e.target.checked)}
                        />
                    }
                    label="Acepta el trámite y uso de los datos suministrados con el fin de brindar un buen servicio"
                />
            </Grid>
            <Grid item xs={12}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    startIcon={<SaveIcon />}
                    disabled={!acceptedTerms} // Desactivar el botón de guardar si los términos no son aceptados
                >
                    Guardar
                </Button>
            </Grid>
        </Grid>
    );
};
