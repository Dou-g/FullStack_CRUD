import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import ProductList from './pages/ProductList';
import ProductForm from './pages/ProductForm';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductDashboard from './pages/ProductDashboard';
import Profil from './pages/Profil';

function App() {
  return (
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
            <Route path="/profil" element={
            <ProtectedRoute>
              <Profil />
            </ProtectedRoute>
            } />
            <Route path="/products/:id/edit" element={<ProductForm />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;