# 🐙 GitHub User Finder

A responsive web application built using **HTML**, **CSS** (Glassmorphic Dark Theme), and **Vanilla JavaScript** to search for any GitHub user, view their profile details, statistics, and a list of their latest repositories.

---

## 🚀 Features

- **User Search:** Search for GitHub users by username or partial name, with a live suggestion list feature.
- **Profile Display:** Shows the user's avatar, full name, username, bio, location, and GitHub join date.
- **Key Statistics:** Displays current **followers**, **following count**, and **public repository** count.
- **Latest Repositories:** Dynamically fetches and displays the user's six most recent repositories.
- **Modern Design:** Features a responsive, dark **Glassmorphic** aesthetic.
- **Rate Limit Fix:** Configured to use a Personal Access Token (PAT) to bypass the default unauthenticated GitHub API rate limit (60 requests/hour).

---

## ⚙️ Setup and Installation

This is a client-side application. Follow these steps to set it up locally and ensure API calls function correctly.

### 1. Project Setup

1.  **Clone the Repository:**
    ```bash
    git clone [https://github.com/sarasithagalagama/github-user-finder.git](https://github.com/sarasithagalagama/github-user-finder.git)
    cd github-user-finder
    ```
2.  **Open the Project:** Open the `index.html` file in your web browser to run the application.

### 2. API Configuration (Fixing 403 Errors)

The GitHub API limits unauthenticated requests. To make the search reliable for repeated use, you **must** configure a Personal Access Token (PAT).

1.  **Generate a New PAT:**

    - Go to your GitHub **Settings** $\rightarrow$ **Developer settings** $\rightarrow$ **Personal access tokens (classic)**.
    - Generate a new token. You **do not** need to select any scopes (permissions).
    - **Copy the generated token immediately.**

2.  **Edit `script.js`:** Open the `script.js` file and find the `PAT` variable definition near the top.

    ```javascript
    // In script.js
    const PAT = "YOUR_NEWLY_GENERATED_PAT_HERE";
    ```

3.  **Insert the Token:** Replace the placeholder `'YOUR_NEWLY_GENERATED_PAT_HERE'` with your actual, copied token.

**⚠️ Security Note:** **Never commit your actual PAT** to Git history, especially to this public repository. This token must only exist on your local machine.

---

## 💻 Tech Stack

- **HTML5**
- **CSS3**
- **Vanilla JavaScript (ES6+)**
- **GitHub REST API**
- **Font Awesome**

---

## 📄 License

This project is open source and available under the **MIT License**.
