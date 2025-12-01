import style from "./card.module.scss";
import type { ICardProps } from "./types";

import TeamIcon from "@/icons/team.svg?react";
import PenIcon from "@/icons/pen.svg?react";
import TechIcon from "@/icons/tech.svg?react";
import EyeIcon from "@/icons/eye.svg?react";
import { useCallback, useState } from "react";

const PLACEHOLDER_SRC = `data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D`;

export default function Card(props: ICardProps) {
  const { data, title, inView } = props;
  const [hasLoaded, setHasLoaded] = useState(false);
  const setLoaded = useCallback(() => {
    if (inView) setHasLoaded(true);
  }, [inView, setHasLoaded]);
  return (
    <div className={style["card"]}>
      <h4>
        {data.name} {data.description && <span>{data.description}</span>}{" "}
      </h4>
      {title === "all" && <span className={style["type"]}>{data.type}</span>}
      {}
      <div className={style["description"]}>
        {data.technology && data.technology.length > 0 && (
          <div className={style["tech"]}>
            <TechIcon />
            {data.technology.join(", ")}
          </div>
        )}
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
            <span>Designed by:</span>
          </div>
        )}
        {data.link && (
          <a className={style.link} href={data.link} target="_blank">
            Demo
          </a>
        )}
      </div>
      {!hasLoaded && <span className={style["image-loading"]} />}
      {<span className={style["image-loading"]} />}
      {data.images && data.images.length > 0 && (
        <>
          <img
            data-src={data.images[0]}
            alt={data.name}
            src={inView ? data.images[0] : PLACEHOLDER_SRC}
            onLoad={setLoaded}
            className={style["cover"]}
          />
          <a title={`${data.name} image`} className={style["image-link"]} href={data.images[0]} target="_blank"><EyeIcon /></a>
        </>
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
