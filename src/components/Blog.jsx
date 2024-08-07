import blog1a from "../utils/images/blog-01a.jpg";
import blog2a from "../utils/images/blog-02a.jpg";
import blog3a from "../utils/images/blog-03a.jpg";
import blog4a from "../utils/images/blog-04a.jpg";
import blog5a from "../utils/images/blog-05a.jpg";
import blog6a from "../utils/images/blog-06a.jpg";
import blog7a from "../utils/images/blog-07a.jpg";

function Blog() {
  return (
    <>
      {/* <!-- Content
================================================== --> */}
      <div id="titlebar" class="white margin-bottom-30">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <h2>Blog</h2>
              <span>Featured Posts</span>
              
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Recent Blog Posts --> */}
      <div class="section white padding-top-0 padding-bottom-60 full-width-carousel-fix">
        <div class="container">
          <div class="row">
            <div class="col-xl-12">
              <div class="blog-carousel">
                <a
                  href="pages-blog-post.html"
                  class="blog-compact-item-container"
                >
                  <div class="blog-compact-item">
                    <img src={blog4a} alt="" />
                    <span class="blog-item-tag">Tips</span>
                    <div class="blog-compact-item-content">
                      <ul class="blog-post-tags">
                        <li>20 May 2019</li>
                      </ul>
                      <h3>
                        5 Myths That Prevent Job Seekers from Overcoming Failure
                      </h3>
                      <p>
                        Distinctively reengineer revolutionary meta-services and
                        premium architectures intuitive opportunities.
                      </p>
                    </div>
                  </div>
                </a>

                <a
                  href="pages-blog-post.html"
                  class="blog-compact-item-container"
                >
                  <div class="blog-compact-item">
                    <img src={blog5a} alt="" />
                    <span class="blog-item-tag">Recruiting</span>
                    <div class="blog-compact-item-content">
                      <ul class="blog-post-tags">
                        <li>28 April 2019</li>
                      </ul>
                      <h3>12 Dog-Friendly Companies Hiring Now</h3>
                      <p>
                        Compellingly embrace empowered e-business after user
                        friendly intellectual capital. Interactively front-end.
                      </p>
                    </div>
                  </div>
                </a>

                <a
                  href="pages-blog-post.html"
                  class="blog-compact-item-container"
                >
                  <div class="blog-compact-item">
                    <img src={blog3a} alt="" />
                    <span class="blog-item-tag">Marketing</span>
                    <div class="blog-compact-item-content">
                      <ul class="blog-post-tags">
                        <li>10 June 2019</li>
                      </ul>
                      <h3>
                        11 Tips to Help You Get New Clients Through Cold Calling
                      </h3>
                      <p>
                        Compellingly embrace empowered e-business after user
                        friendly intellectual capital. Interactively front-end.
                      </p>
                    </div>
                  </div>
                </a>
                <a
                  href="pages-blog-post.html"
                  class="blog-compact-item-container"
                >
                  <div class="blog-compact-item">
                    <img src={blog6a} alt="" />
                    <span class="blog-item-tag">Recruiting</span>
                    <div class="blog-compact-item-content">
                      <ul class="blog-post-tags">
                        <li>9 June 2019</li>
                      </ul>
                      <h3>Follow Up On Job Application With This Template</h3>
                      <p>
                        Appropriately empower dynamic leadership skills after
                        business portals. Globally myocardinate interactive.
                      </p>
                    </div>
                  </div>
                </a>

                <a
                  href="pages-blog-post.html"
                  class="blog-compact-item-container"
                >
                  <div class="blog-compact-item">
                    <img src={blog7a} alt="" />
                    <span class="blog-item-tag">Recruiting</span>
                    <div class="blog-compact-item-content">
                      <ul class="blog-post-tags">
                        <li>3 June 2019</li>
                      </ul>
                      <h3>
                        What It Really Takes to Make $100k Before You Turn 30
                      </h3>
                      <p>
                        Appropriately empower dynamic leadership skills after
                        business portals. Globally myocardinate interactive.
                      </p>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Recent Blog Posts / End --> */}

      {/* <!-- Section --> */}
      <div class="section gray">
        <div class="container">
          <div class="row">
            <div class="col-xl-8 col-lg-8">
              {/* <!-- Section Headline --> */}
              <div class="section-headline margin-top-60 margin-bottom-35">
                <h4>Recent Posts</h4>
              </div>

              {/* <!-- Blog Post --> */}
              <a href="pages-blog-post.html" class="blog-post">
                {/* <!-- Blog Post Thumbnail --> */}
                <div class="blog-post-thumbnail">
                  <div class="blog-post-thumbnail-inner">
                    <span class="blog-item-tag">Tips</span>
                    <img src={blog1a} alt="" />
                  </div>
                </div>
                {/* <!-- Blog Post Content --> */}
                <div class="blog-post-content">
                  <span class="blog-post-date">22 July 2019</span>
                  <h3>16 Ridiculously Easy Ways to Find & Keep a Remote Job</h3>
                  <p>
                    Efficiently myocardinate market-driven innovation via
                    open-source alignments. Dramatically engage high-payoff
                    infomediaries rather than.{" "}
                  </p>
                </div>
                {/* <!-- Icon --> */}
                <div class="entry-icon"></div>
              </a>

              {/* <!-- Blog Post --> */}
              <a href="pages-blog-post.html" class="blog-post">
                {/* <!-- Blog Post Thumbnail --> */}
                <div class="blog-post-thumbnail">
                  <div class="blog-post-thumbnail-inner">
                    <span class="blog-item-tag">Recruiting</span>
                    <img src={blog2a} alt="" />
                  </div>
                </div>
                {/* <!-- Blog Post Content --> */}
                <div class="blog-post-content">
                  <span class="blog-post-date">29 June 2019</span>
                  <h3>How to "Woo" a Recruiter and Land Your Dream Job</h3>
                  <p>
                    Efficiently myocardinate market-driven innovation via
                    open-source alignments. Dramatically engage high-payoff
                    infomediaries rather than.{" "}
                  </p>
                </div>
              </a>

              {/* <!-- Blog Post --> */}
              <a href="pages-blog-post.html" class="blog-post">
                {/* <!-- Blog Post Thumbnail --> */}
                <div class="blog-post-thumbnail">
                  <div class="blog-post-thumbnail-inner">
                    <span class="blog-item-tag">Marketing</span>
                    <img src={blog3a} alt="" />
                  </div>
                </div>
                {/* <!-- Blog Post Content --> */}
                <div class="blog-post-content">
                  <span class="blog-post-date">10 June 2019</span>
                  <h3>
                    11 Tips to Help You Get New Clients Through Cold Calling
                  </h3>
                  <p>
                    Efficiently myocardinate market-driven innovation via
                    open-source alignments. Dramatically engage high-payoff
                    infomediaries rather than.{" "}
                  </p>
                </div>
              </a>

              {/* <!-- Blog Post --> */}
              <a href="pages-blog-post.html" class="blog-post">
                {/* <!-- Blog Post Thumbnail --> */}
                <div class="blog-post-thumbnail">
                  <div class="blog-post-thumbnail-inner">
                    <span class="blog-item-tag">Tips</span>
                    <img src={blog4a} alt="" />
                  </div>
                </div>
                {/* <!-- Blog Post Content --> */}
                <div class="blog-post-content">
                  <span class="blog-post-date">5 June 2019</span>
                  <h3>
                    5 Myths That Prevent Job Seekers from Overcoming Failure
                  </h3>
                  <p>
                    Efficiently myocardinate market-driven innovation via
                    open-source alignments. Dramatically engage high-payoff
                    infomediaries rather than.{" "}
                  </p>
                </div>
              </a>

              {/* <!-- Pagination --> */}
              {/* <div class="clearfix"></div>
              <div class="row">
                <div class="col-md-12">
                 
                  <div class="ation-container margin-top-10 margin-bottom-20">
                    <nav class="pagination">
                      <ul>
                        <li>
                          <a href="#" class="current-page ripple-effect">
                            1
                          </a>
                        </li>
                        <li>
                          <a href="#" class="ripple-effect">
                            2
                          </a>
                        </li>
                        <li>
                          <a href="#" class="ripple-effect">
                            3
                          </a>
                        </li>
                        <li class="pagination-arrow">
                          <a href="#" class="ripple-effect">
                            <i class="icon-material-outline-keyboard-arrow-right"></i>
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div> */}
              {/* <!-- Pagination / End --> */}
            </div>

            <div class="col-xl-4 col-lg-4 content-left-offset">
              <div class="sidebar-container margin-top-65">
                {/* <!-- Location --> */}
                <div class="sidebar-widget margin-bottom-40">
                  <div class="input-with-icon">
                    <input
                      id="autocomplete-input"
                      type="text"
                      placeholder="Search"
                    />
                    <i class="icon-material-outline-search"></i>
                  </div>
                </div>

                {/* <!-- Widget --> */}
                <div class="sidebar-widget">
                  <h3>Trending Posts</h3>
                  <ul class="widget-tabs">
                    {/* <!-- Post #1 --> */}
                    <li>
                      <a
                        href="pages-blog-post.html"
                        class="widget-content active"
                      >
                        <img src={blog2a} alt="" />
                        <div class="widget-text">
                          <h5>
                            How to "Woo" a Recruiter and Land Your Dream Job
                          </h5>
                          <span>29 June 2019</span>
                        </div>
                      </a>
                    </li>

                    {/* <!-- Post #2 --> */}
                    <li>
                      <a href="pages-blog-post.html" class="widget-content">
                        <img src={blog7a} alt="" />
                        <div class="widget-text">
                          <h5>
                            What It Really Takes to Make $100k Before You Turn
                            30
                          </h5>
                          <span>3 June 2019</span>
                        </div>
                      </a>
                    </li>
                    {/* <!-- Post #3 --> */}
                    <li>
                      <a href="pages-blog-post.html" class="widget-content">
                        <img src={blog4a} alt="" />
                        <div class="widget-text">
                          <h5>
                            5 Myths That Prevent Job Seekers from Overcoming
                            Failure
                          </h5>
                          <span>5 June 2019</span>
                        </div>
                      </a>
                    </li>
                  </ul>
                </div>
                {/* <!-- Widget / End--> */}

                {/* <!-- Widget --> */}
                <div class="sidebar-widget">
                  <h3>Social Profiles</h3>
                  <div class="freelancer-socials margin-top-25">
                    <ul>
                      <li>
                        <a href="#" title="Dribbble" data-tippy-placement="top">
                          <i class="icon-brand-dribbble"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#" title="Twitter" data-tippy-placement="top">
                          <i class="icon-brand-twitter"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#" title="Behance" data-tippy-placement="top">
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
                </div>

                {/* <!-- Widget --> */}
                <div class="sidebar-widget">
                  <h3>Tags</h3>
                  <div class="task-tags">
                    <a href="#">
                      <span>employer</span>
                    </a>
                    <a href="#">
                      <span>recruiting</span>
                    </a>
                    <a href="#">
                      <span>work</span>
                    </a>
                    <a href="#">
                      <span>salary</span>
                    </a>
                    <a href="#">
                      <span>tips</span>
                    </a>
                    <a href="#">
                      <span>income</span>
                    </a>
                    <a href="#">
                      <span>application</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- Spacer --> */}
        <div class="padding-top-40"></div>
        {/* <!-- Spacer --> */}
      </div>
      {/* <!-- Section / End --> */}
    </>
  );
}
export default Blog;
