export default function LocalSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FastFoodRestaurant",
    name: "Smash Up",
    image: "https://smashupburger.it/opengraph-image",
    "@id": "https://smashupburger.it/#restaurant",
    url: "https://smashupburger.it",
    telephone: "+390823123456",
    priceRange: "€€",
    servesCuisine: ["American", "Burgers", "Street Food", "Smash Burger"],
    acceptsReservations: "True",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "19:00",
        closes: "00:30",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday", "Sunday"],
        opens: "12:30",
        closes: "15:30",
      },
    ],
    sameAs: [
      "https://www.instagram.com/smash_up_official/",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
