export type TArticleData = {
  id: string;
  title: string;
  image: string;
  description: string;
  minutesRead: number;
  generalInfoFile: string;
  hashtags: string[];
  createdAt: Date | number | string;
  updatedAt: Date | number | string;
};

export type TArticleListProps = {
  data: TArticleData[];
  onEdit?: (item: TArticleData) => void;
  onDelete: (item: TArticleData) => void;
};
