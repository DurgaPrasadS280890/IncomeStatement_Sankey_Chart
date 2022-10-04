import {
  render,
  screen,
  fireEvent,
  
  waitFor,
  getByTestId,
  cleanup,
  done,
} from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import { Suspense } from "react";
import App from "./App";





async function wait(millis) {
 
  await new Promise((r) => setTimeout(r, millis));
  
}

test("App Heading exists", async () => {
  render(
    <Suspense fallback={<div>Loading page</div>}>
      <App />
    </Suspense>
  );
  await wait(3000);

  expect(screen.getByTestId("heading")).toBeInTheDocument();
}, 10000);

test("Language Dropdown exists", async () => {
  render(
    <Suspense fallback={<div>Loading page</div>}>
      <App />
    </Suspense>
  );
  await wait(3000);
const dropdowns=screen.getByTestId("dropdown")
expect(dropdowns).toBeInTheDocument();
screen.debug()

}, 7000);




test("Select and changing Language Dropdown options", async () => {
  render(
    <Suspense fallback={<div>Loading page</div>}>
      <App />
    </Suspense>
  );
  await wait(3000);

userEvent.click(screen.getByText("English"));
await wait(3000);


  fireEvent.click(screen.getByText("Japanese"));
  await wait(3000);
  expect(screen.getByText("Japanese")).toBeInTheDocument()


}, 15000);


