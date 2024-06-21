import userAvatarSmall3 from "../utils/images/user-avatar-small-03.jpg";
import userAvatarSmall2 from "../utils/images/user-avatar-small-02.jpg";
import userAvatarSmall1 from "../utils/images/user-avatar-small-01.jpg";
import userAvatarPlaceholder from "../utils/images/user-avatar-placeholder.png";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";

const dummyMessages = [
  {
    message:
      "Thanks for choosing my offer. I will start working on your project tomorrow.",
  },
  {
    message: "Great. If you need any further clarification let me know. 👍",
  },
  {
    message: "Ok, I will. 😉",
  },
  {
    message:
      "Hi Sindy, I just wanted to let you know that project is finished and I'm waiting for your approval.",
  },
  {
    message:
      "Hi Tom! Hate to break it to you, but I'm actually on vacation 🌴 until Sunday so I can't check it now. 😎",
  },
  {
    message: "Ok, no problem. But don't forget about last payment. 🙂",
  },
];

function DashboardMessages() {
  const {
    newMessageContext,
    setNewMessageContext,
    chatMessages,
    socket,
    user,
  } = useContext(UserContext);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  useEffect(() => {
    if (chatMessages) {
      if (newMessageContext) {
        // check if receiver with new message context already exists then just open chat
        const filteredMessages = chatMessages.filter(
          (message) => message.receiver === newMessageContext?.receiver?.id
        );
        if (filteredMessages?.length > 0) {
          const messageData = {
            conversationReceiver: newMessageContext.receiver.id,
            conversationName: newMessageContext.receiver.name,
            conversationMessages: [...filteredMessages],
          };
          setNewMessageContext(null);
          setSelectedConversation(messageData);
        } else {
          setSelectedConversation({
            conversationReceiver: newMessageContext.receiver.id,
            conversatisetSelectedConversationonName:
              newMessageContext.receiver.name,
            conversationMessages: [],
          });
        }
      }
      if (chatMessages?.length > 0) {
        const groupedMessages = groupMessages(chatMessages);
        console.log("HUI", groupedMessages);
        setConversations(groupedMessages);
        // set first conversation if none is selected
        console.log(
          groupedMessages?.length > 0,
          !newMessageContext,
          !selectedConversation
        );
        if (groupedMessages?.length > 0 && !newMessageContext) {
          if (selectedConversation) {
            const selectedCoversationCopy = groupedMessages?.find(
              (groupedMessage) =>
                groupedMessage.conversationReceiver ===
                selectedConversation.conversationReceiver
            );
            if (selectedCoversationCopy) {
              setSelectedConversation(selectedCoversationCopy);
            }
          } else {
            setSelectedConversation(groupedMessages[0]);
          }
        }
      }
    }
    // return () => setNewMessageContext(null);
  }, [newMessageContext, chatMessages]);

  const groupMessages = (messages) => {
    console.log("MESSAGES", messages);
    const groupedMessages = [];
    messages.forEach((message) => {
      const { receiver, sender, receiverName, senderName } = message;
      // get index
      let conversationIndex = -1;
      groupedMessages?.length > 0 &&
        groupedMessages.forEach((groupedMessage, index) => {
          if (
            groupedMessage.conversationGroup === `${receiver}-${sender}` ||
            groupedMessage.conversationGroup === `${sender}-${receiver}`
          ) {
            conversationIndex = index;
          }
        });
      if (conversationIndex === -1) {
        groupedMessages.push({
          conversationGroup: `${receiver}-${sender}`,
          conversationName: sender === user.id ? receiverName : senderName,
          conversationReceiver: sender === user.id ? receiver : sender,
          conversationMessages: [message],
        });
      } else {
        groupedMessages[conversationIndex].conversationMessages.push(message);
      }
    });
    return groupedMessages;
  };

  const sortedConversations = conversations.sort((a, b) => {
    // Extract the last message's createdAt timestamp for both conversations
    const lastMessageA =
      a.conversationMessages[a.conversationMessages.length - 1]?.createdAt;
    const lastMessageB =
      b.conversationMessages[b.conversationMessages.length - 1]?.createdAt;

    // Compare the timestamps for sorting
    return lastMessageB - lastMessageA;
  });

  const handleSendMessage = () => {
    if (!socket) return;
    if (selectedConversation) {
      socket.emit("chat-message", {
        message: newMessage,
        receiverId: newMessageContext
          ? newMessageContext.receiver.id
          : selectedConversation.conversationReceiver,
      });
      setNewMessage("");
      if (newMessageContext) {
        setNewMessageContext(null);
      }
    }
  };
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
                {sortedConversations?.length > 0 &&
                  sortedConversations.map((conversation) => (
                    <li>
                      <a
                        href="#"
                        onClick={() => {
                          setSelectedConversation(conversation);
                          setNewMessageContext(null);
                        }}
                      >
                        <div class="message-avatar">
                          <i class="status-icon status-online"></i>
                          <img src={userAvatarSmall3} alt="" />
                        </div>

                        <div class="message-by">
                          <div class="message-by-headline">
                            <h5>{conversation.conversationName}</h5>
                            <span>4 hours ago</span>
                          </div>
                          <p>
                            {conversation.conversationMessages?.length
                              ? conversation.conversationMessages[
                                  conversation.conversationMessages.length - 1
                                ].message
                              : ""}
                          </p>
                        </div>
                      </a>
                    </li>
                  ))}
                {/* <li>
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
                </li> */}
              </ul>
            </div>
            {/* <!-- Messages / End --> */}

            {/* <!-- Message Content --> */}
            <div class="message-content">
              <div class="messages-headline">
                <h4>{selectedConversation?.conversationName}</h4>
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

                {selectedConversation?.conversationMessages?.length > 0 &&
                  selectedConversation?.conversationMessages?.map(
                    (conversationMessage) => {
                      let avatar = null;
                      avatar =
                        conversationMessage.sender === user.id
                          ? conversationMessage.senderAvatar
                          : conversationMessage.receiverAvatar;
                      return (
                        <div
                          class={`message-bubble ${
                            conversationMessage.sender === user.id ? "me" : ""
                          }`}
                        >
                          <div class="message-bubble-inner">
                            <div class="message-avatar">
                              <img
                                // src={
                                //   conversationMessage.sender === user.id
                                //     ? conversationMessage.senderAvatar
                                //       ? conversationMessage.senderAvatar
                                //       : userAvatarPlaceholder
                                //     : conversationMessage.receiverAvatar
                                //     ? conversationMessage.receiverAvatar
                                //     : userAvatarPlaceholder
                                // }
                                src={
                                  avatar && avatar.trim() !== ""
                                    ? avatar
                                    : userAvatarPlaceholder
                                }
                                alt=""
                              />
                            </div>
                            <div class="message-text">
                              <p>{conversationMessage.message}</p>
                            </div>
                          </div>
                          <div class="clearfix"></div>
                        </div>
                      );
                    }
                  )}

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
                  value={newMessage}
                  onChange={(e) => {
                    setNewMessage(e.target.value);
                  }}
                ></textarea>
                <button
                  class="button ripple-effect"
                  onClick={handleSendMessage}
                >
                  Send
                </button>
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
