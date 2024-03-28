import React, { useState } from "react";
import { Grid, TextField } from "@material-ui/core";

export const Productos = () => {
  const [formulario, setFormulario] = useState({
    nombre: "",
    correo: "",
    libro: "",
    comentario: "",
    campoExtra1: "",
    campoExtra2: "",
    campoExtra3: "",
    campoExtra4: "",
  });

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormulario({
      ...formulario,
      [name]: value,
    });
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    console.log("Formulario enviado:", formulario);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Nombre"
            name="nombre"
            value={formulario.nombre}
            onChange={handleChange}
            variant="outlined"
            required
            style={{ margin: "8px 0", width: "95%" }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Correo Electrónico"
            name="correo"
            value={formulario.correo}
            onChange={handleChange}
            variant="outlined"
            required
            style={{ margin: "8px 0", width: "95%" }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Libro"
            name="libro"
            value={formulario.libro}
            onChange={handleChange}
            variant="outlined"
            required
            style={{ margin: "8px 0", width: "95%" }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Comentario"
            name="comentario"
            value={formulario.comentario}
            onChange={handleChange}
            variant="outlined"
            multiline
            rows={4}
            style={{ margin: "8px 0", width: "95%" }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Campo Extra 1"
            name="campoExtra1"
            value={formulario.campoExtra1}
            onChange={handleChange}
            variant="outlined"
            style={{ margin: "8px 0", width: "95%" }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Campo Extra 2"
            name="campoExtra2"
            value={formulario.campoExtra2}
            onChange={handleChange}
            variant="outlined"
            style={{ margin: "8px 0", width: "95%" }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Campo Extra 3"
            name="campoExtra3"
            value={formulario.campoExtra3}
            onChange={handleChange}
            variant="outlined"
            style={{ margin: "8px 0", width: "95%" }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Campo Extra 4"
            name="campoExtra4"
            value={formulario.campoExtra4}
            onChange={handleChange}
            variant="outlined"
            style={{ margin: "8px 0", width: "95%" }}
          />
        </Grid>
        <Grid item xs={12}>
          {/* <Button type="submit" variant="contained" color="primary">
            Solicitar Préstamo
          </Button> */}
        </Grid>
      </Grid>
    </form>
  );
};
