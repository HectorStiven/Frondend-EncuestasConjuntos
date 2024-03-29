import React, { useEffect, useState } from 'react';
import { Grid, FormControl, FormControlLabel, InputLabel, MenuItem, Select, Switch, TextField } from '@mui/material';
import axios from 'axios';
import { baseUrl } from '../../../../varaibles/black';

interface I_casa {
  id: number;
  T007NombreTipoo: string;
}

export const ConfiguracionCasa = () => {
  const [form, setForm] = useState({
    tipoCasa: '',
    numeroCasa: '',
    activo: false
  });

  const handleInputChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setForm({
      ...form,
      [name]: newValue
    });
  };

  const [rows, setRows] = useState<I_casa[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>('');

  const fetchData = async () => {
    try {
      const url = `${baseUrl}/encuestas/listar-t007tipos-de-casa/`;
      const response = await axios.get<{ data: I_casa[] }>(url);
      setRows(response.data.data);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSelectChange = (event: any) => {
    setSelectedOption(event.target.value as string);
  };

  return (
    <Grid container spacing={2} style={{ marginTop: 15 }}>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel id="select-label">Selecciona un tipo de casa</InputLabel>
          <Select
            labelId="select-label"
            id="select"
            value={selectedOption}
            onChange={handleSelectChange}
          >
            {rows.map((row) => (
              <MenuItem key={row.id} value={row.id}>
                {row.T007NombreTipoo}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          label="Número de Casa"
          name="numeroCasa"
          value={form.numeroCasa}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={6}>
        <FormControlLabel
          control={<Switch name="activo" checked={form.activo} onChange={handleInputChange} />}
          label="Activo"
        />
      </Grid>
    </Grid>
  );
};
