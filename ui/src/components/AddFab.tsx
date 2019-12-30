import React from 'react';
import {
  IonFab,
  IonFabButton,
  IonIcon
} from '@ionic/react';
import history from "../utils/history";
import { add } from 'ionicons/icons';

const AppFab: React.FC = () => {
    const onFabClick = () => {
        history.push("/request")
    }

    return (
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
            <IonFabButton onClick={onFabClick} disabled={false}>
                <IonIcon icon={add} />
            </IonFabButton>
        </IonFab>
    )
}

export default AppFab;