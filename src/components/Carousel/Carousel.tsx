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
import { useCallback, useEffect, useState } from "react";
import { EmblaCarouselType } from "embla-carousel";

export function Carousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ axis: "y" });
  const [items, setItems] = useState({ data: portfolio, title: "all" });
  const [slidesInView, setSlidesInView] = useState<number[]>([]);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi!);

  const updateSlidesInView = useCallback((emblaApi: EmblaCarouselType) => {
    setSlidesInView((slidesInView) => {
      if (slidesInView.length === emblaApi.slideNodes().length) {
        emblaApi.off("slidesInView", updateSlidesInView);
      }
      const inView = emblaApi
        .slidesInView()
        .filter((index) => !slidesInView.includes(index));
      return slidesInView.concat(inView);
    });
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    updateSlidesInView(emblaApi);
    emblaApi.on("slidesInView", updateSlidesInView);
    emblaApi.on("reInit", updateSlidesInView);
  }, [emblaApi, updateSlidesInView]);

  const onFilterClick = (type: string) => {
    if (type) {
      setItems({
        data: portfolio.filter((item) => item.type === type),
        title: type,
      });
    } else {
      setItems({ data: portfolio, title: "all" });
    }
  };

  return (
    <div className={style["embla"]} ref={emblaRef}>
      <div className={style["container"]} id="container">
        {items.data.map((item, index) => {
          return (
            <div key={index} className={style["slide"]}>
              <Card
                title={items.title}
                data={item}
                index={index}
                inView={slidesInView.indexOf(index) > -1}
              />
            </div>
          );
        })}
      </div>
      <div className={style["buttons"]}>
        <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
        <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
      </div>
      <div className={style["filters"]}>
        <button
          className={items.title === "all" ? style["active"] : ""}
          onClick={() => onFilterClick("")}
        >
          All
        </button>
        <button
          className={items.title === "website" ? style["active"] : ""}
          onClick={() => onFilterClick("website")}
        >
          Website
        </button>
        <button
          className={items.title === "pwa" ? style["active"] : ""}
          onClick={() => onFilterClick("pwa")}
        >
          Pwa
        </button>
        <button
          className={items.title === "gif" ? style["active"] : ""}
          onClick={() => onFilterClick("gif")}
        >
          Gif
        </button>
        <button
          className={items.title === "open-source" ? style["active"] : ""}
          onClick={() => onFilterClick("open-source")}
        >
          Open source
        </button>
      </div>
      <div className={style["dots"]}>
        {scrollSnaps.map((_, index) => (
          <DotButton
            key={index}
            onClick={() => onDotButtonClick(index)}
            className={`${style["dot"]} ${
              index === selectedIndex ? style["active"] : ""
            }`}
          />
        ))}
      </div>
    </div>
  );
}
