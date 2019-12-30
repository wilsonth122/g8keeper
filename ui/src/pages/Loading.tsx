import React from 'react';
import { IonContent, IonSpinner, IonText } from '@ionic/react';

const Loading: React.FC = () => {
  return (
    <IonContent className="ion-padding" style={{width: "100%", height: "100%", textAlign: "center", margin: "auto"}}>
        <IonSpinner color="primary" style={{width: "15%", height: "15%"}}/>
        <IonText ><h2>Loading...</h2></IonText>
    </IonContent>
  );
};

export default Loading;
