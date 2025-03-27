import React ,{useState}from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Auth from './components/Auth';
import { CookiesProvider } from "react-cookie";


// export const TokenContext=createContext()

const router = createBrowserRouter([
  { path: '/', element: <Auth /> },
  { path: '/movies', element: <App /> } // Add main App route if needed
]);
function Router(){
  const [token,setToken]=useState(null)
  return (
    <CookiesProvider>
          <RouterProvider router={router} />
    </CookiesProvider>
  )
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
);

reportWebVitals();
