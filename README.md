<h1 align="center">🧠 NudeDetector</h1>

<p align="center">
  <b>A React web app for nudity detection using Sightengine & PicPurify APIs</b><br/>
  Upload images, paste URLs, or drag & drop files. Modern UI with fast, multi-API moderation support.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18.2-blue?style=plastic&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/Node.js-Express-green?style=plastic&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/CSS-Modern%20UI-blue?style=plastic&logo=css3&logoColor=white" />
  <img src="https://img.shields.io/badge/API-Sightengine%20%7C%20PicPurify-purple?style=plastic&logo=apachespark&logoColor=white" />
</p>

---

## 🚀 Features

- 🔎 **Nudity Detection** powered by:
  - 🧠 Sightengine API
  - 🧪 PicPurify API
- 🖼️ Supports:
  - File upload
  - Image URL input
  - Drag-and-drop upload
- 🖌️ Sleek modern UI with dark theme
- ⚡ Fast, responsive frontend using React
- 🔧 Node.js + Express backend API handler

---

## 🌐 Live Demo

> https://nude-detector-pro.vercel.app


---

## 🛠️ Tech Stack

| Frontend        | Backend        | APIs Used         |
|-----------------|----------------|--------------------|
| React           | Node.js        | Sightengine        |
| CSS             | Express        | PicPurify          |

---

## 📦 Installation

1. **Clone the repository**

```bash
git clone https://github.com/mehulkumar22/NudeDetector.git
cd NudeDetector

cd frontend
npm install

cd ../backend
npm install

NudeDetector/
├── backend/              # Express API backend
│   ├── routes/           # API routes for detection
│   └── uploads/          # Temporary image storage
├── frontend/             # React frontend
│   ├── components/       # UI components
│   ├── assets/           # Images and styles
│   └── context/          # API selection context
└── README.md



