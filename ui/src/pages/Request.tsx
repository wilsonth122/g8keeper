import React, { useState } from 'react'
import { IonInput, IonButton, IonContent, IonItem, IonLabel, IonText, IonItemGroup, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonSpinner, IonDatetime, IonTextarea, IonCheckbox } from '@ionic/react';

const Request: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [prLinks, setPRLinks] = useState("");
  const [storyLinks, setStoryLinks] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [releaseTime, setReleaseTime] = useState("");
  const [outageRequired, setOutageRequired] = useState(false);
  const [savingForm, setSavingForm] = useState(false);

  const onSubmit = (e: any) => {
    setSavingForm(true)

    // Format release date
    let date = new Date(releaseDate)
    let newReleaseDate = date.toLocaleDateString("en-GB", {weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'})
    
    // Format release time
    date = new Date(releaseTime)
    let newReleaseTime = date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    
    console.log(e)
   }

  return (
    <IonContent className="ion-padding">
      <IonCard>
          <IonCardHeader>
              <IonCardTitle>Change Request</IonCardTitle>
              <IonCardSubtitle>Fill in and submit this form to action a Change Request</IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>
            <form onSubmit={onSubmit}>
              <IonItem>
                <IonLabel position="floating">Title <IonText color="danger">*</IonText></IonLabel>
                <IonInput value={title} onIonChange={(e: CustomEvent) => {setTitle(e.detail.value)}}></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="floating">Description <IonText color="danger">*</IonText></IonLabel>
                <IonTextarea value={description} onIonChange={(e: CustomEvent) => {setDescription(e.detail.value)}}></IonTextarea>
              </IonItem>
              <IonItem>
                <IonLabel position="floating">Release Date <IonText color="danger">*</IonText></IonLabel>
                <IonDatetime value={releaseDate} displayFormat="DD MMM YYYY" onIonChange={(e: CustomEvent) => {setReleaseDate(e.detail.value)}}></IonDatetime>
              </IonItem>
              <IonItem>
                <IonLabel position="floating">Release Time <IonText color="danger">*</IonText></IonLabel>
                <IonDatetime value={releaseTime} displayFormat="HH:MM" onIonChange={(e: CustomEvent) => {setReleaseTime(e.detail.value)}}></IonDatetime>
              </IonItem>
              <IonItem>
                <IonLabel position="floating">Pull Request Link(s)</IonLabel>
                <IonInput value={prLinks} onIonChange={(e: CustomEvent) => {setPRLinks(e.detail.value)}}></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="floating">User Story Link(s)</IonLabel>
                <IonInput value={storyLinks} onIonChange={(e: CustomEvent) => {setStoryLinks(e.detail.value)}}></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel>Outage Required</IonLabel>
                <IonCheckbox checked={outageRequired} onIonChange={(e: CustomEvent) => {setOutageRequired(e.detail.value)}} slot="start"></IonCheckbox>
              </IonItem>
              <IonButton expand="block" 
                  type="submit"
                  disabled={savingForm ? true : false}>
                  {savingForm ? (
                      <IonSpinner/>
                  ) : ( 
                      "Save" 
                  )}
                  </IonButton>
            </form>
          </IonCardContent>
      </IonCard>
    </IonContent>
  );
};

export default Request;