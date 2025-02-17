# ProjectFlow
The ProjectFlow is a web application designed to help collaborations, group projects and other teamwork activities. It is a platform where team members can manage schedules, share files, communicate, track progress, and organize tasks (to-do's). The platform will be designed to solve issues such as disorganized communication, difficulty tracking responsibilities, and scattered information.

## Creating a Branch on GitHub
1. Go to your repository on GitHub.
2. Click on the **main** branch dropdown (top left near the repository name).
3. Type a new branch name in the input field.
4. Click **Create branch** from "main" (or any other branch you're working from).

## Creating a Branch Using Git Command Line
1. Open a terminal or Git Bash.
2. Navigate to your project folder:
   ```sh
   cd path/to/your/repo
   ```
3. Create a new branch:
   ```sh
   git branch branch-name
   ```
4. Switch to the new branch:
   ```sh
   git checkout branch-name
   ```
   **OR** (shortcut for creating and switching in one step):
   ```sh
   git checkout -b branch-name
   ```

## Pushing the Branch to GitHub
Once you've created a branch locally, push it to GitHub:
```sh
git push -u origin branch-name
```

