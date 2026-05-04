import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Portfolio from "./pages/Portfolio";
import "./styles/styles.css";

export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Portfolio />
    </>
  );
}