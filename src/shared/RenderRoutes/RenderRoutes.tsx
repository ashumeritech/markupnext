'use client'
import { observer } from "mobx-react-lite";
import AboutUs from "../../modules/MainSection/AboutUs";
import ContactUs from "../../modules/MainSection/ContactUs";
import Disclaimer from "../../modules/MainSection/Disclaimer";
import Posts from "../../modules/MainSection/Posts";
import PrivacyPolicy from "../../modules/MainSection/PrivacyPolicy";
import SinglePost from "../../modules/SinglePost/SinglePost";
import Layout from "../Layout/Layout";
import PageNotFound from "../PageNotFound/PageNotFound";

const RenderRoutes = () => {
  return (
    <></>
    // <Routes>
    //   {/* <Route path="/" element={<Layout Component={<Home />} />} /> */}
    //   <Route
    //     path="/"
    //     element={<Layout Component={<Posts className="posts" />} />}
    //   />
    //   <Route
    //     path="/:postTitle"
    //     element={<Layout Component={<SinglePost />} />}
    //   />
    //   <Route path="About-Us" element={<Layout Component={<AboutUs />} />} />
    //   <Route path="Contact-Us" element={<Layout Component={<ContactUs />} />} />
    //   <Route
    //     path="Disclaimer"
    //     element={<Layout Component={<Disclaimer />} />}
    //   />
    //   <Route
    //     path="privacy-policy"
    //     element={<Layout Component={<PrivacyPolicy />} />}
    //   />
    //   {/* <Route path="/addPost" element={<PageNotFound />} />
    //   <Route path="/addCategory" element={<PageNotFound />} />
    //   <Route path="/addTag" element={<PageNotFound />} />
    //   <Route path="/category" element={<PageNotFound />} />
    //   <Route path="/dashboard" element={<PageNotFound />} />
    //   <Route path="/allPosts" element={<PageNotFound />} />
    //   <Route path="/editPost" element={<PageNotFound />} />
    //   <Route path="/editCategory" element={<PageNotFound />} />
    //   <Route path="/editTag" element={<PageNotFound />} />
    //   <Route path="/allCategories" element={<PageNotFound />} />
    //   <Route path="/allTags" element={<PageNotFound />} />
    //   <Route path="/tag" element={<PageNotFound />} /> */}
    //   <Route path="/page-not-found" element={<PageNotFound />} />
    //   <Route path="*" element={<PageNotFound />} />
    // </Routes>
  );
};

export default observer(RenderRoutes);
