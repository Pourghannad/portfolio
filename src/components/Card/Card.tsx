import style from "./card.module.scss";
import type { ICardProps } from "./types";

export default function Card(props: ICardProps) {
  const { data } = props;
  return (
    <div className={style["card"]}>
      {data.name}
      {data.link && (
        <a href={data.link} target="_blank">
          Link
        </a>
      )}
      {data.images && data.images.length > 0 && (
        <div className={style["cover"]} style={{backgroundImage: `url(${data.images[0]})`}} />
      )}
      {/* {data.images &&
        data.images?.length > 0 &&
        data.images?.map((item, index) => {
          return (
            <img
              key={index}
              src={item}
              alt={`${data.name}-${index}`}
              title={`${data.name}-${index}`}
            />
          );
        })} */}
    </div>
  );
}
