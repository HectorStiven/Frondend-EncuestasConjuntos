import { Grid, TextField } from "@mui/material"
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useState } from "react";
import { control_success } from "../Elements/alertas/alertaSucces";




export const Registrarse = () => {


    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [usuario, setUsuario] = useState("");


    const Guardar_registrar_perosna=()=>{

        control_success("se registro correctamente")

    }

    return (

        <div>
            <Button
                variant="contained"
                style={{ marginTop: 15, width: "100%" }}
                color="secondary"
                onClick={handleOpen}

            >
                Registrarse
            </Button>
            <Modal
                open={open}
                // onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Grid container alignItems="center" justifyContent="center">



                    <Grid item style={{ marginTop: 400, position: "absolute" }}>
                        <div style={{ padding: 14, marginLeft: -18, borderRadius: 50, border: '1px solid black', width: 450, height: 459, marginTop: 350, backgroundColor: "white" }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <h1 className="login-heading" >Registrarse</h1>
                            </div>
                            <form>



                                <Grid container spacing={1}  >
                                    <Grid item xs={6}>
                                        <TextField
                                            id="input-with-icon-textfield"
                                            label="Primer Nombre"
                                            style={{ marginTop: 15, width: 200 }}
                                            value={usuario}
                                            onChange={(e) => setUsuario(e.target.value)}
                                            InputProps={{

                                                style: { borderRadius: 20 }
                                            }}
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            id="input-with-icon-textfield"
                                            label="Segundo Nombre"
                                            style={{ marginTop: 15, width:200 }}
                                            value={usuario}
                                            onChange={(e) => setUsuario(e.target.value)}
                                            InputProps={{

                                                style: { borderRadius: 20 }
                                            }}
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            id="input-with-icon-textfield"
                                            label="Primer Apellido"
                                            style={{ marginTop: 15, width:200 }}
                                            value={usuario}
                                            onChange={(e) => setUsuario(e.target.value)}
                                            InputProps={{

                                                style: { borderRadius: 20 }
                                            }}
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            id="input-with-icon-textfield"
                                            label="Segundo Apellido"
                                            style={{ marginTop: 15, width:200 }}
                                            value={usuario}
                                            onChange={(e) => setUsuario(e.target.value)}
                                            InputProps={{

                                                style: { borderRadius: 20 }
                                            }}
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item xs={6}  >
                                        <TextField
                                            id="input-with-icon-textfield"
                                            label="Telefono"
                                            style={{ marginTop: 15, width:200 }}
                                            value={usuario}
                                            onChange={(e) => setUsuario(e.target.value)}
                                            InputProps={{

                                                style: { borderRadius: 20 }
                                            }}
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item xs={6} >
                                        <TextField
                                            id="input-with-icon-textfield"
                                            label="Conrreo Electronico"
                                            style={{ marginTop: 15, width:200 }}
                                            value={usuario}
                                            onChange={(e) => setUsuario(e.target.value)}
                                            InputProps={{

                                                style: { borderRadius: 20 }
                                            }}
                                            variant="outlined"
                                        />
                                    </Grid>

                                </Grid>


                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 35 }}>
                                    <Button
                                        variant="contained"
                                        style={{  width:190, margin: 'auto' }}
                                        color="success"
                                        onClick={Guardar_registrar_perosna}
                                    >
                                        Guardar
                                    </Button>
                                    <Button
                                        variant="contained"
                                        style={{ width: 190, margin: 'auto' }}
                                        color="error"
                                        onClick={handleClose}
                                    >
                                        salir
                                    </Button>
                                </div>



                            </form>
                        </div>
                    </Grid>
                </Grid>
            </Modal>
        </div>
    )
}








//   return (
//     <div>
//       <Button onClick={handleOpen}>Open modal</Button>
//       <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//       >
//         <Box sx={style}>
//           <Typography id="modal-modal-title" variant="h6" component="h2">
//             Text in a modal
//           </Typography>
//           <Typography id="modal-modal-description" sx={{ mt: 2 }}>
//             Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
//           </Typography>
//         </Box>
//       </Modal>
//     </div>
//   );
