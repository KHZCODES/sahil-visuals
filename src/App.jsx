import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./sections/Header.jsx";
import Hero from "./sections/Hero.jsx";
import Services from "./sections/Services.jsx";
import Portfolio from "./sections/Portfolio.jsx";
import About from "./sections/About.jsx";
import Contact from "./sections/Contact.jsx";
import Footer from "./sections/Footer.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";
import TermsOfService from "./pages/TermsOfService.jsx";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <main className="overflow-hidden bg-black text-white">
              <Header />
              <Hero />
              <Services />
              <Portfolio />
              <About />
              <Contact />
              <Footer />
            </main>
          }
        />
        <Route
          path="/privacy-policy"
          element={
            <main className="overflow-hidden bg-black text-white">
              <Header />
              <PrivacyPolicy />
              <Footer />
            </main>
          }
        />
        <Route
          path="/terms-of-service"
          element={
            <main className="overflow-hidden bg-black text-white">
              <Header />
              <TermsOfService />
              <Footer />
            </main>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
