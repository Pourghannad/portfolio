import style from "./footer.module.scss";

export default function Footer() {
  return <footer className={style["footer"]}><span>©</span> 2013 - {new Date().getFullYear()}</footer>;
}
