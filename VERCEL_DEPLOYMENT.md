# Deploying Heystack to Vercel

Your code has been successfully pushed to **[https://github.com/Casper-sa/Heystackdemo](https://github.com/Casper-sa/Heystackdemo)**.

Follow these steps to deploy your live demo:

1.  **Log in to Vercel**: Go to [vercel.com](https://vercel.com) and log in (likely with your GitHub account).
2.  **Add New Project**:
    *   Click the **"Add New..."** button on your dashboard.
    *   Select **"Project"**.
3.  **Import Repository**:
    *   You should see `Heystackdemo` in the list of repositories.
    *   Click **"Import"** next to it.
4.  **Configure Project**:
    *   **Framework Preset**: Vercel should automatically detect **Next.js**.
    *   **Root Directory**: Leave as `./`.
    *   **Build Command**: Leave default (`next build`).
    *   **Environment Variables**: You don't have any critical secrets for this demo (Open-Meteo is public), so you can skip this.
5.  **Deploy**:
    *   Click **"Deploy"**.
    *   Wait about a minute for the build to complete.

🎉 **Success!** You will get a live URL (e.g., `heystackdemo.vercel.app`) to share.
