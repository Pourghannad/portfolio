import { useEffect, useRef } from "react";
import style from "./list.module.scss";
import dopDots from "@pourghannad/dopdots"

export default function List() {
  const canvasRef = useRef(null);
  useEffect(() => {
    if (canvasRef.current) {
      dopDots(canvasRef.current.getContext("2d"))
    }
  }, []);
  return (
    <div className={style["list-container"]}>
      <canvas
        ref={canvasRef}
        id="dopdots"
        width="400px"
        height="400px"
        data-margin="10"
        data-type="grid"
        data-elementsize="6"
        data-color="#3c3c3c"
        data-elementrect="true"
        data-secondrect="true"
        data-elementformousemove=".dopdots-wrapper"
        data-moveradius="300"
        data-secondColor="#0c130b"
      ></canvas>
    </div>
  );
}
