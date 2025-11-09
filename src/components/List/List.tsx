import { useEffect, useRef } from "react";
import style from "./list.module.scss";
import dopDots from "@pourghannad/dopdots";
import { Carousel } from "../Carousel/Carousel";
import * as clsx from "clsx";

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
          width="405px"
          height="405px"
          data-margin="10"
          data-type="grid"
          data-elementsize="5"
          data-color="#ffffff12"
          data-elementrect="true"
          data-secondrect="true"
          data-secondcolor="#0c130b"
        ></canvas>
      </div>
      <Carousel />
    </div>
  );
}
