import React from 'react';
import { IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/react';
import BackButton from '../components/BackButton';

const Request: React.FC = () => {
  return (
    <IonContent className="ion-padding">
        <IonCard>
            <IonCardHeader>
                <IonCardTitle>Request</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
                Hello Request
            </IonCardContent>
        </IonCard>
        <BackButton/>
    </IonContent>
  );
};

export default Request;
