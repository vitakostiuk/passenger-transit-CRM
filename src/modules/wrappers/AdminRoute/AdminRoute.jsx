import { Navigate } from 'react-router';

import { ROUTES } from '../../../routes/routes.const';

const AdminRoute = ({ isAuth, isAdmin, children }) => {
  if (!isAuth) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  if (isAuth && !isAdmin) {
    return <Navigate to={ROUTES.CREATE_TRIP} replace />;
  }

  return children;
};

export default AdminRoute;
