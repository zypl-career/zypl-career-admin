export const typesArticle = [
  { value: 'student', label: 'Студент' },
  { value: 'teacher', label: 'Для учителей' },
  { value: 'parent', label: 'Для родителей' },
  { value: 'admin', label: 'Для админов' },
];

export const sections = [
  'Partners',
  'Universities and Colleges',
  'Professions',
  'Industries',
  'Educational Centers',
  'Courses',
  'Career Articles',
  'Resources for Job Seekers',
  'User Guide Videos',
  'Articles for Parents',
  'Articles for Teachers and Practitioners',
  'Articles for Homepage',
] as const;

export const variantSection = sections.map((section) => ({ label: section, value: section }));
