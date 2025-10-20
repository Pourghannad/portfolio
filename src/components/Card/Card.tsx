import style from "./card.module.scss";
import type { ICardProps } from "./types";

export default function Card(props: ICardProps) {
  const {data} = props;
  return <div className={style["card-container"]}>{data.name}</div>;
}
