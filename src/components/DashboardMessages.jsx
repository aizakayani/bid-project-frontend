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
    chatConversations,
    socket,
    user,
  } = useContext(UserContext);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  useEffect(() => {
    if (chatConversations) {
      if (newMessageContext) {
        // check if receiver with new message context already exists then just open chat
        const filteredConversation = chatConversations.find((message) =>
          message.channel.includes(newMessageContext?.receiver?.id)
        );
        if (filteredConversation) {
          setNewMessageContext(null);
          setSelectedConversation(filteredConversation);
        }
      }
      if (chatConversations?.length > 0) {
        // set first conversation if none is selected
        if (chatConversations?.length > 0 && !newMessageContext) {
          if (selectedConversation) {
            const updatedSelectedConversation = chatConversations?.find(
              (conversation) =>
                conversation.channel === selectedConversation.channel
            );
            if (updatedSelectedConversation) {
              setSelectedConversation({ ...updatedSelectedConversation });
            }
          } else {
            setSelectedConversation(chatConversations[0]);
          }
        }
      }
    }
    // return () => setNewMessageContext(null);
  }, [newMessageContext, chatConversations]);

  // const groupMessages = (messages) => {
  //   console.log("MESSAGES", messages);
  //   const groupedMessages = [];
  //   messages.forEach((message) => {
  //     const { receiver, sender, receiverName, senderName } = message;
  //     // get index
  //     let conversationIndex = -1;
  //     groupedMessages?.length > 0 &&
  //       groupedMessages.forEach((groupedMessage, index) => {
  //         if (
  //           groupedMessage.conversationGroup === `${receiver}-${sender}` ||
  //           groupedMessage.conversationGroup === `${sender}-${receiver}`
  //         ) {
  //           conversationIndex = index;
  //         }
  //       });
  //     if (conversationIndex === -1) {
  //       groupedMessages.push({
  //         conversationGroup: `${receiver}-${sender}`,
  //         conversationName: sender === user?._id ? receiverName : senderName,
  //         conversationReceiver: sender === user?._id ? receiver : sender,
  //         conversationMessages: [message],
  //       });
  //     } else {
  //       groupedMessages[conversationIndex].conversationMessages.push(message);
  //     }
  //   });
  //   return groupedMessages;
  // };

  // const sortedConversations = conversations.sort((a, b) => {
  //   // Extract the last message's createdAt timestamp for both conversations
  //   const lastMessageA =
  //     a.conversationMessages[a.conversationMessages.length - 1]?.createdAt;
  //   const lastMessageB =
  //     b.conversationMessages[b.conversationMessages.length - 1]?.createdAt;

  //   // Compare the timestamps for sorting
  //   return lastMessageB - lastMessageA;
  // });

  const sortedConversations = [];

  const handleSendMessage = () => {
    if (!socket) return;
    // if (selectedConversation) {
    socket.emit("chat-message", {
      message: newMessage,
      receiverId: newMessageContext
        ? newMessageContext.receiver.id
        : selectedConversation.recepients?.find(
            (recepient) => recepient.id !== user?._id
          ).id,
    });
    setNewMessage("");
    if (newMessageContext) {
      setNewMessageContext(null);
    }
    // }
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
                {chatConversations?.length > 0 &&
                  chatConversations.map((conversation) => {
                    const receiver = conversation?.recepients?.find(
                      (recepient) => recepient.id !== user?._id
                    );
                    return (
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
                            <img
                              src={
                                receiver?.avatar
                                  ? `data:${receiver?.avatar?.contentType};base64,${receiver?.avatar?.base64Image}`
                                  : userAvatarSmall3
                              }
                              alt=""
                            />
                          </div>

                          <div class="message-by">
                            <div class="message-by-headline">
                              <h5>{receiver.name}</h5>
                              <span>4 hours ago</span>
                            </div>
                            <p>
                              {conversation.messages?.length
                                ? conversation.messages[
                                    conversation.messages.length - 1
                                  ].content
                                : ""}
                            </p>
                          </div>
                        </a>
                      </li>
                    );
                  })}
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
                <h4>
                  {selectedConversation?.recepients?.find(
                    (recepient) => recepient.id !== user?._id
                  )?.name || ""}
                </h4>
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

                {selectedConversation?.messages?.length > 0 &&
                  selectedConversation?.messages?.map((conversationMessage) => {
                    const receiver = selectedConversation?.recepients?.find(
                      (recepient) => recepient.id !== user?._id
                    );
                    let avatar = null;
                    avatar =
                      conversationMessage.sentBy === user?._id
                        ? user?.avatar
                          ? user?.avatar
                          : null
                        : receiver?.avatar
                        ? receiver?.avatar
                        : null;
                    return (
                      <div
                        class={`message-bubble ${
                          conversationMessage.sentBy === user?._id ? "me" : ""
                        }`}
                      >
                        <div class="message-bubble-inner">
                          <div class="message-avatar">
                            <img
                              // src={
                              //   conversationMessage.sender === user?._id
                              //     ? conversationMessage.senderAvatar
                              //       ? conversationMessage.senderAvatar
                              //       : userAvatarPlaceholder
                              //     : conversationMessage.receiverAvatar
                              //     ? conversationMessage.receiverAvatar
                              //     : userAvatarPlaceholder
                              // }
                              src={
                                avatar?.base64Image
                                  ? `data:${avatar?.contentType};base64,${avatar?.base64Image}`
                                  : userAvatarPlaceholder
                              }
                              alt=""
                            />
                          </div>
                          <div class="message-text">
                            <p>{conversationMessage.content}</p>
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
