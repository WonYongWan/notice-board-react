import Footer from '../footer/Footer';
import Header from '../header/Header';
import './Layout.scss';

export default function Layout({ children }) {
  return (
    <div className="wrap">
      <Header />
      <div className="container">{children}</div>
      <Footer />
    </div>
  );
}
