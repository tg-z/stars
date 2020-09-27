import "./styles.css";

const URL = "https://api.github.com/users/tg-z/starred?per_page=100";
let starredList = [];
const $search = document.getElementById("search");
const $results = document.getElementById("results");
const $stats = document.getElementById("stats");

const getStarredList = async () => {
  const response = await fetch(URL);
  starredList = await response.json();
  updateStarredList(starredList);
};

const updateStarredList = starredList => {
  const output = starredList
    .map(
      starred =>
        `<li class="starred block rounded p-2 mb-3 bg-white hover:bg-blue-100 leading-loose">
          <a class="text-lg font-normal text-blue-800 hover:underline" target="_blank" href="${starred.html_url}">${starred.name}</a>
          <div class="block">
	  <p class="text-base text-gray-600 leading-normal">${starred.description}</p>
            <code class="inline font-hairline text-sm">${starred.language}</code>
            <code class="inline font-hairline text-sm">${starred.owner.login}<code>
          </div>
        </li>`
    )
    .join("");
  $stats.innerHTML = `Listing ${starredList.length} stars.`;
  $results.innerHTML = output;
};

const runSearch = e => {
  const output = starredList.filter(starred => starred.name.indexOf(e) === 0);
  updateStarredList(output);
};

$search.addEventListener("keyup", e => runSearch(e.target.value));

getStarredList();
