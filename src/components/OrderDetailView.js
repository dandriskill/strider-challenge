import React, { useState } from 'react';
import {
    Container,
    Grid,
    Box,
    Table,
    TableBody,
    TableContainer,
    TablePagination,
    TableHead,
    TableRow,
    TableCell,
    Button,
    Link,
    Paper,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { addCentsIfNone, formatDate } from '../utils';
import { useNavigate } from 'react-router-dom';

const Item = styled(Container)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: '20px',
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function OrderDetailView({ order }) {
    const naviate = useNavigate();

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleViewCustomerOrderHistory = (customerId) => {
        naviate(`/customer-order-history/${customerId}`);
    };

    const handleViewItemOrderHistory = (itemId) => {
        naviate(`/item-order-history/${itemId}`);
    };

    const columns = [
        {
            id: 'Item',
            label: 'Item',
            minWidth: 100,
            format: (value) => value,
        },
        {
            id: 'ItemPrice',
            label: 'Item Price',
            minWidth: 100,
            align: 'center',
            format: (value) => addCentsIfNone(value),
        },
        {
            id: 'Quantity',
            label: 'Quantity',
            minWidth: 100,
            align: 'center',
            format: (value) => value,
        },
        {
            id: 'view_item_order_history',
            label: ' ',
            minWidth: 100,
            align: 'center',
            format: (value) => value,
        },
    ];

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Item>
                <Grid container spacing={3}>
                    <Grid item xs={5}>
                        <h2 style={{ margin: '0', padding: '0', textAlign: 'left' }}>Order Details</h2>
                        <h6 style={{ margin: '0', padding: '0', textAlign: 'left' }}>{order?.CustomerName}</h6>
                    </Grid>
                    <Grid item xs={0} md={3} />
                    <Grid item xs={4}>
                        <Button
                            onClick={() => handleViewCustomerOrderHistory(order?.CustomerId)}
                            variant="outlined"
                            size="small"
                        >
                            View Customer History
                        </Button>
                    </Grid>
                </Grid>
            </Item>
            <Item>
                <Grid container spacing={1}>
                    <Grid xs={6} md={3} item>
                        <strong>Order ID:&nbsp;</strong>
                        {order?.OrderId}
                    </Grid>
                    <Grid xs={6} md={3} item>
                        <strong>Order&nbsp;Date:&nbsp;</strong>
                        {formatDate(order?.Date)}
                    </Grid>
                    <Grid xs={6} md={3} item>
                        <strong>Customer&nbsp;ID:&nbsp;</strong>
                        {order?.CustomerId}
                    </Grid>
                    <Grid xs={6} md={3} item>
                    <strong>Total:&nbsp;</strong>
                        {order?.Total}
                    </Grid>
                </Grid>
            </Item>
            <Item>
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
                                {order?.Items
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((item) => {
                                        return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={item.Item}>
                                            {columns.map((column, index) => (index === columns.length - 1) ? (
                                                <TableCell key={column.id} align={column.align}>
                                                    <Link
                                                        component="button"
                                                        onClick={() => handleViewItemOrderHistory(item.Item)}
                                                        underline="none"
                                                    >
                                                        See Order History
                                                    </Link>
                                                </TableCell>
                                            ) : (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.format(item[column.id])}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                        );
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={order?.Items?.length || 0}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </Item>
        </Box>
    );
}