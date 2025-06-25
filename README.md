# 🧵 Textile Admin Dashboard

An admin dashboard web application built for managing textile product inventory, orders, delivery tracking, expenses, reviews, and advertisements. Designed with React, React-Bootstrap, and Material-UI to deliver a modern, responsive, and intuitive interface.

---

## 🚀 Features

- 📦 Upload & manage textile products
  - Add product variants with colors, sizes, and quantities
  - Preview product before final submission
- 📊 Dashboard with real-time analytics
  - Sales graph (Line chart)
  - Revenue (Bar chart)
- 📋 Manage orders & delivery tracking
- 💰 Expense management
- 🌟 Reviews and Ratings section
- 📣 Advertisement banners with image upload
- 🧭 Sidebar navigation with dynamic routing

---

## 🛠 Tech Stack

- **Frontend**: React, React Router, React-Bootstrap, MUI (Material UI)
- **Charts**: Chart.js (for line/bar charts), Recharts (for radial charts)
- **State**: useState, useEffect (React Hooks)
- **Image Upload**: react-dropzone
- **Color Picker**: react-color (SketchPicker)
- **Routing**: `react-router-dom` v6+

---

## 📁 Folder Structure

src/
│
├── assets/ # Icons & product images
├── components/ # Reusable components (Navbar, Sidebar, Cards, etc.)
├── scenes/ # Pages (Dashboard, UploadProducts, Orders, etc.)
│ ├── uploadProducts/
│ │ ├── UploadForm.jsx
│ │ ├── ProductTable.jsx
│ │ └── ProductPreview.jsx
├── App.jsx # Router setup
├── index.js # React root entry
└── styles/ # Global styles (CSS/SASS)

---

📦 Installation

``bash
1. Clone the repository
git clone https://github.com/yourusername/textile-admin.git
cd textile-admin

2. Install dependencies
npm install

3. Start development server
npm run dev
This project uses Vite for blazing fast builds and HMR.

⚙️ Deployment
To build the project for production:

npm run build
Then deploy the contents of the dist/ folder to any static hosting service like:

Vercel

Netlify

GitHub Pages

📱 PWA & Icons
Custom favicons for multiple screen sizes are included

manifest.json and site.webmanifest ready for progressive web app setup

🙋‍♂️ Author
Prakash S.
Frontend Developer | React Enthusiast
📫 LinkedIn | 🌐 Portfolio

📝 License
This project is open-source and available under the MIT License.

---

Would you like me to:

- Add GitHub badges (build, license, deploy)?
- Include screenshots or demo link?
- Push this to your textile-admin GitHub repo automatically?

Let me know and I’ll generate it.
