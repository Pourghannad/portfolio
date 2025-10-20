import style from "./card.module.scss";
import type { ICardProps } from "./types";

export default function Card(props: ICardProps) {
  const { data } = props;
  return (
    <div className={style["card-container"]}>
      {data.name}
      {data.images &&
        data.images?.length > 0 &&
        data.images?.map((item, index) => {
          return (
            <img
              src={item}
              key="index"
              alt={`${data.name}-${index}`}
              title={`${data.name}-${index}`}
            />
          );
        })}
    </div>
  );
}
