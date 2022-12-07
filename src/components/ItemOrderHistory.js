import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
    CircularProgress,
    Box,
    Typography,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableBody,
    Paper,
    Link,
} from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import { useAppStore, useOrderStore } from '../store';
import { getItemOrderHistoryByItemName } from "../utils";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.primary,
        color: theme.palette.common.black,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 16,
    },
}));

function ItemOrderHistory() {
    const { itemName } = useParams();
    const appState = useAppStore();
    const orderState = useOrderStore();

    const [itemHistory, setItemHistory] = useState(null);
    const [hasItemHistory, setHasItemHistory] = useState(false);

    useEffect(() => {
        if (!appState.isLoading && !itemHistory) {
            setItemHistory(getItemOrderHistoryByItemName(orderState.orders, itemName));
        }
    }, [appState, orderState, itemName, itemHistory]);

    useEffect(() => {
        setHasItemHistory(!!(itemHistory?.totalOrderCount || itemHistory?.totalSoldCount));
    }, [itemHistory]);

    if (appState.isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <CircularProgress />
            </Box>
        );
    }

    return !hasItemHistory ? (
        <Typography variant="subtitle1" style={{ padding: '20px 0'}}>No history to display.</Typography>
    ) : (
        <>
            <Typography variant="h5" style={{ padding: '20px 0'}}>Item Order History</Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Name</StyledTableCell>
                            <StyledTableCell align="center">Orders Placed</StyledTableCell>
                            <StyledTableCell align="center">Quantity Sold</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <StyledTableCell component="th" scope="row">{itemHistory.itemName}</StyledTableCell>
                            <StyledTableCell align="center">{itemHistory.totalOrderCount}</StyledTableCell>
                            <StyledTableCell align="center">{itemHistory.totalSoldCount}</StyledTableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <Typography variant="subtitle1" style={{ padding: '20px 0', textAlign: 'center' }}>
                <Link href="/items">See All Items</Link>
            </Typography>
        </>
    );
}

export default ItemOrderHistory;
