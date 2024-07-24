import logo from './logo.svg';
import './App.css';
import Dashboard from './components/dashboard/Dashboard';
import "font-awesome/css/font-awesome.min.css";
import { PrimeReactProvider } from 'primereact/api';
import "primeflex/primeflex.css";  
import "primereact/resources/primereact.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";

function App() {
  return (
    <div className="App">
      <PrimeReactProvider>
        <Dashboard />
      </PrimeReactProvider>
    </div>
  );
}

export default App;
