# WorkLog App

All of us need Todo Apps to get our work done and organized. But what about a Todo WorkLog app that has the ability to store resources such as Website Links, YouTube Links, Images, and text, that can be accessed anytime and can be dragged and dropped into either a To Do, In Progress, or Completed section of the app.

## Overview

### Watch the Demo

[![Watch the video](https://img.youtube.com/vi/ayTJg89-rVI/0.jpg)](https://www.youtube.com/watch?v=ayTJg89-rVI)

*A quick walkthrough of the Work Log App and its features.*

WorkLog is a productivity tool designed to help you visually manage your tasks and reference materials in one place. It features a Kanban-style board and a resource archive to capture and repurpose useful content into actionable tasks.

## Features

- Drag-and-drop Kanban system for managing tasks
- Resource Grid for saving:
  - Website URLs with live previews
  - YouTube links with embedded players
  - Uploaded images (stored locally in the browser)
  - Plain text notes
- Easily move resources into your task list as To Do, In Progress, or Completed items
- Local data persistence using IndexedDB
- "Clear All" functionality with confirmation modal

## Project Structure

```
/components
  ├── DraggableItem/
  ├── DropZone/
  ├── ResourceInput/
  ├── ui/
  └── utils/

/pages
  └── index.tsx (or Homepage.tsx)

/utils
  ├── indexedDbUtils.ts
  └── urlUtils.ts
```

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/AbhinavChandra7020/work-log-app
cd work-log-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

### 4. Build for production

```bash
npm run build
```

## Tech Stack

- Next.js with TypeScript
- Tailwind CSS for styling
- Lucide Icons for interface icons
- Microlink API for website previews
- IndexedDB for persistent local storage

## License

MIT License © 2025 Abhinav Chandra