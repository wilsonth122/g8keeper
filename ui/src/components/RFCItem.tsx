import React from "react";
import { IonItem, IonLabel, IonChip } from "@ionic/react";
import { RFC } from "../model/RFC";

interface IProps {
    key: number
    rfc: RFC
}

const RFCItem: React.FC<IProps> = (props) => {
    const handleClick = () => {

    }

    return (
        <IonItem key={`${props.key}`} onClick={handleClick}>
            <IonLabel>
                <h2>{props.rfc.title}</h2>
                <p>{props.rfc.description}</p>
            </IonLabel>
            <IonChip color="primary">{props.rfc.status}</IonChip>
      </IonItem>
    )
};

export default RFCItem;