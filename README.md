# Student Portfolio — Advanced Web Development Frameworks (ITUE301)

**Student Name:** Smit Makwana  
**Student ID / Roll No:** 24IT046  
**University:** CHAROTAR UNIVERSITY OF SCIENCE AND TECHNOLOGY (CHARUSAT)  
**Faculty:** Faculty of Technology and Engineering (FTE)  
**Branch:** B. Tech (Information Technology) — 5th Semester  

---

## 🎯 Practical 1: Introduction to React & Component Architecture
- **Objective:** Set up a React development environment using Vite and build a static UI using independently structured, reusable components.
- **Components Built:**
  - `Header.jsx`: Site hero banner, profile details, accepts `name`, `themeColor` (inline styling demo), and `rollNo` props.
  - `About.jsx`: Short bio and academic profile.
  - `Skills.jsx`: Interactive skill cards + dynamic props rendering via `skillList.map()`.
  - `Projects.jsx`: Hardcoded list of 3 featured student projects.
  - `Footer.jsx`: Contact links, copyright, and institutional references.
  - `NavBar.jsx`: Navigation bar with active section indicator.

---

## 🚀 Practical 2: State Management and Routing in React
- **Objective:** Implement reactive state management using the `useState` hook and multi-page client-side navigation using React Router v6 without full-page reloads.

### 🌐 Client-Side Routing Architecture (`react-router-dom`)
- Wrapped the entire application in `<BrowserRouter>` inside `src/main.jsx`.
- Replaced standard HTML anchor tags (`<a>`) with `<NavLink>` and `<Link>` from `react-router-dom` to ensure SPA smooth transitions without page refreshes.
- Defined distinct routes with `<Routes>` and `<Route>` inside `src/App.jsx`:
  1. **Route `/`** → `Home.jsx` (Hero header, about bio, and skills stack)
  2. **Route `/projects`** → `Projects.jsx` (Featured applications with tech tags)
  3. **Route `/contact`** → `Contact.jsx` (Interactive controlled form & real-time state monitor)
  4. **Route `*`** → `NotFound.jsx` (Custom 404 error page for undefined routes)

### ⚡ Reactive State Management (`useState`)
1. **Controlled Form Inputs (`useState`)**:
   - `message` state: Captured in real-time on `<textarea>` change and mirrored instantly in the live monitor.
   - `name` & `email` state: Controlled inputs synced without page reload.
2. **Live Character Counter (`useState`)**:
   - Calculates and displays live character count (`message.length`) dynamically below the input.
3. **Element Visibility Toggle (`useState`)**:
   - `showHelp` boolean state: Toggles visibility of a help/tips guide box on button click.
4. **Dark / Light Mode Theme Toggle (`useState`)**:
   - `darkMode` boolean state managed at root `App.jsx`, passed down to `NavBar.jsx`, toggling the `.light-theme` class across the application.

---

## 🛠️ Tech Stack
- **Framework:** React 18+
- **Build Tool:** Vite
- **Routing:** React Router DOM v6
- **Styling:** Vanilla CSS with Custom Properties (CSS variables) & Glassmorphism
- **Icons / Fonts:** Google Fonts (Inter, Space Grotesk)

---

## 💻 How to Run Locally

```bash
# 1. Clone repository
git clone https://github.com/Smit-Makwana/portfolio-Smit.git
cd portfolio-Smit

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev

# 4. Build for production
npm run build
```

---

## 📸 Route Directory
- `/` — Home (Hero banner, student introduction, technical skills)
- `/projects` — Projects (Detailed showcase of 3 apps)
- `/contact` — Contact (Controlled form, real-time reactive monitor, character counter, FAQ toggle)
- `/*` — 404 Custom Error page
