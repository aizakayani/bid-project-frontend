import { useNavigate } from "react-router-dom";

function Pricing() {
  const navigate = useNavigate();
  return (
    <>
      <div id="titlebar" class="gradient">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <h2>Pricing Plans</h2>

            
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Page Content
================================================== --> */}
      <div class="container margin-bottom-80">
        <div class="row">
          <div class="col-xl-12">
            {/* <!-- Billing Cycle  --> */}
            <div class="billing-cycle-radios margin-bottom-70">
              <div class="radio billed-monthly-radio">
                <input
                  id="radio-5"
                  name="radio-payment-type"
                  type="radio"
                  checked
                />
                <label for="radio-5">
                  <span class="radio-label"></span> Billed Monthly
                </label>
              </div>

              <div class="radio billed-yearly-radio">
                <input id="radio-6" name="radio-payment-type" type="radio" />
                <label for="radio-6">
                  <span class="radio-label"></span> Billed Yearly{" "}
                  <span class="small-label">Save 10%</span>
                </label>
              </div>
            </div>

            {/* <!-- Pricing Plans Container --> */}
            <div class="pricing-plans-container">
              {/* <!-- Plan --> */}
              <div class="pricing-plan">
                <h3>Basic Plan</h3>
                <p class="margin-top-10">
                  One time fee for one listing or task highlighted in search
                  results.
                </p>
                <div class="pricing-plan-label billed-monthly-label">
                  <strong>$19</strong>/ monthly
                </div>
                <div class="pricing-plan-label billed-yearly-label">
                  <strong>$205</strong>/ yearly
                </div>
                <div class="pricing-plan-features">
                  <strong>Features of Basic Plan</strong>
                  <ul>
                    <li>1 Listing</li>
                    <li>30 Days Visibility</li>
                    <li>Highlighted in Search Results</li>
                  </ul>
                </div>
                <a
                  onClick={() => navigate('/checkout')}
                  class="button full-width margin-top-20"
                >
                  Buy Now
                </a>
              </div>

              {/* <!-- Plan --> */}
              <div class="pricing-plan recommended">
                <div class="recommended-badge">Recommended</div>
                <h3>Standard Plan</h3>
                <p class="margin-top-10">
                  One time fee for one listing or task highlighted in search
                  results.
                </p>
                <div class="pricing-plan-label billed-monthly-label">
                  <strong>$49</strong>/ monthly
                </div>
                <div class="pricing-plan-label billed-yearly-label">
                  <strong>$529</strong>/ yearly
                </div>
                <div class="pricing-plan-features">
                  <strong>Features of Standard Plan</strong>
                  <ul>
                    <li>5 Listings</li>
                    <li>60 Days Visibility</li>
                    <li>Highlighted in Search Results</li>
                  </ul>
                </div>
                <a
                  onClick={() => navigate('/checkout')}
                  class="button full-width margin-top-20"
                >
                  Buy Now
                </a>
              </div>

              {/* <!-- Plan --> */}
              <div class="pricing-plan">
                <h3>Extended Plan</h3>
                <p class="margin-top-10">
                  One time fee for one listing or task highlighted in search
                  results.
                </p>
                <div class="pricing-plan-label billed-monthly-label">
                  <strong>$99</strong>/ monthly
                </div>
                <div class="pricing-plan-label billed-yearly-label">
                  <strong>$1069</strong>/ yearly
                </div>
                <div class="pricing-plan-features">
                  <strong>Features of Extended Plan</strong>
                  <ul>
                    <li>Unlimited Listings Listing</li>
                    <li>90 Days Visibility</li>
                    <li>Highlighted in Search Results</li>
                  </ul>
                </div>
                <a
                  onClick={() => navigate('/checkout')}
                  class="button full-width margin-top-20"
                >
                  Buy Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Pricing;
