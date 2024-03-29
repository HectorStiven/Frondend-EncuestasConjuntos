import React, { useEffect, useState } from 'react';
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

interface Persona {
  id: number;
  T004cell: string;
  T004nombre: string;
  T004cc: string;
  T004correo: string;
}

export const BusquedaAvanzadaPersonas = () => {
  const [searchData, setSearchData] = useState({
    nombre: '',
    cc: '',
    correo: ''
  });
  const [rows, setRows] = useState<Persona[]>([]);
  const [selectedPersonId, setSelectedPersonId] = useState<number | null>(null); // Almacena el ID de la persona seleccionada para eliminar
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const fetchData = async () => {
    try {
      const url = `${baseUrl}/encuestas/listar-t004personas/`;
      const response = await axios.get<{ data: Persona[] }>(url);
      setRows(response.data.data);
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
      nombre: '',
      cc: '',
      correo: ''
    });
  };

  const handleDeleteClick = (id: number) => {
    setSelectedPersonId(id);
    setShowConfirmationModal(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedPersonId) {
      try {
        const url = `${baseUrl}/encuestas/borrar-t004personas/${selectedPersonId}/`;
        await axios.delete(url);
        // Actualizar los datos después de la eliminación
        fetchData();
        control_success('Persona eliminada con éxito.');
      } catch (error) {
        console.error('Error al eliminar la persona:', error);
      }
    }
    setShowConfirmationModal(false);
  };

  const handleCancelDelete = () => {
    setShowConfirmationModal(false);
  };

  const columns: GridColDef[] = [
    { field: 'T004nombre', headerName: 'Nombre', flex: 1 },
    { field: 'T004cc', headerName: 'CC', flex: 0.75 },
    { field: 'T004correo', headerName: 'Correo', flex: 1 },
    {
      field: 'acciones',
      headerName: 'acciones',
      flex: 1,
      renderCell: (params) => (
        <><IconButton onClick={() => handleDeleteClick(params.row.id)} color="primary">
          <Tooltip title="Editar persona" placement="top">
            <EditIcon />
          </Tooltip>
        </IconButton>

        <IconButton onClick={() => handleDeleteClick(params.row.id)} color="error">
          <Tooltip title="Eliminar persona" placement="top">
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
                label="Nombre"
                name="nombre"
                style={{width:"95%"}}
                value={searchData.nombre}
                onChange={handleInputChange}
                variant="outlined"
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                label="CC"
                style={{width:"95%"}}
                name="cc"
                value={searchData.cc}
                onChange={handleInputChange}
                variant="outlined"
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                label="Correo"
                name="correo"
                style={{width:"95%"}}
                value={searchData.correo}
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
            rows={rows}
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

