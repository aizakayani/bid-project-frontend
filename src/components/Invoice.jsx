import logo from "../utils/images/logo.png";
import '../css/invoice.css';
function Invoice() {
  return (
    <>
      {/* <!-- Print Button --> */}
      <div class="print-button-container">
        <a href="javascript:window.print()" class="print-button">
          Print this invoice
        </a>
      </div>

      {/* <!-- Invoice --> */}
      <div id="invoice" style={{background: 'white'}}>
        {/* <!-- Header --> */}
        <div class="row">
          <div class="col-xl-6">
            <div id="logo" style={{height: '20px'}}>
              <img src={logo} alt="" />
            </div>
          </div>

          <div class="col-xl-6">
            <p id="details">
              <strong>Order:</strong> #00124 <br></br>
              <strong>Issued:</strong> 20/08/2019 <br></br>
              Due 7 days from date of issue
            </p>
          </div>
        </div>

        {/* <!-- Client & Supplier --> */}
        <div class="row">
          <div class="col-xl-12">
            <h2>Invoice</h2>
          </div>

          <div class="col-xl-6">
            <strong class="margin-bottom-5">Supplier</strong>
            <p>
              Bid Bridge Ltd. <br></br>
              21 St Andrews Lane <br></br>
              London, CF44 6ZL, UK <br></br>
            </p>
          </div>

          <div class="col-xl-6">
            <strong class="margin-bottom-5">Customer</strong>
            <p>
              John Doe <br></br>
              36 Edgewater Street <br></br>
              Melbourne, 2540, Australia <br></br>
            </p>
          </div>
        </div>

        {/* <!-- Invoice --> */}
        <div class="row">
          <div class="col-xl-12">
            <table class="margin-top-20">
              <tr>
                <th>Description</th>
                <th>Price</th>
                <th>VAT (20%)</th>
                <th>Total</th>
              </tr>

              <tr>
                <td>Standard Plan</td>
                <td>$49.00</td>
                <td>$9.80</td>
                <td>$58.80</td>
              </tr>
            </table>
          </div>

          <div class="col-xl-4 col-xl-offset-8">
            <table id="totals">
              <tr>
                <th>Total Due</th>
                <th>
                  <span>$58.80</span>
                </th>
              </tr>
            </table>
          </div>
        </div>

        {/* <!-- Footer --> */}
        <div class="row">
          <div class="col-xl-12">
            <ul id="footer" className="footer-invoice">
              <li>
                <span>www.example.com</span>
              </li>
              <li>office@example.com</li>
              <li>(123) 123-456</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
export default Invoice;
