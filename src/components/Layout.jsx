import Footer from "./Footer";
import Header from "./Header";
import '../css/style.css';
import '../css/colors/blue.css';
import { useLocation } from "react-router-dom";
function Layout({children}) {
const location = useLocation();
const isHomePage = location.pathname === '/';
  
  return (
    <div id="wrapper">
      <Header />
      {children}
      {isHomePage && <Footer />}
      
    </div>
  );
}
export default Layout;