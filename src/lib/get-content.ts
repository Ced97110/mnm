// Content loader - for now, just re-export English content
// Spanish locale support will be added later

// Re-export English content functions (synchronous)
export {
  getServicePageContent,
  getAllServicePageSlugs,
  getServiceBySlug,
  SERVICE_PAGE_CONTENT
} from './content/en/service-pages';

export {
  getServiceAreaContent,
  getAllServiceAreaSlugs,
  SERVICE_AREA_CONTENT
} from './content/en/service-areas';

export {
  getBlogPost,
  getAllBlogPosts,
  getBlogPostsByCategory,
  BLOG_CONTENT
} from './content/en/blog';

// Re-export the content types
export type { ServicePageContent } from './content/en/service-pages';
export type { ServiceAreaContent } from './content/en/service-areas';
export type { BlogPost } from './content/en/blog';
