import { Routes, Route } from 'react-router';

import Layout from '../components/layout/Layout';
// import NoticeList from '../pages/notice/NoticeList';
import NoticeDetail from '../pages/notice/NoticeDetail';
import NoticeEdit from '../pages/notice/NoticeEdit';
import NoticeWrite from '../pages/notice/NoticeWrite';
import Login from '../pages/auth/Login';
import Signup from '../pages/auth/Signup';
import AccountFind from '../pages/auth/AccountFind';
import GuestRoute from './GuestRoute';
import PrivateRoute from './PrivateRoute';
import SignupComplete from '../pages/auth/SignupComplete';
import MySetting from '../pages/my/MySetting';
import Home from '../pages/Home';

const Router = ({ notice }) => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            {/* <NoticeList {...notice} /> */}
            <Home notice={notice} />
          </Layout>
        }
      />
      <Route element={<GuestRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/account-find" element={<AccountFind />} />
      </Route>
      <Route path="/signup-complete" element={<SignupComplete />}></Route>
      <Route element={<PrivateRoute />}>
        <Route
          path="/my-setting"
          element={
            <Layout>
              <MySetting />
            </Layout>
          }
        />
        <Route
          path="/write"
          element={
            <Layout>
              <NoticeWrite {...notice} />
            </Layout>
          }
        />
        <Route
          path="/notices/:id/edit"
          element={
            <Layout>
              <NoticeEdit {...notice} />
            </Layout>
          }
        />
      </Route>
      <Route
        path="/notices/:id"
        element={
          <Layout>
            <NoticeDetail {...notice} />
          </Layout>
        }
      />
    </Routes>
  );
};

export default Router;
