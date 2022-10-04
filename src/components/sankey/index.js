import React from "react";
import Chart from "react-google-charts";
import { Provider, useSelector } from "react-redux";
import "./index.css"
import { useTranslation } from 'react-i18next';
import store from "../../redux/store";
function SankeyChart() {
  const { t, i18n } = useTranslation();
  
  const graphData = useSelector((state) => state);

  let income = Object.values(graphData.addGraphdata.income);

  let expense = Object.values(graphData.addGraphdata.expense);

  let invest = Object.values(graphData.addGraphdata.invest);
  let incomeTemp = [];

  let expenseTemp = [];
  let expenseKeys = [];
  let expensevalues = [];
  let investKeys = [];
  let investvalues = [];
  let investTemp = [];
  for (let i = 0; i < expense.length; i++) {
    expenseKeys.push(Object.keys(expense[i])[0]);
    expensevalues.push(Object.values(expense[i])[0]);
  }
  for (let i = 0; i < invest.length; i++) {
    investKeys.push(Object.keys(invest[i])[0]);
    investvalues.push(Object.values(invest[i])[0]);
  }
  let expenseSum = expensevalues.reduce(
    (partialSum, a) => partialSum + Number(a),
    0
  );
  let investSum = investvalues.reduce(
    (partialSum, a) => partialSum + Number(a),
    0
  );
  //let incomeSum = Number(Object.values(income[0])[0]);

  if (expense.length > 0) {
    var incomeSum = Number(Object.values(income[0])[0]);
    var savingsSum = incomeSum - expenseSum;

  

  
   

    incomeTemp.push([
      `Income: ${Object.keys(income[0])}`,
      "Expense",
      expenseSum,
    ]);
    incomeTemp.push([
      `Income: ${Object.keys(income[0])}`,
      "Savings",
      savingsSum,
    ]);



    for (let i = 0; i < expense.length; i++) {
      expenseTemp.push(["Expense", expenseKeys[i], expensevalues[i]]);
   
    }
  }

  for (let i = 0; i < invest.length; i++) {
    investTemp.push(["Savings", investKeys[i], investvalues[i]]);
  }
  //

  const format = ["From", "To", "Money"];



  const sankeyData = [format, ...incomeTemp, ...expenseTemp, ...investTemp];

  const options = {
    sankey: {
      node: {
        width: 10,
        nodePadding: 5,
      },
      link: {
        colorMode: "gradient",
      },
    },
  };

  return (
    <div>
      <Provider store={store}>
      <div className="container mt-5">
        {expenseKeys.length > 0 && (
          <Chart
            width={700}
            height={"350px"}
            chartType="Sankey"
            loader={<div>Loading Chart</div>}
            data={sankeyData}
            rootProps={{ "data-testid": "1" }}
            options={options}
          />
        )}
        {expenseKeys.length > 0 && (
          <table>
            <tr>
              <td>{t("Total")} {t("Income")} : {Object.values(income[0])}</td>
              <td>{t("Total")} {t("Expense")} : {expenseSum}</td>
              <td>{t("Total")} {t("Saving")} : {savingsSum}</td>
              <td>{t("Total")} {t("Investment")} : {investSum}</td>          </tr>
          </table>
        )}
      </div>
      </Provider>
    </div>
  );
}
export default SankeyChart;
