import Footer from '../footer/Footer';
import Header from '../header/Header';
import Container from './Container';
import './Layout.scss';

export default function Layout({ children }) {
  return (
    <div className="wrap">
      <Header />
      <div className="main">
        <Container>{children}</Container>
      </div>
      <Footer />
    </div>
  );
}
