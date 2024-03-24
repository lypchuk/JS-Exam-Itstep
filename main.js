const ApiKey = "enter your key";
let call = ``;
let call2 = ``;
let call3 = ``;
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function PrintGeolocation(dataG, latitude, longitude) {
  console.log(dataG);

  let lat1 = latitude + "";
  let lon1 = longitude + "";

  let lat2 = dataG[0].lat + "";
  let lon2 = dataG[0].lon + "";

  let locationPrint = document.querySelector("#locationPrint");

  locationPrint.innerHTML = "";

  locationPrint.innerHTML = `Your coordinatуs: latitude = ${lat1.substring(
    0,
    7
  )} longitude = ${lon1.substring(0, 7)} <br>
                              Weather coordinatуs: latitude = ${lat2.substring(
                                0,
                                7
                              )} longitude = ${lon2.substring(0, 7)} <br>
                              it's ${dataG[0].name} ${dataG[0].state} ${
    dataG[0].country
  } `;
}

function PrintHourly(index, data, hourlyDate) {
  return `<span class="d-inline-block text-center" style="margin: 4px;">time: ${hourlyDate.getHours()}:00<br>temp: ${
    data.hourly[index].temp
  }°C 
  <br>wind speed:<br> ${data.hourly[index].wind_speed}meter/sec<br>pressure: ${
    data.hourly[index].pressure
  }hPa<br>humidity: ${data.hourly[index].humidity}%
  <br>clouds: ${data.hourly[index].clouds}%<br>description:<br>${
    data.hourly[index].weather[0].description
  }
  <br><img src="https://openweathermap.org/img/wn/${
    data.hourly[index].weather[0].icon
  }.png" alt=""><br></span>`;
}

function PrintDayHourly(data) {
  let currentDate = new Date();
  let nameDate = new Date(currentDate);

  const myTab = document.querySelector("#myTab");
  const dayTab = document.querySelector("#dayTab");
  const todayTad = document.querySelector("#today-tab-pane");
  const tab1 = document.querySelector("#day1-tab-pane");
  const tab2 = document.querySelector("#day2-tab-pane");

  let hourly = data.hourly;
  let daily = data.daily;

  myTab.innerHTML = "";

  myTab.innerHTML += `<li class="nav-item" role="presentation">
    <button
      class="nav-link active"
      id="today-tab"
      data-bs-toggle="tab"
      data-bs-target="#today-tab-pane"
      type="button"
      role="tab"
      aria-controls="today-tab-pane"
      aria-selected="true"
      >
      ${monthNames[nameDate.getMonth()]} ${nameDate.getDate()}
      <img src="https://openweathermap.org/img/wn/${
        data.current.weather[0].icon
      }.png" alt="">
      </button>
    </li>`;

  nameDate.setDate(nameDate.getDate() + 1);

  myTab.innerHTML += `<li class="nav-item" role="presentation">
    <button
      class="nav-link"
      id="day1-tab"
      data-bs-toggle="tab"
      data-bs-target="#day1-tab-pane"
      type="button"
      role="tab"
      aria-controls="day1-tab-pane"
      aria-selected="true"
    >
    ${monthNames[nameDate.getMonth()]} ${nameDate.getDate()} 
  <img src="https://openweathermap.org/img/wn/${
    data.daily[1].weather[0].icon
  }.png" alt="">
    </button>
  </li>`;

  nameDate.setDate(nameDate.getDate() + 1);

  myTab.innerHTML += `<li class="nav-item" role="presentation">
  <button
    class="nav-link"
    id="day2-tab"
    data-bs-toggle="tab"
    data-bs-target="#day2-tab-pane"
    type="button"
    role="tab"
    aria-controls="day2-tab-pane"
    aria-selected="true"
  >
  ${monthNames[nameDate.getMonth()]} ${nameDate.getDate()}
<img src="https://openweathermap.org/img/wn/${
    data.daily[2].weather[0].icon
  }.png" alt="">
  </button>
</li>`;

  todayTad.innerHTML = "";
  tab1.innerHTML = "";
  tab2.innerHTML = "";

  let hourlyDate = new Date(currentDate);

  for (let index = 0; index < hourly.length - 2; index++) {
    if (hourlyDate.getDate() == currentDate.getDate()) {
      todayTad.innerHTML += PrintHourly(index, data, hourlyDate);
    } else if (hourlyDate.getDate() == currentDate.getDate() + 1) {
      tab1.innerHTML += PrintHourly(index, data, hourlyDate);
    } else if (hourlyDate.getDate() == currentDate.getDate() + 2) {
      tab2.innerHTML += PrintHourly(index, data, hourlyDate);
    } else {
      console.log(`Error data`);
    }

    hourlyDate.setHours(hourlyDate.getHours() + 1);
  }

  let dailyDate = new Date(currentDate);

  dayTab.innerHTML = "";

  for (let index = 0; index < daily.length; index++) {
    dayTab.innerHTML += `<li class="nav-item" role="presentation">
      <button class="nav-link ${
        index == 0 ? " active " : ""
      }" id="date${index}-tab" data-bs-toggle="tab" data-bs-target="#date${index}-tab-pane" type="button" role="tab" aria-controls="date${index}-tab-pane" 
      aria-selected="true">${
        monthNames[dailyDate.getMonth()]
      } ${dailyDate.getDate()}<img src="https://openweathermap.org/img/wn/${
      data.daily[index].weather[0].icon
    }.png" alt="">
    <span><br>temp min: ${data.daily[index].temp.min}°C<br>
                                          temp max: ${
                                            data.daily[index].temp.max
                                          }°C<br>
                                          wind speed:<br> ${
                                            data.daily[index].wind_speed
                                          }meter/sec<br>
                                          pressure:<br> ${
                                            data.daily[index].pressure
                                          }hPa<br>
                                          humidity: ${
                                            data.daily[index].humidity
                                          }%<br>
                                          clouds: ${
                                            data.daily[index].clouds
                                          }%<br>
                                          description:<br>${
                                            data.daily[index].weather[0]
                                              .description
                                          }<br>

                                          </span>
    </button></li>`;
    dailyDate.setDate(dailyDate.getDate() + 1);
  }
}

function PrintThreeHourly(dataDay) {
  const dayTabContent = document.querySelector("#dayTabContent");
  let dataHourly = dataDay.list;
  let currentData = dataDay.list[0].dt_txt + "";

  dayTabContent.innerHTML = "";

  for (let index = 0, indexDay = 0; index < dataHourly.length; indexDay++) {
    console.log(`index ${index} indexDay ${indexDay}`);
    dayTabContent.innerHTML += `<div
  class="tab-pane fade  ${index == 0 ? " show active " : ""}"
  id="date${indexDay}-tab-pane"
  role="tabpanel"
  aria-labelledby="date${indexDay}-tab"
  tabindex="0"
>
</div>  `;

    const NewDayTabContent = document.querySelector(
      `#date${indexDay}-tab-pane`
    );

    for (; index < dataHourly.length; index++) {
      console.log(`index ${index} indexDay ${indexDay}`);

      let currentArrData = dataHourly[index].dt_txt + "";

      if (currentData.substring(0, 10) == currentArrData.substring(0, 10)) {
        let time = dataHourly[index].dt_txt + "";
        NewDayTabContent.innerHTML += `
          <span class="d-inline-block text-center">
                                      time: ${time.substr(11, 5)}<br>
                                      
                                      temp: ${dataHourly[index].main.temp}°C<br>
                                      humidity: ${
                                        dataHourly[index].main.humidity
                                      }%<br>
                                      wind speed:<br> ${
                                        dataHourly[index].wind.speed
                                      }meter/sec<br>
                                      </span>
                                      `;
      } else {
        currentData = currentArrData;
        break;
      }
    }
  }
}

function PrintPage(latitude, longitude) {
  console.log(latitude);
  console.log(longitude);

  let locationPrint = document.querySelector("#locationPrint");
  locationPrint.innerHTML = "";
  locationPrint.innerHTML = `latitude = ${latitude} longitude = ${longitude} `;

  call = `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&units=metric&appid=${ApiKey}`;
  //old not use
  call2 = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${ApiKey}`;
  call3 = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${ApiKey}`;

  console.log(call);
  console.log(call2);
  console.log(call3);

  jQuery.getJSON(call, function (data) {
    PrintDayHourly(data);

    let q = `http://api.openweathermap.org/geo/1.0/reverse?lat=${data.lat}&lon=${data.lon}&limit=5&appid=${ApiKey}`;
    jQuery.getJSON(q, function (dataG) {
      //console.log(q);
      PrintGeolocation(dataG, latitude, longitude);
    });
  });

  jQuery.getJSON(call3, function (dataDay) {
    PrintThreeHourly(dataDay);
  });
}

if (navigator.geolocation) {
  console.log(`geolocation is available`);
  navigator.geolocation.getCurrentPosition((position) => {
    PrintPage(position.coords.latitude, position.coords.longitude);
  });
} else {
  console.log(`geolocation IS NOT available`);
}

const SearchBtn = document.querySelector("#SearchBtn");

SearchBtn.onclick = (e) => {
  e.preventDefault();
  const SearchText = document.querySelector("#SearchText");

  console.log(SearchText.value);

  let callCityName = `http://api.openweathermap.org/geo/1.0/direct?q=${SearchText.value}&limit=1&appid=${ApiKey}`;

  jQuery.getJSON(callCityName, function (dataCityName) {
    console.log(callCityName);
    console.log(dataCityName);

    PrintPage(dataCityName[0].lat, dataCityName[0].lon);
  });
};
