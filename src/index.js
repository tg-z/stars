import "./styles.css";

const username = "tg-z"
const URL = "https://api.github.com/users/tg-z/starred?per_page=100"
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
          <a class="text-lg font-normal text-blue-800 hover:underline" target="_blank" href="${starred.html_url}">${starred.full_name}</a>
          <div class="block">
	  <p class="text-base text-gray-600 leading-normal">${starred.description}</p>
	  <!-- <div class="box-sizing border-box"> -->
<div class="col-start-1 row-start-2 px-4 sm:pb-16">
    <div class="flex items-center text-sm font-medium my-5 sm:mt-2 sm:mb-4">
    <div class="inline text-base text-gray-500 leading-normal">${starred.language} </div>
      <svg aria-label="star" width="10" height="10" class="octicon octicon-star" viewBox="0 0 16 16" version="1.1">
      <path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"
      />
      </svg>
      <div class="ml-1">
        <span class="text-gray-500 normal">${starred.stargazers_count}</span>
      </div>
    </div>
  </div>
          <div class="inline text-base text-gray-500 leading-normal">${starred.language}</div>

<!-- <svg aria-label="star" class="octicon octicon-star" viewBox="0 0 16 16" version="1.1" width="10" height="10" role="img"><path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"/></svg><p class="text-base text-gray-600 normal">${starred.stargazers_count}</p> -->
          </div>
	  </div>
          </div>
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
