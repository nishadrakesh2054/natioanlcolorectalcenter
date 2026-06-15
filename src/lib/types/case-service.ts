export type CaseService = {
  id: number;
  title: string;
  description: string;
  icon: string;
  symptoms?: string[];
  procedures?: string[];
  risks?: string[];
  recoveryTime?: string;
};
