import "./RightSidebar.css";
import ads1 from "../../assets/Images/ads-1.png";
import ads2 from "../../assets/Images/ads-2.jpg";

const RightSidebar = () => {
  return (
    <aside id="right-sidebar">
      <img
        src={ads1}
        alt="logo"
        className="header-logo rounded-3 shadow border img-fluid mx-auto d-block mb-4"
      />
      <img
        src={ads2}
        alt="logo"
        className="header-logo rounded-3 shadow border img-fluid mx-auto d-block"
      />
    </aside>
  );
};

export default RightSidebar;
