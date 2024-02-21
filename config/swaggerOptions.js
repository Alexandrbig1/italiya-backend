const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Italiya's Whisker Wonders API Documentation",
      description: `\nExplore the API documentation for Italiya's Whisker Wonders website.\n\n🧰 [Backend GitHub repository](https://github.com/Alexandrbig1/italiya-backend)\n\n\n💅
[Frontend GitHub repository](https://github.com/Alexandrbig1/italiya)\n\n\n🌐
[Visit Italiya's website](https://alexandrbig1.github.io/italiya/)\n\n\n Step into the enchanting world of Italiya: our charismatic orange cat. Indulge in whisker wonders with our curated collection of cat-themed treasures — cozy t-shirts, charming cups, and delightful souvenirs. Embrace feline magic and bring a touch of Italiya's charm into your everyday moments. Explore, shop, and immerse yourself in the joy of cats.
  `,
      version: "1.0.0",
    },

    servers: [
      {
        url: "https://italiya.onrender.com/api-docs",
        description: "Dev Server",
      },
      {
        url: "http://localhost:5000/api-docs",
        description: "Local Dev Server",
      },
    ],
    tags: [
      {
        name: "Auth",
        description: "Authorization endpoints",
      },
    ],
  },

  apis: ["./routes/api/*.js"],
};

export default swaggerOptions;
