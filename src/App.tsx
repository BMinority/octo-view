import "./App.scss";
import Footer from "./components/Footer";
import Header from "./components/Header";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <div className="app-wrapper">
      <Header />
      <main className="bc-container-project">
        <AppRoutes />
      </main>
      <Footer />
    </div>
  );
}

export default App;
