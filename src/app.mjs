import path from "path";
import express, { response } from "express";
import hbs from "hbs";
import geocode from './utils/geocode.mjs';
import forecast from './utils/forecast.mjs';
import { fileURLToPath } from "url";
import { dirname } from "path";
// import { error } from "console";

const app = express();

// Define paths for express config
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const viewsPath = path.join(__dirname, "../template/views"); // if folder name is not "views"
const partialPath = path.join(__dirname, "../template/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialPath);

// Setup static directory to serve
app.use(express.static(path.join(__dirname, "../public")));

app.get("/puzzle", async (req, res) => {
  try {
    const response = await fetch("http://puzzle.mead.io/puzzle");
    const data = await response.json();
    res.send(data);  // send puzzle JSON to the browser
  } catch (error) {
    res.status(500).send({ error: "Failed to fetch puzzle" });
  }
});

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather app",
    name: "abhi",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Page",
    name: "abhishek",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "abhishek dhone",
  });
});

app.get("/weather", (req, res) => {
  if(!req.query.address)
  {
    return res.send({
      error: "You must provide a address term!"
    })
  }
  geocode.geocoding(req.query.address, (error,data) => {
    if (error) {
        return res.send({"Error:" : error});
    }
    forecast.forecast(data.Latitude,data.Longitude, (error,forecastData) => {
      if (error) {
          return res.send({"Error:" : error});
      }
      res.send({
        forecast: forecastData,
        location: data,
        address: req.query.address
      });
    })
  })
});

// app.get("/products", (req,res) => {
//   if(!req.query.search)
//   {
//     return res.send({
//       error: "You must provide a search term!"
//     })
//   }
//   console.log(req.query.search);
//   res.send({
//     products: []
//   })
// }) 

// Catch unmatched help articles
// app.all("/help/*", (req, res) => {
//   res.status(404).render("404", {
//     title: "404",
//     errorMessage: "Help article not found",
//     name: "Abhi"
//   });
// });

app.use((req, res) => {
  res.status(404).render("404", {
    title: "404",
    errorMessage: "Page not found",
    name: "Abhishek Dhone",
  });
});


// app.listen(3000, () => {
//   console.log("Server is up on port 3000!");
// });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server is up on port " + port);
});
