export function fetchPopularRepos(language) {
  const endpoint = window.encodeURI(
    `https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`
  );

  return fetch(endpoint)
    .then(res => res.json())
    .then(data => {
      //if no items, then something went wrong so throw an error passing error message
      if (!data.items) {
        throw new Error(data.message);
      }

      return data.items;
    });
}
