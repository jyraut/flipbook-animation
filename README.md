# 📖 Angular PDF Flipbook Viewer

An interactive and responsive Flipbook-style PDF Viewer built using **Angular** and **PDF.js**. This project simulates a realistic book-reading experience with animated page turns and supports both desktop and mobile views.

---

## ✨ Features

- 📚 **Flipbook Layout**: View PDF pages with realistic left-right page flipping
- 📱 **Responsive Design**:
  - **Desktop**: Two-page spread view (Page 2 on the left, Page 3 on the right)
  - **Mobile**: One page at a time with sequential flipping
- ⚙️ **PDF.js Integration**: Pages rendered into HTML `<canvas>` elements for high fidelity
- 🎨 **Smooth Animations**: CSS 3D transforms simulate real page turns
- 🚀 **Fast Navigation**: Forward and backward flipping with click/touch
- 🔍 **Z-Index Layering**: Ensures correct page stack order

---

## 🛠 Tech Stack

- **Angular**
- **TypeScript**
- **PDF.js (`pdfjs-dist`)**
- **SCSS**

---

## 📂 Folder Structure
src/
└── app/
└── flipbook-animation/
├── flipbook-animation.component.ts
├── flipbook-animation.component.html
└── flipbook-animation.component.scss
assets/
├── NoTailCat.pdf # Sample PDF file
└── pdfjs/pdf.worker.min.js # PDF.js worker file

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/angular-pdf-flipbook.git
cd angular-pdf-flipbook

#Install Dependencies
npm install

#Run the App
ng serve

#Then, open your browser and go to:
👉 http://localhost:4200