import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {CircularProgress, Box, Typography } from '@mui/material';
import { useAppStore, useOrderStore } from '../store';
import { getOrdersByCustomerId } from "../utils";
import Orders from "./Orders";

function CustomerOrderHistory() {
    const { customerId } = useParams();
    const appState = useAppStore();
    const orderState = useOrderStore();

    const [orderHistory, setOrderHistory] = useState(null);

    useEffect(() => {
        if (!appState.isLoading && !orderHistory) {
            setOrderHistory(getOrdersByCustomerId(orderState.orders, customerId));
        }
    }, [appState, orderState, customerId, orderHistory]);

    if (appState.isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <CircularProgress />
            </Box>
        );
    }

    return !orderHistory?.length ? (
        <Typography variant="subtitle1" style={{ padding: '20px 0'}}>No orders to display.</Typography>
    ) : (
        <Orders orders={orderHistory} pageTitle={`Customer Order History for ${orderHistory[0].CustomerName}`} />
    );
}

export default CustomerOrderHistory;
