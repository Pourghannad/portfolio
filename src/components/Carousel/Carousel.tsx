import useEmblaCarousel from "embla-carousel-react";
import Card from "../Card/Card";
import style from "./carousel.module.scss";
import { portfolio } from "../../portfolio";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "./components/Arrows/Arrows";
import { DotButton, useDotButton } from "./components/Dots/Dots";
import clsx from "clsx";

export function Carousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ axis: "y" });
  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi!);

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
      <div className={style["buttons"]}>
        <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
        <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
      </div>
      <div className={style["dots"]}>
        {scrollSnaps.map((_, index) => (
          <DotButton
            key={index}
            onClick={() => onDotButtonClick(index)}
            className={clsx(style["dot"], {
              [style["active"]]: index === selectedIndex,
            })}
          />
        ))}
      </div>
    </div>
  );
}
