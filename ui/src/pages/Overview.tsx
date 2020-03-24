import React, {useState, useEffect, useCallback} from 'react';
import { IonContent, IonCard, IonInfiniteScroll, IonInfiniteScrollContent, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonItem, IonChip, IonSelect, IonSelectOption, IonLabel, IonListHeader
} from '@ionic/react';
import axios from 'axios';
import history from '../utils/history';
import AddFab from '../components/AddFab';
import Loading from './Loading';
import { useAuth0 } from '../react-auth0-spa';
import RFCItem from '../components/RFCItem';
import { RFC } from '../model/RFC';
import Filter from '../components/Filter';
import FilterList from '../components/FilterList';

const Overview: React.FC = () => {
  const { getTokenSilently } = useAuth0();
  const [loading, setLoading] = useState<boolean>(true)
  const [rfcs, setRFCs] = useState<RFC[]>([])
  const [disableInfiniteScroll, setDisableInfiniteScroll] = useState<boolean>(false)
  const rfcURL: string = process.env.REACT_APP_RFC_URL || ""

  const fetchRFCs = useCallback(async() => {
    // try {
    //   const token = await getTokenSilently();
    //   const header = { headers: {Authorization: `Bearer ${token}`} };
    //   const response = await axios.get(rfcURL, header)
    //   //const data: RFC = await response.data
      
      
    //   console.log(data)
    //   console.log(data.title)
    //   console.log(data.outageRequired)
    //   setLoading(false)
    // } catch (error) {
    //     console.log(error)
    //     setLoading(false)
    // }

    let data: RFC = {"id":"","ownerID":"","status":0,"title":"","description":"","releaseDate":"","releaseTime":"","pullRequestLinks":false,"userStoryLinks":"","outageRequired":false}
    let rfcArr = [data]
    setRFCs(rfcArr)
    setLoading(false)
  }, [rfcs])
  
  useEffect(() => {
    fetchRFCs()
  }, []);

  const approve = () => {
    history.push("/approval")
  }

  const searchNext = ($event: CustomEvent<void>) => {
    fetchRFCs();

    ($event.target as HTMLIonInfiniteScrollElement).complete();
  }

  if(loading) {
    return (<Loading/>)
  }
  else {
    return (
      <IonContent>
        <IonCard>
          <IonCardHeader>
              <IonCardTitle>Change Requests</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            
            <IonList>
              <IonListHeader>
                <FilterList/>
              </IonListHeader>
              {rfcs.map((rfc: RFC, key: number) => {
                return <RFCItem rfc={rfc} key={key} />
              })}
            </IonList>

            <IonInfiniteScroll disabled={disableInfiniteScroll} onIonInfinite={(e: CustomEvent<void>) => searchNext(e)}>
              <IonInfiniteScrollContent
                  loadingText="Loading more good doggos...">
              </IonInfiniteScrollContent>
            </IonInfiniteScroll>
          </IonCardContent>
        </IonCard>
        <AddFab/>
      </IonContent>
    )
  }
}

export default Overview