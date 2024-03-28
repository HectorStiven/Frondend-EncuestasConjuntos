import React, { useState } from "react";
import { TextField, Button, Grid } from "@mui/material";
import { useDispatch } from "react-redux";
import { login } from "./toolkit/slice/LoginSlice";

export const LoginBase = ({ set_entrar_aplicacion }: any) => {
  const dispatch = useDispatch();

  const [usuario, setUsuario] = useState<string>("");
  const [contrasena, setContrasena] = useState<string>("");

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(login({ usuario, contrasena }));

    // Aquí debes implementar la lógica de validación de usuario y contraseña.
    // Actualmente, simplemente se despacha una acción de inicio de sesión.

    // Una vez validado, puedes establecer set_entrar_aplicacion(true) como se hace en el código original.
  };

  return (
    <div>
      <Grid container alignItems="center" justifyContent="center">
        <Grid item style={{ marginTop: 100 }}>
          <form onSubmit={handleLogin}>
            <div>
              <TextField
                id="input-with-icon-textfield"
                label="Nombre"
                style={{ marginTop: 15, width: 270 }}
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                variant="outlined"
              />
            </div>
            <div>
              <TextField
                id="outlined-adornment-password"
                type="password"
                value={contrasena}
                style={{ marginTop: 15 }}
                onChange={(e) => setContrasena(e.target.value)}
                variant="outlined"
                label="Contraseña"
              />
            </div>
            <div>
              <Button
                type="submit"
                variant="contained"
                style={{ marginTop: 15, width: "100%" }}
                color="success"
              >
                Iniciar Sesión
              </Button>
            </div>
          </form>
        </Grid>
      </Grid>
    </div>
  );
};
