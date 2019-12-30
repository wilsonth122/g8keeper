import React from 'react';
import { IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/react';
import AddFab from '../components/AddFab';

const Overview: React.FC = () => {
  return (
    <IonContent className="ion-padding">
        <IonCard>
            <IonCardHeader>
                <IonCardTitle>Overview</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
                Hello Overview
            </IonCardContent>
        </IonCard>
        <AddFab/>
    </IonContent>
  );
};

export default Overview;
