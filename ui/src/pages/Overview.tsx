import React, {useState, useEffect, useCallback} from 'react';
import { IonContent, IonCard, IonInfiniteScroll, IonInfiniteScrollContent, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonItem
} from '@ionic/react';
import axios from 'axios';
import history from '../utils/history';
import AddFab from '../components/AddFab';
import Loading from './Loading';
import { useAuth0 } from '../react-auth0-spa';

const Overview: React.FC = () => {
  const { user, isAuthenticated, getTokenSilently } = useAuth0();
  const [loading, setLoading] = useState<boolean>(true)
  const [items, setItems] = useState<string[]>([])
  const [disableInfiniteScroll, setDisableInfiniteScroll] = useState<boolean>(false)
  const url: string = 'https://dog.ceo/api/breeds/image/random/4'

  const fetchData = useCallback(async() => {
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
  }, [items])
  
  useEffect(() => {
    //fetchData()
    const login = async() => {
      try {
        const userUrl: string = process.env.REACT_APP_USER_URL || "";
        const token = await getTokenSilently();
        const header = { headers: {Authorization: `Bearer ${token}`} };
        const response = await axios.get("http://localhost:8080/api/user/login", header)
        const data = await response.data
          
        console.log(data)
      } catch (error) {
          console.log(error)
      }
    }

    login()
  }, []);

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