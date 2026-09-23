import { useEffect } from "react";

const SITE_URL = "https://www.shobhitmathur.in";
const DEFAULT_TITLE = "Shobhit Mathur | Education Entrepreneur, Institution Builder, Policy Thinker, Writer";
const DEFAULT_DESCRIPTION =
  "Shobhit Mathur is an education entrepreneur, institution builder, policy thinker, and writer. He is Vice Chancellor of Rishihood University and writes on education, technology, governance, and India's future.";
const DEFAULT_IMAGE = `${SITE_URL}/images/profile.jpg`;

interface SEOOptions {
  title: string;
  description: string;
  path: string;
  image?: string;
}

function setMeta(selector: string, attr: string, value: string) {
  const el = document.head.querySelector(selector);
  if (el) el.setAttribute(attr, value);
}

export function useSEO({ title, description, path, image = DEFAULT_IMAGE }: SEOOptions) {
  useEffect(() => {
    const url = `${SITE_URL}${path}`;

    document.title = title;
    setMeta('meta[name="description"]', "content", description);
    setMeta('link[rel="canonical"]', "href", url);

    setMeta('meta[property="og:title"]', "content", title);
    setMeta('meta[property="og:description"]', "content", description);
    setMeta('meta[property="og:url"]', "content", url);
    setMeta('meta[property="og:image"]', "content", image);

    setMeta('meta[property="twitter:title"]', "content", title);
    setMeta('meta[property="twitter:description"]', "content", description);
    setMeta('meta[property="twitter:url"]', "content", url);
    setMeta('meta[property="twitter:image"]', "content", image);

    return () => {
      document.title = DEFAULT_TITLE;
      setMeta('meta[name="description"]', "content", DEFAULT_DESCRIPTION);
      setMeta('link[rel="canonical"]', "href", `${SITE_URL}/`);

      setMeta('meta[property="og:title"]', "content", DEFAULT_TITLE);
      setMeta('meta[property="og:description"]', "content", DEFAULT_DESCRIPTION);
      setMeta('meta[property="og:url"]', "content", `${SITE_URL}/`);
      setMeta('meta[property="og:image"]', "content", DEFAULT_IMAGE);

      setMeta('meta[property="twitter:title"]', "content", DEFAULT_TITLE);
      setMeta('meta[property="twitter:description"]', "content", DEFAULT_DESCRIPTION);
      setMeta('meta[property="twitter:url"]', "content", `${SITE_URL}/`);
      setMeta('meta[property="twitter:image"]', "content", DEFAULT_IMAGE);
    };
  }, [title, description, path, image]);
}
