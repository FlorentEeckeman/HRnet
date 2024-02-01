import "./App.css";
import FormPage from "./pages/FormPage";

//import { ModalProvider } from "@florent-eeckman/modal-component-library";
import { ModalProvider } from "@florent-eeckman/modal-library";
function App() {
  return (
    <>
      <ModalProvider escapeClose={true}>
        <FormPage />
      </ModalProvider>
    </>
  );
}

export default App;
