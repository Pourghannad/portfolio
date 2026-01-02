import style from "./list.module.scss";
import { Carousel } from "../Carousel/Carousel";

export default function List() {

  return (
    <div className={style["list-container"]}>
      <Carousel />
    </div>
  );
}
