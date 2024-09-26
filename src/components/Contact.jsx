// import GoogleMapReact from "google-map-react";
import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';

const AnimatedText = ({ text }) => {
  const [isVisible, setIsVisible] = useState(false);

  const fadeIn = useSpring({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0px)' : 'translateY(20px)',
    config: { duration: 800 }
  });

  // Trigger animation when component mounts
  React.useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <animated.div style={fadeIn}>
      {text}
    </animated.div>
  );
};

const AnimatedHeading = () => {
  return (
    <h1 className="animated-text">
      <AnimatedText text="Contact Us" />
    </h1>
  );
};

const Contact = () => {
  return (
    <>
      <div id="titlebar" className="gradient">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <AnimatedHeading />
            </div>
          </div>
        </div>
      </div>

      {/* Background Wave */}
      <div className="background-wave">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="#770737" fillOpacity="1" d="M0,128L48,160C96,192,192,256,288,266.7C384,277,480,235,576,224C672,213,768,235,864,256C960,277,1056,299,1152,293.3C1248,288,1344,256,1392,240L1440,224V320H0Z"></path>
        </svg>
      </div>

      <div className="container contact-container">
        <div className="row">
          <div className="col-xl-12">
            <div className="contact-location-info margin-bottom-50">
              <div className="contact-address">
                <ul>
                  <li className="contact-address-headline">Our Office</li>
                  <li>Abasyn University Islamabad Campus</li>
                  <li>Phone (xxx)xxx-xxx-xx</li>
                  <li>
                    <a href="#">Kayaniaiza391@gmail.com</a>
                  </li>
                  <li>
                    <div className="freelancer-socials">
                      <ul>
                        <li>
                          <a href="#" title="Dribbble" data-tippy-placement="top">
                            <i className="icon-brand-dribbble"></i>
                          </a>
                        </li>
                        <li>
                          <a href="#" title="Twitter" data-tippy-placement="top">
                            <i className="icon-brand-twitter"></i>
                          </a>
                        </li>
                        <li>
                          <a href="#" title="Behance" data-tippy-placement="top">
                            <i className="icon-brand-behance"></i>
                          </a>
                        </li>
                        <li>
                          <a href="#" title="GitHub" data-tippy-placement="top">
                            <i className="icon-brand-github"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col-xl-8 col-lg-8 offset-xl-2 offset-lg-2">
            {/* Additional content can go here */}
          </div>
        </div>
      </div>
    </>
  );
};

// CSS for styling
const styles = `
  .gradient {
    background: linear-gradient(135deg, #770737 0%, #ff6584 100%);
    padding: 50px 0;
    text-align: center;
    color: white;
  }

  .background-wave {
    position: absolute;
    width: 100%;
    top: -20px;
    z-index: -1;
  }

  .contact-container {
    text-align: center;
    padding: 20px;
    margin-top: 50px;
  }

  .contact-address {
    font-size: 1.2em;
    color: #333;
    margin-top: 20px;
  }

  .contact-address-headline {
    font-size: 1.5em;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .freelancer-socials ul {
    display: flex;
    justify-content: center;
    list-style: none;
    padding: 0;
  }

  .freelancer-socials ul li {
    margin: 0 10px;
  }

  .freelancer-socials ul li a {
    color: #770737;
    font-size: 1.5em;
  }

  .animated-text h1 {
    font-size: 2.5em;
    font-weight: bold;
  }
`;

// Inject styles into document
const StyleInjector = () => {
  React.useEffect(() => {
    const styleTag = document.createElement('style');
    styleTag.innerHTML = styles;
    document.head.appendChild(styleTag);
  }, []);

  return null;
};

export default function App() {
  return (
    <>
      <StyleInjector />
      <Contact />
    </>
  );
}
