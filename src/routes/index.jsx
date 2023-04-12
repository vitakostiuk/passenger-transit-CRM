import { Navigate, useRoutes, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { getToken, getUserEmail } from '../redux/auth/authSelectors';

import PublicRoute from '../modules/wrappers/PublicRoute';
import ProtectedRoute from '../modules/wrappers/ProtectedRoute';
import AdminRoute from '../modules/wrappers/AdminRoute';

import SignInPage from '../pages/SignInPage';
import SignUpPage from '../pages/SignUpPage';
import EditUsersPage from '../pages/EditUsersPage';
import DashboardPage from '../pages/DashboardPage';

import { ROUTES } from './routes.const';
import CreateTripPage from '../pages/CreateTripPage';

// const ADMIN_EMAIL = 'vitagrebennik@gmail.com';
const ADMIN_EMAIL = process.env.REACT_APP_ADMIN;

const AppRoutes = () => {
  const token = useSelector(getToken);
  const email = useSelector(getUserEmail);

  const routes = [
    {
      path: ROUTES.HOME,
      children: [
        {
          element: (
            <PublicRoute isAuth={token} isAdmin={email === ADMIN_EMAIL}>
              <Outlet />
            </PublicRoute>
          ),
          children: [
            {
              path: '',
              element: <Navigate to={ROUTES.LOGIN} replace={true} />,
            },
            { path: ROUTES.LOGIN, element: <SignInPage /> },
            { path: ROUTES.REGISTER, element: <SignUpPage /> },
          ],
        },
        {
          element: (
            <ProtectedRoute isAuth={token}>
              <Outlet />
            </ProtectedRoute>
          ),
          children: [
            {
              path: ROUTES.DASHBOARD,
              element: <DashboardPage />,
            },
            {
              path: ROUTES.CREATE_TRIP,
              element: <CreateTripPage />,
            },
          ],
        },
        {
          element: (
            <AdminRoute isAuth={token} isAdmin={email === ADMIN_EMAIL}>
              <Outlet />
            </AdminRoute>
          ),
          children: [
            {
              path: ROUTES.DASHBOARD,
              element: <DashboardPage />,
            },
            { path: ROUTES.EDIT_USERS, element: <EditUsersPage /> },
            {
              path: ROUTES.CREATE_TRIP,
              element: <CreateTripPage />,
            },
          ],
        },
      ],
    },
  ];

  const routing = useRoutes(routes);

  return routing;
};

export default AppRoutes;
