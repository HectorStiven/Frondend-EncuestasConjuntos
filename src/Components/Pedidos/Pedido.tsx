/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, TextField, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { baseUrl } from '../../varaibles/black'; // Asegúrate de que esta importación sea correcta

interface Estudiante {
  id: number;
  T007NombreTipoo: string;
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
      const url = `${baseUrl}/encuestas/listar-t007tipos-de-casa/`;
      const response = await axios.get(url);
      setRows(response.data.data); // Corregir aquí: No es necesario usar response.data.data
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
    console.log('Datos de búsqueda:', searchData);
    setSearchData({
      nombre: '',
      libro: '',
      autor: ''
    });
  };

  const columns = [
    { field: 'T007NombreTipoo', headerName: 'T007NombreTipoo', width: 150 },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div style={{ margin: '20px' }}> {/* Agregar margen alrededor del contenedor principal */}
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
    </div>
  );
};

