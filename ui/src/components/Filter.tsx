import React, { useState } from "react";
import { IonLabel, IonChip, IonIcon } from "@ionic/react";
import { closeCircle, eyeOffOutline } from "ionicons/icons";

interface IProps {
    id: number,
    label: string,
    color: string,
    active: boolean,
    onClick: any
}

const Filter: React.FC<IProps> = (props) => {
    const [active, setActive] = useState(props.active);

    const handleClick = () => {
        setActive(!active)
        props.onClick(props.id)
    }

    return (
        <IonChip color={active ? props.color : "medium"} outline={active} onClick={handleClick}>
            
            <IonLabel>{props.label}</IonLabel>
            <IonIcon icon={active ? closeCircle : eyeOffOutline} />
        </IonChip>
    )
};

export default Filter;