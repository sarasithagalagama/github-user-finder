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
const searchContainer = document.querySelector(".search-wrapper");
const welcomeContainer = document.getElementById("welcome-container");
const appLayout = document.querySelector(".app-layout");
const navBtns = document.querySelectorAll(".nav-btn");
const views = document.querySelectorAll(".view-section");
const classroomFeed = document.getElementById("classroom-feed");
const topicBtns = document.querySelectorAll(".topic-btn");
const trendingTitle = document.getElementById("trending-title");

let suggestionList = null;

// Note: We are using the public GitHub API which has a rate limit of 60 requests per hour for unauthenticated requests.
// ----------------------------------------------------------------------

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
  welcomeContainer.classList.add("hidden");
  appLayout.classList.add("search-active");

  let userData = null; // Helper function to check response status and throw if not OK

  function checkResponseStatus(response) {
    if (!response.ok) {
      // Throw a specific error based on the status code for better debugging
      if (response.status === 404) {
        throw new Error("User not found (404)");
      } else if (response.status === 403) {
        throw new Error(
          "Rate limit exceeded. Please wait a while before searching again."
        );
      } else {
        throw new Error(`Request failed with status: ${response.status}`);
      }
    }
    return response;
  } // --- STEP 1: Try direct username fetch (most efficient) ---

  try {
    // --- 2A: Headers added ---
    const userResponse = await fetch(`https://api.github.com/users/${query}`); // Check status before proceeding

    checkResponseStatus(userResponse);

    userData = await userResponse.json();
  } catch (error) {
    console.error("Step 1 failed:", error.message);
  } // --- STEP 2: If direct fetch failed, try search by name/login ---

  if (!userData) {
    try {
      // --- 2B: Headers added ---
      const searchResponse = await fetch(
        `https://api.github.com/search/users?q=${query}+in:login,name&per_page=1`
      ); // Check status before proceeding

      checkResponseStatus(searchResponse);

      const searchData = await searchResponse.json();

      if (searchData.total_count > 0) {
        const firstUserLogin = searchData.items[0].login; // --- 2C: Headers added ---
        const finalResponse = await fetch(
          `https://api.github.com/users/${firstUserLogin}`
        ); // Check status before proceeding

        checkResponseStatus(finalResponse);

        userData = await finalResponse.json();
      }
    } catch (error) {
      console.error("Step 2 failed:", error.message);
    }
  } // --- STEP 3: Display results or error ---

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
    // --- 4: Headers added ---
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
    welcomeContainer.classList.remove("hidden");
    profileContainer.classList.add("hidden");
    errorContainer.classList.add("hidden");
    appLayout.classList.remove("search-active");
  }
});

// --- NAVIGATION & CLASSROOM LOGIC ---

navBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // 1. Update Buttons
    navBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    // 2. Switch Views
    const targetViewId = `view-${btn.dataset.view}`;
    views.forEach((view) => {
      if (view.id === targetViewId) {
        view.classList.remove("hidden");
      } else {
        view.classList.add("hidden");
      }
    });

    // 3. Handle specific view logic
    // 3. Handle specific view logic
    if (btn.dataset.view === "classroom") {
      appLayout.classList.add("search-active"); // Classroom should always be top-aligned
      // Load trending if empty
      if (classroomFeed.innerHTML.includes("Fetching")) {
        fetchTrendingEducation();
      }
    } else {
      // If returning to search, check if we should be in Top-Aligned (Results) or Center (Welcome) mode
      if (!profileContainer.classList.contains("hidden")) {
        appLayout.classList.add("search-active");
      } else {
        appLayout.classList.remove("search-active");
      }
    }
  });
});

// --- TOPIC EXPLORER LOGIC ---

topicBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Update Active Button
    topicBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    // Fetch New Topic
    const topic = btn.dataset.topic;
    const displayName = btn.textContent;
    trendingTitle.innerHTML = `Trending in ${displayName}`;
    fetchTrendingEducation(topic);
  });
});

async function fetchTrendingEducation(topic = "education") {
  classroomFeed.innerHTML =
    '<div class="loading-repos">Fetching trending resources...</div>';

  // Search for repositories with specific topic, sorted by stars
  const apiUrl = `https://api.github.com/search/repositories?q=topic:${topic}+sort:stars&per_page=6`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error("Failed to load trending items");
    const data = await response.json();
    displayClassroomRepos(data.items);
  } catch (error) {
    classroomFeed.innerHTML = `<div class="no-repos">Could not load trending resources. (${error.message})</div>`;
  }
}

function displayClassroomRepos(repos) {
  if (!repos || repos.length === 0) {
    classroomFeed.innerHTML =
      '<div class="no-repos">No trending repos found.</div>';
    return;
  }

  classroomFeed.innerHTML = "";

  repos.forEach((repo) => {
    const repoCard = document.createElement("div");
    repoCard.className = "repo-card";

    const updatedAt = formatDate(repo.updated_at);

    repoCard.innerHTML = `
      <a href="${repo.html_url}" target="_blank" class="repo-name">
        <i class="fas fa-book"></i> ${repo.name}
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

    classroomFeed.appendChild(repoCard);
  });
}
