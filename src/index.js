import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { AppContainer } from "react-hot-loader";

import { Provider } from "react-redux";
import store from "./store";

const render = Component => {
  ReactDOM.render(
    // Wrap App inside AppContainer
    <AppContainer>
      <Provider store={store}>
        <App />
      </Provider>
    </AppContainer>,
    document.getElementById("root")
  );
};

// Do this once
registerServiceWorker();

// Render once
render(App);

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept("./App", () => {
    render(App);
  });
}
