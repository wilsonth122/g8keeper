import React from 'react';
import { Router, Switch, Redirect } from "react-router-dom";
import { IonApp, IonPage } from '@ionic/react';
import history from "./utils/history";

import Overview from './pages/Overview';
import Request from './pages/Request';
import Approval from './pages/Approval';
import Settings from './pages/Settings';
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
import Header from './components/Header';

const App: React.FC = () => {
  return (
    <IonApp>
      <IonPage>
        <Header/>
        <Router history={history}>
          <Switch>
            <PrivateRoute exact path="/request" component={Request}/>
            <PrivateRoute exact path="/approval" component={Approval}/>
            <PrivateRoute exact path="/settings" component={Settings}/>
            <PrivateRoute exact path="/" component={Overview}/>
            <Redirect from="/*" to="/" />
          </Switch>
        </Router>
      </IonPage>
    </IonApp>
  )
};

export default App;
