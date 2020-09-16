import React, { useEffect, useContext } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Orders from './pages/orders/Orders.component';
import { Grommet } from 'grommet';
import Login from './pages/Login/Login';
import OrdersKitchen from './pages/OrdersKitchen/OrdersKitchen.component';
import Dashboard from './pages/Dashboard/Dashboard.component';
import fire from './config/firebase';
import NotFound from './pages/404/PageNotFound.component';
import { MyContext } from "./contexts/context";
import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute.component';

// const theme = {
//   global: {
//     font: {
//       family: 'Roboto',
//       size: '14px',
//       height: '20px',
//     }
//   },
// };
function App() {
  const { setUser, state } = useContext(MyContext);

  useEffect(() => {
    const authObserver = () => {
      fire.auth().onAuthStateChanged((user) => {
        if(user) {
          setUser(true)
        } else {
          setUser(false);
        }
      })
    };
    authObserver();
  }, [setUser]);
  return (
    <Grommet plain >
      <BrowserRouter>
        {state.isLoggedIn && <Redirect to="/orders"  />}
        <Switch>
          <Route exact path="/" component={Login} />
          <ProtectedRoute exact path="/orders" component={Orders} />
          <ProtectedRoute exact path="/orders-kitchen" component={OrdersKitchen} />
          <ProtectedRoute exact path="/dashboard" component={Dashboard} />
          <ProtectedRoute path='*' component={NotFound}/>
        </Switch>
      </BrowserRouter>
    </Grommet>
  );
}

export default App;
