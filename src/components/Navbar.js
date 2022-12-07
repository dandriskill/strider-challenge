import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Container, Typography, Box, Toolbar, Button } from '@mui/material';

export default function NavBar() {
    const navigate = useNavigate();

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                        mr: 2,
                        display: { xs: 'none', md: 'flex' },
                        fontFamily: 'Avenir',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                        }}
                    >
                        STRIDER
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <Button
                            onClick={() => navigate('/')}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Home
                        </Button>
                        <Button
                            onClick={() => navigate('/items')}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Items
                        </Button>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
