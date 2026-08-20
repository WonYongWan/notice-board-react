import { Routes, Route } from 'react-router';

import NoticeList from '../pages/NoticeList';
import NoticeDetail from '../pages/NoticeDetail';
import Layout from '../components/layout/Layout';
import NoticeEdit from '../pages/NoticeEdit';
import NoticeWrite from '../pages/NoticeWrite';
import Login from '../pages/auth/Login';
import Signup from '../pages/auth/Signup';
import Forgot from '../pages/auth/Forgot';

const Router = ({ notice }) => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <NoticeList {...notice} />
          </Layout>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot" element={<Forgot />} />
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
