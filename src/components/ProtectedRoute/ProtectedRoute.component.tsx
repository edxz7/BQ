import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import {MyContext} from '../../contexts/context';

type Props = {
  component: React.FC;
  [rest:string]: any;
}

export const ProtectedRoute: React.FC<Props> = props => {
  const context = useContext(MyContext);
    return context.state.isLoggedIn 
            ? (<Route  path={props.path}  exact={props.exact} component={props.component} />) 
            : (<Redirect  to="/"  />)
}