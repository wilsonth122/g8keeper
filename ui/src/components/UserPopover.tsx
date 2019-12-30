import React, { useState, useEffect } from 'react';
import { IonPopover, IonList, IonListHeader, IonLabel, IonItem, IonIcon, IonAvatar } from '@ionic/react';
import { settings, logOut } from 'ionicons/icons';
import { useAuth0 } from '../react-auth0-spa';
import history from "../utils/history";

interface IProps {
    event: Event | undefined
}

const UserPopover: React.FC<IProps> = (props) => {
    const { user, logout } = useAuth0();
    const [showPopover, setShowPopover] = useState(false);

    const onDidDismiss = () => {
        setShowPopover(false)
    }

    const onSettingsClick = () => {
        setShowPopover(false)
        history.push("/settings")
    }

    const onLogoutClick = () => {
        setShowPopover(false)
        logout()
    }

    useEffect(() => {
        if(props.event) {
            setShowPopover(true)
        }
    }, [props.event])

    return (
        <IonPopover
            isOpen={showPopover}
            event={props.event}
            onDidDismiss={onDidDismiss}
        >
            <IonList no-padding no-margin>
                <IonListHeader>
                    <IonItem lines="none">
                        <IonAvatar slot="start"><img src={user && user.picture} alt="profile"/></IonAvatar>
                        <IonLabel>{(user && user.name) || "Welcome"}</IonLabel>
                    </IonItem>
                </IonListHeader>
                <IonItem button={true} lines="none" onClick={onSettingsClick}>
                    <IonIcon icon={settings} slot="start"/>
                    <IonLabel>Settings</IonLabel>
                </IonItem>
                <IonItem button={true} lines="none" onClick={onLogoutClick}>
                    <IonIcon icon={logOut} slot="start" color="danger"/>
                    <IonLabel color="danger">Logout</IonLabel>
                </IonItem>
            </IonList>
        </IonPopover>
    );
};

export default UserPopover;