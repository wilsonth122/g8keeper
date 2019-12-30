import React, { useState } from "react";
import { useAuth0 } from "../react-auth0-spa";
import history from "../utils/history"
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonAvatar, IonItem } from "@ionic/react";
import UserPopover from "./UserPopover";

const Header: React.FC = () => {
    const { user, isAuthenticated } = useAuth0();
    const [popoverEvent, setPopoverEvent] = useState();

    const onTitleClick = () => {
        history.push("/")
    }

    const onAvatarClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        setPopoverEvent(e.nativeEvent)
    }

    return (
        <IonHeader>
            <IonToolbar color="primary">
                <IonTitle onClick={onTitleClick} style={{cursor: "pointer"}}>G8keeper</IonTitle>
                { isAuthenticated &&
                    <IonButtons slot="end">
                        <IonItem onClick={onAvatarClick} style={{cursor: "pointer"}} lines="none" color="primary">
                            <IonAvatar><img src={user && user.picture} alt="profile"/></IonAvatar>
                        </IonItem>
                    </IonButtons>
                }
            </IonToolbar>
            <UserPopover event={popoverEvent} />
        </IonHeader>
    )
};

export default Header;