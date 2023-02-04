export function dateFormatter(fullDate) {
  if (fullDate) {
    const [date, time] = fullDate.split("T");
    const [year, month, day] = date.split("-");

    return `${day}. ${month}. ${year}. ${time.split(".")[0]}`;
  }
}
