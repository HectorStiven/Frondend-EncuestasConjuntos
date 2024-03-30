import React, { useState, useEffect } from 'react';
import { Grid, TextField, Button, IconButton, Tooltip } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import axios from 'axios';
import { baseUrl } from '../../../../varaibles/black';
import DeleteIcon from '@mui/icons-material/Delete';
import { ConfirmationModal } from '../../../../Elements/alertas/ModalConfirmacion';
import { control_success } from '../../../../Elements/alertas/alertaSucces';

export const BusquedaConjuntos = () => {
  const [searchData, setSearchData] = useState({
    nombre: '',
    direccion: '',
    numeroAdministracion: ''
  });
  const [conjuntos, setConjuntos] = useState([]);
  const [selectedConjuntoId, setSelectedConjuntoId] = useState(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);


  const fetchData = async () => {
    try {
      const url = `${baseUrl}/encuestas/listar-t003datos-conjunto/`;
      const response = await axios.get(url);
      setConjuntos(response.data.data);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  };

  const handleInputChange = (event:any) => {
    const { name, value } = event.target;
    setSearchData({
      ...searchData,
      [name]: value
    });
  };

  const handleSubmit = (event:any) => {
    event.preventDefault();
    console.log('Datos de búsqueda:', searchData);
    // Aquí puedes realizar la lógica de búsqueda si lo necesitas
  };

  const handleDeleteClick = (id:any) => {
    setSelectedConjuntoId(id);
    setShowConfirmationModal(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedConjuntoId) {
      try {
        const url = `${baseUrl}/encuestas/borrar-t003datos-conjunto/${selectedConjuntoId}/`;
        await axios.delete(url);
        control_success('Conjunto eliminado con éxito.');
      } catch (error) {
        console.error('Error al eliminar el conjunto:', error);
      }
    }
    fetchData();
    setShowConfirmationModal(false);
  };

  const handleCancelDelete = () => {
    setShowConfirmationModal(false);
  };

  const columns: GridColDef[] = [
    { field: 'T003nombre', headerName: 'Nombre', flex: 1 },
    { field: 'T003direccion', headerName: 'Dirección', flex: 1 },
    { field: 'T003numero_administracion', headerName: 'Número de Administración', flex: 1 },
    { field: 'T003tel', headerName: 'Teléfono', flex: 1 },
    {
      field: 'acciones',
      headerName: 'Acciones',
      flex: 1,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => handleDeleteClick(params.row.id)} color="error">
            <Tooltip title="Eliminar conjunto" placement="top">
              <DeleteIcon />
            </Tooltip>
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <Grid container spacing={0}>
      <Grid item xs={12}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
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
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                label="Dirección"
                name="direccion"
                value={searchData.direccion}
                onChange={handleInputChange}
                variant="outlined"
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                label="Número de Administración"
                name="numeroAdministracion"
                value={searchData.numeroAdministracion}
                onChange={handleInputChange}
                variant="outlined"
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
              >
                Buscar
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
      <Grid item xs={12}>
        <div style={{ height: 400, width: '100%', marginTop: 11 }}>
          <DataGrid
            columns={columns}
            rows={conjuntos}
          />
        </div>
      </Grid>
      <ConfirmationModal
        open={showConfirmationModal}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </Grid>
  );
};
