import React from 'react';
import Modal from '@mui/material/Modal';
import { Box, Button, Typography } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface ConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ open, onClose, onConfirm }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4, borderRadius: 2 }}>
        <Typography id="modal-modal-title" variant="h6" component="h2" align="center">
          Confirmar acción
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2, mb: 4 }} align="center">
          ¿Estás seguro de que quieres eliminar este registro?
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button onClick={onConfirm} startIcon={<CheckCircleIcon />} sx={{ mr: 2 }} color="error" variant="contained">
            Confirmar
          </Button>
          <Button onClick={onClose} startIcon={<CancelIcon />} variant="outlined">
            Cancelar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
