import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import LeftSidebar from "../LeftSidebar/LeftSidebar";
import RightSidebar from "../RightSidebar/RightSidebar";

interface IProps {
    Component: React.JSX.Element
}

const Layout = (props: IProps) => {
    return <div>

        <Header />
        {/* <LeftSidebar /> */}
        {props.Component}
        <Footer />


    </div>
}

export default Layout;