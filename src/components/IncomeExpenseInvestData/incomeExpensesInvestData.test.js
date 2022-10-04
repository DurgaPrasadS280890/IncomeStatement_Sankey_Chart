import {
  render,
  screen,
  fireEvent,
 
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Suspense } from "react";
import { Provider } from "react-redux";
import IncomeExpenseInvestData from "./index";
import store from "../../redux/store"

async function wait(millis) {
  
  await new Promise((r) => setTimeout(r, millis));
 
}

test("Data Entry Tabs Testing", async () => {
  render(
   <Provider store={store}>
      <IncomeExpenseInvestData valuetype="income" />
      </Provider>
  );
  await wait(3000);

  expect(screen.getByText("Income type")).toBeInTheDocument()
  expect(screen.getByText("Income value")).toBeInTheDocument()
  render(
    <Provider store={store}>
       <IncomeExpenseInvestData valuetype="expense" />
       </Provider>
   );
   await wait(3000);
 
   expect(screen.getByText("Expense type")).toBeInTheDocument()
   expect(screen.getByText("Expense value")).toBeInTheDocument()

}, 10000);

test("Initial Input Values to be EMpty", async () => {
    render(
     <Provider store={store}>
        <IncomeExpenseInvestData valuetype="income" />
        </Provider>
    );
    await wait(3000);
  
    expect(screen.getByTestId("inputName").value).toBe("")
    expect(screen.getByTestId("inputValue").value).toBe("")

  
  }, 10000);

  test("Validating Value field passing string instead of number", async () => {
    render(
     <Provider store={store}>
        <IncomeExpenseInvestData valuetype="income" />
        </Provider>
    );
    await wait(3000);
  

    const valuetype=screen.getByTestId("inputValue")
    fireEvent.change(valuetype, {target: {value: 500}})
    
    expect(Number(screen.getByTestId("inputValue").value)).toBe(500)

    fireEvent.change(valuetype, {target: {value: "ABC"}})
    expect(Number(screen.getByTestId("inputValue").value)).toBe(0)


    // expect(screen.getByTestId("inputName").value).toBe("")
    // expect(screen.getByTestId("inputValue").value).toBe("")

  
  }, 10000);