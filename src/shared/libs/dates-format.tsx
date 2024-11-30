const returnDaysLeft = (inputDate: Date): number => {
  const today: Date = new Date();
  today.setHours(0, 0, 0, 0);

  const inputDateTime: Date = new Date(inputDate);
  inputDateTime.setHours(0, 0, 0, 0);

  const differenceInDays: number = Math.floor((inputDateTime.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  if ([0, 1, 2].includes(differenceInDays)) {
    return differenceInDays;
  }
  return 3;
};
const russianMonths = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
];
const shortRussianMonths = [
  'янв.',
  'фев.',
  'мар.',
  'апр.',
  'май',
  'июн.',
  'июл.',
  'авг.',
  'сен.',
  'окт.',
  'нояб.',
  'дек.',
];
const extractDayFromDate = (date: Date): number => {
  const dateArr = date.toDateString().split(' ');
  return parseInt(dateArr[2]);
};

export const formatDateDays = (date: string): string => {
  const fDate = new Date(date);
  type TDateString = {
    [key: number]: string;
  };
  const dateObj: TDateString = {
    0: 'Сегодня',
    1: 'Вчера',
  };
  const daysLeft = returnDaysLeft(fDate);
  return [0, 1].includes(daysLeft)
    ? dateObj[daysLeft]
    : `${extractDayFromDate(fDate)} ${russianMonths[fDate.getMonth()]}`;
};
// const appendZero = (d: number | string) => {
//   if(parseInt(d.toString() { ) < 10) return `0${d}`; }
//   return d;
// };
export const titledDate = (date: string) => (
  <div>
    {getDMY(date, false)}
    <div>{getHMS(date)}</div>
  </div>
);
export const getHMS = (date: string) => {
  if (!date) {
    return 'сейчас';
  }

  const dArr = date.split(' ');
  if (dArr.length < 4) {
    return dArr[1];
  }
  const dHMS = dArr[4].split(':');
  return <code className="text-gray-500">{`${dHMS[0]}:${dHMS[1]}`}</code>;
};
export const getDMY = (date: string | Date | number, short: boolean = true): string => {
  if (!date) {
    return 'сейчас';
  }
  const d = new Date(date);
  const day = extractDayFromDate(d);
  return `${day} ${short ? shortRussianMonths[d.getMonth()] : russianMonths[d.getMonth()]} ${d.getFullYear()} `;
};
export const getMY = (date: string, short: boolean = true): string => {
  const d = new Date(date);
  return `${short ? shortRussianMonths[d.getMonth()] : russianMonths[d.getMonth()]} ${d.getFullYear()} `;
};
export const maxDate = (params?: { day: number | null; month: number | null; year: number | null }) => {
  if (!params) {
    return;
  }
  if (params.year) {
    return `${params.year} лет`;
  }
  if (params.month) {
    return `${params.month} месяцы`;
  }
  if (params.day) {
    return `${params.day} день`;
  }
};

export const fillDate = (params?: { day: number | null; month: number | null; year: number | null }) => {
  const now = new Date(Date.now());
  const cyear = now.getFullYear();
  const cmonth = now.getMonth();
  const cday = now.getDay();
  return `${params?.day ?? cday} ${shortRussianMonths[params?.month ?? cmonth]} ${params?.year ?? cyear}`;
};

export const formatDate = (date: string) => {
  const nd = new Date(date);
  const d = nd.getDay();
  const m = nd.getMonth();
  const y = nd.getFullYear();

  return `${d} ${shortRussianMonths[m]} ${y}`;
};
