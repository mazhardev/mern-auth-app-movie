import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../auth/Login';
import LoginUser from '../auth/LoginUser';
import Register from '../auth/Register';
import Alert from '../layout/Alert';
import NotFound from '../layout/NotFound';
import AddMovie from '../movie/AddMovie';
import Users from '../users/users';
import EditMovie from '../movie/EditMovie';
import MovieList from '../movie/MovieList';
import PrivateRoute from '../routing/PrivateRoute';

const Routes = (props) => {
  return (
    <section className="container">
      <Alert />
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/add-movie" component={AddMovie} />
        <PrivateRoute exact path="/list" component={MovieList} />
        <PrivateRoute exact path="/edit-movie/:_id" component={EditMovie} />
        <PrivateRoute exact path="/users" component={Users} />

        <Route exact path="/login-user" component={LoginUser} />
        <Route exact path="/register" component={Register} />

        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
