import axios from 'axios';

export function fetchAttendanceRecords(startDate, endDate) {
  return axios.get('http://10.243.176.227:5000/attendance', {
    params: {
      start_date: startDate,
      end_date: endDate
    }
  });
}