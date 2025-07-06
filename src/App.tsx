import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { lazy, Suspense, useEffect, useState } from "react";
import Loading from "./components/Loading.tsx";
import { motion, useScroll } from "motion/react";

const MarkdownPreview = lazy(() => import("./components/RoutesContainer.tsx"));

function App() {
  const { scrollYProgress } = useScroll();
  const [isScrollable, setIsScrollable] = useState(false);

  useEffect(() => {
    const checkScrollable = () => {
      setIsScrollable(
        document.documentElement.scrollHeight > window.innerHeight,
      );
    };

    checkScrollable();
    window.addEventListener("resize", checkScrollable);

    return () => window.removeEventListener("resize", checkScrollable);
  }, []);

  return (
    <>
      {isScrollable && (
        <motion.div
          data-testid="scroll-progress-bar"
          className="fixed top-0 left-0 z-30 h-1 w-full bg-gray-200"
          style={{
            scaleX: scrollYProgress,
            originX: 0,
          }}
          transition={{ duration: 0.2 }}
        />
      )}
      <Header />
      <Suspense fallback={<Loading />}>
        <MarkdownPreview />
      </Suspense>
      <Footer />
    </>
  );
}

export default App;
