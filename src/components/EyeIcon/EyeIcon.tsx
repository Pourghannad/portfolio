import { useEffect, useState } from "react";
import style from "./eyeIcon.module.scss";
import { throttle } from "@/utils";
import { IEyeIcon, MouseEventHandler } from "./types";

export default function EyeIcon(props: IEyeIcon) {
  const { inView } = props;

  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const onMouseMove: MouseEventHandler = throttle((event: MouseEvent) => {
    const element = document.querySelector(".eye-icon"); // useRef not working correctly here :( !!
    if (element) {
      const rect = element.getBoundingClientRect();
      const elX = -(rect.left - event.clientX) / 9;
      const elY = -(rect.top - event.clientY) / 9;
      const radius = 9;
      setOffset({
        x: elX > radius ? radius : elX < -radius ? -radius : elX,
        y: elY > radius ? radius : elY < -radius ? -radius : elY,
      });
    }
  }, 50);

  useEffect(() => {
    if (inView) {
      document.addEventListener("mousemove", onMouseMove);
    }
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
    };
  }, [inView]);

  return (
    <svg
      className={`${style["eye-icon"]} eye-icon`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      x="0px"
      y="0px"
    >
      <path d="M93.13,48.84c-.04-.06-4.82-6.17-12.57-12.32-4.5-3.56-9.08-6.41-13.62-8.45-5.75-2.59-11.45-3.9-16.94-3.9s-11.19,1.31-16.94,3.9c-4.54,2.05-9.12,4.89-13.62,8.45-7.75,6.14-12.53,12.26-12.57,12.32-.52,.71-.5,1.68,.04,2.38,.2,.25,4.92,6.23,12.54,12.27,4.5,3.56,9.08,6.4,13.62,8.45,5.74,2.59,11.44,3.9,16.93,3.9s11.19-1.31,16.93-3.9c4.54-2.04,9.12-4.89,13.62-8.45,7.62-6.04,12.34-12.02,12.54-12.27,.54-.69,.56-1.66,.04-2.38ZM21.95,60.44c-5.29-4.19-9.18-8.42-10.92-10.44,1.74-2.02,5.63-6.26,10.93-10.45,2.46-1.94,4.94-3.65,7.41-5.12-3.38,4.46-5.21,9.87-5.21,15.57s1.83,11.11,5.21,15.57c-2.48-1.47-4.96-3.18-7.42-5.13Zm28.05,11.45c-12.07,0-21.89-9.82-21.89-21.89s9.82-21.89,21.89-21.89,21.89,9.82,21.89,21.89-9.82,21.89-21.89,21.89Zm28.05-11.45c-2.46,1.95-4.94,3.66-7.42,5.13,3.38-4.46,5.21-9.87,5.21-15.57s-1.83-11.11-5.21-15.57c2.48,1.47,4.95,3.18,7.41,5.12,5.3,4.19,9.19,8.43,10.93,10.45-1.74,2.02-5.63,6.25-10.92,10.44Z" />
      <circle
        className={style["circle-eye"]}
        style={{
          transform: `scale(0.775) translate3D(${offset.x}px, ${offset.y}px, 0px)`,
        }}
        cx="50"
        cy="50"
        r="12"
      />
    </svg>
  );
}
