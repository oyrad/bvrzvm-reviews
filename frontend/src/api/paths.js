export const routes = {
  DASHBOARD: "/",
  SEARCH: (query) => `/search/${query}`,
  MOVIE: (id) => `/movie/${id}`,
  USER: (id) => `/user/${id}`,
};
