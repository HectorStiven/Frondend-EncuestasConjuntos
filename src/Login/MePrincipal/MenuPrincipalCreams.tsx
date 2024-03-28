import * as React from 'react';
import { Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const images = [
  {
    url: '/image/menu/estudiante.webp',
    title: 'Presencial',
  },
  {
    url: '/image/menu/libro.webp',
    title: 'Virtual',
  }
];

const Container = styled('div')({
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const ImageButton = styled('div')({
  position: 'relative',
  height: 200,
  borderRadius: 10,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center', // Alineación vertical y horizontal
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.7,
    },
    '& .MuiImageMarked-root': {
      opacity: 100,
    },
    '& .MuiTypography-root': {
      border: '4px solid currentColor',
      borderRadius: 10,
    },
  },
});

const ImageSrc = styled('span')({
  borderRadius: 5,
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center 40%',
});

const Image = styled('span')(({ theme }) => ({
  borderRadius: 15,
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
  borderRadius: 5,
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create('opacity'),
}));

const ImageMarked = styled('span')(({ theme }) => ({
  borderRadius: 5,
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: 'absolute',
  bottom: -2,
  left: 'calc(50% - 9px)',
  transition: theme.transitions.create('opacity'),
}));

export const MenuPrincipalScream = ({ set_entrar_aplicacion }: any) => {
  
  const handlePresencialClick = () => {
    // Lógica para manejar el clic en el cuadro de "Presencial"
    // Aquí puedes hacer cualquier cosa que necesites hacer cuando se hace clic en el cuadro de "Presencial"
    // Después, puedes llamar a la función set_entrar_aplicacion para enviar la prop
    set_entrar_aplicacion(true);
  };

  return (
    <Container>
      <Grid container alignItems="center" justifyContent="center">
        {images.map((image, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <ImageButton style={{ width: '95%', margin: 6 }} onClick={handlePresencialClick}>
              <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
              <ImageBackdrop className="MuiImageBackdrop-root" />
              <Image>
                <Typography
                  component="span"
                  variant="subtitle1"
                  color="inherit"
                  sx={{
                    position: 'relative',
                    p: 4,
                    pt: 2,
                    pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                  }}
                >
                  {image.title}
                  <ImageMarked className="MuiImageMarked-root" />
                </Typography>
              </Image>
            </ImageButton>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
