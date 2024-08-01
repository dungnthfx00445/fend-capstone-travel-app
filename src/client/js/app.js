const axios = require("axios");

function handleSubmit(event) {
  event.preventDefault();
  console.log("::: FORM INPUT VALID :::");
  // Get the URL from the input field
  const valueLocation = document.getElementById("location").value;
  const valueDate = document.getElementById("date").value;

  axios
    .post("/api/geosnames", JSON.stringify({ place: valueLocation }), {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(async (res) => {
      if (res.status !== 200) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      res.data.geonames.forEach((geoname) => {
        const articleGeoname = document.createElement("article");

        const headerGeoname = document.createElement("header");
        const titleGeoname = document.createElement("h2");
        const buttonDetail = document.createElement("button");
        const linkDetail = document.createElement("a");
        buttonDetail.setAttribute("id", "buttonDetail");
        // linkDetail.href = "./blog_post.html";
        linkDetail.innerHTML = "View detail";

        titleGeoname.innerHTML = `Your location: ${geoname.name}`;
        const imageGeoname = document.createElement("img");
        imageGeoname.alt = "Alt of image";

        headerGeoname.appendChild(titleGeoname);

        const contentGeoname = document.createElement("div");
        const dateGeoname = document.createElement("p");
        const countryGeoname = document.createElement("p");
        const cloudsGeoname = document.createElement("p");
        dateGeoname.innerHTML = `Date: ${valueDate}`;
        countryGeoname.innerHTML = `Country name: ${geoname.countryName}`;

        contentGeoname.appendChild(dateGeoname);
        contentGeoname.appendChild(countryGeoname);

        axios
          .post(
            "/api/weathers",
            JSON.stringify({ startDate: valueDate, data: geoname }),
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then(async (response) => {
            if (response.status !== 200) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            cloudsGeoname.innerHTML = `Clouds: ${response.data.data[0].clouds}`;
            contentGeoname.appendChild(cloudsGeoname);
          })
          .catch((error) => {
            console.error(`An error occurred: ${error.message}`);
            alert(`An error occurred: ${error.message}`);
          });

        axios
          .post(
            "/api/images",
            JSON.stringify({ countryName: geoname.countryName }),
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then(async (response) => {
            if (response.status !== 200) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            imageGeoname.src = response.data.hits[0].userImageURL;
            headerGeoname.appendChild(imageGeoname);
          })
          .catch((error) => {
            console.error(`An error occurred: ${error.message}`);
            alert(`An error occurred: ${error.message}`);
          });
        // linkDetail.addEventListener("click", viewDetail(geoname.countryName));
        buttonDetail.appendChild(linkDetail);
        articleGeoname.appendChild(headerGeoname);
        articleGeoname.appendChild(contentGeoname);
        articleGeoname.appendChild(buttonDetail);
        document.getElementById("listLocation").appendChild(articleGeoname);
      });
    })
    .catch((error) => {
      console.error(`An error occurred: ${error.message}`);
      alert(`An error occurred: ${error.message}`);
    });
}

export { handleSubmit };
