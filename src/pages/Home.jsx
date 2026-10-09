import Header from '../components/Header.jsx';
import About from '../components/About.jsx';
import Skills from '../components/Skills.jsx';

/**
 * Home Page Component
 * Route: "/"
 * Composes Header, About, and Skills components.
 */
function Home({ studentName, themeColor, rollNo, additionalSkills }) {
  return (
    <main>
      <Header
        name={studentName}
        themeColor={themeColor}
        rollNo={rollNo}
      />
      <About />
      <Skills skillList={additionalSkills} />
    </main>
  );
}

export default Home;
