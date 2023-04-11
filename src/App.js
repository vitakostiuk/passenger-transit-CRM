import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux';
import { getUser } from './redux/auth/authOperations';
import { getLoadingUser } from './redux/auth/authSelectors';
import Loader from './modules/Loader/Loader';
// import { getToken, getGoogleToken } from '../redux/auth/authSelectors';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import Header from './modules/Header';

function App() {
  const dispatch = useDispatch();

  const isLoadingUser = useSelector(getLoadingUser);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  if (isLoadingUser) {
    return <Loader />;
  }
  return (
    <div className="App">
      <Header />
      <Routes>
        {/* <Route path="/" element={<HomePage />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} /> */}
        <Route path="/login" element={<SignInPage />} />
        <Route path="/register" element={<SignUpPage />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} limit={1} />
    </div>
  );
}

export default App;
