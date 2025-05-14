const overview = document.querySelector(".overview");
const username = "EricMCode";
const repoList = document.querySelector(".repo-list");
const allReposContainer = document.querySelector(".repos");
const repoData = document.querySelector(".repo-data");

const githubFetch = async function () {
    try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        const data = await response.json();
        displayUserInfo(data);
    } catch (error) {
        console.error("Error fetching GitHub data:", error);
    }
};

githubFetch();

const displayUserInfo = function(data) {
    const userInfoDiv = document.createElement("div");
    userInfoDiv.classList.add("user-info");
    userInfoDiv.innerHTML =  `
        <figure>
            <img alt="user avatar" src="${data.avatar_url}" />
        </figure>
        <div>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Bio:</strong> ${data.bio}</p>
            <p><strong>Location:</strong> ${data.location}</p>
            <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
        </div> 
    `;
    overview.append(userInfoDiv);
    fetchRepos();
};

const fetchRepos = async function () {
    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
        const repos = await response.json();
        displayRepos(repos);
    } catch (error) {
        console.error("Error fetching repos:", error);
    }
};

const displayRepos = function(repos) {
    for (const repo of repos) {
        const li = document.createElement("li");
        li.classList.add("repo");
        li.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(li);
    }
};

repoList.addEventListener("click", function (e) {
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        fetchSpecificRepo(repoName);
    }
});

const fetchSpecificRepo = async function (repoName) {
    try {
        const response = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
        const repoDetails = await response.json(); // ✅ Renamed to avoid conflict

        const fetchLanguages = await fetch(repoDetails.languages_url);
        const languageData = await fetchLanguages.json();

        const languages = [];
        for (const language in languageData) {
            languages.push(language);
        }

        displayRepoInfo(repoDetails, languages);
    } catch (error) {
        console.error("Error fetching specific repo info:", error);
    }
};

const displayRepoInfo = function(repoDetails, languages) {
    repoData.innerHTML = "";
    const div = document.createElement("div");

    div.innerHTML = `
        <h3>Name: ${repoDetails.name}</h3>
        <p>Description: ${repoDetails.description}</p>
        <p>Default Branch: ${repoDetails.default_branch}</p>
        <p>Languages: ${languages.join(", ")}</p>
        <a class="visit" href="${repoDetails.html_url}" target="_blank" rel="noreferrer noopener">
        View Repo on GitHub!
        </a>
    `;

    repoData.append(div);
    repoData.classList.remove("hide");
    allReposContainer.classList.add("hide"); // ✅ updated from old 'repoInfo'
};
