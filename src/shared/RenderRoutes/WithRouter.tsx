import * as React from 'react';
import {
    useLocation,
    useNavigate,
    useParams,
  } from "react-router-dom";
  
  const withRouter = <T,>(Component: React.ComponentType<T>) => {
    function ComponentWithRouterProp(props: Omit<T, "router">) {
      let location = useLocation();
      let navigate = useNavigate();
      let params = useParams();
      return (
        <Component
          router={{ location, navigate, params }}
          {...(props as T)}
        />
      );
    }
  
    return ComponentWithRouterProp;
  }

export default withRouter;