import { useContext, useEffect } from "react";
import { UserContext } from "../context/userContext";
import { useState } from "react";
import AddNotePopup from "./modals/AddNotePopup";
import { addNoteAPI, deleteNoteAPI, getNotesAPI } from "../services/notes";
import toast from "react-hot-toast";
import { getTaskDetails } from "../utils/common";
import TaskDetails from "./TaskDetails";
function DashboardMain() {
  const { user, notes, setNotes,freelancers ,tasksList,userBids,jobsList,jobApplications } = useContext(UserContext);
  const [openNotePopup, setOpenNotePopup] = useState(false);
    const [acceptedBidsCount, setAcceptedBidsCount] = useState(0);
    const [freelancerRating, setFreelancerRating] = useState(null);
  useEffect(() => {
    // Count accepted bids on mount or whenever userBids or tasksList change
    let count = 0;
    userBids?.forEach(bid => {
      const taskDetails = getTaskDetails(bid?.taskId, tasksList);
      if (taskDetails?.acceptedBid === bid._id) {
        count++;
      }
    });
    setAcceptedBidsCount(count);
  }, [userBids, tasksList]);
    const getNotes = async () => {
    try {
      const response = await getNotesAPI();
      if (response.success) {
        setNotes(response.notes);
      } else {
        toast.error("Failed to get notes");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to get notes");
    }
  };

  const addNote = async (data) => {
    try {
      const response = await addNoteAPI(data);
      console.log("sdcsd", response);
      if (response.success) {
        await getNotes();
        setOpenNotePopup(false);
        toast.success("Note added successfully");
      } else {
        toast.error("Failed to add note");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to add note");
    }
  };

  const deleteNote = async (id) => {
    try {
      const response = await deleteNoteAPI(id);
      if (response.success) {
        getNotes();
      } else {
        toast.error("Failed to delete note");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete note");
    }
  };
  useEffect(() => {
    // Find the freelancer with the matching ID and set the rating
    const matchingFreelancerId = user?._id; // Replace this with the actual ID you're looking for
    const freelancer = freelancers.find(
      (freelancer) => freelancer?._id === matchingFreelancerId
    );
    console.log({freelancer});
    if (freelancer) {
      setFreelancerRating(freelancer.rating);
    }
  }, [freelancers]);
  return (
    <div class="dashboard-content-container" data-simplebar>
      <div class="dashboard-content-inner">
        {/* <!-- Dashboard Headline --> */}
        <div class="dashboard-headline">
          <h3>{user?.name}</h3>
          <span>We are glad to see you again!</span>
        </div>

        {/* <!-- Fun Facts Container --> */}
        <div class="fun-facts-container">
          <div class="fun-fact" data-fun-fact-color="#36bd78">
            <div class="fun-fact-text">
              <span>Task Bids Won</span>
              <h4>{acceptedBidsCount}</h4>
            </div>
            <div class="fun-fact-icon" style={{background: 'rgba(54, 189, 120, 0.07)'}}>
              <i class="icon-material-outline-gavel" style={{color: 'rgb(54, 189, 120)'}}></i>
            </div>
          </div>
          <div class="fun-fact" data-fun-fact-color="#b81b7f">
            <div class="fun-fact-text">
              <span>Jobs Applied</span>
              <h4>{jobApplications.length}</h4>
            </div>
            <div class="fun-fact-icon" style={{background: 'rgba(184, 27, 127, 0.07)'}} >
              <i class="icon-material-outline-business-center" style={{color: 'rgb(184, 27, 127)'}}></i>
            </div>
          </div>
          <div class="fun-fact" data-fun-fact-color="#efa80f">
            <div class="fun-fact-text">
              <span>Reviews</span>
              <h4>{freelancerRating}</h4>
            </div>
            <div class="fun-fact-icon" style={{background: 'rgba(239, 168, 15, 0.07)'}}>
              <i class="icon-material-outline-rate-review" style={{color: 'rgb(239, 168, 15)'}}></i>
            </div>
          </div>

          {/* <!-- Last one has to be hidden below 1600px, sorry :( --> */}
        
        </div>

        {/* <!-- Row --> */}

        {/* <!-- Row / End --> */}

        {/* <!-- Row --> */}
        <div class="row">
          {/* <!-- Dashboard Box --> */}
          <div class="col-xl-6">
            <div class="dashboard-box">
              <div class="headline">
                <h3>
                  <i class="icon-material-baseline-notifications-none"></i>{" "}
                  Notifications
                </h3>
                <button
                  class="mark-as-read ripple-effect-dark"
                  data-tippy-placement="left"
                  title="Mark all as read"
                >
                  <i class="icon-feather-check-square"></i>
                </button>
              </div>
              <div class="content">
                <ul class="dashboard-box-list">
                  <li>
                    <span class="notification-icon">
                      <i class="icon-material-outline-group"></i>
                    </span>
                    <span class="notification-text">
                      <strong>Michael Shannah</strong> applied for a job{" "}
                      <a href="#">Full Stack Software Engineer</a>
                    </span>
                    {/* <!-- Buttons --> */}
                    <div class="buttons-to-right">
                      <a
                        href="#"
                        class="button ripple-effect ico"
                        title="Mark as read"
                        data-tippy-placement="left"
                      >
                        <i class="icon-feather-check-square"></i>
                      </a>
                    </div>
                  </li>
                  <li>
                    <span class="notification-icon">
                      <i class=" icon-material-outline-gavel"></i>
                    </span>
                    <span class="notification-text">
                      <strong>Gilber Allanis</strong> placed a bid on your{" "}
                      <a href="#">iOS App Development</a> project
                    </span>
                    {/* <!-- Buttons --> */}
                    <div class="buttons-to-right">
                      <a
                        href="#"
                        class="button ripple-effect ico"
                        title="Mark as read"
                        data-tippy-placement="left"
                      >
                        <i class="icon-feather-check-square"></i>
                      </a>
                    </div>
                  </li>
                  <li>
                    <span class="notification-icon">
                      <i class="icon-material-outline-autorenew"></i>
                    </span>
                    <span class="notification-text">
                      Your job listing{" "}
                      <a href="#">Full Stack Software Engineer</a> is expiring
                    </span>
                    {/* <!-- Buttons --> */}
                    <div class="buttons-to-right">
                      <a
                        href="#"
                        class="button ripple-effect ico"
                        title="Mark as read"
                        data-tippy-placement="left"
                      >
                        <i class="icon-feather-check-square"></i>
                      </a>
                    </div>
                  </li>
                  <li>
                    <span class="notification-icon">
                      <i class="icon-material-outline-group"></i>
                    </span>
                    <span class="notification-text">
                      <strong>Sindy Forrest</strong> applied for a job{" "}
                      <a href="#">Full Stack Software Engineer</a>
                    </span>
                    {/* <!-- Buttons --> */}
                    <div class="buttons-to-right">
                      <a
                        href="#"
                        class="button ripple-effect ico"
                        title="Mark as read"
                        data-tippy-placement="left"
                      >
                        <i class="icon-feather-check-square"></i>
                      </a>
                    </div>
                  </li>
                  <li>
                    <span class="notification-icon">
                      <i class="icon-material-outline-rate-review"></i>
                    </span>
                    <span class="notification-text">
                      <strong>David Peterson</strong> left you a{" "}
                      <span
                        class="star-rating no-stars"
                        data-rating="5.0"
                      ></span>{" "}
                      rating after finishing <a href="#">Logo Design</a> task
                    </span>
                    {/* <!-- Buttons --> */}
                    <div class="buttons-to-right">
                      <a
                        href="#"
                        class="button ripple-effect ico"
                        title="Mark as read"
                        data-tippy-placement="left"
                      >
                        <i class="icon-feather-check-square"></i>
                      </a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* <!-- Dashboard Box --> */}
          {/* <div class="col-xl-6">
            <div class="dashboard-box">
              <div class="headline">
                <h3>
                  <i class="icon-material-outline-assignment"></i> Orders
                </h3>
              </div>
              <div class="content">
                <ul class="dashboard-box-list">
                  <li>
                    <div class="invoice-list-item">
                      <strong>Professional Plan</strong>
                      <ul>
                        <li>
                          <span class="unpaid">Unpaid</span>
                        </li>
                        <li>Order: #326</li>
                        <li>Date: 12/08/2019</li>
                      </ul>
                    </div>
                    
                    <div class="buttons-to-right">
                      <a href="pages-checkout-page.html" class="button">
                        Finish Payment
                      </a>
                    </div>
                  </li>
                  <li>
                    <div class="invoice-list-item">
                      <strong>Professional Plan</strong>
                      <ul>
                        <li>
                          <span class="paid">Paid</span>
                        </li>
                        <li>Order: #264</li>
                        <li>Date: 10/07/2019</li>
                      </ul>
                    </div>
                  
                    <div class="buttons-to-right">
                      <a href="pages-invoice-template.html" class="button gray">
                        View Invoice
                      </a>
                    </div>
                  </li>
                  <li>
                    <div class="invoice-list-item">
                      <strong>Professional Plan</strong>
                      <ul>
                        <li>
                          <span class="paid">Paid</span>
                        </li>
                        <li>Order: #211</li>
                        <li>Date: 12/06/2019</li>
                      </ul>
                    </div>
                  
                    <div class="buttons-to-right">
                      <a href="pages-invoice-template.html" class="button gray">
                        View Invoice
                      </a>
                    </div>
                  </li>
                  <li>
                    <div class="invoice-list-item">
                      <strong>Professional Plan</strong>
                      <ul>
                        <li>
                          <span class="paid">Paid</span>
                        </li>
                        <li>Order: #179</li>
                        <li>Date: 06/05/2019</li>
                      </ul>
                    </div>
                   
                    <div class="buttons-to-right">
                      <a href="pages-invoice-template.html" class="button gray">
                        View Invoice
                      </a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div> */}
        </div>
        {/* <!-- Row / End --> */}

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
      {openNotePopup && (
        <AddNotePopup
          show={openNotePopup}
          handleClose={() => setOpenNotePopup(false)}
          handleSubmit={(data) => addNote(data)}
        />
      )}
      {/* <!-- Row / End --> */}

      {/* <!-- Row --> */}
      
    </div>
  );
}
export default DashboardMain;
