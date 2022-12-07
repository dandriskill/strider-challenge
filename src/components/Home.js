import { useState, useEffect } from "react";
import {
    CircularProgress,
    Typography,
    Box,
} from '@mui/material';

import { useAppStore, useOrderStore } from '../store';
import Orders from "./Orders";

function Home() {
    const appState = useAppStore();
    const orderState = useOrderStore();

    const [orders, setOrders] = useState(null);

    useEffect(() => {
        if (!appState.isLoading) {
            setOrders(orderState.orders);
        }
    }, [appState, orderState]);

    if (appState.isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <CircularProgress />
            </Box>
        );
    }

    return !orders?.length ? (
        <Typography variant="subtitle1" style={{ padding: '20px 0'}}>No orders to display.</Typography>
    ) : (
        <Orders orders={orders} pageTitle="Orders" />
    );
}

export default Home;
