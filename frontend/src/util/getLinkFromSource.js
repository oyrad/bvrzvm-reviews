export function getLinkFromSource(source, movieId, title) {
  let url = "";
  switch (source) {
    case "Internet Movie Database":
      url = `https://www.imdb.com/title/${movieId}/`;
      break;
    default:
      url = undefined;
  }

  return url;
}
