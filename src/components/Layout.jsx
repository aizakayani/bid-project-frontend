import Footer from "./Footer";
import Header from "./Header";
import '../css/style.css';
import '../css/colors/blue.css';
function Layout({children}) {
  return (
    <div id="wrapper">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
export default Layout;