const id = "YOUR_CLIENT_ID";
const sec = "YOUR_SECRET_ID";
const params = `?client_id=${id}&client_secret=${sec}`;

function getErrorMsg(message, username) {
  if (message === "Not Found") {
    return `${username} doesn't exist`;
  }
  return message;
}

function getProfile(username) {
  return fetch(`https://api.github.com/users/${username}${params}`)
    .then(res => res.json())
    .then(profile => {
      if (profile.message) {
        throw new Error(getErrorMsg(profile.message, username));
      }
      return profile;
    });
}

function getRepos(username) {
  return fetch(
    `https://api.github.com/users/${username}/repos${params}&per_page=100`
  )
    .then(res => res.json())
    .then(repos => {
      if (repos.message) {
        //when you throw, it auto returns from function
        throw new Error(getErrorMsg(repos.message, username));
      }
      return repos;
    });
}

//repos is an array of repos, each has a specific property called stargazers_count - how many stars the repo has. loop over all repos and add these up
//using reduce - *always put start first  0 or {}
function getStarCount(repos) {
  return repos.reduce(
    (count, { stargazers_count }) => count + stargazers_count,
    0
  );
}

function calculateScore(followers, repos) {
  return followers * 3 + getStarCount(repos);
}

//Promise.all allows us to pass to it an array of promises- so our array will have an invocation of getProfile which returns a promise as well as getrepos which also returns a promise
//When this resolves, our then function will be called and will be passed an array w first item in array being w/e resolves to
//array destructuring & implicit return
function getUserData(player) {
  return Promise.all([getProfile(player), getRepos(player)]).then(
    ([profile, repos]) => ({
      profile,
      score: calculateScore(profile.followers, repos)
    })
  );
}

function sortPlayers(players) {
  return players.sort((a, b) => b.score - a.score);
}

//players is an array player 1 & 2
export function battle(players) {
  return Promise.all([getUserData(players[0]), getUserData(players[1])]).then(
    results => sortPlayers(results)
  );
}

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
