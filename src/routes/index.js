import { Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout';
import Home from '../components/Home';
import Items from '../components/Items';
import CustomerOrderHistory from '../components/CustomerOrderHistory';
import ItemOrderHistory from '../components/ItemOrderHistory';
import PageNotFound from '../components/PageNotFound';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="items" element={<Items />} />
        <Route path="customer-order-history/:customerId" element={<CustomerOrderHistory />} />
        <Route path="item-order-history/:itemName" element={<ItemOrderHistory />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default AppRoutes;
