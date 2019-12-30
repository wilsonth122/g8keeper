import React from 'react';
import {
  IonFab,
  IonButton,
  IonLabel
} from '@ionic/react';
import history from "../utils/history";

const BackButton: React.FC = () => { 
    const onButtonClick = () => {
        history.goBack();
    }

    return (
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
            <IonButton onClick={onButtonClick}>
                <IonLabel>Back</IonLabel>
            </IonButton>
        </IonFab>
    )
}

export default BackButton;