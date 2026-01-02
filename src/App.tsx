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
      <div className="desktop-only">
        {'Desktop only. Mobile version under development :( '}
      </div>
      <div className="canvas-wrapper">
        <canvas
          ref={canvasRef}
          id="dopdots"
          width="4000px"
          height="1900px"
          data-margin="65"
          data-type="grid"
          data-elementsize="3"
          data-moveradius="90"
          data-color="#ffffff0f"
          data-elementrect="true"
          data-secondrect="false"
          data-secondcolor="#454d67"
          data-elementformousemove=".canvas-wrapper"
        ></canvas>

      </div>
      <Header />
      <List />
      <Footer />
    </main>
  );
}

export default App;
