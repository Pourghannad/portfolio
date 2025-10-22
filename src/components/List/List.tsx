import { useEffect, useRef } from "react";
import style from "./list.module.scss";
import dopDots from "@pourghannad/dopdots";
import { Carousel } from "../Carousel/Carousel";
import clsx from "clsx";

export default function List() {
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
    <div className={style["list-container"]}>
      <div className={clsx("dopdots-wrapper", style["dopdots"])}>
        <canvas
          ref={canvasRef}
          id="dopdots"
          width="408px"
          height="408px"
          data-margin="12"
          data-type="grid"
          data-elementsize="6"
          data-color="#ffffff12"
          data-elementrect="true"
          data-secondrect="true"
          data-secondColor="#0c130b"
        ></canvas>
      </div>
      <Carousel />
    </div>
  );
}
