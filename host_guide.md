# 🚀 Free Hosting Guide — Prahlad Jee 3D Portfolio

This guide explains how to host your 3D Portfolio website online for **100% FREE** with your own custom URL (e.g. `prahladjee.netlify.app`, `prahladjee.vercel.app`, or `prahladjee.github.io`).

---

## ⚡ Option 1: Netlify Drag & Drop (Fastest — 1 Minute)

1. Open **[app.netlify.com/drop](https://app.netlify.com/drop)** in your browser (Sign up for a free Netlify account if needed).
2. Open your file explorer and navigate to your project folder: `f:\porfolio\dist`.
3. **Drag and drop the `dist` folder** directly onto the Netlify webpage.
4. Netlify will instantly deploy your site and provide a free live link like:
   👉 **`https://prahladjee-portfolio.netlify.app`**
5. *(Optional)* Go to Site Settings ➔ Change Site Name to customize your link.

---

## ⚡ Option 2: Vercel (1 Terminal Command)

1. Open PowerShell inside `f:\porfolio`.
2. Run the following command:
   ```powershell
   npx vercel --prod
   ```
3. Follow the quick on-screen login prompts.
4. Vercel will build and deploy your project automatically to:
   👉 **`https://prahladjee.vercel.app`**

---

## ⚡ Option 3: GitHub Pages (Free Forever on GitHub)

1. Create a free repository on GitHub named **`portfolio`** (or `prahladjee.github.io`).
2. Initialize git and push your code:
   ```bash
   git init
   git add .
   git commit -m "Deploy 3D Portfolio for Prahlad Jee"
   git branch -M main
   git remote add origin https://github.com/YOUR_GITHUB_USERNAME/portfolio.git
   git push -u origin main
   ```
3. Install gh-pages deployment package:
   ```bash
   npm install --save-dev gh-pages
   ```
4. Run deployment:
   ```bash
   npx gh-pages -d dist
   ```
5. Your portfolio is live at **`https://YOUR_GITHUB_USERNAME.github.io/portfolio`**!

---

## 📂 Production Build Folder
Your production-ready static files are located at:
`f:\porfolio\dist\`
