import {
    getOrdersByCustomerId,
    getItemOrderHistoryByItemName,
    getOrderItemsQuantity,
    addCentsIfNone,
    formatDate,
    getAllItems,
} from "./utils";

const mockOrders = [
    {
        "OrderId": 1,
        "CustomerId": 1,
        "CustomerName": "Elizabeth",
        "Total": "$30.00",
        "Date": "2021-02-01 08:30:00.000",
        "Items": [
            {
                "Item": "Candle",
                "ItemPrice": "$3.00",
                "Quantity": "3"
            },
            {
                "Item": "Book",
                "ItemPrice": "$15.00",
                "Quantity": "4"
            },
            {
                "Item": "Pen",
                "ItemPrice": "$0.75",
                "Quantity": "1"
            },
            {
                "Item": "Paper",
                "ItemPrice": "$5.25",
                "Quantity": "1"
            }
        ]
    },
    {
        "OrderId": 2,
        "CustomerId": 2,
        "CustomerName": "Alexander",
        "Total": "$52.50",
        "Date": "2021-02-02 10:00:00.000",
        "Items": [
            {
                "Item": "Book",
                "ItemPrice": "$15.00",
                "Quantity": "1"
            },
            {
                "Item": "Jar",
                "ItemPrice": "$12.50",
                "Quantity": "3"
            }
        ]
    },
    {
        "OrderId": 3,
        "CustomerId": 1,
        "CustomerName": "Elizabeth",
        "Total": "$6.00",
        "Date": "2021-02-02 12:46:00.000",
        "Items": [
            {
                "Item": "Pen",
                "ItemPrice": "$0.75",
                "Quantity": "1"
            },
            {
                "Item": "Paper",
                "ItemPrice": "$5.25",
                "Quantity": "1"
            }
        ]
    },
    {
        "OrderId": 4,
        "CustomerId": 3,
        "CustomerName": "Emira",
        "Total": "$30.50",
        "Date": "2021-02-03 15:25:00.000",
        "Items": [
            {
                "Item": "Candle",
                "ItemPrice": "$3.00",
                "Quantity": "1"
            },
            {
                "Item": "Book",
                "ItemPrice": "$15.00",
                "Quantity": "1"
            },
            {
                "Item": "Jar",
                "ItemPrice": "$12.50",
                "Quantity": "1"
            }
        ]
    },
];

describe('utils', () => {
    describe('getOrdersByCustomerId()', () => {
        test('filters orders for a specific customer ID', () => {
            expect(getOrdersByCustomerId(mockOrders, '1')).toStrictEqual([mockOrders[0], mockOrders[2]]);
        });
    });

    describe('getItemOrderHistoryByItemName()', () => {
        test('filters orders by item name and returns the correct number of orders and total quantity', () => {
            // Lowercase input
            expect(getItemOrderHistoryByItemName(mockOrders, 'book')).toStrictEqual({
                itemName: 'Book',
                totalOrderCount: 3,
                totalSoldCount: 6,
            });
            // Upppercase input
            expect(getItemOrderHistoryByItemName(mockOrders, 'Candle')).toStrictEqual({
                itemName: 'Candle',
                totalOrderCount: 2,
                totalSoldCount: 4,
            });
        });
    });

    describe('getOrderItemsQuantity()', () => {
        test('returns the total quantity of all items in an order', () => {
            expect(getOrderItemsQuantity(mockOrders[0].Items)).toBe(9);
        });
    });

    describe('addCentsIfNone()', () => {
        test('does not add cents if already present', () => {
            expect(addCentsIfNone('$18.39')).toBe('$18.39');
        });
        test('adds cents if not present', () => {
            expect(addCentsIfNone('$18')).toBe('$18.00');
        });
    });

    describe('formatDate()', () => {
        test('formats date properly', () => {
            expect(formatDate('2021-02-01 08:30:00.000')).toBe('Feb 1, 2021');
        });
    });

    describe('getAllItems()', () => {
        test('returns a set of all order items with the correct stats for each', () => {
            expect(getAllItems(mockOrders)).toStrictEqual([
                {
                    itemName: 'Candle',
                    itemPrice: '$3.00',
                    totalOrderCount: 2,
                    totalSoldCount: 4,
                },
                {
                    itemName: 'Book',
                    itemPrice: '$15.00',
                    totalOrderCount: 3,
                    totalSoldCount: 6,
                },
                {
                    itemName: 'Pen',
                    itemPrice: '$0.75',
                    totalOrderCount: 2,
                    totalSoldCount: 2,
                },
                {
                    itemName: 'Paper',
                    itemPrice: '$5.25',
                    totalOrderCount: 2,
                    totalSoldCount: 2,
                },
                {
                    itemName: 'Jar',
                    itemPrice: '$12.50',
                    totalOrderCount: 2,
                    totalSoldCount: 4,
                },
            ]);
        });
    });
});
