import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

import UrlEnums from '@/components/connections/enums/UrlEnums';

const Login = lazy(() => import('@/screens/auth/Login'));
const SignUp = lazy(() => import('@/screens/auth/SignUp'));
const Logout = lazy(() => import('@/screens/auth/Logout'));
const NotFoundPage = lazy(() => import('@/screens/NotFoundPage'));
const Home = lazy(() => import('@/screens/Home'));
const AdminTranslations = lazy(() => import('@/screens/adminTranslations/AdminTranslations'));
const Songs = lazy(() => import('@/screens/songs/Songs'));
const EditSong = lazy(() => import('@/screens/songs/EditSong'));
const Praises = lazy(() => import('@/screens/praises/Praises'));

const routes = [
  {
    path: UrlEnums.MAIN,
    element: <Home />,
    type: 'authenticated',
  },
  { path: UrlEnums.LOGOUT, element: <Logout />, type: 'authenticated' },
  { path: UrlEnums.LOGIN, element: <Login />, type: 'public' },
  { path: UrlEnums.SIGN_UP, element: <SignUp />, type: 'public' },
  {
    path: UrlEnums.SONGS,
    element: <Songs />,
    type: 'authenticated',
  },
  {
    path: UrlEnums.EDIT_SONG,
    element: <EditSong />,
    type: 'authenticated',
  },
  {
    path: UrlEnums.PRAISES,
    element: <Praises />,
    type: 'authenticated',
  },
  {
    path: UrlEnums.ADMIN_TRANSLATIONS,
    element: <AdminTranslations />,
    type: 'authorized',
    authProps: { adminOnly: true },
  },
  { path: UrlEnums.NOT_FOUND, element: <NotFoundPage /> },
  { path: '*', element: <Navigate to={UrlEnums.NOT_FOUND} replace /> },
];

export default routes;
