import React from "react";
import { useAuth0 } from "../react-auth0-spa";
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonChip, IonAvatar, IonLabel } from "@ionic/react";

const Header: React.FC = () => {
    const { user, logout } = useAuth0();

    const onLogoutClick = async () => {
        await logout()
    }

    return (
        <IonHeader>
            <IonToolbar>
                <IonTitle>G8keeper</IonTitle>
                <IonButtons slot="end">
                    <IonChip color="primary" onClick={onLogoutClick}>
                    <IonAvatar><img src={user && user.picture} alt="profile"/></IonAvatar>
                    <IonLabel>{user && user.name}</IonLabel>
                    </IonChip>
                </IonButtons>
            </IonToolbar>
        </IonHeader>
    )
};

export default Header;