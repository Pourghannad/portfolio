import useEmblaCarousel from 'embla-carousel-react'
import Card from '../Card/Card'
import style from "./carousel.module.scss"

export function Carousel() {
  const [emblaRef] = useEmblaCarousel()

  return (
    <div className={style["embla"]} ref={emblaRef}>
      <div className={style["container"]}>
        <div className={style["slide"]}><Card><div>a</div></Card></div>
        <div className={style["slide"]}><Card><div>b</div></Card></div>
        <div className={style["slide"]}><Card><div>c</div></Card></div>
      </div>
    </div>
  )
}