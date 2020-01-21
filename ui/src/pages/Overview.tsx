import React, {useState, useEffect} from 'react';
import { IonContent, IonCard, IonInfiniteScroll, IonInfiniteScrollContent, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonItem
} from '@ionic/react';
import axios from 'axios';
import history from '../utils/history';
import AddFab from '../components/AddFab';
import Loading from './Loading';

const Overview: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [items, setItems] = useState<string[]>([])
  const [disableInfiniteScroll, setDisableInfiniteScroll] = useState<boolean>(false)
  const url: string = 'https://dog.ceo/api/breeds/image/random/4'

  useEffect(() => {
    fetchData()
  }, []);

  const fetchData = async() => {
    await axios.get(url)
      .then(response => {
          if (response && response.data.message && response.data.message.length > 0) {
            setItems([...items, ...response.data.message])
            setDisableInfiniteScroll(response.data.message.length < 4)
          } else {
            setDisableInfiniteScroll(true)
          }
      })
      .then(() => {
        setLoading(false)
      })
      .catch(error => console.error(error))
  }

  const approve = () => {
    history.push("/approval")
  }

  const searchNext = ($event: CustomEvent<void>) => {
    fetchData();

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
              {items.map((item: string, i: number) => {
                return <IonItem key={`${i}`} onClick={approve}>
                    <img style={{width: "25%", margin: "auto"}} src={item} alt="doggo"/>
                  </IonItem>
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