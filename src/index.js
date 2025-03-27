import React ,{createContext,useState}from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Auth from './components/Auth';

export const TokenContext=createContext()

const router = createBrowserRouter([
  { path: '/', element: <Auth /> },
  { path: '/movies', element: <App /> } // Add main App route if needed
]);
function Router(){
  const [token,setToken]=useState(null)
  return (
    <TokenContext.Provider value={{token,setToken}}>
          <RouterProvider router={router} />
    </TokenContext.Provider>
  )
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
);

reportWebVitals();
