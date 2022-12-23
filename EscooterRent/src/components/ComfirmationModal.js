import {
    Button, Modal, Box, Typography,
  } from '@mui/material';
  import React from 'react';
  
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  
  const ComfirmationModal = ({
    open, message, handleComfirm, handleClose,
  }) => (
    <Modal
      open={open}
      onClose={handleClose}
    >
      <Box sx={style}>
        <Typography variant="h5">
          {message}
        </Typography>
        <div>
          <Button onClick={handleComfirm}>Comfirm</Button>
          <Button onClick={handleClose}>Close</Button>
        </div>
      </Box>
    </Modal>
  );
  
  export default ComfirmationModal;