// import config from "@/../astro.config"

export default function (props: any) {
  return {
    "@context": "https://schema.org",
    "headline": props.title,
    "description": props.description,
    // "url": `${config.site}${props.url}`,
    "url": `https://index.garden${props.url}`,
    "dateCreated": props.pubDate ?? "",
    "datePublished": props.pubDate ?? "",
    "dateModified": props.pubDate ?? "",
    "author": {
      "@id": "https://david.wolf.gdn",
      "@type": "Person",
      "name": "David Wolf",
      "givenName": "David",
      "familyName": "Wolf",
      "jobTitle": "Software Engineer",
      "url": "https://david.wolf.gdn"
    },
    "publisher": {
      "@id": "https://david.wolf.gdn"
    },
    "creator": {
      "@id": "https://david.wolf.gdn"
    },
    "editor": {
      "@id": "https://david.wolf.gdn"
    },
    "maintainer": {
      "@id": "https://david.wolf.gdn"
    }
  }
}