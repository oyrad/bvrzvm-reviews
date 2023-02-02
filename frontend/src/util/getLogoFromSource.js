import imdb from "../images/imdb-logo.webp";
import rotten from "../images/rotten-logo.png";
import meta from "../images/meta-logo.png";

export function getLogoFromSource(source) {
  let logo;
  switch (source) {
    case "Internet Movie Database":
      logo = imdb;
      break;
    case "Rotten Tomatoes":
      logo = rotten;
      break;
    case "Metacritic":
      logo = meta;
      break;
    default:
      logo = null;
  }

  return logo;
}
