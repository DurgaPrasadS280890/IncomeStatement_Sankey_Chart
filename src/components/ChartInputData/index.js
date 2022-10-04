import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { useTranslation } from 'react-i18next';
import store from "../../redux/store"
import IncomeExpenseInvestData from '../IncomeExpenseInvestData';
import { Provider } from 'react-redux';

function ChartInputData(){
  const { t } = useTranslation();

    return(
      <Provider store={store}>
        <React.Fragment>

         <strong>{t("main_instruction")} </strong>

<Tabs data-testid="tabs">
    <TabList>
      <Tab>{t("Income")} </Tab>
      <Tab>{t("Expense")} </Tab>
      <Tab>{t("Investment")} </Tab>
    </TabList>

    <TabPanel>

    <IncomeExpenseInvestData valuetype="income"/>
    </TabPanel>
    <TabPanel>
    <IncomeExpenseInvestData valuetype="expense"/>
    </TabPanel>
    <TabPanel>
    <IncomeExpenseInvestData valuetype="invest"/>
    </TabPanel>
  </Tabs>
        </React.Fragment>
        </Provider>)
}


export default ChartInputData