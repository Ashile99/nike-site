# GitHub Setup Guide

Follow these steps to upload your project to GitHub:

## Creating a New Repository on GitHub

1. Go to [GitHub](https://github.com) and sign in (or create an account if you don't have one)
2. Click the "+" button in the top-right corner, then select "New repository"
3. Name your repository (e.g., "shoe-ecommerce")
4. Optionally add a description
5. Choose whether to make it public or private
6. Skip the initialization options (don't add README, .gitignore, or license at this stage)
7. Click "Create repository"

## Uploading Your Code to GitHub

### Option 1: Using the GitHub Web Interface (Easiest)

1. After creating the empty repository, you'll see a page with setup instructions
2. Look for the "uploading an existing file" link
3. Click it and you'll be taken to a page where you can drag and drop files
4. Extract the ZIP file you downloaded from Replit
5. Drag all the extracted files and folders to the GitHub upload area
6. Add a commit message like "Initial commit"
7. Click "Commit changes"

### Option 2: Using Git Command Line (For Developers)

If you're comfortable with Git:

1. Extract the downloaded ZIP file to a folder on your computer
2. Open a terminal/command prompt and navigate to that folder
3. Run the following commands (replace `YOUR_USERNAME` and `YOUR_REPO` with your GitHub username and repository name):

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

## After Upload

Once your code is on GitHub:

1. You can now share the repository URL with others
2. Enable GitHub Pages if you want to deploy the static part of your site
3. Add collaborators if you're working with a team
4. Set up GitHub Actions for CI/CD pipelines

## Important Notes

- The repository includes a `.gitignore` file that excludes sensitive files like `.env`
- Make sure not to commit any sensitive credentials or API keys
- If you need to add environment variables for deployment, use GitHub Secrets or the deployment platform's environment variable management system