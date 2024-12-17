// 5.16 Функции возвращаются
const parseTime = (time) => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

const inWorkRange = (startWork, endWork, startMeeting, duration) => {
  const workStart = parseTime(startWork);
  const workEnd = parseTime(endWork);
  const meetingStart = parseTime(startMeeting);
  const meetingEnd = meetingStart + duration;

  return meetingStart >= workStart && meetingEnd <= workEnd;
};

console.log(inWorkRange('08:00', '17:30', '14:00', 90)); // true
console.log(inWorkRange('8:0', '10:0', '8:0', 120)); // true
console.log(inWorkRange('08:00', '14:30', '14:00', 90)); // false
console.log(inWorkRange('14:00', '17:30', '08:0', 90)); // false
console.log(inWorkRange('8:00', '17:30', '08:00', 900)); // false
