import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, lazy, Suspense } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
const About = lazy(() => import("./pages/About"));
const Writings = lazy(() => import("./pages/Writings"));
const Article = lazy(() => import("./pages/Article"));
const Talks = lazy(() => import("./pages/Talks"));
const Gallery = lazy(() => import("./pages/Gallery"));
const Contact = lazy(() => import("./pages/Contact"));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

function NotFound() {
  return (
    <div style={{ padding: "200px 2rem", textAlign: "center" }}>
      <p className="label label--accent" style={{ marginBottom: "1rem" }}>
        404
      </p>
      <h1 className="display-md" style={{ marginBottom: "1.5rem" }}>
        Page not found
      </h1>
      <a href="/" className="btn btn--ghost">
        Go home
      </a>
    </div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <main id="main-content" key={location.pathname} className="route-view">
      <Suspense fallback={<div style={{ minHeight: "100vh" }} />}>
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/writings" element={<Writings />} />
        <Route path="/writings/:slug" element={<Article />} />
        <Route path="/talks" element={<Talks />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      </Suspense>
    </main>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <a href="#article-content" className="skip-to-content" tabIndex={0}>
        Skip to main content
      </a>
      <Header />
      <AnimatedRoutes />
      <Footer />
    </BrowserRouter>
  );
}
