import React from 'react';
import { IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/react';
import BackButton from '../components/BackButton';

const Settings: React.FC = () => {
  return (
    <IonContent className="ion-padding">
        <IonCard>
            <IonCardHeader>
                <IonCardTitle>Settings</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
                Hello Settings
            </IonCardContent>
        </IonCard>
        <BackButton/>
    </IonContent>
  );
};

export default Settings;
