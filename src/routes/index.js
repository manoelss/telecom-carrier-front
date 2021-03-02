import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAvailableNumber } from "../store/ducks/availableNumbers";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import AvailableNumbers from "../pages/AvailableNumbers";
import EditNumber from "../pages/EditNumber";
import NotFound from "../pages/NotFound";

const App = () => {
  // Getting initial fake data only once, if there's no data on store.
  const availableNumbersCount = useSelector((state) => state.availableNumbers.availableNumberListCount);
  const dispatch = useDispatch();

  if (availableNumbersCount < 1) {
    fetch('data.json',
      {
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    )
    .then(response => {
      response.json()
        .then(data => {
          dispatch(getAvailableNumber(data));
          console.log("dispatch");
        });
    });
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/available-numbers" component={AvailableNumbers} />
        <Route exact path="/available-numbers/add">
          <EditNumber action="add" />
        </Route>
        <Route exact path="/available-numbers/edit">
          <EditNumber action="edit" />
        </Route>
        <Route path="*" component={NotFound} />
      </Switch>
    </BrowserRouter>
  )
}

export default App;