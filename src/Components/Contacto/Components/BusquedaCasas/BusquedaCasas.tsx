import React, { useState, useEffect } from 'react';
import { Grid, TextField, Button, IconButton, Tooltip } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { baseUrl } from '../../../../varaibles/black';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { ConfirmationModal } from '../../../../Elements/alertas/ModalConfirmacion';
import { control_success } from '../../../../Elements/alertas/alertaSucces';

interface Casa {
  id: number;
  T002nombre_casa: string;
  T002propietario: string;
  T002ponderacion: number;
}

export const BusquedaCasas = () => {
  const [searchData, setSearchData] = useState({
    nombreCasa: '',
    propietario: '',
    ponderacion: ''
  });
  const [casas, setCasas] = useState<Casa[]>([]);
  const [selectedCasaId, setSelectedCasaId] = useState<number | null>(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const fetchData = async () => {
    try {
      const url = `${baseUrl}/encuestas/listar-t002datos-casa/`;
      const response = await axios.get<{ data: Casa[] }>(url);
      setCasas(response.data.data);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
      nombreCasa: '',
      propietario: '',
      ponderacion: ''
    });
  };

  const handleDeleteClick = (id: number) => {
    setSelectedCasaId(id);
    setShowConfirmationModal(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedCasaId) {
      try {
        const url = `${baseUrl}/encuestas/borrar-t002datos-casa/${selectedCasaId}/`;
        await axios.delete(url);
        fetchData();
        control_success('Casa eliminada con éxito.');
      } catch (error) {
        console.error('Error al eliminar la casa:', error);
      }
    }
    setShowConfirmationModal(false);
  };

  const handleCancelDelete = () => {
    setShowConfirmationModal(false);
  };

  const columns: GridColDef[] = [
    { field: 'T002nombre_casa', headerName: 'Nombre', flex: 1 },
    { field: 'T002propietario', headerName: 'Propietario', flex: 1 },
    { field: 'T002ponderacion', headerName: 'Ponderación', flex: 1 },
    {
      field: 'acciones',
      headerName: 'Acciones',
      flex: 1,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => handleDeleteClick(params.row.id)} color="primary">
            <Tooltip title="Editar casa" placement="top">
              <EditIcon />
            </Tooltip>
          </IconButton>
          <IconButton onClick={() => handleDeleteClick(params.row.id)} color="error">
            <Tooltip title="Eliminar casa" placement="top">
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
          <Grid container spacing={0}>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                label="Nombre de la Casa"
                name="nombreCasa"
                style={{ width: "95%" }}
                value={searchData.nombreCasa}
                onChange={handleInputChange}
                variant="outlined"
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                label="Propietario"
                name="propietario"
                style={{ width: "95%" }}
                value={searchData.propietario}
                onChange={handleInputChange}
                variant="outlined"
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                label="Ponderación"
                name="ponderacion"
                style={{ width: "95%" }}
                value={searchData.ponderacion}
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
                startIcon={<SearchIcon />}
              >
                Buscar
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
      <Grid item xs={12}>
        <div style={{ height: 400, width: '100%', marginTop: 11, display: 'flex', justifyContent: 'center' }}>
          <DataGrid
            density="compact"
            autoHeight
            columns={columns}
            rows={casas}
            getRowId={(row) => uuidv4()}
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
