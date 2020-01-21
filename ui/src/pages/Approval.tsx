import React, { useState } from 'react';
import { IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonLabel, IonItem, IonAlert, IonText, IonInput, IonTextarea, IonDatetime, IonCheckbox, IonButton, IonSpinner } from '@ionic/react';
import history from '../utils/history';

const Approval: React.FC = () => {
  const [approving, setApproving] = useState<boolean>(false)
  const [showApproval, setShowApproval] = useState<boolean>(false)

  const approve = () => {
    setApproving(true)
    setShowApproval(true)
  }

  const approveRequest = () => {
    history.push("/")
  }

  return (
    <IonContent className="ion-padding">
        <IonCard>
            <IonCardHeader>
                <IonCardTitle>Approve Change Request</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonItem>
                <IonLabel position="floating">Title <IonText color="danger">*</IonText></IonLabel>
                <IonInput value={"Rate Limiting"} readonly={true}></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="floating">Description <IonText color="danger">*</IonText></IonLabel>
                <IonTextarea value={"This is a change to introduce rate limiting to prod only..."} readonly={true}></IonTextarea>
              </IonItem>
              <IonItem>
                <IonLabel position="floating">Release Date <IonText color="danger">*</IonText></IonLabel>
                <IonDatetime value={"28 Jan 2020"} displayFormat="DD MMM YYYY" readonly={true}></IonDatetime>
              </IonItem>
              <IonItem>
                <IonLabel position="floating">Release Time <IonText color="danger">*</IonText></IonLabel>
                <IonDatetime value={"10:00:00"} displayFormat="HH:MM" readonly={true}></IonDatetime>
              </IonItem>
              <IonItem>
                <IonLabel position="floating">Pull Request Link(s)</IonLabel>
                <IonInput value={"https://github.com/sendsei/pr/1"} readonly={true}></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="floating">User Story Link(s)</IonLabel>
                <IonInput value={"https://pivotal.tracker.com/6943729"} readonly={true}></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel>Outage Required</IonLabel>
                <IonCheckbox checked={false} slot="start"></IonCheckbox>
              </IonItem>
              <IonButton expand="block" 
                      onClick={approve}
                      disabled={approving ? true : false}>
                      {showApproval ? (
                          <IonSpinner/>
                      ) : ( 
                          "Approve" 
                      )}
                  </IonButton>
            </IonCardContent>
        </IonCard>

        <IonAlert
                isOpen={showApproval}
                onDidDismiss={() => {setShowApproval(false)}}
                header={'Approve'}
                message={'Approve this Change Request?'}
                buttons={[
                    {
                        text: 'No',
                        cssClass: 'secondary'
                    }, {
                        text: 'Yes',
                        handler: approveRequest
                    }
                ]}
            />
    </IonContent>
  );
};

export default Approval;
