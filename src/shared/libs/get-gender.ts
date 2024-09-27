export const getGender = (gender: 'male' | 'female') => {
  return gender === 'male' ? 'Мужчина' : 'Женщина';
}