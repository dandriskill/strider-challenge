import React from 'react';
import { Modal, Box, Button } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

// Modal is reusable across the app
export default function StriderModal({
    isModalOpen,
    handleCloseModal,
    children,
}) {
    return (
        <Modal
            open={isModalOpen}
            onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                {children}
                <Button onClick={handleCloseModal}>Close</Button>
            </Box>
        </Modal>
    );
}