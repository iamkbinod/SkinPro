import { Navigate } from 'react-router-dom';
import { auth } from '../firebase/auth';

const ProtectedRoute = ({ children }) => {
  return auth.currentUser ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;