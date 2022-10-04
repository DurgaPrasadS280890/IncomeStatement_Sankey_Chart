import React, { Suspense, useState } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import ChartInputData from "./components/ChartInputData";
import SankeyChart from "./components/sankey";
import logo from "./centime_logo.png";
import "./App.css";
import { useTranslation } from "react-i18next";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import store from "./redux/store";
import { Provider } from "react-redux";
import i18n from "./il8n/il8n";

function App() {
  const { t } = useTranslation();
  const options = [
    { value: "en", label: "English" },
    { value: "ja", label: "Japanese" },
  ];
  const [label,setLabel]=useState('English')
  const defaultOption = options[0];
  function lanchange(e) {
    setLabel(e.label)
    i18n.changeLanguage(e.value);
  }

  return (
    
    <React.Fragment>

     <Provider store={store}>
        <div className="App-header">
          <span>{<img className="App-logo" src={logo} />}</span>
          <span className="header">
            <h2 data-testid="heading">{t("heading")} </h2>
          </span>
          <div className="leftDiv" data-testid="dropdown">
            <Dropdown
             data-testid="dropdown"
              label="language"
              options={options}
              onChange={(e) => {
                lanchange(e);
              }}
              value={label}
            />
            ;
          </div>
        </div>

        <ChartInputData />

        <div className="chart">
          <SankeyChart />
        </div>
        
        
        </Provider>
    </React.Fragment>
    
  );
}
export default App;
