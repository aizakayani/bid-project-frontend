import { useContext, useState } from "react";
import EditBidPopup from "./modals/EditBidPopup";
import { UserContext } from "../context/userContext";
import { getDeliveryTime, getTaskDetails } from "../utils/common";
import { deleteBidAPI, getBidsByUserAPI, updateBidAPI } from "../services/bids";
import toast from "react-hot-toast";

function DashboardMyActiveBids() {
  const { userBids, tasksList, setUserBids } = useContext(UserContext);
  const [openEditBidModal, setOpenEditBidModal] = useState(false);
  const [editBidData, setEditBidData] = useState(null);
  const handleDeleteBid = async (bidIdToDelete) => {
    try {
      const deleteBidResponse = await deleteBidAPI(bidIdToDelete);
      if (deleteBidResponse.success) {
        toast.success("Bid deleted successfully");
        await getBidsByUser();
      } else {
        toast.error("Failed to delete Bid");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete Bid");
    }
  };
  const getBidsByUser = async () => {
    try {
      const response = await getBidsByUserAPI();
      if (response?.success && response?.bids) {
        setUserBids(response?.bids);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEditBid = async (data) => {
    try {
      if (data?.bidRate.trim() === "") {
        toast.error("Please enter bid rate to Place a bid");
        return;
      }
      const payload = {
        bidRate: data.bidRate,
        deliveryTime: data.deliveryTime,
      };
      const response = await updateBidAPI(payload, editBidData._id);
      if (response?.success) {
        toast.success("Updated bid sent to employer");
        setOpenEditBidModal(false);
        setEditBidData(null);
        getBidsByUser();
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to place bid");
    }
  };
console.log({handleEditBid});
  return (
    <>
      <div class="dashboard-content-container" data-simplebar>
        <div class="dashboard-content-inner">
          {/* <!-- Dashboard Headline --> */}
          <div class="dashboard-headline">
            <h3>My Active Bids</h3>
          </div>

          {/* <!-- Row --> */}
          <div class="row">
            {/* <!-- Dashboard Box --> */}
            <div class="col-xl-12">
              <div class="dashboard-box margin-top-0">
                {/* <!-- Headline --> */}
                <div class="headline">
                  <h3>
                    <i class="icon-material-outline-gavel"></i> Bids List
                  </h3>
                </div>

                <div class="content">
                  <ul class="dashboard-box-list">
                    {userBids?.length > 0 &&
                      userBids?.map((bid) => {
                        const taskDetails = getTaskDetails(
                          bid?.taskId,
                          tasksList
                        );
                        return (
                          <li>
                            {/* <!-- Job Listing --> */}
                            <div class="job-listing width-adjustment">
                              {/* <!-- Job Listing Details --> */}
                              <div class="job-listing-details">
                                {/* <!-- Details --> */}
                                <div class="job-listing-description">
                                  <h3 class="job-listing-title">
                                    <a href="#">{taskDetails?.title}</a>
                                    {taskDetails?.acceptedBid === bid._id && (
                                      <span>{" (Bid Accepted)"}</span>
                                    )}
                                    {taskDetails?.acceptedBid &&
                                      taskDetails?.acceptedBid !== bid._id && (
                                        <span>{" (Another Bid Accepted)"}</span>
                                      )}
                                  </h3>
                                </div>
                              </div>
                            </div>

                            {/* <!-- Task Details --> */}
                            <ul class="dashboard-task-info">
                              <li>
                                <strong>{`$ ${bid.bidRate}`}</strong>
                                <span>Hourly Rate</span>
                              </li>
                              <li>
                                <strong>
                                  {getDeliveryTime(bid?.deliveryTime)}
                                </strong>
                                <span>Delivery Time</span>
                              </li>
                            </ul>

                            {/* <!-- Buttons --> */}
                            {taskDetails?.status === "new" && (
                              <div class="buttons-to-right always-visible">
                                <a
                                  href="#small-dialog"
                                  class="popup-with-zoom-anim button dark ripple-effect ico"
                                  title="Edit Bid"
                                  data-tippy-placement="top"
                                  onClick={() => {
                                    setEditBidData(bid);
                                    setOpenEditBidModal(true);
                                  }}
                                >
                                  <i class="icon-feather-edit"></i>
                                </a>
                                <a
                                  href="#"
                                  class="button red ripple-effect ico"
                                  title="Cancel Bid"
                                  data-tippy-placement="top"
                                  onClick={() => handleDeleteBid(bid._id)}
                                >
                                  <i class="icon-feather-trash-2"></i>
                                </a>
                              </div>
                            )}
                          </li>
                        );
                      })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- Row / End -->

			<!-- Footer --> */}
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
      {openEditBidModal && (
        <EditBidPopup
          handleClose={() => setOpenEditBidModal(false)}
          handleSubmit={(data) => {
            handleEditBid(data);
          }}
          show={openEditBidModal}
          editBidData={editBidData}
        />
      )}
    </>
  );
}
export default DashboardMyActiveBids;
