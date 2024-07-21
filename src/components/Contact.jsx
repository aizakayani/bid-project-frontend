// import GoogleMapReact from "google-map-react";
import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
function Contact() {
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
        <AnimatedText text="Your Bridge to" />
        <AnimatedText text="Freelance Talent" />
      </h1>
    );
  };
  
  const AnimatedDescription = () => {
    return (
      <p className="animated-description">
        <strong>Enhance productivity</strong> with our platform designed for <strong>job posting</strong>, <strong>bidding</strong>, and <strong>freelance task management</strong>. Connect with a diverse pool of freelancers ready to take on your projects. Whether you need short-term tasks completed or long-term projects managed, our intuitive interface ensures <strong>seamless collaboration</strong> and <strong>efficiency</strong>. Join today to experience simplified hiring and project management like never before.
      </p>
    );
  };
  const Marker = ({ text }) => <div>{text}</div>;
  return (
    <>
    

      <div id="titlebar" class="gradient">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <h2>Contact</h2>
            </div>
          </div>
        </div>
      </div>
      {/* // <!-- Container --> */}
      <div class="container">
        <div class="row">
        <div className="animated-text-container">
      <div className="animated-text-content">
        <AnimatedHeading />
        <AnimatedDescription />
        <button className="get-started-button">Get Started</button>
      </div>
    </div>
          <div class="col-xl-12">
            <div class="contact-location-info margin-bottom-50">
              
              {/* <div class="contact-address">
                <ul>
                  <li class="contact-address-headline">Our Office</li>
                  <li>425 Berry Street, CA 93584</li>
                  <li>Phone (123) 123-456</li>
                  <li>
                    <a href="#">mail@example.com</a>
                  </li>
                  <li>
                    <div class="freelancer-socials">
                      <ul>
                        <li>
                          <a
                            href="#"
                            title="Dribbble"
                            data-tippy-placement="top"
                          >
                            <i class="icon-brand-dribbble"></i>
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            title="Twitter"
                            data-tippy-placement="top"
                          >
                            <i class="icon-brand-twitter"></i>
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            title="Behance"
                            data-tippy-placement="top"
                          >
                            <i class="icon-brand-behance"></i>
                          </a>
                        </li>
                        <li>
                          <a href="#" title="GitHub" data-tippy-placement="top">
                            <i class="icon-brand-github"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div> */}
            
            </div>
          </div>

          <div class="col-xl-8 col-lg-8 offset-xl-2 offset-lg-2">
            <section id="contact" class="margin-bottom-60">
              <h3 class="headline margin-top-15 margin-bottom-35">
                Any questions? Feel free to contact us!
              </h3>

              <form
                method="post"
                name="contactform"
                id="contactform"
                autocomplete="on"
              >
                <div class="row">
                  <div class="col-md-6">
                    <div class="input-with-icon-left">
                      <input
                        class="with-border"
                        name="name"
                        type="text"
                        id="name"
                        placeholder="Your Name"
                        required="required"
                      />
                      <i class="icon-material-outline-account-circle"></i>
                    </div>
                  </div>

                  <div class="col-md-6">
                    <div class="input-with-icon-left">
                      <input
                        class="with-border"
                        name="email"
                        type="email"
                        id="email"
                        placeholder="Email Address"
                        pattern="^[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z]{2,})$"
                        required="required"
                      />
                      <i class="icon-material-outline-email"></i>
                    </div>
                  </div>
                </div>

                <div class="input-with-icon-left">
                  <input
                    class="with-border"
                    name="subject"
                    type="text"
                    id="subject"
                    placeholder="Subject"
                    required="required"
                  />
                  <i class="icon-material-outline-assignment"></i>
                </div>

                <div>
                  <textarea
                    class="with-border"
                    name="comments"
                    cols="40"
                    rows="5"
                    id="comments"
                    placeholder="Message"
                    spellcheck="true"
                    required="required"
                  ></textarea>
                </div>

                <input
                  type="submit"
                  class="submit button margin-top-15"
                  id="submit"
                  value="Submit Message"
                />
              </form>
            </section>
          </div>
        </div>
      </div>
      {/* // <!-- Container / End --> */}
    </>
  );
}
export default Contact;
