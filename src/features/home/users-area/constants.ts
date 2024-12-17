import { TBarData } from '@/entities/home/users-area/bar/types';
import { TCounterBranches } from '@/entities/home/users-area/map/types';

export const mapArea: Array<TCounterBranches> = Array.from({ length: 61 }, (_, i) => ({
  id: i,
  district: `Branch${i}`,
  count: Math.floor(Math.random() * 100).toString(),
}));

export const regions = [
  {
    district: 'Hissor',
    count: '3',
  },
  {
    district: 'Tursunzoda',
    count: '2',
  },
  {
    district: 'Dushanbe',
    count: '1',
  },
  {
    district: 'Kulob',
    count: '1',
  },
  {
    district: 'Bokhtar',
    count: '0',
  },
  {
    district: 'Vahdat',
    count: '0',
  },
  {
    district: 'Panjakent',
    count: '0',
  },
  {
    district: 'Norak',
    count: '0',
  },
  {
    district: 'Danghara',
    count: '0',
  },
  {
    district: 'Farkhor',
    count: '0',
  },
  {
    district: 'Gafurov',
    count: '0',
  },
  {
    district: 'Roghun',
    count: '0',
  },
  {
    district: 'Shahritus',
    count: '0',
  },
  {
    district: 'Shahrinav',
    count: '0',
  },
  {
    district: 'Taboshar',
    count: '0',
  },
  {
    district: 'Chkalovsk',
    count: '0',
  },
  {
    district: 'Khorugh',
    count: '0',
  },
  {
    district: 'Murghab',
    count: '0',
  },
  {
    district: 'Qayroqqum',
    count: '0',
  },
  {
    district: 'Sarband',
    count: '0',
  },
  {
    district: 'Vose',
    count: '0',
  },
  {
    district: 'Asht',
    count: '0',
  },
  {
    district: 'Baljuvon',
    count: '0',
  },
  {
    district: 'Darvoz',
    count: '0',
  },
  {
    district: 'Devashtich',
    count: '0',
  },
  {
    district: 'Fayzobod',
    count: '0',
  },
  {
    district: 'Ishkoshim',
    count: '0',
  },
  {
    district: 'Jabbor_Rasulov',
    count: '0',
  },
  {
    district: 'Jilikul',
    count: '0',
  },
  {
    district: 'Jirgatol',
    count: '0',
  },
  {
    district: 'Khovaling',
    count: '0',
  },
  {
    district: 'Kuhistoni_Mastchoh',
    count: '0',
  },
  {
    district: 'Lakhsh',
    count: '0',
  },
  {
    district: 'Muminobod',
    count: '0',
  },
  {
    district: 'Nurobod',
    count: '0',
  },
  {
    district: 'Nosiri_Khusrav',
    count: '0',
  },
  {
    district: 'Panj',
    count: '0',
  },
  {
    district: 'Rasht',
    count: '0',
  },
  {
    district: 'Roshtqala',
    count: '0',
  },
  {
    district: 'Rumi',
    count: '0',
  },
  {
    district: 'Rudaki',
    count: '0',
  },
  {
    district: 'Rushon',
    count: '0',
  },
  {
    district: 'Sangvor',
    count: '0',
  },
  {
    district: 'Shughnon',
    count: '0',
  },
  {
    district: 'Temurmalik',
    count: '0',
  },
  {
    district: 'Tojikobod',
    count: '0',
  },
  {
    district: 'Varzob',
    count: '0',
  },
  {
    district: 'Vakhsh',
    count: '0',
  },
  {
    district: 'Vanj',
    count: '0',
  },
  {
    district: 'Zafar',
    count: '0',
  },
  {
    district: 'Zarafshon',
    count: '0',
  },
  {
    district: 'Yovon',
    count: '0',
  },
  {
    district: 'Dusti',
    count: '0',
  },
  {
    district: 'Khuroson',
    count: '0',
  },
  {
    district: 'Kushoniyon',
    count: '0',
  },
  {
    district: 'Levakant',
    count: '0',
  },
  {
    district: 'Qubodiyon',
    count: '0',
  },
  {
    district: 'Balkhi',
    count: '0',
  },
  {
    district: 'Khujand',
    count: '0',
  },
  {
    district: 'Buston',
    count: '0',
  },
  {
    district: 'Ghafurov',
    count: '0',
  },
  {
    district: 'Isfara',
    count: '0',
  },
  {
    district: 'Istaravshan',
    count: '0',
  },
  {
    district: 'Konibodom',
    count: '0',
  },
  {
    district: 'Mastchoh',
    count: '0',
  },
  {
    district: 'Spitamen',
    count: '0',
  },
  {
    district: 'Zafarobod',
    count: '0',
  },
  {
    district: 'Rasulov',
    count: '0',
  },
  {
    district: 'Shahriston',
    count: '0',
  },
  {
    district: 'Ayni',
    count: '0',
  },
  {
    district: 'Penjikent',
    count: '0',
  },
];

export const barData: TBarData[] = [
  { id: '1', name: 'Вахдат', percent: 50 },
  { id: '2', name: 'Айни', percent: 30 },
  { id: '3', name: 'Бохтар', percent: 20 },
  { id: '3', name: 'Хорог', percent: 20 },
  { id: '3', name: 'Гиссар', percent: 20 },
  { id: '3', name: 'Яван', percent: 20 },
];
