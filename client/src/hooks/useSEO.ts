import { useEffect } from "react";

interface SEOOptions {
  title: string;
  description: string;
  /** Absolute or root-relative path to a preview image (used for social shares). */
  image?: string;
  /** Root-relative path for this page, e.g. "/about". Defaults to "/". */
  path?: string;
}

const SITE_NAME = "Volodymyr Piven — Original Paintings";
// TODO: replace with your real production domain once you have one.
const SITE_URL = "https://www.volodymyrpivenart.com";
const DEFAULT_IMAGE = "/images/logo.png";

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertLink(rel: string, href: string) {
  let el = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

/**
 * Updates document.title and <head> meta tags for the current route.
 * Pure metadata — never touches the rendered page content.
 * Since this is a client-rendered SPA (no SSR), the static tags in
 * client/index.html remain the fallback for crawlers that don't run JS;
 * this hook improves things for crawlers/social previews that do.
 */
export function useSEO({ title, description, image, path = "/" }: SEOOptions) {
  useEffect(() => {
    const fullTitle = title.includes(SITE_NAME) ? title : `${title} — ${SITE_NAME}`;
    const url = `${SITE_URL}${path}`;
    const imageUrl = `${SITE_URL}${image || DEFAULT_IMAGE}`;

    document.title = fullTitle;

    upsertMeta("name", "description", description);
    upsertLink("canonical", url);

    upsertMeta("property", "og:title", fullTitle);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:type", "website");
    upsertMeta("property", "og:url", url);
    upsertMeta("property", "og:image", imageUrl);
    upsertMeta("property", "og:site_name", SITE_NAME);

    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", fullTitle);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", imageUrl);
  }, [title, description, image, path]);
}