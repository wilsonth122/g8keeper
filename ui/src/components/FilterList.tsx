import React, { useState } from "react";
import { IonLabel } from "@ionic/react";
import Filter from "./Filter";
import { Statuses, Status } from "../model/RFC";

interface IProps {

}

const FilterList: React.FC<IProps> = (props) => {
    const [statuses] = useState<Array<Status>>(Statuses.sort((x, y) => { return (x.active === y.active)? 0 : x.active? -1 : 1; }))
    console.log(statuses)

    const handleClick = (id: number) => {
        // statuses[id].active = !statuses[id].activ
        // console.log(statuses)
    }

    return (
        <p>
            <IonLabel>Filter: </IonLabel>
            {statuses.map((status: Status) => {
                return <Filter label={status.label} color={status.color} active={status.active} id={status.id} onClick={handleClick}/>
              })}
        </p>
    )
};

export default FilterList;