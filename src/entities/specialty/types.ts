export type TSpecialty = {
  id: string;
  name: string;
  EIOHPE: string;
  class: number;
  specializationGroup: number;
  clusterName: string;
  clusterTag: string;
  specialtyDescription: string;
  specialtyCode: number;
  specialtyName: string;
  formOfEducation: string;
  typeOfStudy: string;
  languageOfStudy: string;
  universityName: string;
  monthlyIncome: number;
  skillsLevel: number;
  futureGrowth: string;
  overview: string;
  careerOpportunities: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};

export type TSpecialtyTableProps = {
  data: TSpecialty[];
  onDelete: (id: string) => void;
  onEdit: (specialty: TSpecialty) => void;
};
