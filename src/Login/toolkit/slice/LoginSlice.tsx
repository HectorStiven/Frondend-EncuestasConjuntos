import { createSlice } from "@reduxjs/toolkit";

// Función para obtener el usuario del localStorage
const getStoredUser = () => {
  try {
    const storedUser = localStorage.getItem("usuario");
    return storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.error("Error al analizar el usuario almacenado:", error);
    return null;
  }
};

// Función para obtener el estado de inicio de sesión del localStorage
const getStoredIsLoggedIn = () => {
  return localStorage.getItem("isLoggedIn") === "true";
};

const initialState = {
  usuario: getStoredUser(),
  isLoggedIn: getStoredIsLoggedIn(),
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    login: (state, action) => {
      state.usuario = action.payload;
      state.isLoggedIn = true;
      // Guardar datos en el localStorage
      localStorage.setItem("usuario", JSON.stringify(action.payload));
      localStorage.setItem("isLoggedIn", "true");
    },
    logout: (state) => {
      state.usuario = null;
      state.isLoggedIn = false;
      // Limpiar datos en el localStorage
      localStorage.removeItem("usuario");
      localStorage.removeItem("isLoggedIn");
    },
  },
});

export const { login, logout } = loginSlice.actions;

export default loginSlice;
