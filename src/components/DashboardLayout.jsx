import Header from "./Header";
import '../css/style.css';
import '../css/colors/blue.css';
function DashboardLayout({children}) {
  return (
    <div id="wrapper">
      <Header />
      {children}
    </div>
  );
}
export default DashboardLayout;