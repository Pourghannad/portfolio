import style from "./card.module.scss";
import type { ICardProps } from "./types";

export default function Card(props: ICardProps) {
  const {children} = props;
  return <div className={style["card-container"]}>{children}</div>;
}
