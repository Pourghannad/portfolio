import style from "./card.module.scss";
import type { ICardProps } from "./types";

export default function Card(props: ICardProps) {
  const { data } = props;
  return (
    <div className={style["card"]}>
      <h4>{data.name}</h4>
      {data.link && (
        <a href={data.link} target="_blank">
          Link
        </a>
      )}
      <div>{data.type}</div>
      {data.development ?? <div>{data.development}</div>}
      {data.design ?? <div>{data.design}</div>}
      <span className={style["createdat"]}>
        {data.createdAt}
      </span>
        {data?.memberOfTeam ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            x="0px"
            y="0px"
            width={40}
            height={40}
          >
            <path fill="#fff" d="M28.05,9.52h.99v4.56h-2.62c-.96,3.29-5.85,3.29-6.82,0h-2.74V1.89h12.18V6.36h-.99c-2.05,.07-2.05,3.1,0,3.16Zm-1.72,17.85v2.74c-5.8-.02-17.55-.02-23.37-.02V7.73H15.14v4.46l-.99,.02c-.86,0-1.57,.71-1.57,1.56s.71,1.57,1.57,1.58l.99,.02v2.54h3.49v.99c.02,.86,.72,1.57,1.58,1.57s1.57-.7,1.58-1.56v-.99h4.56v2.63c3.28,.97,3.27,5.86-.02,6.82ZM4.96,17.92h2.46v.98c.02,.87,.73,1.57,1.58,1.57s1.57-.7,1.58-1.57v-.98h2.56v-.72c-3.37-1-3.38-5.84,0-6.84v-.63H4.96v8.19Zm10.68,6.03c0-.86-.67-1.55-1.53-1.57l-.97-.03v-2.43h-.71c-1,3.36-5.84,3.37-6.84,0h-.63v8.17H13.14v-2.54l.97-.03c.86-.03,1.53-.72,1.53-1.57Zm9.67-1.56l-.97-.04v-2.43h-.71c-1.01,3.36-5.85,3.36-6.84-.01h-1.65v.63c3.29,.96,3.29,5.85,0,6.81v.74h9.19v-2.54l.97-.02c2.01-.08,2.02-3.06,.01-3.14Z" />
          </svg>
        ) : (
          null
        )}
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
