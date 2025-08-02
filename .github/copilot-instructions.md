# Copilot Instructions

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Project Overview

This is a Next.js TypeScript project for generating profile pictures by combining user-uploaded images with a static helmet image using OpenAI's image editing API.

## Key Technologies

- Next.js 15 with App Router
- TypeScript
- Tailwind CSS
- OpenAI API for image generation/editing
- File upload handling for images

## Project Structure

- `/src/app` - Next.js App Router pages and API routes
- `/src/components` - Reusable React components
- `/src/lib` - Utility functions and OpenAI client setup
- `/public` - Static assets including helmet.png

## Coding Guidelines

- Use TypeScript with strict type checking
- Follow Next.js App Router patterns
- Use Tailwind CSS for styling
- Implement proper error handling for file uploads and API calls
- Use server actions for OpenAI API calls to keep API keys secure
- Follow React best practices for component composition

## API Integration

- Use OpenAI's images.edit endpoint for combining images
- Handle file uploads securely on the server side
- Implement proper error boundaries and loading states
- Use environment variables for sensitive data like API keys
