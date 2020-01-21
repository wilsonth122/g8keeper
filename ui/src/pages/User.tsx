import React, { useState } from 'react';
import { IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonItem, IonLabel, IonCheckbox, IonNote, IonListHeader, IonButton, IonSpinner, IonAlert } from '@ionic/react';
import history from '../utils/history';

const User: React.FC = () => {
    const [removingUser, setRemovingUser] = useState<boolean>(false)
    const [showWarning, setShowWarning] = useState<boolean>(false)

    const removeUser = () => {
        setRemovingUser(true)
        setShowWarning(true)
    }

    const deleteUser = () => {
        history.push("/")
    }

    return (
        <IonContent className="ion-padding">
            <IonCard>
                <IonCardHeader>
                    <IonCardTitle>Thomas Wilson</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                <IonList>
                    <IonListHeader>
                    <IonLabel>Priviledges</IonLabel>
                    </IonListHeader>
                    <IonItem>
                    <IonLabel>Viewer</IonLabel>
                    <IonCheckbox slot="start"/>
                    </IonItem>
                    <IonItem>
                    <IonLabel>Member</IonLabel>
                    <IonCheckbox slot="start"/>
                    </IonItem>
                    <IonItem>
                    <IonLabel>QA Approver</IonLabel>
                    <IonCheckbox slot="start"/>
                    </IonItem>
                    <IonItem>
                    <IonLabel>SRE Approver</IonLabel>
                    <IonCheckbox slot="start"/>
                    </IonItem>
                    <IonItem>
                    <IonLabel>Admin</IonLabel>
                    <IonCheckbox slot="start" checked={true}/>
                    </IonItem>
                </IonList>
                <IonButton color="danger"
                        expand="block" 
                        onClick={removeUser}
                        disabled={removingUser ? true : false}>
                        {removingUser ? (
                            <IonSpinner/>
                        ) : ( 
                            "Remove User" 
                        )}
                    </IonButton>
                </IonCardContent>
            </IonCard>

            <IonAlert
                isOpen={showWarning}
                onDidDismiss={() => {setShowWarning(false)}}
                header={'Delete Account'}
                message={'Are you sure you want to delete this account?'}
                buttons={[
                    {
                        text: 'No',
                        cssClass: 'secondary'
                    }, {
                        text: 'Yes',
                        handler: deleteUser
                    }
                ]}
            />
        </IonContent>
    );
};

export default User;
