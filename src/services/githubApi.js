const BASE_URL = "https://api.github.com";

export const githubApi = {
  // Helper to handle response status
  async handleResponse(response) {
    if (!response.ok) {
      if (response.status === 404) throw new Error("User not found (404)");
      if (response.status === 403)
        throw new Error(
          "Rate limit exceeded. Please wait a while or use a different network."
        );
      throw new Error(`Request failed: ${response.status}`);
    }
    return response.json();
  },

  // 1. Search User (Step 1: Direct, Step 2: Search API)
  async searchUser(query) {
    if (!query) throw new Error("Please enter a username or name");

    try {
      // Try direct username fetch
      const response = await fetch(`${BASE_URL}/users/${query}`);
      return await this.handleResponse(response);
    } catch (err) {
      console.log("Direct fetch failed, trying search...", err.message);

      // Fallback: Search by login/name
      const searchRes = await fetch(
        `${BASE_URL}/search/users?q=${query}+in:login,name&per_page=1`
      );
      const searchData = await this.handleResponse(searchRes);

      if (searchData.total_count > 0) {
        // Fetch full profile of best match
        const login = searchData.items[0].login;
        const profileRes = await fetch(`${BASE_URL}/users/${login}`);
        return await this.handleResponse(profileRes);
      } else {
        throw new Error("User not found");
      }
    }
  },

  // 2. Fetch Repositories
  async getUserRepos(reposUrl) {
    const response = await fetch(`${reposUrl}?per_page=6`);
    return this.handleResponse(response);
  },

  // 3. Fetch Suggestions (Autocomplete)
  async getSuggestions(query) {
    if (query.length < 3) return [];

    // Search users by login (primary) and name, sorted by followers
    const response = await fetch(
      `${BASE_URL}/search/users?q=${query}+in:login,name&per_page=5&sort=followers`
    );
    const data = await this.handleResponse(response);
    return data.items || [];
  },

  // 4. Fetch Trending Repos (Classroom)
  async getTrendingRepos(topic = "education") {
    const response = await fetch(
      `${BASE_URL}/search/repositories?q=topic:${topic}+sort:stars&per_page=6`
    );
    const data = await this.handleResponse(response);
    return data.items || [];
  },
};
