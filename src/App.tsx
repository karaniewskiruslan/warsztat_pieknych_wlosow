import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { lazy, Suspense } from "react";
import Loading from "./components/Loading.tsx";

const MarkdownPreview = lazy(() => import("./components/RoutesContainer.tsx"));

function App() {
  return (
    <>
      <Header />
      <Suspense fallback={<Loading />}>
        <MarkdownPreview />
      </Suspense>
      <Footer />
    </>
  );
}

export default App;
