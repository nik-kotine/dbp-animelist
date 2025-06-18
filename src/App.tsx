import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import CharacterList from './components/CharacterList';
import CharacterForm from './components/CharacterForm';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navigation';

function App() {
  const isLoggedIn = !!localStorage.getItem('apiKey');

  return (
    <BrowserRouter>
      {isLoggedIn && <Navbar />}

      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />

        <Route path="/characters" element={
          <ProtectedRoute>
            <CharacterList />
          </ProtectedRoute>
        } />

        <Route path="/characters/new" element={
          <ProtectedRoute>
            <CharacterForm />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
