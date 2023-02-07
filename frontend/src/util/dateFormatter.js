export function dateFormatter(fullDate) {
  if (fullDate) {
    const [date, time] = fullDate.split("T");
    const [year, month, day] = date.split("-");
    const [hour, minute] = time.split(".")[0].substring(0, 5).split(":");

    return `${day}. ${month}. ${year}. ${parseInt(hour) + 1}:${minute}`;
  }
}
