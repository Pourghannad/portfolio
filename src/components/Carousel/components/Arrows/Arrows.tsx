import { useCallback, useEffect, useState } from "react";
import type { EmblaCarouselType } from "embla-carousel";

import ArrowIcon from "@/icons/arrow.svg?react";

type UsePrevNextButtonsType = {
  prevBtnDisabled: boolean;
  nextBtnDisabled: boolean;
  onPrevButtonClick: () => void;
  onNextButtonClick: () => void;
};

// eslint-disable-next-line react-refresh/only-export-components
export const usePrevNextButtons = (
  emblaApi: EmblaCarouselType
): UsePrevNextButtonsType => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
  }, [emblaApi]);

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
  }, [emblaApi]);

  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!emblaApi) return;
      if (event.key === "ArrowDown") {
        emblaApi.scrollNext();
      } else if (event.key === "ArrowUp") {
        emblaApi.scrollPrev();
      }
    },
    [emblaApi]
  );

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [emblaApi, onKeyDown]);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi.on("reInit", onSelect).on("select", onSelect);
  }, [emblaApi, onSelect]);

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  };
};

export const PrevButton: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = (props) => {
  const { ...restProps } = props;
  return (
    <button type="button" {...restProps}>
      <ArrowIcon />
    </button>
  );
};

export const NextButton: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = (props) => {
  const { ...restProps } = props;
  return (
    <button
      style={{ transform: "rotate(180deg)" }}
      type="button"
      {...restProps}
    >
      <ArrowIcon />
    </button>
  );
};
