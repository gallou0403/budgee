import {BudgetContainer} from "@budgee/features/budget";
import {PrimeReactProvider} from "primereact/api";

import 'primereact/resources/themes/mdc-dark-indigo/theme.css';
import 'primeicons/primeicons.css';

function App() {
  return (
    <PrimeReactProvider>
      <BudgetContainer />
    </PrimeReactProvider>
  );
}

export default App;
