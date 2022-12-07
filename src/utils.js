const getOrdersByCustomerId = (orders, customerId) => {
    return orders.filter(order => order.CustomerId === +customerId);
};

/* A performant database query would typically handle this kind of thing, since there would
 * eventually be many orders and many items (too many to fetch). Ideally, 'items' would have
 * their own table or document on the backend for easy reference/count.
 */
const getItemOrderHistoryByItemName = (orders, itemName) => {
    const allMatchingItems = orders
        .map(order => order.Items).flat()
        .filter(item => item.Item.toLowerCase() === itemName.toLowerCase());

    return {
        itemName: itemName.charAt(0).toUpperCase() + itemName.slice(1),
        totalOrderCount: allMatchingItems.length,
        totalSoldCount: allMatchingItems.reduce((acc, cur) => {
            return acc + +cur.Quantity;
        }, 0),
    };
};

const getOrderItemsQuantity = (items) => {
    return items.reduce((acc, cur) => {
        return acc + +cur.Quantity;
    }, 0);
};

const addCentsIfNone = (total) => {
    const hasCents = total.indexOf('.') !== -1;
    return hasCents ? total : `${total}.00`;
};

const formatDate = (dateString) => {
    return new Date(dateString)
        .toLocaleDateString('en-us', { year:"numeric", month:"short", day:"numeric"});
};

// Creates objects for each item and updates the values as we loop through each order, then returns a flattened array of items
// A super-fast DB query would be nice in this case, lol. Large amounts of data could make this algo slow.
const getAllItems = (orders) => {
    // Object keeping track of each item (works as a set-builder of sorts)
    const items = {};
    // Gets all order items into one flattened array
    const allOrderItems = orders.map(order => order.Items).flat();
    // Loops through each order item
    allOrderItems.forEach((item) => {
        // References the correct item on the item tracking object
        const prevItem = items[item.Item];
        // Updates the values of that item
        items[item.Item] = {
            itemName: item.Item,
            itemPrice: item.ItemPrice,
            totalOrderCount: prevItem?.totalOrderCount ? prevItem.totalOrderCount + 1 : 1,
            totalSoldCount: prevItem?.totalSoldCount ? prevItem.totalSoldCount + +item.Quantity : +item.Quantity,
        };
    });
    // Maps the keys of the item tracking object to build our items array
    return Object.keys(items).map(item => items[item]);
};

module.exports = {
    getOrdersByCustomerId,
    getItemOrderHistoryByItemName,
    getOrderItemsQuantity,
    addCentsIfNone,
    formatDate,
    getAllItems,
};
