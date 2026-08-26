export default function LocalSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HairSalon",
    name: "Cappiello Hair & Beauty",
    image: "https://cappiellohairbeauty.it/opengraph-image",
    "@id": "https://cappiellohairbeauty.it/#salon",
    url: "https://cappiellohairbeauty.it",
    telephone: "+390823155454",
    priceRange: "€€",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Via delle Querce, 38",
      addressLocality: "Caserta",
      postalCode: "81100",
      addressRegion: "CE",
      addressCountry: "IT",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 41.0726,
      longitude: 14.3371,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
        opens: "09:00",
        closes: "19:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Friday"],
        opens: "08:30",
        closes: "20:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday"],
        opens: "08:00",
        closes: "20:00",
      },
    ],
    sameAs: [
      "https://www.instagram.com/cappiellohairbeauty/",
      "https://www.facebook.com/people/Cappiello-hair-beauty/100063717897194/",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
