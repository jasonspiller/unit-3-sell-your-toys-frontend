import React from "react";
import { Route, Switch } from "react-router-dom";
import HomeContainer from "./containers/HomeContainer";
import SearchContainer from "./containers/SearchContainer";
import PostContainer from "./containers/PostContainer";
import UpdateContainer from "./containers/UpdateContainer";
import ItemsContainer from "./containers/ItemsContainer";
import ItemContainer from "./containers/ItemContainer";

export default () =>
  <Switch>
    <Route path="/" exact component={ HomeContainer } />
		<Route path="/search" exact component={ SearchContainer } />
		<Route path="/post" exact component={ PostContainer } />
		<Route path="/update/:itemId" exact component={ UpdateContainer } />
		<Route path="/items" exact component={ ItemsContainer } />
		<Route path="/items/:itemId" exact component={ ItemContainer } />
  </Switch>;
