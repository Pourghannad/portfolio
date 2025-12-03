import "./App.css";
import Header from "./components/Header/Header";
import List from "./components/List/List";
import Footer from "./components/Footer/Footer";
import dopDots from "@pourghannad/dopdots";
import { useEffect, useRef } from "react";

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        dopDots(ctx);
      }
    }
  }, []);
  return (
    <main>
      <canvas
        ref={canvasRef}
        id="dopdots"
        width="4000px"
        height="1900px"
        data-margin="10"
        data-type="grid"
        data-elementsize="5"
        data-color="#ffffff12"
        data-elementrect="true"
        data-secondrect="true"
        data-secondcolor="#0c130b"
      ></canvas>
      <Header />
      <List />
      <Footer />
    </main>
  );
}

export default App;
