import React from 'react';
import { Router, Switch, Route } from "react-router-dom";
import { IonApp } from '@ionic/react';
import { useAuth0 } from "./react-auth0-spa";
import history from "./utils/history";

import Home from './pages/Home';
import PrivateRoute from './components/PrivateRoute';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

const App: React.FC = () => {
  const { isInitializing, isAuthenticated } = useAuth0();
  
  console.log(isInitializing + ", " + isAuthenticated)
  return (
    <IonApp>
      <Router history={history}>
        <Switch>
          <PrivateRoute path="/" component={Home}/>
        </Switch>
      </Router>
    </IonApp>
  )
};

export default App;
