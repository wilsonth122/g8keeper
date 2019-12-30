import React from 'react';
import { IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/react';
import BackButton from '../components/BackButton';

const Approval: React.FC = () => {
  return (
    <IonContent className="ion-padding">
        <IonCard>
            <IonCardHeader>
                <IonCardTitle>Approval</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
                Hello Approval
            </IonCardContent>
        </IonCard>
        <BackButton/>
    </IonContent>
  );
};

export default Approval;
