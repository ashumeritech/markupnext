import BusyGif from '../../assets/Images/busy.gif';
import './SpinnerLoader.css';

const SpinnerLoader = () => {
    return (
        <div className="loaderContainer">
            <div className="spinner-loader">
                <img src={BusyGif} alt="spinner-loader" />
            </div>
        </div>
    );
}

export default SpinnerLoader;