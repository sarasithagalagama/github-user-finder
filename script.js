const searchInput = document.getElementById("search");
const searchBtn = document.getElementById("search-btn");
const profileContainer = document.getElementById("profile-container");
const errorContainer = document.getElementById("error-container");
const avatar = document.getElementById("avatar");
const nameElement = document.getElementById("name");
const usernameElement = document.getElementById("username");
const bioElement = document.getElementById("bio");
const locationElement = document.getElementById("location");
const joinedDateElement = document.getElementById("joined-date");
const profileLink = document.getElementById("profile-link");
const followers = document.getElementById("followers");
const following = document.getElementById("following");
const repos = document.getElementById("repos");
const companyElement = document.getElementById("company");
const blogElement = document.getElementById("blog");
const twitterElement = document.getElementById("twitter");
const companyContainer = document.getElementById("company-container");
const blogContainer = document.getElementById("blog-container");
const twitterContainer = document.getElementById("twitter-container");
const reposContainer = document.getElementById("repos-container");
const searchContainer = document.querySelector(".search-container");

let suggestionList = null;

searchBtn.addEventListener("click", searchUser);
searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") searchUser();
});

async function searchUser() {
  const query = searchInput.value.trim();

  if (!query) return alert("Please enter a username or name");

  clearSuggestions();
  profileContainer.classList.add("hidden");
  errorContainer.classList.add("hidden");

  let userData = null;

  // Helper function to check response status and throw if not OK
  function checkResponseStatus(response) {
    if (!response.ok) {
      // Throw a specific error based on the status code for better debugging
      if (response.status === 404) {
        throw new Error("User not found (404)");
      } else if (response.status === 403) {
        throw new Error("Rate limit exceeded (403)");
      } else {
        throw new Error(`Request failed with status: ${response.status}`);
      }
    }
    return response;
  }

  // --- STEP 1: Try direct username fetch (most efficient) ---
  try {
    const userResponse = await fetch(`https://api.github.com/users/${query}`);

    // Check status before proceeding
    checkResponseStatus(userResponse);

    userData = await userResponse.json();
  } catch (error) {
    console.error("Step 1 failed:", error.message);
    // If it's a "Rate limit exceeded" error, we will still show the generic error
    // but the console log helps you debug. We intentionally let it fall to Step 2
    // in case the initial search failed for a different reason.
  }

  // --- STEP 2: If direct fetch failed, try search by name/login ---
  if (!userData) {
    try {
      const searchResponse = await fetch(
        `https://api.github.com/search/users?q=${query}+in:login,name&per_page=1`
      );

      // Check status before proceeding
      checkResponseStatus(searchResponse);

      const searchData = await searchResponse.json();

      if (searchData.total_count > 0) {
        const firstUserLogin = searchData.items[0].login;
        const finalResponse = await fetch(
          `https://api.github.com/users/${firstUserLogin}`
        );

        // Check status before proceeding
        checkResponseStatus(finalResponse);

        userData = await finalResponse.json();
      }
    } catch (error) {
      console.error("Step 2 failed:", error.message);
      // If any fetch in step 2 failed (404, 403, or Network), userData remains null
    }
  }

  // --- STEP 3: Display results or error ---
  if (userData) {
    console.log("User data found:", userData);
    displayUserData(userData);
    fetchRepositories(userData.repos_url);
  } else {
    // If userData is still null after both steps, show the error message.
    showError();
  }
}

async function fetchRepositories(reposUrl) {
  reposContainer.innerHTML =
    '<div class="loading-repos">Loading repositories...</div>';

  try {
    const response = await fetch(reposUrl + "?per_page=6");
    const repos = await response.json();
    displayRepos(repos);
  } catch (error) {
    reposContainer.innerHTML = `<div class="no-repos">${error.message}</div>`;
  }
}

function displayRepos(repos) {
  if (repos.length === 0) {
    reposContainer.innerHTML =
      '<div class="no-repos">No repositories found</div>';
    return;
  }

  reposContainer.innerHTML = "";

  repos.forEach((repo) => {
    const repoCard = document.createElement("div");
    repoCard.className = "repo-card";

    const updatedAt = formatDate(repo.updated_at);

    repoCard.innerHTML = `
      <a href="${repo.html_url}" target="_blank" class="repo-name">
        <i class="fas fa-code-branch"></i> ${repo.name}
      </a>
      <p class="repo-description">${
      repo.description || "No description available"
    }</p>
      <div class="repo-meta">
        ${
      repo.language
        ? `
          <div class="repo-meta-item">
            <i class="fas fa-circle"></i> ${repo.language}
          </div>
        `
        : ""
    }
        <div class="repo-meta-item">
          <i class="fas fa-star"></i> ${repo.stargazers_count}
        </div>
        <div class="repo-meta-item">
          <i class="fas fa-code-fork"></i> ${repo.forks_count}
        </div>
        <div class="repo-meta-item">
          <i class="fas fa-history"></i> ${updatedAt}
        </div>
      </div>
    `;

    reposContainer.appendChild(repoCard);
  });
}

function displayUserData(user) {
  errorContainer.classList.add("hidden");

  avatar.src = user.avatar_url;
  nameElement.textContent = user.name || user.login;
  usernameElement.textContent = `@${user.login}`;
  bioElement.textContent = user.bio || "No bio available";

  locationElement.textContent = user.location || "Not specified";
  joinedDateElement.textContent = formatDate(user.created_at);

  profileLink.href = user.html_url;
  followers.textContent = user.followers;
  following.textContent = user.following;
  repos.textContent = user.public_repos;

  if (user.company) companyElement.textContent = user.company;
  else companyElement.textContent = "Not specified";

  if (user.blog) {
    blogElement.textContent = user.blog;
    blogElement.href = user.blog.startsWith("http")
      ? user.blog
      : `https://${user.blog}`;
  } else {
    blogElement.textContent = "No website";
    blogElement.href = "#";
  }

  blogContainer.style.display = "flex";

  if (user.twitter_username) {
    twitterElement.textContent = `@${user.twitter_username}`;
    twitterElement.href = `https://twitter.com/${user.twitter_username}`;
  } else {
    twitterElement.textContent = "No Twitter";
    twitterElement.href = "#";
  }

  twitterContainer.style.display = "flex"; // show the profile

  profileContainer.classList.remove("hidden");
}

function showError() {
  errorContainer.classList.remove("hidden");
  profileContainer.classList.add("hidden");
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

searchInput.value = "sarasithagalagama";
searchUser();

// --- DEBOUNCE UTILITY FUNCTION ---
function debounce(func, delay) {
  let timeout;
  return function (...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), delay);
  };
}

// --- NEW SUGGESTION LOGIC ---

async function fetchSuggestions(query) {
  if (query.length < 3) {
    clearSuggestions();
    return;
  } // Use the GitHub Search API. We search the login field primarily, // but the search query also matches the user's name field. // We also sort by the number of followers to get more relevant results.

  const apiUrl = `https://api.github.com/search/users?q=${query}+in:login,name&per_page=5&sort=followers`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error("Search failed");

    const data = await response.json(); // The items in the data array will now include users whose names match the query.
    displaySuggestions(data.items);
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    clearSuggestions();
  }
}

function displaySuggestions(users) {
  // Clear previous suggestions
  clearSuggestions();

  if (users.length === 0) return; // Create the list element if it doesn't exist

  if (!suggestionList) {
    suggestionList = document.createElement("ul");
    suggestionList.className = "suggestion-list";
    searchContainer.appendChild(suggestionList);
  }

  users.forEach((user) => {
    const listItem = document.createElement("li");
    listItem.textContent = user.login;
    listItem.addEventListener("click", () => {
      searchInput.value = user.login;
      searchUser();
      clearSuggestions();
    });
    suggestionList.appendChild(listItem);
  });
}

function clearSuggestions() {
  if (suggestionList) {
    suggestionList.remove();
    suggestionList = null;
  }
}

// --- EVENT LISTENERS (UPDATED) ---

searchBtn.addEventListener("click", searchUser);
searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") searchUser();
});

// Create a debounced version of the fetchSuggestions function
const debouncedFetchSuggestions = debounce(fetchSuggestions, 300);

// Add listener to the input field
searchInput.addEventListener("input", () => {
  const query = searchInput.value.trim();
  if (query) {
    debouncedFetchSuggestions(query);
  } else {
    clearSuggestions();
  }
});
