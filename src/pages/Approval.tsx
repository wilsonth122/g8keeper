import React from 'react';
import { IonContent, IonPage } from '@ionic/react';
import Header from "../components/Header";

const Approval: React.FC = () => {
  return (
    <IonPage>
      <Header/>
      <IonContent className="ion-padding">
        <p>Hello</p>
      </IonContent>
    </IonPage>
  );
};

export default Approval;
