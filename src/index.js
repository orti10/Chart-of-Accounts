import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import TreeView from "./components/TreeView";

ReactDOM.render(
  <Provider store={store}>
    <TreeView />
  </Provider>,
  document.getElementById("root")
);
