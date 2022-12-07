import { useState, useEffect } from "react";
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
} from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import { useAppStore, useOrderStore } from '../store';
import { getAllItems } from "../utils";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.primary,
        color: theme.palette.common.black,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 16,
    },
}));

function Items() {
    const appState = useAppStore();
    const orderState = useOrderStore();

    const [items, setItems] = useState(null);
    const [hasItems, setHasItems] = useState(false);

    useEffect(() => {
        if (!appState.isLoading && !items) {
            setItems(getAllItems(orderState.orders));
        }
    }, [appState, orderState, items]);

    useEffect(() => {
        setHasItems(!!items?.length);
    }, [items]);

    if (appState.isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <CircularProgress />
            </Box>
        );
    }

    return !hasItems ? (
        <Typography variant="subtitle1" style={{ padding: '20px 0'}}>No history to display.</Typography>
    ) : (
        <>
            <Typography variant="h5" style={{ padding: '20px 0'}}>Items</Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Name</StyledTableCell>
                            <StyledTableCell align="center">Item Price</StyledTableCell>
                            <StyledTableCell align="center">Orders Placed</StyledTableCell>
                            <StyledTableCell align="center">Quantity Sold</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                            {items.map(item => (
                                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} key={item.itemName}>
                                    <StyledTableCell component="th" scope="row">{item.itemName}</StyledTableCell>
                                    <StyledTableCell align="center">{item.itemPrice}</StyledTableCell>
                                    <StyledTableCell align="center">{item.totalOrderCount}</StyledTableCell>
                                    <StyledTableCell align="center">{item.totalSoldCount}</StyledTableCell>
                                </TableRow>
                             ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default Items;
