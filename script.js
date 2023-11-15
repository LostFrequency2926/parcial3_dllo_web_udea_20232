//Token para autorizacion y consumo del API
const apiKey = "d3c39f57206d5904890771c822ffaac3";

// parrafo que contiene el mensaje de error
const notFoundCity = document.querySelector(".error");

// Elementos de la accion de busqueda
const inputCity = document.querySelector(".search input");
const searchCityButton = document.querySelector(".search button");

// elementos de la card
const cardWeather = document.querySelector(".weather");
const imgWeather = document.querySelector(".weather-icon");
const tempWeather = document.querySelector(".temp");
const cityWeather = document.querySelector(".city");
const humedityWeather = document.querySelector(".humidity");
const windWeather = document.querySelector(".wind");

//El evento de consumo se desencadena al clickear el boton de busqueda
searchCityButton.addEventListener("click", async () => {
  //Me aseguro de inicializar con el mensaje de error oculto en caso de que un error previo lo haya desplegado
  notFoundCity.style.display = "none";

  //defino el api a consumir con las respectivas variables
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${inputCity.value}&appid=${apiKey}`;

  //verifico que si se captura el nombre de ciudad ingresado
  console.log(inputCity.value);

  try {
    const response = await axios.get(apiUrl);

    if (response.data.cod === 200) {
      //prints de control para entender los datos y acceder a ellos
      console.log("Datos de la API:", response.data);
      console.log(response.data["main"]["temp"]);
      console.log(Math.round(response.data["main"]["temp"]));
      console.log(response.data["wind"]["speed"]);
      console.log(response.data.weather[0]["main"]);

      //Asigno los datos del api a los elementos del DOM
      tempWeather.innerHTML = `${Math.round(response.data["main"]["temp"])}°C`;
      cityWeather.innerHTML = response.data["name"];
      humedityWeather.innerHTML = `${response.data["main"]["humidity"]}%`;
      windWeather.innerHTML = `${response.data["wind"]["speed"]}km/h`;

      //case para setear la imagen en la card dependiendo de la respuesta del api
      const weatherCondition = response.data.weather[0]["main"];
      let weatherImageSrc;
      switch (weatherCondition) {
        case "Clouds":
          weatherImageSrc = "images/clouds.png";
          break;
        case "Clear":
          weatherImageSrc = "images/clear.png";
          break;
        case "Rain":
          weatherImageSrc = "images/rain.png";
          break;
        case "Drizzle":
          weatherImageSrc = "images/drizzle.png";
          break;
        case "Mist":
          weatherImageSrc = "images/mist.png";
          break;
        default:
          weatherImageSrc = "images/default.png";
          break;
      }
      imgWeather.src = weatherImageSrc;

      //Hago la card visible
      cardWeather.style.display = "block";
    } else {
      //Si falla la peticion muestro el mensaje de error solicitado
      console.error(
        "Error en la respuesta de la API. Código de estado:",
        response.data.cod
      );

      //Oculto la card
      cardWeather.style.display = "none";
      //Muestro el error
      notFoundCity.style.display = "block";
    }
  } catch (error) {
    //Si falla la peticion muestro el mensaje de error solicitado
    console.error("Error al consumir la API:", error);

    //Oculto la card
    cardWeather.style.display = "none";
    //Muestro el error
    notFoundCity.style.display = "block";
  }
});
