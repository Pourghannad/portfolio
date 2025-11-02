export interface IPortfolio {
    name: string;
    type: string;
    design: string;
    createdAt: string;
    development: string;
    platform?: string[];
    description: string;
    link: string;
    images: string[];
    memberOfTeam?: boolean;
    technology?: (string | undefined)[];
}