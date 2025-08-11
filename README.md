# AI Image Generation App

A full-stack AI image generation application that leverages Stable Diffusion via Hugging Face or Replicate to create visually stunning images from user prompts.  
Built with **React.js**, **Node.js**, **Express**, and **MongoDB**.

## Features
- Generate images from text prompts using Stable Diffusion.
- "Surprise Me" prompts for creative inspiration.
- Share creations with the community.
- Filter posts by creator name.
- Search posts by prompt or creator.
- Masonry-style responsive image grid for a visually appealing layout.
- Smooth hover effects on interactive buttons.
- Secure backend API for image generation and retrieval.
- Image hosting and storage with Cloudinary.
- Environment variables managed via `.env` for secure configuration.

## Tech Stack
- **Frontend:** React.js, CSS (custom styling with hover animations, masonry grid layout)
- **Backend:** Node.js, Express
- **Database:** MongoDB (Mongoose for schema and queries)
- **Image Hosting:** Cloudinary
- **AI Models:** Stable Diffusion via Hugging Face API or Replicate API

## Project Structure
- **Frontend** (`/client`):
  - React components for image display, filtering, and creation.
  - Masonry grid layout for displaying images.
  - Smooth UI transitions and hover effects.
- **Backend** (`/server`):
  - Express routes for post creation, retrieval, and AI image generation.
  - Integration with Hugging Face or Replicate for AI inference.
  - Cloudinary integration for storing generated images.

## Current Progress
- Implemented full CRUD for posts with MongoDB and Express.
- Added Hugging Face API integration for image generation.
- Configured Cloudinary for storing generated images.
- Built React frontend with:
  - Masonry-style post grid
  - User filtering
  - "Create Post" page with prompt input
- Handled API errors with clear messages for Hugging Face failures.
- Protected all secrets in `.env` file.

## Future Improvements
- Current Hugging Face API endpoint is temporarily unavailable due to credit limitations; exploring alternative solutions.
