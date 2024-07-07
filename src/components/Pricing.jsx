import { useLocation, useNavigate } from "react-router-dom";
import React, { useState } from 'react';
function Pricing() {
  const navigate = useNavigate();
  const [isMonthly, setIsMonthly] = useState(true);
  const [isYearly, setIsYearly] = useState(false);

  const handleBillingCycleChange = (billingCycle) => {
    if (billingCycle === 'monthly') {
      setIsMonthly(true);
      setIsYearly(false);
    } else {
      setIsMonthly(false);
      setIsYearly(true);
    }
  };
  console.log(isMonthly,isYearly);

  return (
    <>
      <div id="titlebar" class="gradient">
        <div class="container">
        </div>
      </div>

      {/* <!-- Page Content
================================================== --> */}
      <div class="container margin-bottom-80">
        <div class="row">
        <div className="col-xl-12">
      {/* Billing Cycle */}
      <div className="billing-cycle-radios margin-bottom-70">
        <div className="radio billed-monthly-radio">
          <input
            id="radio-5"
            name="radio-payment-type"
            type="radio"
            checked={isMonthly}
            onChange={() => handleBillingCycleChange('monthly')}
          />
          <label htmlFor="radio-5">
            <span className="radio-label"></span> Billed Monthly
          </label>
        </div>

        <div className="radio billed-yearly-radio">
          <input
            id="radio-6"
            name="radio-payment-type"
            type="radio"
            checked={isYearly}
            onChange={() => handleBillingCycleChange('yearly')}
          />
          <label htmlFor="radio-6">
            <span className="radio-label"></span> Billed Yearly
          </label>
        </div>
      </div>

      {/* Pricing Plans Container */}
      <div className="pricing-plans-container">
        {/* Plan */}
        <div className="pricing-plan">
          <h3>Basic Plan</h3>
          <p className="margin-top-10">
            One time fee for one listing or task highlighted in search results.
          </p>
         <div className="pricing-plan-label billed-monthly-label">
     <strong>{isMonthly ? '$19' : '$205' }</strong>/ {isMonthly ? 'monthly' : 'yearly'}
     </div>
          <div className="pricing-plan-features">
            <strong>Features of Basic Plan</strong>
            <ul>
              <li>1 Listing</li>
              <li>30 Days Visibility</li>
              <li>Highlighted in Search Results</li>
            </ul>
          </div>
          <a
            onClick={() => navigate('/checkout/:basic')}
            className="button full-width margin-top-20"
          >
            Buy Now
          </a>
        </div>

        {/* Plan */}
        <div className="pricing-plan recommended">
          <div className="recommended-badge">Recommended</div>
          <h3>Standard Plan</h3>
          <p className="margin-top-10">
            One time fee for one listing or task highlighted in search results.
          </p>
         
            <div className="pricing-plan-label billed-monthly-label">
              <strong>{isMonthly ? '$49' : '529' }</strong>/ {isMonthly ? 'monthly' : 'yearly'}
            </div>
          <div className="pricing-plan-features">
            <strong>Features of Standard Plan</strong>
            <ul>
              <li>5 Listings</li>
              <li>60 Days Visibility</li>
              <li>Highlighted in Search Results</li>
            </ul>
          </div>
          <a
            onClick={() => navigate('/checkout/:standard')}
            className="button full-width margin-top-20"
          >
            Buy Now
          </a>
        </div>

        {/* Plan */}
        <div className="pricing-plan">
          <h3>Extended Plan</h3>
          <p className="margin-top-10">
            One time fee for one listing or task highlighted in search results.
          </p>
          
            <div className="pricing-plan-label billed-monthly-label">
              <strong>{isMonthly ? '$99' : '1069' }</strong>/ {isMonthly ? 'monthly' : 'yearly'}
            </div>
     
        
          <div className="pricing-plan-features">
            <strong>Features of Extended Plan</strong>
            <ul>
              <li>Unlimited Listings</li>
              <li>90 Days Visibility</li>
              <li>Highlighted in Search Results</li>
            </ul>
          </div>
          <a
            onClick={() => navigate('/checkout/:professional')}
            className="button full-width margin-top-20"
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
