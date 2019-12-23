import React, { useEffect } from "react";
import { Route, RouteProps } from "react-router-dom";
import { useAuth0 } from "../react-auth0-spa";

const PrivateRoute: React.FC<RouteProps> = ({ component: Component, path, ...rest }) => {
  const { isInitializing, isAuthenticated, loginWithRedirect } = useAuth0();

  useEffect(() => {
    if (isInitializing || isAuthenticated) {
      return;
    }

    const fn = async () => {
      await loginWithRedirect({
        appState: { targetUrl: path }
      });
    };

    fn();
  }, [isInitializing, isAuthenticated, loginWithRedirect, path]);
  
  const render = (props: any) =>
    (isAuthenticated === true && Component) ? <Component {...props} /> : null;

  return <Route path={path} render={render} {...rest} />;
};

export default PrivateRoute;