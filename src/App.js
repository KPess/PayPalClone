import React from "react";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import routes from "./routes";
import store from "./redux/store";
import "./App.css";
import { StripeProvider } from "react-stripe-elements";
import footer from "./footer.jpg";

function App() {
  return (
    <StripeProvider apiKey="pk_test_2QtpeVuM2hru92q1zHxaZQFK002dx0OCJ1">
      <Provider store={store}>
        <HashRouter>
          <div className="App">{routes}</div>
        </HashRouter>
      </Provider>
    </StripeProvider>
  );
}

export default App;

/*
	Make Registration functionality
	Make Login Functionality
	Set up Routes
	Set up Redux
	Make Dashboard page
*/
