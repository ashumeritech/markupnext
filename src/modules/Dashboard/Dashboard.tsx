
import DashboardHeader from "../../shared/DashboardHeader/DashboardHeader";
import DashboardLeftSidebar from "../../shared/DashboardLeftSidebar/DashboardLeftSidebar";
import './Dashboard.module.css';


const Dashboard = () => {
    const pathName = window.location.pathname;

    return <>

        <DashboardHeader />
        <DashboardLeftSidebar />
        <div id="dashboard">             
            <div className="row">
                <div className="col-md-12">
                    {pathName === '/dashboard' && <div className="container">
                        Dashboard Page
                    </div>}
                </div>
            </div>

        </div>        
    </>
}

export default Dashboard;