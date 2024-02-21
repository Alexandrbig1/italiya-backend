import express from "express";
import logger from "morgan";
import cors from "cors";
import "dotenv/config";
import authRouter from "./routes/api/auth-router.js";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
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

  apis: ["./routes/*.js"],
};

const swaggerDocument = swaggerJsdoc(options);

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/users", authRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((req, res) => {
  res.status(404).json({ message: "Page not found" });
});

app.use((err, req, res, next) => {
  if (err.status) {
    res.status(err.status).json({ error: err.message });
  } else {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default app;
