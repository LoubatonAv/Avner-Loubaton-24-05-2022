import { DayPreview } from './DayPreview';
import { utilService } from '../service/util.service';

export const DayList = ({ results, metric }) => {
  return (
    <div>
      {results[0]?.name}
      <div className='weather-container'>
        {results?.map((day) => (
          <DayPreview key={utilService.makeId()} day={day} metric={metric} />
        ))}
      </div>
    </div>
  );
};
