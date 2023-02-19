export function dateFormatter(fullDate) {
  if (fullDate) {
    const [date, time] = fullDate.split("T");
    const [year, month, day] = date.split("-");
    const [hour, minute] = time.split(".")[0].substring(0, 5).split(":");

    let formattedHour;
    if (parseInt(hour) === 23) {
      formattedHour = "00";
    } else if (parseInt(hour) >= 0 && parseInt(hour) < 10) {
      formattedHour = `0${parseInt(hour) + 1}`;
    } else {
      formattedHour = parseInt(hour) + 1;
    }

    return `${day}. ${month}. ${year}. ${formattedHour}:${minute}`;
  }
}
