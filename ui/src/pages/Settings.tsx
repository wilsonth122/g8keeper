import React from 'react';
import { IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonItem, IonLabel, IonAvatar, IonCheckbox, IonNote, IonListHeader } from '@ionic/react';
import history from '../utils/history';

const Settings: React.FC = () => {
  const viewUser = () => {
    history.push("/user")
  }

  return (
    <IonContent className="ion-padding">
        <IonCard>
            <IonCardHeader>
                <IonCardTitle>Settings</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonList>
                <IonListHeader>
                  <IonLabel>Users</IonLabel>
                </IonListHeader>
                <IonItem onClick={viewUser} style={{cursor: "pointer"}}>
                  <IonAvatar slot="start">
                    <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
                  </IonAvatar>
                  <IonLabel>Thomas</IonLabel>
                  <IonNote slot="end">Admin</IonNote>
                </IonItem>
                <IonItem onClick={viewUser} style={{cursor: "pointer"}}>
                  <IonAvatar slot="start">
                    <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
                  </IonAvatar>
                  <IonLabel>Vinil</IonLabel>
                  <IonNote slot="end">QA Approver</IonNote>
                </IonItem>
                <IonItem onClick={viewUser} style={{cursor: "pointer"}}>
                  <IonAvatar slot="start">
                    <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
                  </IonAvatar>
                  <IonLabel>Sam</IonLabel>
                  <IonNote slot="end">Member</IonNote>
                </IonItem>
                <IonItem onClick={viewUser} style={{cursor: "pointer"}}>
                <IonAvatar slot="start">
                    <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
                  </IonAvatar>
                  <IonLabel>Richard</IonLabel>
                  <IonNote slot="end">SRE Approver</IonNote>
                </IonItem>
                <IonItem onClick={viewUser} style={{cursor: "pointer"}}>
                  <IonAvatar slot="start">
                    <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
                  </IonAvatar>
                  <IonLabel>Andrew</IonLabel>
                  <IonNote slot="end">Viewer</IonNote>
                </IonItem>
              </IonList>
            </IonCardContent>
        </IonCard>
    </IonContent>
  );
};

export default Settings;
