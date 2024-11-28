import { FC } from 'react';
import { TUserStatistics } from './types';

export const UserStatistics: FC<{ data?: TUserStatistics }> = ({ data }) => {
  if (!data) {
    return <p>Данные статистики недоступны.</p>;
  }

  return (
    <section>
      <h2 className="text-2xl font-bold">Общая статистика</h2>
      <div className="mb-4">
        <h3 className="text-lg font-semibold">
          Общее количество пользователей:
        </h3>
        <p>{data.totalUsers}</p>
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Пользователи по полу:</h3>
        <ul>
          {data.usersByGender.map((genderStat) => (
            <li key={genderStat.gender}>
              {genderStat.gender}: {genderStat.count}
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Пользователи по ролям:</h3>
        <ul>
          {data.usersByRole.map((roleStat) => (
            <li key={roleStat.role}>
              {roleStat.role}: {roleStat.count}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="text-lg font-semibold">Пользователи по районам:</h3>
        <ul>
          {data.usersByDistrict.map((districtStat) => (
            <li key={districtStat.district}>
              {districtStat.district}: {districtStat.count}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
