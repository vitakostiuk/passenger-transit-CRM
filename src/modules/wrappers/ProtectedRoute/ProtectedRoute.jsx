import { Navigate } from 'react-router';

import { ROUTES } from '../../../routes/routes.const';

const ProtectedRoute = ({ isAuth, isAdmin, children }) => {
  if (!isAuth) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return children;
};
export default ProtectedRoute;
