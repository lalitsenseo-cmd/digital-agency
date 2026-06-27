import { config, fields, collection } from "@keystatic/core";

// ───────────────────────────────────────────────────────────────
// Keystatic — aapka naya CMS (koi database / Supabase nahi).
// Blog posts files ban ke "content/posts/" me rehte hain.
//
// storage: { kind: "github" } → live editing! www.clickbriz.com/keystatic se
// edit karo, GitHub me save hota hai, Vercel auto-rebuild → live. GitHub login
// se hi access milta hai (aapke account se), koi aur nahi kar sakta.
// NOTE: agar repo ka naam/owner alag ho to niche "repo" line theek kar dena.
// ───────────────────────────────────────────────────────────────

export default config({
  storage: {
    kind: "github",
    repo: "lalitsenseo-cmd/digital-agency",
  },
  ui: {
    brand: { name: "Clickbriz CMS" },
  },
  collections: {
    posts: collection({
      label: "Blog Posts",
      slugField: "title",
      path: "content/posts/*",
      format: { contentField: "content" },
      columns: ["title", "category", "publishedDate"],
      schema: {
        title: fields.slug({
          name: { label: "Title" },
          slug: {
            label: "URL Slug",
            description: "Post ka URL: /blog/yeh-slug",
          },
        }),
        publishedDate: fields.date({
          label: "Published Date",
          defaultValue: { kind: "today" },
        }),
        category: fields.select({
          label: "Category",
          options: [
            { label: "SEO", value: "SEO" },
            { label: "Google Ads (PPC)", value: "Google Ads (PPC)" },
            { label: "Social Media Marketing", value: "Social Media Marketing" },
            { label: "Content Marketing", value: "Content Marketing" },
            { label: "Website Development", value: "Website Development" },
            { label: "Local Business Marketing", value: "Local Business Marketing" },
            { label: "Analytics & Tracking", value: "Analytics & Tracking" },
            { label: "AI & Automation", value: "AI & Automation" },
            { label: "Case Studies", value: "Case Studies" },
            { label: "Digital Marketing Tips", value: "Digital Marketing Tips" },
            { label: "Industry-Specific Marketing", value: "Industry-Specific Marketing" },
            { label: "News & Updates", value: "News & Updates" },
          ],
          defaultValue: "SEO",
        }),
        author: fields.text({ label: "Author", defaultValue: "Lalit Sen" }),
        description: fields.text({
          label: "Short Description",
          description: "Blog listing aur fallback meta description ke liye",
          multiline: true,
        }),
        coverImage: fields.image({
          label: "Cover Image",
          directory: "public/images/posts",
          publicPath: "/images/posts/",
        }),
        published: fields.checkbox({
          label: "Published (live site pe dikhe)",
          defaultValue: true,
        }),

        content: fields.markdoc({
          label: "Content",
          options: {
            image: {
              directory: "public/images/posts",
              publicPath: "/images/posts/",
            },
          },
        }),

        // ── FAQs (optional) — post pe dikhenge + FAQ schema banega ──
        faqs: fields.array(
          fields.object({
            question: fields.text({ label: "Question" }),
            answer: fields.text({ label: "Answer", multiline: true }),
          }),
          {
            label: "FAQs",
            description: "Optional. Har FAQ post ke neeche dikhega aur Google FAQ schema banega. Khaali chhod sakte ho.",
            itemLabel: (props) => props.fields.question.value || "FAQ",
          }
        ),

        // ── SEO Section (Yoast jaise fields) ──
        seo: fields.object(
          {
            focusKeyword: fields.text({ label: "Focus Keyword" }),
            metaTitle: fields.text({
              label: "SEO Title",
              description: "Khaali = post title use hoga",
            }),
            metaDescription: fields.text({
              label: "Meta Description",
              description: "Khaali = short description use hogi",
              multiline: true,
            }),
            ogImage: fields.text({
              label: "OG Image URL",
              description: "Khaali = cover image use hogi",
            }),
            canonical: fields.text({ label: "Canonical URL" }),
            noindex: fields.checkbox({
              label: "Noindex (Google se chhupao)",
              defaultValue: false,
            }),
          },
          {
            label: "SEO Section",
            description: "Search engine ke liye settings",
          }
        ),
      },
    }),

    // ── Categories (aap khud bana sakte ho) ──
    serviceCategories: collection({
      label: "Categories (Service)",
      slugField: "name",
      path: "content/service-categories/*",
      schema: {
        name: fields.slug({ name: { label: "Category Name" } }),
      },
    }),

    // ── Service Pages (city/service pages — same design, editable content) ──
    servicePages: collection({
      label: "Service Pages",
      slugField: "title",
      path: "content/service-pages/*",
      format: { contentField: "content" },
      columns: ["title", "locationName", "published"],
      schema: {
        title: fields.slug({
          name: { label: "Page Title" },
          slug: {
            label: "URL Slug",
            description: "Page ka URL: /yeh-slug (jaise seo-services-in-noida)",
          },
        }),
        locationName: fields.text({
          label: "Location / Name",
          description: "Jaise Noida, Delhi — headings me automatically use hota hai. Top-level service (Google Ads) ke liye KHAALI chhodo.",
        }),
        serviceType: fields.text({
          label: "Service Type",
          description: 'Jaise "SEO", "Google Ads", "Web Development" — badge/pricing/sidebar labels isi se bante hain. Default: SEO',
          defaultValue: "SEO",
        }),
        pageTitle: fields.text({
          label: "Breadcrumb Name (top-level)",
          description: "Sirf top-level service ke liye (jaise Google Ads). City page ke liye khaali chhodo.",
        }),
        breadcrumbParentLabel: fields.text({
          label: "Breadcrumb Parent Label",
          description: 'City page ke liye "SEO Services". Top-level ke liye khaali.',
        }),
        breadcrumbParentHref: fields.text({
          label: "Breadcrumb Parent Link",
          description: 'City page ke liye "/seo-services". Top-level ke liye khaali.',
        }),
        category: fields.relationship({
          label: "Category",
          collection: "serviceCategories",
        }),
        published: fields.checkbox({ label: "Published", defaultValue: true }),

        heroBadge: fields.text({ label: "Hero Badge", description: "Khaali = auto" }),
        heroTitle: fields.text({ label: "Hero Title", description: 'Jaise "SEO Services in"' }),
        heroAccent: fields.text({ label: "Hero Highlighted Word", description: "Jaise Noida (neeli highlight)" }),
        heroDesc: fields.text({ label: "Hero Description", multiline: true }),
        heroImage: fields.image({
          label: "Hero Image",
          directory: "public/images/services",
          publicPath: "/images/services/",
        }),

        content: fields.markdoc({
          label: "Main Article Content",
          options: {
            image: { directory: "public/images/services", publicPath: "/images/services/" },
          },
        }),

        faqs: fields.array(
          fields.object({
            question: fields.text({ label: "Question" }),
            answer: fields.text({ label: "Answer", multiline: true }),
          }),
          {
            label: "FAQs (optional)",
            description: "Page ke neeche dikhenge + Google FAQ schema banega. Khaali chhod sakte ho.",
            itemLabel: (p) => p.fields.question.value || "FAQ",
          }
        ),

        stats: fields.array(
          fields.object({
            value: fields.text({ label: "Value" }),
            label: fields.text({ label: "Label" }),
          }),
          { label: "Stats Bar", itemLabel: (p) => p.fields.value.value || "Stat" }
        ),
        features: fields.array(
          fields.object({
            title: fields.text({ label: "Title" }),
            desc: fields.text({ label: "Description", multiline: true }),
          }),
          { label: "Feature Cards", itemLabel: (p) => p.fields.title.value || "Feature" }
        ),
        servicesList: fields.array(fields.text({ label: "Service" }), {
          label: "Sidebar: Services List", itemLabel: (p) => p.value || "Item",
        }),
        areasList: fields.array(fields.text({ label: "Area" }), {
          label: "Sidebar: Areas We Cover", itemLabel: (p) => p.value || "Area",
        }),
        timelineList: fields.array(fields.text({ label: "Timeline step" }), {
          label: "Sidebar: Timeline", itemLabel: (p) => p.value || "Step",
        }),

        ctaCardHeading: fields.text({ label: "Sidebar CTA Heading" }),
        ctaCardText: fields.text({ label: "Sidebar CTA Text", multiline: true }),
        bottomCtaHeading: fields.text({ label: "Bottom CTA Heading" }),
        bottomCtaText: fields.text({ label: "Bottom CTA Text", multiline: true }),

        seo: fields.object(
          {
            focusKeyword: fields.text({ label: "Focus Keyword" }),
            metaTitle: fields.text({ label: "SEO Title", description: "Khaali = page title" }),
            metaDescription: fields.text({ label: "Meta Description", multiline: true }),
            ogImage: fields.text({ label: "OG Image URL" }),
            canonical: fields.text({ label: "Canonical URL" }),
            noindex: fields.checkbox({ label: "Noindex", defaultValue: false }),
          },
          { label: "SEO Section", description: "Search engine settings" }
        ),
      },
    }),
  },
});
