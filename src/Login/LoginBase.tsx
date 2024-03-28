import React, { useState } from "react";
import { TextField, Button, IconButton, Grid } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { control_success } from "../Elements/alertas/alertaSucces";
import { ImagenFondo } from "../Elements/App-Bar/ImagenPortada";
import { Registrarse } from "./Registrarse";
import { useDispatch } from "react-redux";
import { login } from "./toolkit/slice/LoginSlice";


export const LoginBase = ({ set_entrar_aplicacion }: any) => {
  const dispatch = useDispatch();

  const [usuario, setUsuario] = useState<string>("");
  const [contrasena, setContrasena] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const usuariosYContrasenas = [
    { usuario: "miguel", contrasena: "1234" },
    { usuario: "stiven", contrasena: "1234" },
    { usuario: "jhon", contrasena: "1234" },
  ];


  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      login({
        usuario,
        contrasena,
      })
    );

    const usuarioValido = usuariosYContrasenas.find(
      (user) => user.usuario === usuario && user.contrasena === contrasena
    );

    if (usuarioValido) {
      set_entrar_aplicacion(true);
      control_success("Ingreso exitoso");
    } else {
      console.log("Credenciales incorrectas");
    }
  };

  return (
    <div>
      <ImagenFondo />
      <Grid container alignItems="center" justifyContent="center">
        <Grid item style={{ marginTop: 400, position: "absolute" }}>
          <div
            style={{
              padding: 60,
              borderRadius: 60,
              border: "1px solid black",
              width: 440,
              height: "60%",
              marginTop: 350,
              backgroundColor: "white",
            }}
          >
            <h1 className="login-heading">Iniciar Sesión</h1>
            <form onSubmit={handleLogin}>
              <div>
                <TextField
                  id="input-with-icon-textfield"
                  label="Nombre"
                  style={{ marginTop: 15, width: 270 }}
                  value={usuario}
                  onChange={(e) => setUsuario(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    ),
                    style: { borderRadius: 20 },
                  }}
                  variant="outlined"
                />
              </div>
              <div>
                <TextField
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  value={contrasena}
                  style={{ marginTop: 15 }}
                  onChange={(e) => setContrasena(e.target.value)}
                  variant="outlined"
                  label="Contraseña"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                    style: { borderRadius: 20 },
                  }}
                />
              </div>
              <div>
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={6}>
                    <Button
                      type="submit"
                      variant="contained"
                      style={{ marginTop: 15, width: "100%" }}
                      color="success"
                    >
                      Iniciar Sesión
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Registrarse />
                  </Grid>
                </Grid>
              </div>
            </form>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};
