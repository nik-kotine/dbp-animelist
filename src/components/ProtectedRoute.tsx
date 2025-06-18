import { type ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const apiKey = localStorage.getItem('apiKey');
  return apiKey ? children : <Navigate to="/login" replace />;
}
