import { Routes, Route } from 'react-router';

import NoticeList from '../pages/NoticeList';
import NoticeDetail from '../pages/NoticeDetail';
import Layout from '../components/layout/Layout';
import NoticeEdit from '../pages/NoticeEdit';
import NoticeWrite from '../pages/NoticeWrite';

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
