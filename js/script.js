const overview = document.querySelector(".overview");
const username = "EricMCode";
const repoList = document.querySelector(".repo-list");

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
    
    // ✅ Call fetchRepos at the bottom of this function
    fetchRepos();
};

const fetchRepos = async function () {
    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
        const repos = await response.json();
        displayRepos(repos); // ✅ Already correct
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
