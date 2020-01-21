import React from "react";
import { Route, RouteProps } from "react-router-dom";
import { useAuth0 } from "../react-auth0-spa";
import Login from "../pages/Login";

const PrivateRoute: React.FC<RouteProps> = ({ component: Component, path, ...rest }) => {
  const { isAuthenticated } = useAuth0();
  
  const render = (props: any) =>
    (isAuthenticated === true && Component) ? <Component {...props} /> : <Login path={path} />;

  return <Route path={path} render={render} {...rest} />;
};

export default PrivateRoute;