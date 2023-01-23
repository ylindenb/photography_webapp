const express = require("express");
const cors = require("cors");
require('dotenv').config();

const app = express();

var corsOptions = {
  origin: process.env.CORS_URL
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./models");
const Role = db.role;
const Category = db.category;
const Portfolio = db.portfolio;
const CategoryDescription = db.categoryDescription;
const PortfolioDescription = db.portfolioDescription;
const ProductCatalog = db.productCatalog;

db.mongoose
  .connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

// routes
require('./routes/auth.routes')(app);
require('./routes/image.routes')(app);
require('./routes/category.routes')(app);
require('./routes/categoryDescription.routes')(app);
require('./routes/portfolio.routes')(app);
require('./routes/portfolioDescription.routes')(app);
require('./routes/productCatalog.routes')(app);
require('./routes/order.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });

  ProductCatalog.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new ProductCatalog({
        size: "small",
        format: "10x15",
        price: 5,
        shipping_cost: 3,
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added small size to ProductCatalog collection");
      });

      new ProductCatalog({
        size: "medium",
        format: "30x40",
        price: 20,
        shipping_cost: 5,
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added medium size to ProductCatalog collection");
      });

      new ProductCatalog({
        size: "large",
        format: "50x75",
        price: 50,
        shipping_cost: 10,
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added large size to ProductCatalog collection");
      });
    }
  });

  CategoryDescription.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new CategoryDescription({
        name: "Landschaft"
      }).save((err, categoryDescription) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'Landschaft' to categoriesDescription collection");
        new Category({
          categoryDescriptionId: categoryDescription._id
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
        console.log("added 'Landschaft' to category collection");
        })
      });

      new CategoryDescription({
        name: "Natur"
      }).save((err, categoryDescription) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'Natur' to categoriesDescription collection");
        new Category({
          categoryDescriptionId: categoryDescription._id
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
        console.log("added 'Natur' to category collection");
        })
      });

      new CategoryDescription({
        name: "Essen"
      }).save((err, categoryDescription) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'Essen' to categoriesDescription collection");
        new Category({
          categoryDescriptionId: categoryDescription._id
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
        console.log("added 'Essen' to category collection");
        })
      });

      new CategoryDescription({
        name: "Tiere"
      }).save((err, categoryDescription) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'Tiere' to categoriesDescription collection");
        new Category({
          categoryDescriptionId: categoryDescription._id
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
        console.log("added 'Menschen' to category collection");
        })
      });

      new CategoryDescription({
        name: "Menschen"
      }).save((err, categoryDescription) => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'Menschen' to categoriesDescription collection");
        new Category({
          categoryDescriptionId: categoryDescription._id
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
        console.log("added 'Menschen' to category collection");
        })
      });
    }
  });

  PortfolioDescription.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new PortfolioDescription({
        name: "Costa Rica"
      }).save((err, portfolioDescription) => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'Costa Rica' to portfoliosDescription collection");
        new Portfolio({
          portfolioDescriptionId: portfolioDescription._id
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
        console.log("added 'Costa Rica' to portfolio collection");
        })
      });

      new PortfolioDescription({
        name: "Antarktis"
      }).save((err, portfolioDescription) => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'Antarktis' to portfoliosDescription collection");
        new Portfolio({
          portfolioDescriptionId: portfolioDescription._id
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
        console.log("added 'Antarktis' to portfolio collection");
        })
      });

      new PortfolioDescription({
        name: "Galapagosinseln"
      }).save((err, portfolioDescription) => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'Galapagosinseln' to portfoliosDescription collection");
        new Portfolio({
          portfolioDescriptionId: portfolioDescription._id
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
        console.log("added 'Galapagosinseln' to portfolio collection");
        })
      });
    }
  });
}
