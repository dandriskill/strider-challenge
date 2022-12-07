import { useEffect } from 'react';
import { BrowserRouter } from "react-router-dom";
import { useAppStore, useOrderStore } from './store';
import Routes from './routes';

function App() {
  const appState = useAppStore();
  const orderState = useOrderStore();

  /* A good practice for fetches is to add them as a store handler
   * or build them into a client to abstract logic from the component.
   * If this is still here, I didn't have enough time.
   */
  useEffect(() => {
      if (appState.isLoading) {
        fetch('/content/receipts.json', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        })
          .then((response) => response.json())
          .then((data) => {
            orderState.setOrders(data || []);
            appState.setIsLoading(false);
          })
          .catch((error) => {
            console.error(error);
            appState.setIsLoading(false);
          });
      }
  }, [appState, orderState]);

  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
}

export default App;
