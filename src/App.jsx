import Dashboard from "./components/dashboard";
import DashboardLayout from "./components/layouts/dashboardLayout";
import GlobalThemeProvider from "./theme/GlobalThemeProvider";

function App() {
  return (
    <GlobalThemeProvider>
      <DashboardLayout>
        <Dashboard />
      </DashboardLayout>
    </GlobalThemeProvider>
  );
}

export default App;
