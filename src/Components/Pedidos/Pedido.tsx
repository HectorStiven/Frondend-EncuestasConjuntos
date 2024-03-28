/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, TextField, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

interface Estudiante {
  id: number;
  numero_identidad: string;
  primer_nombre: string;
  segundo_nombre: string | null;
  primer_apellido: string;
  segundo_apellido: string | null;
  edad: number;
  fecha_nacimiento: string;
  correo_electronico: string;
  numero_celular: string;
  pertenece_colegio: boolean;
  pertenece_universidad: boolean;
  tipo_documento: string | null;
  tipo_genero: string | null;
  colegio: string | null;
  universidad: string | null;
  id_grado: number | null;
}

export const PedidoPrincipal = () => {
  const [searchData, setSearchData] = useState({
    nombre: '',
    libro: '',
    autor: ''
  });
  const [rows, setRows] = useState<Estudiante[]>([]);

  const fetchData = async () => {
    try {
      const url = 'https://backend-bibliotecacompensar-production.up.railway.app/estudiantes/obtener_estudiante/';
      const response = await axios.get(url);
      setRows(response.data.data);
      console.log(response.data); // Imprime los datos en la consola
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSearchData({
      ...searchData,
      [name]: value
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Aquí puedes agregar la lógica para buscar los datos en la DataGrid
    console.log('Datos de búsqueda:', searchData);
    // Limpia los campos después de enviar el formulario de búsqueda
    setSearchData({
      nombre: '',
      libro: '',
      autor: ''
    });
  };

  const columns = [
    { field: 'primer_nombre', headerName: 'Nombre', width: 150 },
    { field: 'primer_apellido', headerName: 'Apellido', width: 200 },
    { field: 'correo_electronico', headerName: 'Correo Electrónico', width: 250 },
    { field: 'numero_celular', headerName: 'Número Celular', width: 200 },
  ];

  useEffect(() => {
    fetchData();
  }, []); // Fetch data on component mount

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Nombre"
                name="nombre"
                value={searchData.nombre}
                onChange={handleInputChange}
                variant="outlined"
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Libro"
                name="libro"
                value={searchData.libro}
                onChange={handleInputChange}
                variant="outlined"
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Autor"
                name="autor"
                value={searchData.autor}
                onChange={handleInputChange}
                variant="outlined"
                margin="normal"
              />
            </Grid>
          </Grid>
          <Button type="submit" variant="contained" color="primary">
            Buscar
          </Button>
        </form>
      </Grid>
      <Grid item xs={12}>
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid rows={rows} columns={columns} autoHeight />
        </div>
      </Grid>
    </Grid>
  );
};
