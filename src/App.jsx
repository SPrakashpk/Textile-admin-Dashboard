import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Uploadproducts from './components/Uploadproducts';
import Orders from './components/Orders';
import Deliverytracking from './components/Deliverytracking';
import Stocks from './components/Stocks';
import Expense from './components/Expense';
import Review from './components/Review';
import Advertisement from './components/Advertisement';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />, 
    children: [
      { index: true, element: <Dashboard /> },
      { path: '/dashboard', element: <Dashboard /> },
      { path: 'upload-products', element: <Uploadproducts /> },
      { path: 'orders', element: <Orders /> },
      { path: 'delivery-tracking', element: <Deliverytracking /> },
      { path: 'stocks', element: <Stocks /> },
      { path: 'expense', element: <Expense /> },
      { path: 'reviews&ratings', element: <Review /> },
      { path: 'advertisement', element: <Advertisement /> },
      ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}


export default App
