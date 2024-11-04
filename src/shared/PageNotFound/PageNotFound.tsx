import Logo from "../../assets/Images/markuptag-logo-4.png";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

const PageNotFound = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <Header />
          <div className="not-found-page">
            <div className="container">
              <div className="row">
                <div className="col-lg-8 offset-lg-2">
                  <svg height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M480-420q-62.61 0-114.46 35.04-51.85 35.04-76.46 92.65h381.84q-24.61-57.61-76.46-92.65Q542.61-420 480-420Zm-169.54-68.46 44-42 42 42L430-522l-42-42 42-44-33.54-33.54-42 42-44-42L276.92-608l42 44-42 42 33.54 33.54Zm253.08 0 42-42 44 42L683.08-522l-42-42 42-44-33.54-33.54-44 42-42-42L530-608l42 44-42 42 33.54 33.54ZM480.07-100q-78.84 0-148.21-29.92t-120.68-81.21q-51.31-51.29-81.25-120.63Q100-401.1 100-479.93q0-78.84 29.92-148.21t81.21-120.68q51.29-51.31 120.63-81.25Q401.1-860 479.93-860q78.84 0 148.21 29.92t120.68 81.21q51.31 51.29 81.25 120.63Q860-558.9 860-480.07q0 78.84-29.92 148.21t-81.21 120.68q-51.29 51.31-120.63 81.25Q558.9-100 480.07-100ZM480-480Zm0 320q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Z" /></svg>
                  <h1>Page Not Found</h1>
                  <h2 className="h3 my-3">Sorry! We can't seem to find the resource you're looking for.</h2>
                  <p>Please check that the Website address is spelled correctly. You can also go to our <a href="https://www.markuptag.com/">home page</a> and use the menus or use search bar to navigate a specific page.</p>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
