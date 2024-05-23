import companyLogo2 from "../utils/images/company-logo-02.png";
import companyLogo4 from "../utils/images/company-logo-04.png";
import companyLogo5 from "../utils/images/company-logo-05.png";
import userAvatarBig2 from "../utils/images/user-avatar-big-02.jpg";
import userAvatarPlaceholder from "../utils/images/user-avatar-placeholder.png";
import de from "../utils/images/flags/de.svg";
import pl from "../utils/images/flags/pl.svg";
function DashboardBookmarks () {
    return (
        <div class="dashboard-content-container" data-simplebar>
		<div class="dashboard-content-inner" >
			
			{/* <!-- Dashboard Headline --> */}
			<div class="dashboard-headline">
				<h3>Bookmarks</h3>

				{/* <!-- Breadcrumbs --> */}
				<nav id="breadcrumbs" class="dark">
					<ul>
						<li><a href="#">Home</a></li>
						<li><a href="#">Dashboard</a></li>
						<li>Bookmarks</li>
					</ul>
				</nav>
			</div>
	
			{/* <!-- Row --> */}
			<div class="row">

				{/* <!-- Dashboard Box --> */}
				<div class="col-xl-12">
					<div class="dashboard-box margin-top-0">

						{/* <!-- Headline --> */}
						<div class="headline">
							<h3><i class="icon-material-outline-business-center"></i> Bookmarked Jobs</h3>
						</div>

						<div class="content">
							<ul class="dashboard-box-list">
								<li>
									{/* <!-- Job Listing --> */}
									<div class="job-listing">

										{/* <!-- Job Listing Details --> */}
										<div class="job-listing-details">

											{/* <!-- Logo --> */}
											<a href="#" class="job-listing-company-logo">
												<img src={companyLogo2} alt="" />
											</a>

											{/* <!-- Details --> */}
											<div class="job-listing-description">
												<h3 class="job-listing-title"><a href="#">Barista and Cashier</a></h3>

												{/* <!-- Job Listing Footer --> */}
												<div class="job-listing-footer">
													<ul>
														<li><i class="icon-material-outline-business"></i> Coffee</li>
														<li><i class="icon-material-outline-location-on"></i> San Francisco</li>
														<li><i class="icon-material-outline-business-center"></i> Full Time</li>
														<li><i class="icon-material-outline-access-time"></i> 2 days ago</li>
													</ul>
												</div>
											</div>
										</div>
									</div>
									{/* <!-- Buttons --> */}
									<div class="buttons-to-right">
										<a href="#" class="button red ripple-effect ico" title="Remove" data-tippy-placement="left"><i class="icon-feather-trash-2"></i></a>
									</div>
								</li>

								<li>
									{/* <!-- Job Listing --> */}
									<div class="job-listing">

										{/* <!-- Job Listing Details --> */}
										<div class="job-listing-details">

											{/* <!-- Logo --> */}
											<a href="#" class="job-listing-company-logo">
												<img src={companyLogo4} alt="" />
											</a>


											{/* <!-- Details --> */}
											<div class="job-listing-description">
												<h3 class="job-listing-title"><a href="#">Administrative Assistant</a></h3>

												{/* <!-- Job Listing Footer --> */}
												<div class="job-listing-footer">
													<ul>
														<li><i class="icon-material-outline-business"></i> Mates</li>
														<li><i class="icon-material-outline-location-on"></i> San Francisco</li>
														<li><i class="icon-material-outline-business-center"></i> Full Time</li>
														<li><i class="icon-material-outline-access-time"></i> 2 days ago</li>
													</ul>
												</div>
											</div>

										</div>
									</div>

									{/* <!-- Buttons --> */}
									<div class="buttons-to-right">
										<a href="#" class="button red ripple-effect ico" title="Remove" data-tippy-placement="left"><i class="icon-feather-trash-2"></i></a>
									</div>
								</li>

								<li>
									{/* <!-- Job Listing --> */}
									<div class="job-listing">

										{/* <!-- Job Listing Details --> */}
										<div class="job-listing-details">

											{/* <!-- Logo --> */}
											<a href="#" class="job-listing-company-logo">
												<img src={companyLogo5} alt="" />
											</a>

											{/* <!-- Details --> */}
											<div class="job-listing-description">
												<h3 class="job-listing-title"><a href="#">Construction Labourers</a></h3>

												{/* <!-- Job Listing Footer --> */}
												<div class="job-listing-footer">
													<ul>
														<li><i class="icon-material-outline-business"></i> Podous</li>
														<li><i class="icon-material-outline-location-on"></i> San Francisco</li>
														<li><i class="icon-material-outline-business-center"></i> Full Time</li>
														<li><i class="icon-material-outline-access-time"></i> 2 days ago</li>
													</ul>
												</div>
											</div>
										</div>
									</div>

									{/* <!-- Buttons --> */}
									<div class="buttons-to-right">
										<a href="#" class="button red ripple-effect ico" title="Remove" data-tippy-placement="left"><i class="icon-feather-trash-2"></i></a>
									</div>
								</li>

							</ul>
						</div>
					</div>
				</div>

				{/* <!-- Dashboard Box --> */}
				<div class="col-xl-12">
					<div class="dashboard-box">

						{/* <!-- Headline --> */}
						<div class="headline">
							<h3><i class="icon-material-outline-face"></i> Bookmarked Freelancers</h3>
						</div>

						<div class="content">
							<ul class="dashboard-box-list">
								<li>
									{/* <!-- Overview --> */}
									<div class="freelancer-overview">
										<div class="freelancer-overview-inner">

											{/* <!-- Avatar --> */}
											<div class="freelancer-avatar">
												<div class="verified-badge"></div>
												<a href="#"><img src={userAvatarBig2} alt="" /></a>
											</div>

											{/* <!-- Name --> */}
											<div class="freelancer-name">
												<h4><a href="#">David Peterson <img class="flag" src={de} alt="" title="Germany" data-tippy-placement="top" /></a></h4>
												<span>iOS Expert + Node Dev</span>
												{/* <!-- Rating --> */}
												<div class="freelancer-rating">
													<div class="star-rating" data-rating="4.2"></div>
												</div>
											</div>
										</div>
									</div>

									{/* <!-- Buttons --> */}
									<div class="buttons-to-right">
										<a href="#" class="button red ripple-effect ico" title="Remove" data-tippy-placement="left"><i class="icon-feather-trash-2"></i></a>
									</div>
								</li>
								<li>
									{/* <!-- Overview --> */}
									<div class="freelancer-overview">
										<div class="freelancer-overview-inner">
											
											{/* <!-- Avatar --> */}
											<div class="freelancer-avatar">
												<a href="#"><img src={userAvatarPlaceholder} alt="" /></a>
											</div>

											{/* <!-- Name --> */}
											<div class="freelancer-name">
												<h4><a href="#">Marcin Kowalski <img class="flag" src={pl} alt="" title="Poland" data-tippy-placement="top" /></a></h4>
												<span>Front-End Developer</span>
												{/* <!-- Rating --> */}
												<div class="freelancer-rating">
													<div class="star-rating" data-rating="4.7"></div>
												</div>
											</div>
										</div>
									</div>

									{/* <!-- Buttons --> */}
									<div class="buttons-to-right">
										<a href="#" class="button red ripple-effect ico" title="Remove" data-tippy-placement="left"><i class="icon-feather-trash-2"></i></a>
									</div>
								</li>
							</ul>
						</div>
					</div>
				</div>

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
	</div>
    )
}
export default DashboardBookmarks;