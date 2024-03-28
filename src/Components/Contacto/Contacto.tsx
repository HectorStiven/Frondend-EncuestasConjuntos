import React, { useState } from 'react';
import { Grid, TextField, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

export const Contacto = () => {
  // Estado para almacenar los datos del formulario de búsqueda
  const [searchData, setSearchData] = useState({
    nombre: '',
    libro: '',
    autor: ''
  });

  // Datos de ejemplo para la DataGrid
  const [rows] = useState([
    { id: 1, nombre: 'Juan', libro: 'La sombra del viento', autor: 'Carlos Ruiz Zafón' },
    { id: 2, nombre: 'María', libro: 'Cien años de soledad', autor: 'Gabriel García Márquez' },
    { id: 3, nombre: 'Pedro', libro: 'Harry Potter y la piedra filosofal', autor: 'J.K. Rowling' },
  ]);

  // Manejador de cambios en los campos del formulario de búsqueda
  const handleInputChange = (event:any) => {
    const { name, value } = event.target;
    setSearchData({
      ...searchData,
      [name]: value
    });
  };

  // Manejador del envío del formulario de búsqueda
  const handleSubmit = (event:any) => {
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

  // Columnas para la DataGrid
  const columns = [
    { field: 'nombre', headerName: 'Nombre', width: 150 },
    { field: 'libro', headerName: 'Libro', width: 200 },
    { field: 'autor', headerName: 'Autor', width: 200 },
  ];

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
          <DataGrid rows={rows} columns={columns} autoHeight  />
        </div>
      </Grid>
    </Grid>
  );
};
