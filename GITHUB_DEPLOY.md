# Publish Datespot on GitHub Pages

This repository includes `.github/workflows/deploy.yml`, which automatically builds and publishes the site when you push to the `main` branch. You can also trigger it from the **Actions** tab.

## First-time setup

1. Create a GitHub repository, for example `datespot-website`.
2. Upload **the contents of the `Datespot-game-edition-main` folder to the repository root**. Make sure `.github/workflows/deploy.yml`, `package.json`, `pnpm-lock.yaml`, and `vite.config.ts` are at the root. GitHub's web uploader might hide files or folders starting with a dot; if needed, use Git or VS Code to commit the full folder including `.github`.
3. Under **Settings > Pages > Build and deployment**, choose **Source: GitHub Actions**.
4. In **Actions**, select **Deploy Datespot to GitHub Pages** and click **Run workflow**, or push to `main`.
5. Wait for the green checkmark, then open the site from the deployment URL shown in the workflow or the repository's Pages settings.

**Default website URL:** `https://YOUR-USERNAME.github.io/YOUR-REPOSITORY/`.

## Custom domain

If you use a verified custom domain such as `datespot.in`, configure it in GitHub **Settings > Pages**, and create `public/CNAME` containing only the domain, e.g. `datespot.in`. Set DNS records as instructed by GitHub. The workflow detects `public/CNAME` and builds with `/` as the base URL. Without a custom domain, the workflow automatically chooses the proper repository subpath. A repository named `YOUR-USERNAME.github.io` also builds at `/`.

## Local preview

```bash
corepack enable
pnpm install
pnpm dev
```

## Notes

- GitHub Pages is public hosting. Do not commit secrets or private customer/payment information.
- This workflow only builds and publishes the website; it does **not** verify payments or change the existing payment screenshot flow.
- The membership fee remains **₹899** as configured in the source.
