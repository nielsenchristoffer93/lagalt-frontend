
/**
 * Get the time passed since a project, chatmessage or discussionboard message was posted.
 *
 * @param {*} timestamp The time to format
 * @returns The converted time followed by either, "days ago", "h ago" or "m ago"
 */
 export const getTimeSinceCreation = (timestamp) => {
  const currentTime = new Date();

  let diffInMilliSeconds = Math.abs(currentTime - Date.parse(timestamp)) / 1000;

  const days = Math.floor(diffInMilliSeconds / 86400);

  // calculate hours
  const hours = Math.floor(diffInMilliSeconds / 3600) % 24;

  // calculate minutes
  const minutes = Math.floor(diffInMilliSeconds / 60) % 60;

  if (days >= 1) {
      return `${days} days ago`
  } else if (hours >= 1) {
      return `${hours} h ago`
  } else {
      return `${minutes} m ago`
  }
}

/**
* Converts a date to the format YYYY-MM-DD
*
* @param {*} date The date to convert
* @returns formatted date (YYYY-MM-DD)
*/
export const dateFormatter = (date) => {
  let d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2)
      month = '0' + month;
  if (day.length < 2)
      day = '0' + day;

  return [year, month, day].join('-');
}