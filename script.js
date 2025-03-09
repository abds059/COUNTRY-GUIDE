let btn = document.getElementById("search_btn");
let apicontent = document.querySelector(".apicontent");

const copy_url = `https://restcountries.com/v3.1/name/Pakistan?fullText=true`;

console.log(copy_url);

btn.addEventListener("click", async () => {
  let country = document.getElementById("inp_box").value.trim();

  if (country === "") {
    apicontent.innerHTML = "<p style='color: red;'>Please enter a country name.</p>";
    return;
  }
  const url = `https://restcountries.com/v3.1/name/${country}?fullText=true`;
  console.log(url);

  try {
    let response = await fetch(url);

    if (!response.ok) {
      throw new Error("Invalid country name. Please enter a valid country.");
    }

    let data = await response.json();

    if (data.status === 404 || data.length === 0) {
      throw new Error("Country not found.");
    }

    let countrydata = data[0];

    let capital = countrydata.capital?.[0] || "N/A";
    let borders = countrydata.borders?.join(" ,") || "No borders";
    let flag =
      countrydata.flags?.png || countrydata.flags?.svg || "No flag available";
    let population = countrydata.population;
    let languages = countrydata.languages
      ? Object.values(countrydata.languages).join(" ,")
      : "N/A";
    let googleMap = countrydata.maps?.googleMaps || "No Google Map Available";
    let openStreetMap =
      countrydata.maps?.openStreetMaps || "No OpenStreetMap Available";
    let area = countrydata.area ? `${countrydata.area}` : "N/A";
    let region = countrydata.region || "N/A";
    let timezones = countrydata.timezones?.join(", ") || "N/A";

    apicontent.innerHTML = "";

    let countryflag = document.createElement("img");
    countryflag.src = flag;
    countryflag.style.width = "60px";
    countryflag.style.height = "50px";
    countryflag.style.border = "2px solid gray";

    let capital_el = document.createElement("p");
    capital_el.innerText = `Capital: ${capital}`;

    let borders_el = document.createElement("p");
    borders_el.innerText = `Borders: ${borders}`;

    let population_el = document.createElement("p");
    population_el.innerText = `Population: ${population}`;

    let languages_el = document.createElement("p");
    languages.innerText = `Languages: ${languages}`;

    let area_el = document.createElement("p");
    area_el.innerText = `Area: ${area}`;

    let region_el = document.createElement("p");
    region_el.innerText = `Region: ${region}`;

    let timezones_el = document.createElement("p");
    timezones_el.innerText = `Time Zones: ${timezones}`;

    let map_el = document.createElement("p");
    map_el.innerHTML = ` <a href="${googleMap}" target="_blank">Google Maps</a> |
                            <a href="${openStreetMap}" target="_blank">OpenStreetMap</a>`;
    map_el.querySelectorAll("a").forEach((link) => {
      link.style.textDecoration = "none";
      link.style.color = "#3366cc";
    });

    apicontent.appendChild(countryflag);
    apicontent.appendChild(capital_el);
    apicontent.appendChild(borders_el);
    apicontent.appendChild(population_el);
    apicontent.appendChild(languages_el);
    apicontent.appendChild(area_el);
    apicontent.appendChild(region_el);
    apicontent.appendChild(timezones_el);
    apicontent.appendChild(map_el);
  } 
  catch (error) {
    console.log(error);
  }
});
