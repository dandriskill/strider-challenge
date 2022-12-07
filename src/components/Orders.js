import { useState, useEffect } from "react";
import {
    CircularProgress,
    Typography,
    Box,
    Table,
    TableBody,
    TableContainer,
    TablePagination,
    TableHead,
    TableRow,
    TableCell,
    Link,
    Paper,
} from '@mui/material';

import { useAppStore } from '../store';
import { addCentsIfNone, formatDate, getOrderItemsQuantity } from "../utils";
import StriderModal from "./Modal";
import OrderDetailView from "./OrderDetailView";

const columns = [
    {
        id: 'OrderId',
        label: 'Order ID',
        minWidth: 100,
        format: (value) => value,
    },
    {
        id: 'Items',
        label: '# of Items',
        minWidth: 100,
        align: 'center',
        format: (value) => getOrderItemsQuantity(value),
    },
    {
        id: 'Total',
        label: 'Total',
        minWidth: 100,
        align: 'center',
        format: (value) => addCentsIfNone(value),
    },
    {
        id: 'CustomerId',
        label: 'Customer ID',
        minWidth: 100,
        align: 'center',
        format: (value) => value,
    },
    {
        id: 'Date',
        label: 'Date',
        minWidth: 100,
        align: 'center',
        format: (value) => formatDate(value),
    },
    {
        id: 'details',
        label: ' ',
        minWidth: 100,
        align: 'center',
        format: (value) => value,
    },
];

function Orders({ orders, pageTitle }) {
    const appState = useAppStore();
    const [activeOrder, setActiveOrder] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleOpenOrderDetailModal = (order) => {
        setActiveOrder(order);
    };

    const handleCloseOrderDetailModal = () => {
        setActiveOrder(null);
    };

    useEffect(() => {
        setIsModalOpen(!!activeOrder);
    }, [activeOrder]);

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
        <>
            <Typography variant="h5" style={{ padding: '20px 0'}}>{pageTitle}</Typography>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((order) => {
                                return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={order.OrderId}>
                                    {columns.map((column, index) => (index === columns.length - 1) ? (
                                        <TableCell key={column.id} align={column.align}>
                                            <Link
                                                component="button"
                                                onClick={() => handleOpenOrderDetailModal(order)}
                                                underline="none"
                                            >
                                                Details
                                            </Link>
                                        </TableCell>
                                    ) : (
                                        <TableCell key={column.id} align={column.align}>
                                            {column.format(order[column.id])}
                                        </TableCell>
                                    ))}
                                </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25, 100]}
                    component="div"
                    count={orders.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <StriderModal
                isModalOpen={isModalOpen}
                handleCloseModal={handleCloseOrderDetailModal}
            >
                <OrderDetailView order={activeOrder} />
            </StriderModal>
        </>
    );
}

export default Orders;
