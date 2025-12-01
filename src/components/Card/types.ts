import type { IPortfolio } from "../../types/portfolio";

export interface ICardProps {
  data: Partial<IPortfolio>;
  title?: string;
  index: number;
  inView: boolean;
}
