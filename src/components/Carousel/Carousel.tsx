import useEmblaCarousel from "embla-carousel-react";
import Card from "../Card/Card";
import style from "./carousel.module.scss";
import { portfolio } from "../../portfolio";

export function Carousel() {
  // const [emblaRef] = useEmblaCarousel({ axis: "y" });
  const [emblaRef] = useEmblaCarousel();

  return (
    <div className={style["embla"]} ref={emblaRef}>
      <div className={style["container"]}>
        {portfolio.map((item, index) => {
          return (
            <div key={index} className={style["slide"]}>
              <Card data={item} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
