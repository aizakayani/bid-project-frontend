import userAvatarSmall3 from "../utils/images/user-avatar-small-03.jpg";
import userAvatarSmall2 from "../utils/images/user-avatar-small-02.jpg";
import userAvatarSmall1 from "../utils/images/user-avatar-small-01.jpg";
import userAvatarPlaceholder from "../utils/images/user-avatar-placeholder.png";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";

const dummyMessages = [
  {
    placement: "left",
    content:
      "Thanks for choosing my offer. I will start working on your project tomorrow.",
  },
  {
    placement: "right",
    content: "Great. If you need any further clarification let me know. 👍",
  },
  {
    placement: "right",
    content: "Ok, I will. 😉",
  },
  {
    placement: "right",
    content:
      "Hi Sindy, I just wanted to let you know that project is finished and I'm waiting for your approval.",
  },
  {
    placement: "left",
    content:
      "Hi Tom! Hate to break it to you, but I'm actually on vacation 🌴 until Sunday so I can't check it now. 😎",
  },
  {
    placement: "right",
    content: "Ok, no problem. But don't forget about last payment. 🙂",
  },
];

function DashboardMessages() {
  const { newMessageContext, setNewMessageContext } = useContext(UserContext);
  const [selectedMessages, setSelectedMessages] = useState(dummyMessages);
  console.log(newMessageContext);
  return (
    <div class="dashboard-content-container" data-simplebar>
      <div class="dashboard-content-inner">
        {/* <!-- Dashboard Headline --> */}
        <div class="dashboard-headline">
          <h3>Messages</h3>

          
        </div>

        <div class="messages-container margin-top-0">
          <div class="messages-container-inner">
            {/* <!-- Messages --> */}
            <div class="messages-inbox">
              <div class="messages-headline">
                <div class="input-with-icon">
                  <input
                    id="autocomplete-input"
                    type="text"
                    placeholder="Search"
                  />
                  <i class="icon-material-outline-search"></i>
                </div>
              </div>

              <ul>
                {newMessageContext && (
                  <li>
                    <a href="#">
                      <div class="message-avatar">
                        <i class="status-icon status-online"></i>
                        <img src={userAvatarSmall3} alt="" />
                      </div>

                      <div class="message-by">
                        <div class="message-by-headline">
                          <h5>{newMessageContext?.receiver?.name}</h5>
                          {/* <span>4 hours ago</span> */}
                        </div>
                        {/* <p>
                          Thanks for reaching out. I'm quite busy right now on
                          many
                        </p> */}
                      </div>
                    </a>
                  </li>
                )}
                <li>
                  <a href="#">
                    <div class="message-avatar">
                      <i class="status-icon status-online"></i>
                      <img src={userAvatarSmall3} alt="" />
                    </div>

                    <div class="message-by">
                      <div class="message-by-headline">
                        <h5>David Peterson</h5>
                        <span>4 hours ago</span>
                      </div>
                      <p>
                        Thanks for reaching out. I'm quite busy right now on
                        many
                      </p>
                    </div>
                  </a>
                </li>

                <li class="active-message">
                  <a href="#">
                    <div class="message-avatar">
                      <i class="status-icon status-offline"></i>
                      <img src={userAvatarSmall2} alt="" />
                    </div>

                    <div class="message-by">
                      <div class="message-by-headline">
                        <h5>Sindy Forest</h5>
                        <span>Yesterday</span>
                      </div>
                      <p>
                        Hi Tom! Hate to break it to you but I'm actually on
                        vacation
                      </p>
                    </div>
                  </a>
                </li>

                <li>
                  <a href="#">
                    <div class="message-avatar">
                      <i class="status-icon status-offline"></i>
                      <img src={userAvatarPlaceholder} alt="" />
                    </div>

                    <div class="message-by">
                      <div class="message-by-headline">
                        <h5>Sebastiano Piccio</h5>
                        <span>2 days ago</span>
                      </div>
                      <p>
                        Hello, I want to talk about my project if you don't
                        mind!
                      </p>
                    </div>
                  </a>
                </li>

                <li>
                  <a href="#">
                    <div class="message-avatar">
                      <i class="status-icon status-online"></i>
                      <img src={userAvatarPlaceholder} alt="" />
                    </div>

                    <div class="message-by">
                      <div class="message-by-headline">
                        <h5>Marcin Kowalski</h5>
                        <span>2 days ago</span>
                      </div>
                      <p>Yes, I received payment. Thanks for cooperation!</p>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
            {/* <!-- Messages / End --> */}

            {/* <!-- Message Content --> */}
            <div class="message-content">
              <div class="messages-headline">
                <h4>Sindy Forest</h4>
                <a href="#" class="message-action">
                  <i class="icon-feather-trash-2"></i> Delete Conversation
                </a>
              </div>

              {/* <!-- Message Content Inner --> */}
              <div class="message-content-inner">
                {/* <!-- Time Sign --> */}
                <div class="message-time-sign">
                  <span>28 June, 2019</span>
                </div>

                {selectedMessages?.length > 0 &&
                  selectedMessages?.map((message) => {
                    return (
                      <div
                        class={`message-bubble ${
                          message.placement === "right" ? "me" : ""
                        }`}
                      >
                        <div class="message-bubble-inner">
                          <div class="message-avatar">
                            <img src={userAvatarSmall3} alt="" />
                          </div>
                          <div class="message-text">
                            <p>{message.content}</p>
                          </div>
                        </div>
                        <div class="clearfix"></div>
                      </div>
                    );
                  })}

                {/* <!-- Time Sign --> */}
                {/* <div class="message-time-sign">
                  <span>Yesterday</span>
                </div> */}
              </div>
              {/* <!-- Message Content Inner / End --> */}

              {/* <!-- Reply Area --> */}
              <div class="message-reply">
                <textarea
                  cols="1"
                  rows="1"
                  placeholder="Your Message"
                  data-autoresize
                ></textarea>
                <button class="button ripple-effect">Send</button>
              </div>
            </div>
            {/* <!-- Message Content --> */}
          </div>
        </div>
        {/* <!-- Messages Container / End --> */}

        {/* <!-- Footer --> */}
        <div class="dashboard-footer-spacer"></div>
        <div class="small-footer margin-top-15">
          <div class="small-footer-copyrights">
            ©2024 <strong>Bid Bridge</strong>. All Rights Reserved.
          </div>
          <ul class="footer-social-links">
            <li>
              <a href="#" title="Facebook" data-tippy-placement="top">
                <i class="icon-brand-facebook-f"></i>
              </a>
            </li>
            <li>
              <a href="#" title="Twitter" data-tippy-placement="top">
                <i class="icon-brand-twitter"></i>
              </a>
            </li>
            <li>
              <a href="#" title="Google Plus" data-tippy-placement="top">
                <i class="icon-brand-google-plus-g"></i>
              </a>
            </li>
            <li>
              <a href="#" title="LinkedIn" data-tippy-placement="top">
                <i class="icon-brand-linkedin-in"></i>
              </a>
            </li>
          </ul>
          <div class="clearfix"></div>
        </div>
        {/* <!-- Footer / End --> */}
      </div>
    </div>
  );
}
export default DashboardMessages;
