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
  - `About.jsx`: Short bio and academic profile at CHARUSAT.
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
  2. **Route `/projects`** → `ProjectsPage.jsx` (Dedicated projects showcase)
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

## 🌐 Practical 3: API Integration and Data Rendering in React
- **Objective:** Consume a public REST API in React and manage asynchronous lifecycle states (Loading, Error, and Success) using `useEffect` and `useState`.

### 🔄 Asynchronous Architecture in `Projects.jsx`
1. **States Managed (`useState`)**:
   - `repos`: Holds array of fetched repository objects.
   - `loading`: Boolean flag (initially `true`) to indicate an in-flight network request.
   - `error`: Error message string or `null` if the request succeeds.
   - `searchTerm`: Query string for real-time client-side search filtering.
   - `simulateError`: Interactive testing flag to demonstrate error state during lab evaluation.

2. **Lifecycle Side Effect (`useEffect`)**:
   - Executes an HTTP `fetch()` on component mount targeting the GitHub REST API:
     `https://api.github.com/users/Smit-Makwana/repos?sort=updated`
   - Uses dependency array `[fetchTrigger, simulateError]` to avoid infinite fetch loops.
   - Gracefully handles `.then()`, `.catch()`, and `.finally()` to guarantee `setLoading(false)`.

3. **Conditional Rendering Pipeline**:
   ```
   Projects Component
   ├── [loading === true]  ──> <Spinner />
   ├── [error !== null]    ──> <ErrorMessage message={error} onRetry={handleRetry} />
   └── [success]           ──> <RepoList repos={filteredRepos} />
   ```

4. **Supplementary Enhancements Built**:
   - **Retry Button:** Allows the user to re-trigger the API fetch without refreshing the browser tab.
   - **Search Filter Input:** Filters the displayed repository list in real-time by repository name, description, or programming language.
   - **Stars (⭐) & Forks (🍴) Count:** Shows repository metrics directly alongside the name and `html_url`.
   - **Error Simulation Toggle:** Includes a button in the UI (`⚠️ Test Error State`) allowing examiners/evaluators to verify the error boundary and retry mechanism.

---

## 🛠️ Complete Tech Stack
- **Framework:** React 18+
- **Build Tool:** Vite
- **Routing:** React Router DOM v6
- **API Consumption:** Native Fetch API with Promises (`async/await` pattern)
- **Styling:** Vanilla CSS with Design Tokens & Glassmorphism
- **Fonts:** Google Fonts (Inter, Space Grotesk)

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
- `/projects` — Projects (Live GitHub REST API integration with loading spinner, error boundary, retry, and search)
- `/contact` — Contact (Controlled form, real-time reactive monitor, character counter, FAQ toggle)
- `/*` — 404 Custom Error page
