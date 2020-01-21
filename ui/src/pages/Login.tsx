import React, { useEffect, useState } from 'react';
import { IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonSpinner, IonImg } from '@ionic/react';
import { useAuth0 } from '../react-auth0-spa';
import history from '../utils/history';
import Loading from './Loading';

interface IProps {
  path?: string | string[]
}

const Login: React.FC<IProps> = (props: any) => {
  const [loggingIn, setLoggingIn] = useState(false)
  const { isInitializing, isAuthenticated, loginWithRedirect } = useAuth0()

  useEffect(() => {
    if(isAuthenticated) {
      history.push(props.path || "/")
    }
  }, [isAuthenticated, props.path])

  const login = async () => {
    try {
      setLoggingIn(true)

      await loginWithRedirect({
        appState: { targetUrl: props.path || "/" }
      });
    } 
    catch(error) {
      console.error(error)
    } 
    finally {
      setLoggingIn(false)
    }
  };

  if(isInitializing) {
    return (<Loading/>)
  }
  else {
    return (
      <IonContent>
          <IonCard>
              <IonCardHeader>
                  <IonCardTitle>Welcome to G8keeper</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                  <IonImg style={{width: "30%", margin: "auto"}} src={process.env.PUBLIC_URL + '/assets/banner.jpg'} />
                  <IonButton expand="block" 
                      onClick={login}
                      disabled={loggingIn ? true : false}>
                      {loggingIn ? (
                          <IonSpinner/>
                      ) : ( 
                          "Login" 
                      )}
                  </IonButton>
              </IonCardContent>
          </IonCard>
      </IonContent>
    )
  }
}

export default Login
