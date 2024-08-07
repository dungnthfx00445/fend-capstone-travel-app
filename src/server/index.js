require("dotenv").config();

const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();

const cors = require("cors");
app.use(cors());
app.use(bodyParser.json()); // to use json

// to use url encoded values
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.static("dist"));

app.get("/", function (req, res) {
  console.log(`Your API Key is 111${process.env.API_KEY}`);
  res.sendFile(path.resolve("dist/index.html"));
});

app.get("/test", function (req, res) {
  res.send({
    title: "test json response",
    message: "testing mockApi",
    time: "now",
  });
});

// POST Route
app.post("/api/geosnames", async function (req, res) {
  const url = `${process.env.BASE_URL_GEONAMES}?q=${req.body.place}&maxRows=6&username=${process.env.GEONAMES_USERNAME}`;
  try {
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response ? error.response.status : 500).json({
      error: error.message,
      details: error.response ? error.response.data : "No response data",
    });
  }
});

app.post("/api/weathers", async function (req, res) {
  const startDate = new Date(req.body.startDate);
  const endDate = `${startDate.getFullYear()}-${startDate.getMonth() + 1}-${
    startDate.getDate() + 1
  }`;
  const url = `${process.env.BASE_URL_WEATHER}?lat=${req.body.data.lat}&lon=${req.body.data.lng}&start_date=${req.body.startDate}&end_date=${endDate}&key=${process.env.WEATHER_API_KEY}`;
  try {
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    res.json(response.data);
  } catch (error) {
    console.log("ERROR", error);
    res.status(error.response ? error.response.status : 500).json({
      error: error.message,
      details: error.response ? error.response.data : "No response data",
    });
  }
});

app.post("/api/images", async function (req, res) {
  const url = `${process.env.BASE_URL_PIXAPAY}?key=${
    process.env.PIXAPAY_API_KEY
  }&q=${encodeURIComponent(req.body.countryName)}&image_type=photo`;
  try {
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    res.json(response.data);
  } catch (error) {
    console.log("ERROR", error);
    res.status(error.response ? error.response.status : 500).json({
      error: error.message,
      details: error.response ? error.response.data : "No response data",
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}!`);
});

module.exports = app;
