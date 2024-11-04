/*
The value ofNODE_ENV is set automatically to development (when using npm start),
test (when using npm test) or production (when using npm build).
Thus, from the point of view of create-react-app, there are only three environments.
*/
import appConfig from "../../config.js";


const config = () => {
    const config: any = appConfig;
    return {
      ...config, ...process.env
    };
  };
  
  export default config;
  