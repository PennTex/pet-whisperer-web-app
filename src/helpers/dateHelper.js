/**
 * Takes in two date objects and makes a new date using the date from
 *  the first object and time from the second. 
 * @param {Date} date 
 * @param {Date} time 
 */
export function dateTimeMerge(date, time) {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    time.getHours(),
    time.getMinutes(),
    time.getSeconds()
  );
}