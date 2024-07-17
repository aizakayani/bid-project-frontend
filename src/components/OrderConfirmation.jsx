import { useNavigate } from "react-router-dom";
function OrderConformation() {
	const navigate = useNavigate();
  return (
    <>
      <div id="titlebar" class="gradient">
        {" "}
      </div>
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="order-confirmation-page">
              <div class="breathing-icon">
                <i class="icon-feather-check"></i>
              </div>
              <h2 class="margin-top-30">Thank you for your order!</h2>
              <p>Your payment has been processed successfully.</p>
              {/* <a
                 onClick={() => {
					navigate("/invoice");
				  }}
                class="button ripple-effect-dark button-sliding-icon margin-top-30"
              >
                View Invoice{" "}
                <i class="icon-material-outline-arrow-right-alt"></i>
              </a> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default OrderConformation;
