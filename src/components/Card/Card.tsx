import style from "./card.module.scss";
import type { ICardProps } from "./types";

import TeamIcon from "@/icons/team.svg?react";
import PenIcon from "@/icons/pen.svg?react";

export default function Card(props: ICardProps) {
  const { data, title } = props;
  return (
    <div className={style["card"]}>
      <h4>{data.name}</h4>
      {title === "all" && <span className={style["type"]}>{data.type}</span>}
      <div className={style["description"]}>
      </div>
      <div className={style["badges"]}>
        <span className={style["createdat"]}>{data.createdAt}</span>
        {data?.memberOfTeam && (
          <div className={style["member"]}>
            <TeamIcon />
            part of a team
          </div>
        )}
        {data.design && (
          <div className={style["design"]}>
            <PenIcon />
            {data.design}
            <span>
              Designed by:
            </span>
          </div>
        )}
        {data.link && (
          <a href={data.link} target="_blank">
            Demo
          </a>
        )}
      </div>
      {data.images && data.images.length > 0 && (
        <div
          className={style["cover"]}
          style={{ backgroundImage: `url(${data.images[0]})` }}
        />
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
