import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import ProductsByCategory from './components/ProductsByCategory';
import { AuthProvider } from './context/AuthContext';
import './App.css';
import ProductList from './pages/ProductList';
import ProductForm from './pages/ProductForm';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductDashboard from './pages/ProductDashboard';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <div className="container mt-4">
          <Routes>
            {/* Routes Publiques */}
            <Route path="/connexion" element={<Login />} />
            <Route path="/inscription" element={<Register />} />
            {/* Routes Protégées */}
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<ProductList />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/products/new" element={<ProductForm />} />
              <Route path="/dashboard" element={<ProductDashboard />} />
              <Route path="/products/by-category" element={<ProductsByCategory />} />

              <Route path="/products/:id/edit" element={<ProductForm />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;