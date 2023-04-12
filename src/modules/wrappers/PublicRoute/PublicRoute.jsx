import { Navigate } from 'react-router';

import { ROUTES } from '../../../routes/routes.const';

const PublicRoute = ({ isAuth, isAdmin, children }) => {
  if (isAuth && !isAdmin) {
    return <Navigate to={ROUTES.CREATE_TRIP} replace />;
  }

  if (isAuth && isAdmin) {
    return <Navigate to={ROUTES.EDIT_USERS} replace />;
  }

  return children;
};

export default PublicRoute;
