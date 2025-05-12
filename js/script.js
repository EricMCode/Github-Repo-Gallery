const overview = document.querySelector(".overview");
const username = "EricMCode";

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
};
