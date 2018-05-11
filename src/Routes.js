import React from "react";
import { Route, Switch } from "react-router-dom";
import HomeContainer from "./containers/HomeContainer";
import SearchContainer from "./containers/SearchContainer";
import PostContainer from "./containers/PostContainer";
import ItemsContainer from "./containers/ItemsContainer";

export default () =>
  <Switch>
    <Route path="/" exact component={ HomeContainer } />
		<Route path="/search" exact component={ SearchContainer } />
		<Route path="/post" exact component={ PostContainer } />
		<Route path="/items" exact component={ ItemsContainer } />
  </Switch>;
