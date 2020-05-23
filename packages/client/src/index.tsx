import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "./App.scss";
import createStore from "./store";
import "./i18n";
import Loading from "./components/Loading";

const store = createStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Suspense fallback={<Loading />}>
        <App />
      </Suspense>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.register();

const updateNotificationSubscription = async (): Promise<void> => {
  if (Notification.permission === "default") {
    await Notification.requestPermission();
  }
  navigator.serviceWorker.getRegistration().then(x => x?.active?.postMessage("update-notification-subscription"));
};

if ("Notification" in window) {
  updateNotificationSubscription();
}
