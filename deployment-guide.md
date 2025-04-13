# Deployment Guide for Portfolio Website

This guide will help you deploy your portfolio website to a hosting service. There are several options available, but we'll focus on the most popular and user-friendly ones.

## Option 1: Deploy to Netlify (Recommended)

Netlify is a popular platform for deploying static websites with a generous free tier.

### Steps:

1. **Create a GitHub repository** (if you haven't already)
   - Create a new repository on GitHub
   - Push your code to the repository

2. **Sign up for Netlify**
   - Go to [Netlify](https://www.netlify.com/) and sign up (you can use your GitHub account)
   - Click "New site from Git"
   - Select GitHub as your Git provider
   - Authorize Netlify to access your GitHub account
   - Select your portfolio repository
   - Configure build settings (for a static site, you can leave these as default)
   - Click "Deploy site"

3. **Configure your domain**
   - Once deployed, Netlify will give you a random subdomain (e.g., `your-portfolio.netlify.app`)
   - To use a custom domain:
     - Go to "Domain settings" in your Netlify dashboard
     - Click "Add custom domain"
     - Follow the instructions to set up your domain

## Option 2: Deploy to GitHub Pages

GitHub Pages is a free hosting service provided by GitHub for static websites.

### Steps:

1. **Create a GitHub repository** (if you haven't already)
   - Name it `username.github.io` (replace `username` with your GitHub username)
   - Push your code to the repository

2. **Enable GitHub Pages**
   - Go to your repository settings
   - Scroll down to the "GitHub Pages" section
   - Select the branch you want to deploy (usually `main` or `master`)
   - Click "Save"
   - Your site will be available at `https://username.github.io`

3. **Configure a custom domain** (optional)
   - In your repository settings, under "GitHub Pages"
   - Enter your custom domain in the "Custom domain" field
   - Follow the instructions to set up DNS records

## Option 3: Deploy to Vercel

Vercel is another excellent platform for deploying static websites with a generous free tier.

### Steps:

1. **Sign up for Vercel**
   - Go to [Vercel](https://vercel.com/) and sign up (you can use your GitHub account)
   - Click "New Project"
   - Import your GitHub repository
   - Configure project settings (for a static site, you can leave these as default)
   - Click "Deploy"

2. **Configure your domain**
   - Once deployed, Vercel will give you a subdomain (e.g., `your-portfolio.vercel.app`)
   - To use a custom domain:
     - Go to "Project Settings" > "Domains"
     - Add your custom domain and follow the instructions

## Pre-Deployment Checklist

Before deploying, make sure you've completed the following:

- [x] Removed all console.log statements (except for error handling)
- [x] Updated all placeholder links
- [x] Checked that the contact form works correctly
- [x] Verified that all animations work properly
- [x] Updated the copyright year
- [x] Tested the website on different devices and browsers
- [ ] Added appropriate meta tags for SEO
- [ ] Compressed images for faster loading
- [ ] Added a favicon

## Post-Deployment Tasks

After deploying your website, don't forget to:

1. **Test your live website**
   - Check all links and functionality
   - Test the contact form on the live site
   - Verify that all animations and interactions work

2. **Set up analytics** (optional)
   - Consider adding Google Analytics or a similar service to track visitors

3. **Submit your site to search engines** (optional)
   - Submit your sitemap to Google Search Console
   - Submit your site to Bing Webmaster Tools

4. **Share your portfolio**
   - Update your LinkedIn profile with your new portfolio URL
   - Add the URL to your resume
   - Share on social media

## Troubleshooting Common Issues

### Contact Form Not Working

If your contact form doesn't work after deployment:

1. Check that EmailJS is properly configured
2. Verify that your EmailJS service and template IDs are correct
3. Make sure your EmailJS account is active
4. Check the browser console for any errors

### Slow Loading Times

If your website loads slowly:

1. Compress images using tools like [TinyPNG](https://tinypng.com/)
2. Minify CSS and JavaScript files
3. Consider using a CDN for large assets

### Broken Links

If you have broken links:

1. Check all URLs in your HTML
2. Make sure all file paths are correct
3. Verify that all external links are working

## Need Help?

If you encounter any issues during deployment, feel free to reach out for assistance.

Good luck with your portfolio website deployment!
