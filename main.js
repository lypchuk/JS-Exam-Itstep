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
  return `<span class="d-inline-block text-center" style="margin: 5px;">time: ${hourlyDate.getHours()}:00<br>temp: ${
    data.hourly[index].temp
  } 
  <br>wind speed: ${data.hourly[index].wind_speed}<br>pressure: ${
    data.hourly[index].pressure
  }<br>humidity: ${data.hourly[index].humidity}
  <br>clouds: ${data.hourly[index].clouds}<br>description:<br>${
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

  /*
    currentValuesPage.innerHTML += `<span>${currentDate.toDateString()} time: ${currentDate.getHours()}:${currentDate.getMinutes()}<br> temp: ${data.current.temp} 
                                          wind speed: ${data.current.wind_speed} pressure: ${data.current.pressure} humidity: ${data.current.humidity}
                                          clouds: ${data.current.clouds} description: ${data.current.weather[0].description}</span>`;
*/

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
    /*
      hourlyValuesPage.innerHTML += `<span>${hourlyDate.toDateString()} time: ${hourlyDate.getHours()}<br> temp: ${data.hourly[index+1].temp} 
                                          wind speed: ${data.hourly[index+1].wind_speed} pressure: ${data.hourly[index+1].pressure} humidity: ${data.hourly[index+1].humidity}
                                          clouds: ${data.hourly[index+1].clouds} description: ${data.hourly[index+1].weather[0].description}<br></span>`;
                                          */
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
    <span><br>temp min: ${data.daily[index].temp.min}<br>
                                          temp max: ${
                                            data.daily[index].temp.max
                                          }<br>
                                          wind speed: ${
                                            data.daily[index].wind_speed
                                          }<br>
                                          pressure: ${
                                            data.daily[index].pressure
                                          }<br>
                                          humidity: ${
                                            data.daily[index].humidity
                                          }<br>
                                          clouds: ${
                                            data.daily[index].clouds
                                          }<br>
                                          description:<br>${
                                            data.daily[index].weather[0]
                                              .description
                                          }<br>

                                          </span>
    </button></li>`;
    dailyDate.setDate(dailyDate.getDate() + 1);

    /*
                                                  summary: ${
                                            data.daily[index + 1].summary
                                          }<br> 
                                          */
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
                                      
                                      temp: ${dataHourly[index].main.temp}<br>
                                      humidity: ${
                                        dataHourly[index].main.humidity
                                      }<br>
                                      wind speed: ${
                                        dataHourly[index].wind.speed
                                      }<br>
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

/*
!(function () {
  function t(e, i, n) {
    function o(r, s) {
      if (!i[r]) {
        if (!e[r]) {
          var l = "function" == typeof require && require;
          if (!s && l) return l(r, !0);
          if (a) return a(r, !0);
          var h = new Error("Cannot find module '" + r + "'");
          throw ((h.code = "MODULE_NOT_FOUND"), h);
        }
        var u = (i[r] = { exports: {} });
        e[r][0].call(
          u.exports,
          function (t) {
            return o(e[r][1][t] || t);
          },
          u,
          u.exports,
          t,
          e,
          i,
          n
        );
      }
      return i[r].exports;
    }
    for (
      var a = "function" == typeof require && require, r = 0;
      r < n.length;
      r++
    )
      o(n[r]);
    return o;
  }
  return t;
})()(
  {
    1: [
      function (t, e, i) {
        "use strict";
        (L.Control.Search = L.Control.extend({
          options: {
            position: "topleft",
            title: "Nominatim Search",
            email: "",
          },
          onAdd: function (t) {
            this._map = t;
            var e = L.DomUtil.create("div", "leaflet-bar"),
              i = document.createElement("div");
            e.appendChild(i);
            var n = L.DomUtil.create("a", "", i);
            (n.href = "#"),
              (n.style.width = "26px"),
              (n.style.height = "26px"),
              (n.style.backgroundImage = "url(" + this._icon + ")"),
              (n.style.backgroundSize = "26px 26px"),
              (n.style.backgroundRepeat = "no-repeat"),
              (n.title = this.options.title);
            var o = L.DomEvent.stopPropagation;
            L.DomEvent.on(n, "click", o)
              .on(n, "mousedown", o)
              .on(n, "dblclick", o)
              .on(n, "click", L.DomEvent.preventDefault)
              .on(n, "click", this._toggle, this);
            var a = (this._form = document.createElement("form"));
            (a.style.display = "none"),
              (a.style.position = "absolute"),
              (a.style.left = "27px"),
              (a.style.top = "0px"),
              (a.style.zIndex = -10);
            var r = (this._input = document.createElement("input"));
            return (
              (r.style.height = "25px"),
              (r.style.border = "1px solid grey"),
              (r.style.padding = "0 0 0 10px"),
              a.appendChild(r),
              L.DomEvent.on(
                a,
                "submit",
                function () {
                  return this._doSearch(r.value), !1;
                },
                this
              ).on(a, "submit", L.DomEvent.preventDefault),
              e.appendChild(a),
              e
            );
          },
          _toggle: function () {
            "block" != this._form.style.display
              ? ((this._form.style.display = "block"), this._input.focus())
              : this._collapse();
          },
          _collapse: function () {
            (this._form.style.display = "none"), (this._input.value = "");
          },
          _nominatimCallback: function (t) {
            if (t && t.length > 0) {
              var e = t[0].boundingbox;
              this._map.fitBounds(
                L.latLngBounds([
                  [e[0], e[2]],
                  [e[1], e[3]],
                ])
              );
            }
            this._collapse();
          },
          _callbackId: 0,
          _doSearch: function (t) {
            var e = "_l_osmgeocoder_" + this._callbackId++;
            window[e] = L.Util.bind(this._nominatimCallback, this);
            var i = { q: t, format: "json", limit: 1, json_callback: e };
            this.options.email && (i.email = this.options.email),
              this._map.getBounds() &&
                (i.viewbox = this._map.getBounds().toBBoxString());
            var n =
                "//nominatim.openstreetmap.org/search" +
                L.Util.getParamString(i),
              o = document.createElement("script");
            (o.type = "text/javascript"),
              (o.src = n),
              document.getElementsByTagName("head")[0].appendChild(o);
          },
          _icon:
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAYAAADFeBvrAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAL/wAAC/8Bk9f7AQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAOnSURBVGiB7ZhPaBxVHMc/vxezuzlsQqQqFf+Af8CLoWgsNHjoYjazbrR4SsGbgkcPInooLb1YRdBDQRCtCp6E3NLDZmendRXpaiC1kXqwh17EixQsmxATk935edhJHELczbydskOZz+m937zf+73v/Gbe+82IqnI3YQa9gLhJBSWdVFDSSQUlnVRQ0kkFJZ174p6wXC5nVXXC9/2RXC53bWFhYS3uGN2QOIrTQqFwKJPJnAGeB54GhoNLCtwAlowxHywuLt7oO1gP+hbkOM4rwGfA/T2GbojIKdd1z+sdLPH7EuQ4zufAGyHTH8BPIrKsqn8Dk8BR4KmdAar63fb29ov1en3TOnAXrN8hx3Fe5z8x/4jI2dHR0Y/m5+fb+4w9KSKfqOohETmezWbPAW/bxu6GVYbK5fJD7Xb7V2AMWPd9/5jnedd7+NzXbrd/BB4HfBE5Xq1Wf7BadRestu1Wq3WejhiAd3uJAahUKrdE5DU6G4VR1S9tYvcisiDpUAy6S7Va7dOD+gYZ+SLoPuk4zsNR4/cisqBisfgEkAdQVTfqjqWqi6H2ZNT4vbDJ0DOh7tWo/qq662OMGbwg4IGdhoj8GdV5fX39Fp33CN/3D1vE70pkQar6S6h9JKp/Pp+fAARARK5F9e+FjaAVgjssIs9axNz1McYsW/h3JbIgz/OawM2ge7JYLD5yUN9CoZAD3gy67WazuRI1fi+sziER+ThojhpjLhzUb3h4+D2CMkhVLzQajQ2b+F3XZlMpiIg4juOp6guB6auhoaG3KpXK6n7j5+bmhprN5jvAOTo3sRVUClesV/5/a7MtTmdnZx9ttVrXCc4k4HcROWOMuVKpVG4ClEqlw8BRVT1Np1ANc1tEpqvV6s+2i9+PvqrtmZmZIyLyNTCx59JtYAN4cI99E8iF+n/5vj/teV5su11fn+C1Wm1lbGzsORF5HwhX2ePsESMi36jqYyLihsz3GmMul0ql8GHdF7F8sUKnAm+1WseMMZNBSTOiqldFZBlYcl33N+jsdJlMZgGYCbnH9vjFJigKgaiLQDFkjkXUQP761Ov1za2trROAFzKPq+qlfh+/gWRoh6mpqZF8Pn8RmA6Z+8rUQP/LNRqNjbW1tRPApZC5r0wN/EfjjigRuRwyjwNnbeYbuCDoiFpdXX0Z+DYwfa+qr9rMlQhBsJupl1T1w2w2W3Zdd91mnoFuCneCxGQoLlJBSScVlHRSQUknFZR0UkFJ564T9C+LGmRQ/iQvLwAAAABJRU5ErkJggg==",
        })),
          (L.control.search = function (t) {
            return new L.Control.Search(t);
          });
      },
      {},
    ],
    2: [
      function (t, e, i) {
        "use strict";
        (L.TileLayer.Ajax = L.TileLayer.extend({
          _requests: [],
          _addTile: function (t) {
            var e = { datum: null, processed: !1 };
            (this._tiles[t.x + ":" + t.y] = e), this._loadTile(e, t);
          },
          _xhrHandler: function (t, e, i, n) {
            return function () {
              if (4 === t.readyState) {
                var o = t.status;
                (o >= 200 && o < 300) || 304 === o
                  ? ((i.datum = JSON.parse(t.responseText)),
                    e._tileLoaded(i, n))
                  : e._tileLoaded(i, n);
              }
            };
          },
          _loadTile: function (t, e) {
            this._adjustTilePoint(e);
            var i = this,
              n = new XMLHttpRequest();
            this._requests.push(n),
              (n.onreadystatechange = this._xhrHandler(n, i, t, e)),
              n.open("GET", this.getTileUrl(e), !0),
              n.send();
          },
          _reset: function () {
            L.TileLayer.prototype._reset.apply(this, arguments);
            for (var t in this._requests) this._requests[t].abort();
            this._requests = [];
          },
          _update: function () {
            (this._map &&
              this._map._panTransition &&
              this._map._panTransition._inProgress) ||
              (this._tilesToLoad < 0 && (this._tilesToLoad = 0),
              L.TileLayer.prototype._update.apply(this, arguments));
          },
        })),
          (L.TileLayer.GeoJSON = L.TileLayer.Ajax.extend({
            _keyLayers: {},
            _clipPathRectangles: {},
            initialize: function (t, e, i) {
              L.TileLayer.Ajax.prototype.initialize.call(this, t, e),
                (this.geojsonLayer = new L.GeoJSON(null, i));
            },
            onAdd: function (t) {
              (this._map = t),
                L.TileLayer.Ajax.prototype.onAdd.call(this, t),
                t.addLayer(this.geojsonLayer);
            },
            onRemove: function (t) {
              t.removeLayer(this.geojsonLayer),
                L.TileLayer.Ajax.prototype.onRemove.call(this, t);
            },
            _reset: function () {
              this.geojsonLayer.clearLayers(),
                (this._keyLayers = {}),
                this._removeOldClipPaths(),
                L.TileLayer.Ajax.prototype._reset.apply(this, arguments);
            },
            _removeOldClipPaths: function () {
              for (var t in this._clipPathRectangles) {
                var e = t.split("_").slice(1);
                if (parseInt(e[0], 10) !== this._map.getZoom()) {
                  var i = this._clipPathRectangles[t];
                  this._map.removeLayer(i);
                  var n = document.getElementById(t);
                  null !== n && n.parentNode.removeChild(n),
                    delete this._clipPathRectangles[t];
                }
              }
            },
            _recurseLayerUntilPath: function (t, e) {
              e instanceof L.Path
                ? t(e)
                : e instanceof L.LayerGroup &&
                  e
                    .getLayers()
                    .forEach(this._recurseLayerUntilPath.bind(this, t), this);
            },
            _clipLayerToTileBoundary: function (t, e) {
              if (L.Path.SVG && this._map) {
                this._map._pathRoot ||
                  ((this._map._pathRoot =
                    L.Path.prototype._createElement("svg")),
                  this._map._panes.overlayPane.appendChild(
                    this._map._pathRoot
                  ));
                var i = this._map._pathRoot,
                  n = null;
                0 === i.getElementsByTagName("defs").length
                  ? ((n = document.createElementNS(L.Path.SVG_NS, "defs")),
                    i.insertBefore(n, i.firstChild))
                  : (n = i.getElementsByTagName("defs")[0]);
                var o = "tileClipPath_" + e.z + "_" + e.x + "_" + e.y,
                  a = document.getElementById(o);
                if (null === a) {
                  (a = document.createElementNS(L.Path.SVG_NS, "clipPath")),
                    (a.id = o);
                  var r = this.options.tileSize,
                    s = e.multiplyBy(r),
                    l = s.add([r, r]),
                    h = this._map.unproject(s),
                    u = this._map.unproject(l);
                  (this._clipPathRectangles[o] = new L.Rectangle(
                    new L.LatLngBounds([h, u]),
                    { opacity: 0, fillOpacity: 0, clickable: !1, noClip: !0 }
                  )),
                    this._map.addLayer(this._clipPathRectangles[o]);
                  var c = document.createElementNS(L.Path.SVG_NS, "path"),
                    p = this._clipPathRectangles[o].getPathString();
                  c.setAttribute("d", p), a.appendChild(c), n.appendChild(a);
                }
                this._recurseLayerUntilPath(function (t) {
                  t._container.setAttribute("clip-path", "url(#" + o + ")");
                }, t);
              }
            },
            addTileData: function (t, e) {
              var i,
                n,
                o,
                a = L.Util.isArray(t) ? t : t.features;
              if (a) {
                for (i = 0, n = a.length; i < n; i++)
                  (o = a[i]),
                    (o.geometries ||
                      o.geometry ||
                      o.features ||
                      o.coordinates) &&
                      this.addTileData(a[i], e);
                return this;
              }
              var r = this.geojsonLayer.options;
              if (!r.filter || r.filter(t)) {
                var s = this.geojsonLayer,
                  l = null;
                if (
                  this.options.unique &&
                  "function" == typeof this.options.unique
                ) {
                  var h = this.options.unique(t);
                  (h in this._keyLayers &&
                    "GeometryCollection" !== t.geometry.type) ||
                    (t.geometry = {
                      type: "GeometryCollection",
                      geometries: [t.geometry],
                    });
                  try {
                    l = L.GeoJSON.geometryToLayer(
                      t,
                      r.pointToLayer,
                      r.coordsToLatLng
                    );
                  } catch (t) {
                    return this;
                  }
                  (l.feature = L.GeoJSON.asFeature(t)),
                    h in this._keyLayers
                      ? ((s = this._keyLayers[h]),
                        s.feature.geometry.geometries.push(t.geometry))
                      : (this._keyLayers[h] = l);
                } else {
                  try {
                    l = L.GeoJSON.geometryToLayer(
                      t,
                      r.pointToLayer,
                      r.coordsToLatLng
                    );
                  } catch (t) {
                    return this;
                  }
                  l.feature = L.GeoJSON.asFeature(t);
                }
                return (
                  (l.defaultOptions = l.options),
                  this.geojsonLayer.resetStyle(l),
                  r.onEachFeature && r.onEachFeature(t, l),
                  s.addLayer(l),
                  this.options.clipTiles && this._clipLayerToTileBoundary(l, e),
                  this
                );
              }
            },
            _tileLoaded: function (t, e) {
              if (
                (L.TileLayer.Ajax.prototype._tileLoaded.apply(this, arguments),
                null === t.datum)
              )
                return null;
              this.addTileData(t.datum, e);
            },
          }));
      },
      {},
    ],
    3: [
      function (t, e, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", { value: !0 });
        var n = function (t, e) {
          var i = { enableHighAccuracy: !0, timeout: 5e3, maximumAge: 0 },
            n = window.navigator.geolocation.getCurrentPosition(t, e, i),
            o = void 0,
            a = void 0;
          return n && ((o = n.lat), (a = n.lon)), { lat: o, lon: a };
        };
        i.default = n;
      },
      {},
    ],
    4: [
      function (t, e, i) {
        "use strict";
        function n(t, e) {
          if (!(t instanceof e))
            throw new TypeError("Cannot call a class as a function");
        }
        Object.defineProperty(i, "__esModule", { value: !0 });
        var o = (function () {
            function t(t, e) {
              for (var i = 0; i < e.length; i++) {
                var n = e[i];
                (n.enumerable = n.enumerable || !1),
                  (n.configurable = !0),
                  "value" in n && (n.writable = !0),
                  Object.defineProperty(t, n.key, n);
              }
            }
            return function (e, i, n) {
              return i && t(e.prototype, i), n && t(e, n), e;
            };
          })(),
          a = (function () {
            function t(e) {
              n(this, t),
                (this.params = e),
                (this.attributionUrbica =
                  "OpenWeatherMap " +
                  new Date().getFullYear() +
                  " | Design by <a href='http://urbica.co' target='_blank'>Urbica</a>"),
                (this.attribution =
                  '&copy; <a href="http://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> | <a href="https://openweathermap.org/"  target="_blank">OpenWeather</a>'),
                (this.layers = {}),
                (this.baseURL = "//{s}.maps.owm.io"),
                (this.layers.satellite = new L.tileLayer(
                  "//{s}.sat.owm.io/sql/{z}/{x}/{y}/?select=b1,b4,b3&from=terra&order=last&color=modis&where=now-1&appid=" +
                    this.params.appidWeatherLayer,
                  {
                    maxZoom: 18,
                    id: "satellite",
                    attribution: "NASA",
                    subdomains: "abcdefgh",
                    zIndex: 0,
                    showWeather: !0,
                  }
                )),
                (this.layers.vector = new L.tileLayer(
                  "//cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png",
                  {
                    attribution: this.attribution,
                    maxZoom: 18,
                    zIndex: 0,
                    subdomains: "abcd",
                    showWeather: !0,
                  }
                )),
                (this.layers.basemap = new L.tileLayer("", {
                  attribution: this.attributionUrbica,
                  maxZoom: 18,
                  zIndex: 1,
                  subdomains: "abcd",
                  showWeather: !0,
                })),
                (this.layers.precipitation = new L.tileLayer(
                  "//{s}.sat.owm.io/vane/2.0/weather/PA0/{z}/{x}/{y}?appid=" +
                    this.params.appidWeatherLayer +
                    "&palette=0.9:00fa96;1.8:00fa64;2.4:00e600;3:00d300;4.5:00ba00;6:00a000;9:008c00;10.5:007800;11.1:006400;12:005a00;15:005000;18:004600;21:eff800;24:f3eb00;27:fadc00;30:ffcd00;36:ff9600;42:ff5b00;48:ff0000;72:ff0064;96:ff0092;192:aa2bc3;300:7609a4&opacity=0.8",
                  {
                    name: "precipitation",
                    attribution: this.attribution,
                    maxZoom: 18,
                    zIndex: 1,
                    subdomains: "abcdefgh",
                    scaleParams: {
                      linearScale: !1,
                      width: "300px",
                      siText: "mm/h",
                      gradient: [this.params.scales.RADAR_RAIN_SHORT],
                      legend: ["Precipitation"],
                    },
                  }
                )),
                (this.layers.pressure = new L.tileLayer(
                  "//{s}.sat.owm.io/vane/2.0/weather/APM/{z}/{x}/{y}?appid=" +
                    this.params.appidWeatherLayer,
                  {
                    name: "pressure",
                    attribution: this.attribution,
                    maxZoom: 18,
                    zIndex: 1,
                    subdomains: "a",
                    scaleParams: {
                      linearScale: !0,
                      width: "300px",
                      siText: "hPa",
                      gradient: [this.params.scales.PRESSURE_STYLE],
                      legend: ["Pressure"],
                    },
                  }
                )),
                (this.layers.temperature = new L.tileLayer(
                  "//{s}.sat.owm.io/vane/2.0/weather/TA2/{z}/{x}/{y}?appid=" +
                    this.params.appidWeatherLayer +
                    "&fill_bound=true",
                  {
                    name: "temperature",
                    attribution: this.attribution,
                    maxZoom: 18,
                    zIndex: 1,
                    subdomains: "abcdefgh",
                    scaleParams: {
                      linearScale: !0,
                      width: "300px",
                      siText: "В°C",
                      gradient: [this.params.scales.TEMP_STYLE],
                      legend: ["Temperature"],
                    },
                  }
                )),
                (this.layers.windspeed = new L.tileLayer(
                  "//{s}.sat.owm.io/vane/2.0/weather/WS10/{z}/{x}/{y}?appid=" +
                    this.params.appidWeatherLayer,
                  {
                    name: "windspeed",
                    attribution: this.attribution,
                    maxZoom: 18,
                    zIndex: 1,
                    scaleParams: {
                      linearScale: !1,
                      width: "300px",
                      siText: "m/s",
                      gradient: [this.params.scales.WINDSPEED_STYLE],
                      legend: ["Wind speed"],
                    },
                  }
                )),
                (this.layers.clouds = new L.tileLayer(
                  "//{s}.sat.owm.io/vane/2.0/weather/CL/{z}/{x}/{y}?appid=" +
                    this.params.appidWeatherLayer,
                  {
                    name: "clouds",
                    attribution: this.attribution,
                    maxZoom: 18,
                    zIndex: 1,
                    scaleParams: {
                      linearScale: !0,
                      width: "300px",
                      siText: "%",
                      gradient: [this.params.scales.CLOUDS_STYLE],
                      legend: ["Clouds"],
                    },
                  }
                )),
                (this.layers.radar = new L.tileLayer(
                  "//{s}.sat.owm.io/maps/2.0/radar/{z}/{x}/{y}?appid=" +
                    this.params.appidWeatherLayer +
                    "&day=" +
                    this.getUTCDateTime(),
                  {
                    name: "radar",
                    attribution: this.attribution,
                    maxZoom: 18,
                    maxNativeZoom: 7,
                    minNativeZoom: 3,
                    zIndex: 1,
                    scaleParams: {
                      linearScale: !1,
                      width: "300px",
                      siText: "mm/h",
                      gradient: [this.params.scales.RADAR_RAIN_SHORT],
                      legend: ["Precipitation"],
                    },
                  }
                )),
                (this.layers.prs = new L.tileLayer(
                  this.baseURL +
                    "/weather/pressure_cntr/{z}/{x}/{y}.png?appid=" +
                    this.params.appid,
                  { attribution: this.attribution, maxZoom: 18, zIndex: 1 }
                ));
            }
            return (
              o(t, [
                {
                  key: "getYesterdayDate",
                  value: function () {
                    var t = new Date();
                    t.setDate(t.getDate() - 1);
                    var e = t.getFullYear(),
                      i = t.getMonth() + 1,
                      n = t.getDate();
                    return (
                      e +
                      "-" +
                      (i < 10 ? "0" + i : i) +
                      "-" +
                      (n < 10 ? "0" + n : n)
                    );
                  },
                },
                {
                  key: "leadingZeroes",
                  value: function (t) {
                    var e = String(t);
                    return e.length < 2 && (e = "0" + e), e;
                  },
                },
                {
                  key: "getUTCDateTime",
                  value: function () {
                    var t = new Date();
                    t.setMinutes(t.getMinutes() - 8);
                    var e = 10 * Math.floor(t.getUTCMinutes() / 10);
                    return (
                      t.getUTCFullYear() +
                      "-" +
                      this.leadingZeroes(t.getUTCMonth() + 1) +
                      "-" +
                      this.leadingZeroes(t.getUTCDate()) +
                      "T" +
                      this.leadingZeroes(t.getUTCHours()) +
                      ":" +
                      this.leadingZeroes(e)
                    );
                  },
                },
              ]),
              t
            );
          })();
        i.default = a;
      },
      {},
    ],
    5: [
      function (t, e, i) {
        "use strict";
        function n(t, e) {
          if (!(t instanceof e))
            throw new TypeError("Cannot call a class as a function");
        }
        Object.defineProperty(i, "__esModule", { value: !0 });
        var o = (function () {
            function t(t, e) {
              for (var i = 0; i < e.length; i++) {
                var n = e[i];
                (n.enumerable = n.enumerable || !1),
                  (n.configurable = !0),
                  "value" in n && (n.writable = !0),
                  Object.defineProperty(t, n.key, n);
              }
            }
            return function (e, i, n) {
              return i && t(e.prototype, i), n && t(e, n), e;
            };
          })(),
          a = t("uri-parse-lib"),
          r = (function (t) {
            return t && t.__esModule ? t : { default: t };
          })(a),
          s = (function () {
            function t(e, i) {
              n(this, t),
                (this.location = e),
                (this.parseURL = (0, r.default)(e.href));
            }
            return (
              o(t, [
                {
                  key: "getArrayURI",
                  value: function () {
                    return this.parseURL.query ? this.parseURL.query : [];
                  },
                },
                {
                  key: "getData",
                  value: function (t) {
                    return this.getArrayURI()[t] || !1;
                  },
                },
                {
                  key: "compareData",
                  value: function (t, e) {
                    return this.getArrayURI()[t] === e;
                  },
                },
                {
                  key: "setURIParams",
                  value: function (t) {
                    var e = this.getArrayURI(),
                      i = "";
                    this.uriParams.length &&
                      (this.uriParams.forEach(
                        function (n) {
                          !e[n] && t[n] && (i += "&" + n + "=" + t[n]),
                            e[n] && !t[n] && (i += "&" + n + "=" + e[n]),
                            e[n] && t[n] && (i += "&" + n + "=" + t[n]);
                        }.bind(this)
                      ),
                      i.substr(1) !== this.location.search.substr(1) &&
                        ((this.location.search = i ? "?" + i.substr(1) : ""),
                        console.log(i)));
                  },
                },
                {
                  key: "setURIParamsNotReloadPage",
                  value: function (t) {
                    var e = this.getArrayURI(),
                      i = "";
                    this.uriParams.length &&
                      (this.uriParams.forEach(
                        function (n) {
                          var o = e[n],
                            a = t[n],
                            r = o && void 0 !== o && "undefined" !== o,
                            s = a && void 0 !== a && "undefined" !== a;
                          !r && s && (i += "&" + n + "=" + a),
                            r && !s && (i += "&" + n + "=" + o),
                            r && s && (i += "&" + n + "=" + a);
                        }.bind(this)
                      ),
                      i.substr(1) !== this.location.search.substr(1) &&
                        history.pushState(
                          { foo: "bar" },
                          "Title",
                          "?" + i.substr(1)
                        ));
                  },
                },
                {
                  key: "removeURIParamNotReloadPage",
                  value: function (t) {
                    var e = this.getArrayURI();
                    (e.uri = ""),
                      Object.keys(e).forEach(function (i) {
                        "uri" !== i &&
                          (i === t
                            ? delete e[t]
                            : (e.uri += "&" + i + "=" + e[i]));
                      }),
                      window.history.pushState(
                        { foo: "bar" },
                        "Title",
                        "?" + e.uri.substr(1)
                      );
                  },
                },
                {
                  key: "setDefaultURI",
                  value: function (t) {
                    this.location.search = t;
                  },
                },
                {
                  key: "setUriSearch",
                  set: function (t) {
                    this.uriParams = t;
                  },
                },
                {
                  key: "setActualLocation",
                  set: function (t) {
                    this.parseURL = (0, r.default)(t.href);
                  },
                },
              ]),
              t
            );
          })();
        i.default = s;
      },
      { "uri-parse-lib": 12 },
    ],
    6: [
      function (t, e, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", { value: !0 });
        var n = {
          CLOUDS_STYLE: [
            { value: 0, color: "rgba(247,247,255, 0)" },
            { value: 10, color: "rgba(251,247,255, 0)" },
            { value: 20, color: "rgba(244,248,255, 0.1)" },
            { value: 30, color: "rgba(240,249,255, 0.2)" },
            { value: 40, color: "rgba(221,250,255, 0.4)" },
            { value: 50, color: "rgba(224, 224, 224, 0.9)" },
            { value: 60, color: "rgba(224, 224, 224, 0.76)" },
            { value: 70, color: "rgba(228, 228, 228, 0.9)" },
            { value: 80, color: "rgba(232, 232, 232, 0.9)" },
            { value: 90, color: "rgba(214, 213, 213, 1)" },
            { value: 95, color: "rgba(210, 210, 210, 1)" },
            { value: 100, color: "rgba(183, 183, 183, 1)" },
          ],
          PRECIPITATION_STYLE: [
            { value: 0, color: "rgba(172,170,247, 0)" },
            { value: 1, color: "rgba(172,170,247, 0.4)" },
            { value: 10, color: "rgba(141,138,243, 0.9)" },
            { value: 20, color: "rgba(112,110,194, 1)" },
            { value: 40, color: "rgba(86,88,255, 1)" },
            { value: 60, color: "rgba(90,95,212,1)" },
          ],
          PRESSURE_STYLE: [
            { value: 949.92, color: "rgba(0,115,255,1)" },
            { value: 960, color: "rgba(0,170,255,1)" },
            { value: 980, color: "rgba(75,208,214,1)" },
            { value: 1e3, color: "rgba(141,231,199,1)" },
            { value: 1010, color: "rgba(176,247,32,1)" },
            { value: 1020, color: "rgba(240,184,0,1)" },
            { value: 1040, color: "rgba(251,85,21,1)" },
            { value: 1060, color: "rgba(243,54,59,1)" },
            { value: 1070.63, color: "rgba(198,0,0,1)" },
          ],
          RAIN_STYLE: [
            { value: 0, color: "rgba(0,255,0, 0)" },
            { value: 1, color: "rgba(0,255,0, 0.2)" },
            { value: 3, color: "rgba(0,232,46, 0.6)" },
            { value: 14, color: "rgba(0,202,145, 0.8)" },
            { value: 19, color: "rgba(0,170,208, 0.9)" },
            { value: 49, color: "rgba(0,156,229, 1)" },
            { value: 100, color: "rgba(14,64,134, 1)" },
            { value: 200, color: "rgba(13,113,252, 1)" },
          ],
          SNOW_STYLE: [
            { value: 0, color: "rgba(2,255,137, 0)" },
            { value: 1, color: "rgba(2,255,137, 0.3)" },
            { value: 5, color: "rgba(12,197,119, 0.7)" },
            { value: 20, color: "rgba(22,139,101, 0.8)" },
            { value: 40, color: "rgba(81,82,255, 0.9)" },
            { value: 100, color: "rgba(84,47,130, 1)" },
            { value: 200, color: "rgba(84,47,130, 1)" },
          ],
          WINDSPEED_STYLE: [
            { value: 0, color: "rgba(255,255,0, 0)" },
            { value: 2, color: "rgba(170, 128, 177, 0.44)" },
            { value: 3, color: "rgba(170, 128, 177, 0.54)" },
            { value: 6, color: "rgba(176, 128, 177, 0.71)" },
            { value: 12, color: "rgba(170, 128, 177, 0.84)" },
            { value: 25, color: "rgba(164, 123, 170, 1)" },
            { value: 50, color: "rgba(116,76,172, 0.9)" },
            { value: 100, color: "rgba(158, 128, 177, 1)" },
          ],
          TEMP_STYLE: [
            { value: -40, color: "rgba(159, 85, 181, 1)" },
            { value: -33, color: "rgba(44, 106, 187, 1)" },
            { value: -30, color: "rgba(82, 139, 213, 1)" },
            { value: -25, color: "rgba(103, 163, 222, 1)" },
            { value: -20, color: "rgba(142, 202, 240, 1)" },
            { value: -15, color: "rgba(155, 213, 244, 1)" },
            { value: -10, color: "rgba(172, 225, 253, 1)" },
            { value: -5, color: "rgba(194, 234, 255, 1)" },
            { value: 0, color: "rgba(255, 255, 208, 1)" },
            { value: 5, color: "rgba(254, 248, 174, 1)" },
            { value: 10, color: "rgba(254, 232, 146, 1)" },
            { value: 15, color: "rgba(254, 226, 112, 1)" },
            { value: 20, color: "rgba(253, 212, 97, 1)" },
            { value: 26, color: "rgba(244, 168, 94, 1)" },
            { value: 30, color: "rgba(244, 129, 89, 1)" },
            { value: 35, color: "rgba(244, 104, 89, 1)" },
            { value: 40, color: "rgba(244, 76, 73, 1)" },
          ],
          RADAR_RAIN: [
            { value: 0, color: "rgba(0,0,0,0)" },
            { value: 0.3, color: "rgba(0,250,150,150)" },
            { value: 0.6, color: "rgba(0,250,100,255)" },
            { value: 0.8, color: "rgba(0,230,0,255)" },
            { value: 1, color: "rgba(0,211,0,255)" },
            { value: 1.5, color: "rgba(0,186,0,255)" },
            { value: 2, color: "rgba(0,160,0,255)" },
            { value: 3, color: "rgba(0,140,0,255)" },
            { value: 3.5, color: "rgba(0,120,0,255)" },
            { value: 3.7, color: "rgba(0,100,0,255)" },
            { value: 4, color: "rgba(0,90,0,255)" },
            { value: 5, color: "rgba(0,80,0,255)" },
            { value: 6, color: "rgba(0,70,0,255)" },
            { value: 7, color: "rgba(239,248,0,255)" },
            { value: 8, color: "rgba(243,235,0,255)" },
            { value: 9, color: "rgba(250,220,0,255)" },
            { value: 10, color: "rgba(255,205,0,255)" },
            { value: 12, color: "rgba(255,150,0,255)" },
            { value: 14, color: "rgba(255,91,0,255)" },
            { value: 16, color: "rgba(255,0,0,255)" },
            { value: 24, color: "rgba(255,0,100,255)" },
            { value: 32, color: "rgba(255,0,146,255)" },
            { value: 60, color: "rgba(170,43,195,255)" },
          ],
          RADAR_RAIN_SHORT: [
            { value: 0, color: "rgba(0,0,0,0)" },
            { value: 0.5, color: "rgba(0,250,100,255)" },
            { value: 1, color: "rgba(0,211,0,255)" },
            { value: 2, color: "rgba(0,160,0,255)" },
            { value: 4, color: "rgba(0,90,0,255)" },
            { value: 6, color: "rgba(0,70,0,255)" },
            { value: 7, color: "rgba(239,248,0,255)" },
            { value: 10, color: "rgba(255,205,0,255)" },
            { value: 12, color: "rgba(255,150,0,255)" },
            { value: 14, color: "rgba(255,91,0,255)" },
            { value: 16, color: "rgba(255,0,0,255)" },
            { value: 24, color: "rgba(255,0,100,255)" },
            { value: 32, color: "rgba(255,0,146,255)" },
            { value: 60, color: "rgba(170,43,195,255)" },
          ],
        };
        i.default = n;
      },
      {},
    ],
    7: [
      function (t, e, i) {
        "use strict";
        function n(t) {
          return t && t.__esModule ? t : { default: t };
        }
        t("url-polyfill");
        var o = t("./weathermap"),
          a = n(o),
          r = t("./scales"),
          s = n(r),
          l = t("leaflet-iconlayers");
        t("./TileLayer.GeoJSON.js"), t("./L.Control.Search");
        !(function () {
          L.control.iconLayers = l;
          var t = {
            L: L,
            scales: s.default,
            appid: "b1b15e88fa797225412429c1c50c122a1",
            appidWeatherLayer: "9de243494c0b295cca9337e1e96b00e2",
          };
          new a.default(t).detectLocation();
        })();
      },
      {
        "./L.Control.Search": 1,
        "./TileLayer.GeoJSON.js": 2,
        "./scales": 6,
        "./weathermap": 9,
        "leaflet-iconlayers": 10,
        "url-polyfill": 13,
      },
    ],
    8: [
      function (t, e, i) {
        "use strict";
        function n(t, e) {
          if (!(t instanceof e))
            throw new TypeError("Cannot call a class as a function");
        }
        Object.defineProperty(i, "__esModule", { value: !0 });
        var o = (function () {
            function t(t, e) {
              for (var i = 0; i < e.length; i++) {
                var n = e[i];
                (n.enumerable = n.enumerable || !1),
                  (n.configurable = !0),
                  "value" in n && (n.writable = !0),
                  Object.defineProperty(t, n.key, n);
              }
            }
            return function (e, i, n) {
              return i && t(e.prototype, i), n && t(e, n), e;
            };
          })(),
          a = t("./parseURL"),
          r = (function (t) {
            return t && t.__esModule ? t : { default: t };
          })(a),
          s = (function () {
            function t(e, i) {
              n(this, t),
                (this.params = i),
                (this.params.iconLayer = i.iconLayer || ""),
                (this.map = e);
              var o = this;
              e.on(
                "click",
                function (t) {
                  o.onClickOnMap(),
                    this.params.url.setURIParamsNotReloadPage({
                      lat: t.latlng.lat.toFixed(4),
                      lon: t.latlng.lng.toFixed(4),
                      zoom: t.target.getZoom(),
                    });
                }.bind(this)
              ),
                (this.bindCities = function (t, i, n) {
                  this.params.flagCities.checked
                    ? (this.map.hasLayer(i) || this.map.addLayer(i),
                      this.map.hasLayer(n) && this.map.removeLayer(n))
                    : (this.map.hasLayer(i) && this.map.removeLayer(i),
                      this.map.hasLayer(n) || this.map.addLayer(n)),
                    this.params.flagCities.addEventListener(
                      "change",
                      function (t) {
                        t.target.checked
                          ? (e.hasLayer(i) || e.addLayer(i),
                            e.hasLayer(n) && e.removeLayer(n),
                            this.params.url.setURIParamsNotReloadPage({
                              cities: "true",
                            }))
                          : (e.hasLayer(i) && e.removeLayer(i),
                            e.hasLayer(n) || e.addLayer(n),
                            this.params.url.setURIParamsNotReloadPage({
                              cities: "false",
                            }));
                      }.bind(this)
                    ),
                    this.appendBaseLayerByURIParams();
                }),
                (this.bindScales = function () {
                  (o._colorScaleControl = o.getCustomColorScale().addTo(e)),
                    e.on(
                      "overlayadd",
                      function (t) {
                        var e = t.layer.options.scaleParams;
                        o._colorScaleControl._updateScales(e),
                          t.layer.options.name &&
                            this.params.url.setURIParamsNotReloadPage({
                              layer: t.layer.options.name,
                            });
                      }.bind(this)
                    );
                  var t = this.map._layers,
                    i = this.params.url.getData("layer");
                  for (var n in t)
                    if (t.hasOwnProperty(n) && t[n].options.name === i) {
                      this._colorScaleControl._updateScales(
                        t[n].options.scaleParams
                      );
                      break;
                    }
                }),
                (this.bindPlayBack = function (t, e) {
                  function i(t) {
                    var e = String(t);
                    return e.length < 2 && (e = "0" + e), e;
                  }
                  function n(t) {
                    t || (t = x);
                    return "radar" === g
                      ? t.getUTCFullYear() +
                          "-" +
                          i(t.getUTCMonth() + 1) +
                          "-" +
                          i(t.getUTCDate()) +
                          "T" +
                          i(t.getUTCHours()) +
                          ":" +
                          i(t.getUTCMinutes())
                      : t.getTime() / 1e3;
                  }
                  function a() {
                    var t = parseInt(o.params.controlRange.value);
                    t > D - T
                      ? ((o.params.playForwardFaster.disabled = !0),
                        (o.params.playForward.disabled = t === D),
                        (o.params.playBack.disabled = !1),
                        (o.params.playBackFaster.disabled = !1))
                      : t < T
                      ? ((o.params.playBackFaster.disabled = !0),
                        (o.params.playBack.disabled = 1 === t),
                        (o.params.playForward.disabled = !1),
                        (o.params.playForwardFaster.disabled = !1))
                      : ((o.params.playBack.disabled = !1),
                        (o.params.playBackFaster.disabled = !1),
                        (o.params.playForward.disabled = !1),
                        (o.params.playForwardFaster.disabled = !1));
                  }
                  function r(e, i, n) {
                    i.setOpacity(0),
                      n || (n = 50),
                      t.hasLayer(i) ||
                        ((o.handlingClickplayControl = !0), t.addLayer(i));
                    var a = 0,
                      r = setInterval(function () {
                        a >= 0.6 &&
                          t.hasLayer(e) &&
                          ((o.handlingClickplayControl = !0),
                          t.removeLayer(e),
                          e.options.dataKey && delete w[e.options.dataKey],
                          (o.handlingClickplayControl = !1)),
                          a >= 1 && clearInterval(r),
                          (a += 0.2),
                          a > 0.8 && (a = 1),
                          e.setOpacity(1 - a),
                          i.setOpacity(a);
                      }, n);
                  }
                  function s(t, i, s) {
                    x.setMinutes(x.getUTCMinutes() + t),
                      (o.params.currMoment.innerHTML = l(x)),
                      x.getTime() !== e.getTime()
                        ? (k.checked && k.click(), (k.disabled = !0))
                        : (k.disabled = !1);
                    var h;
                    (h =
                      x.getTime() in w
                        ? w[x.getTime()]
                        : L.tileLayer(b + n(), v.options)),
                      r(v, h, i),
                      (v = h),
                      !1 !== s &&
                        (o.params.controlRange.value =
                          parseInt(o.params.controlRange.value) + t / C),
                      a();
                  }
                  function l(t) {
                    var e = t.toDateString().split(" "),
                      i = t.toLocaleTimeString().split(":");
                    return e[1] + " " + e[2] + ", " + i[0] + ":" + i[1];
                  }
                  function h(t) {
                    var e = t.toDateString().split(" ");
                    return e[1] + " " + e[2];
                  }
                  function u() {
                    for (var e in t._layers)
                      t._layers[e].options.name === g &&
                        t._layers[e] !== v &&
                        t.removeLayer(t._layers[e]);
                  }
                  function c(e, i) {
                    var o = Object.assign({}, i);
                    (o.dataKey = e.getTime()), (o.bounds = t.getBounds());
                    var a = L.tileLayer(b + n(e), o);
                    return a.setOpacity(0), a.addTo(t), a;
                  }
                  function p() {
                    (v = null),
                      "handlingClickplayControl" in o ||
                        Object.defineProperty(o, "handlingClickplayControl", {
                          value: !1,
                          writable: !0,
                        }),
                      P && m(),
                      (k = document.getElementById("citiesConditions")),
                      (k.disabled = !1),
                      (_ = new URL(window.location)),
                      (g = _.searchParams.get("layer"));
                    for (var i in t._layers)
                      t._layers[i].options.name !== g &&
                      (t._layers[i].options.name ||
                        t._layers[i].options.dataKey)
                        ? t.removeLayer(t._layers[i])
                        : t._layers[i].options.name === g && (v = t._layers[i]);
                    v && v.setOpacity(1),
                      (S = new Date(e.getTime())),
                      (M = new Date(e.getTime())),
                      "radar" === g
                        ? ((C = 10),
                          (T = 6),
                          (D = 1440 / C),
                          (E = D),
                          (y = "day"),
                          S.setDate(M.getUTCDate() - 1),
                          (o.params.playForward.disabled = !0),
                          (o.params.playForwardFaster.disabled = !0))
                        : ((C = 180),
                          (T = 8),
                          (D = 20160 / C),
                          (E = D / 2),
                          (y = "date"),
                          S.setDate(M.getUTCDate() - 7),
                          M.setDate(M.getUTCDate() + 7),
                          (o.params.playForward.disabled = !1),
                          (o.params.playForwardFaster.disabled = !1)),
                      (o.params.playBack.disabled = !1),
                      (o.params.playBackFaster.disabled = !1),
                      (x = new Date(e.getTime())),
                      (o.params.controlRange.max = D),
                      (o.params.controlRange.value = E),
                      (b = (function () {
                        for (var e in t._layers)
                          if (t._layers[e].options.name === g) {
                            var i = t._layers[e]._url;
                            i = i.includes(y)
                              ? i.slice(0, i.indexOf(y + "=") + y.length + 1)
                              : i + "&" + y + "=";
                            break;
                          }
                        return i;
                      })()),
                      (w = {}),
                      (o.params.currMoment.innerHTML = l(e)),
                      (o.params.minDate.innerHTML = h(S)),
                      (o.params.maxDate.innerHTML = h(M));
                  }
                  function d() {
                    (o.params.play.style.display = "none"),
                      (o.params.stop.style.display = "inline-block"),
                      x.getTime() === e.getTime() &&
                        (x.setDate(S.getDate()),
                        (o.params.controlRange.value = 1));
                    var i = new Date(x.getTime());
                    w = {};
                    for (var n = 0; n <= 10 && !(i >= M); )
                      (w[i.getTime()] = c(i, v.options)),
                        i.setMinutes(i.getMinutes() + C),
                        n++;
                    x.setMinutes(x.getMinutes() - C);
                    var a = [
                      "temperature",
                      "pressure",
                      "windspeed",
                      "clouds",
                    ].includes(g)
                      ? 2e3
                      : 800;
                    P = setInterval(function () {
                      if (x >= M) return void m();
                      i < M &&
                        Object.keys(t._layers).length < 10 &&
                        ((w[i.getTime()] = c(i)),
                        i.setMinutes(i.getMinutes() + C)),
                        s(C, 120);
                    }, a);
                  }
                  function m() {
                    clearInterval(P),
                      u(),
                      (o.handlingClickplayControl = !1),
                      (o.params.play.style.display = "inline-block"),
                      (o.params.stop.style.display = "none");
                  }
                  function f() {
                    var t = new Date(e.getTime()),
                      i = parseInt(o.params.controlRange.value);
                    "radar" === g
                      ? t.setMinutes(t.getMinutes() - (D - i) * C)
                      : t.setMinutes(t.getMinutes() - (D / 2 - i) * C),
                      s((t - x) / 6e4, 100, !1);
                  }
                  var _, g, v, y, b, P, x, w, C, T, E, D, S, M, k;
                  p(),
                    this.params.playBack.addEventListener("click", function () {
                      return s(-C, 100);
                    }),
                    this.params.playBackFaster.addEventListener(
                      "click",
                      function () {
                        return s(-T * C, 100);
                      }
                    ),
                    this.params.playForward.addEventListener(
                      "click",
                      function () {
                        return s(C, 100);
                      }
                    ),
                    this.params.playForwardFaster.addEventListener(
                      "click",
                      function () {
                        return s(T * C, 100);
                      }
                    ),
                    this.params.play.addEventListener("click", function () {
                      return d();
                    }),
                    this.params.stop.addEventListener("click", function () {
                      return m();
                    }),
                    this.params.controlRange.addEventListener(
                      "change",
                      function () {
                        return f();
                      }
                    ),
                    this.appendBaseLayerByURIParams(),
                    t.on(
                      "overlayadd",
                      function (t) {
                        p();
                      }.bind(this)
                    );
                }),
                (this.CustomLayersControl = L.Control.Layers.extend({
                  options: {
                    collapsed: !1,
                    position: "topright",
                    autoZIndex: !0,
                    hideSingleBase: !0,
                  },
                  initialize: function (t, e, i) {
                    L.setOptions(this, i),
                      (this._layers = {}),
                      (this._lastZIndex = 0),
                      (this._handlingClick = !1);
                    for (var n in t) this._addLayer(t[n], n);
                    for (n in e) this._addLayer(e[n], n, !0);
                  },
                  onAdd: function (t) {
                    return (
                      this._initLayout(),
                      this._update(),
                      t
                        .on("layeradd", this._onLayerChange, this)
                        .on("layerremove", this._onLayerChange, this),
                      this._container
                    );
                  },
                  onRemove: function (t) {
                    t.off("layeradd", this._onLayerChange, this).off(
                      "layerremove",
                      this._onLayerChange,
                      this
                    );
                  },
                  addBaseLayer: function (t, e) {
                    return this._addLayer(t, e), this._update(), this;
                  },
                  addOverlay: function (t, e) {
                    return this._addLayer(t, e, !0), this._update(), this;
                  },
                  removeLayer: function (t) {
                    var e = L.stamp(t);
                    return delete this._layers[e], this._update(), this;
                  },
                  _initLayout: function () {
                    var t = "weather-control-layers-new",
                      e = (this._container = L.DomUtil.create("div", t));
                    e.setAttribute("aria-haspopup", !0),
                      L.Browser.touch
                        ? L.DomEvent.on(e, "click", L.DomEvent.stopPropagation)
                        : L.DomEvent.disableClickPropagation(
                            e
                          ).disableScrollPropagation(e);
                    var i = (this._form = L.DomUtil.create("div", t + "-list"));
                    if (this.options.collapsed) {
                      var n = (this._layersLink = L.DomUtil.create(
                        "div",
                        t + "-toggle",
                        e
                      ));
                      (n.innerText = "Layers"),
                        L.Browser.android ||
                          L.DomEvent.on(n, "click", this._toogle, this),
                        L.Browser.touch
                          ? L.DomEvent.on(n, "click", L.DomEvent.stop).on(
                              n,
                              "click",
                              this._expand,
                              this
                            )
                          : L.DomEvent.on(n, "focus", this._expand, this),
                        L.DomEvent.on(
                          i,
                          "click",
                          function () {
                            setTimeout(L.bind(this._onInputClick, this), 0);
                          },
                          this
                        ),
                        this._map.on("click", this._collapse, this);
                    } else this._expand();
                    L.DomUtil.create("div", t + "-separator", i),
                      (this._baseLayersList = L.DomUtil.create(
                        "div",
                        t + "-base",
                        i
                      )),
                      (this._separator = L.DomUtil.create(
                        "div",
                        t + "-separator",
                        i
                      )),
                      (this._overlaysList = L.DomUtil.create(
                        "div",
                        t + "-overlays",
                        i
                      )),
                      e.appendChild(i);
                  },
                  _changeCheckedLayer: function () {
                    var t = document.location.hash,
                      e = t.charAt(1).toUpperCase() + t.toLowerCase().substr(2),
                      i = this._form.getElementsByTagName("input");
                    for (var n in i)
                      if (i.hasOwnProperty(n) && i[n].id === e)
                        return (i[n].checked = !0), void this._onInputClick();
                    (i["Base map"].checked = !0),
                      this._onInputClick(),
                      (document.location.hash = "");
                  },
                  _addLayer: function (t, e, i) {
                    var n = L.stamp(t);
                    (this._layers[n] = { layer: t, name: e, overlay: i }),
                      this.options.autoZIndex &&
                        t.setZIndex &&
                        (this._lastZIndex++, t.setZIndex(this._lastZIndex));
                  },
                  _update: function () {
                    if (this._container) {
                      (this._baseLayersList.innerHTML = ""),
                        (this._overlaysList.innerHTML = "");
                      var t,
                        e,
                        i = !1,
                        n = !1;
                      for (t in this._layers)
                        (e = this._layers[t]),
                          this._addItem(e),
                          (n = n || e.overlay),
                          (i = i || !e.overlay);
                      (this._separator.style.display = n && i ? "" : "none"),
                        n
                          ? (this._overlaysList.className +=
                              " weather-control-layers-last")
                          : (this._baseLayersList.className +=
                              " weather-control-layers-last");
                    }
                  },
                  _onLayerChange: function (t) {
                    var e = this._layers[L.stamp(t.layer)];
                    if (e) {
                      this._handlingClick ||
                        o.handlingClickplayControl ||
                        this._update();
                      var i = e.overlay
                        ? "layeradd" === t.type
                          ? "overlayadd"
                          : "overlayremove"
                        : "layeradd" === t.type
                        ? "baselayerchange"
                        : null;
                      i && this._map.fire(i, e);
                    }
                  },
                  _createRadioElement: function (t, e, i) {
                    var n =
                      '<input type="radio" id="' +
                      e +
                      '" class="weather-control-layers-selector" name="' +
                      t +
                      '"';
                    i && (n += ' checked="checked"'), (n += "/>");
                    var o = document.createElement("div");
                    return (o.innerHTML = n), o.firstChild;
                  },
                  _addItem: function (t) {
                    var e,
                      i = t.overlay ? this._overlaysList : this._baseLayersList,
                      n = L.DomUtil.create("div", "weather-layer-container", i),
                      o = document.createElement("label"),
                      a = this._map.hasLayer(t.layer);
                    (o.htmlFor = t.name),
                      t.overlay
                        ? ((e = document.createElement("input")),
                          (e.type = "radio"),
                          (e.id = t.name),
                          (e.name = "Parameters"),
                          (e.className = "weather-control-layers-selector"),
                          (e.defaultChecked = a))
                        : (e = this._createRadioElement(
                            "weather-overlay-layers",
                            t.name,
                            a
                          )),
                      (e.layerId = L.stamp(t.layer)),
                      L.DomEvent.on(e, "click", this._onInputClick, this);
                    var r = document.createElement("span");
                    return (
                      (r.innerHTML = " " + t.name),
                      n.appendChild(e),
                      o.appendChild(r),
                      n.appendChild(o),
                      o
                    );
                  },
                  _onInputClick: function () {
                    var t,
                      e,
                      i,
                      n = this._form.getElementsByTagName("input"),
                      o = n.length;
                    for (this._handlingClick = !0, t = 0; t < o; t++)
                      (e = n[t]),
                        (i = this._layers[e.layerId]) &&
                          (e.checked && !this._map.hasLayer(i.layer)
                            ? this._map.addLayer(i.layer)
                            : !e.checked &&
                              this._map.hasLayer(i.layer) &&
                              this._map.removeLayer(i.layer));
                    (this._handlingClick = !1), this._refocusOnMap();
                  },
                  _expand: function () {
                    L.DomUtil.addClass(
                      this._container,
                      "weather-control-layers-expanded"
                    );
                  },
                  _collapse: function () {
                    this._container.className =
                      this._container.className.replace(
                        " weather-control-layers-expanded",
                        ""
                      );
                  },
                  _toogle: function () {
                    this._container.className.indexOf(
                      " weather-control-layers-expanded"
                    ) > -1
                      ? this._collapse()
                      : this._expand();
                  },
                })),
                (this.LayersColorScale = L.Control.extend({
                  options: { position: "bottomright" },
                  onAdd: function (t) {
                    this._map = t;
                    return (
                      (this.container = L.DomUtil.create(
                        "div",
                        "leaflet-control-color-scale"
                      )),
                      this._addScales("leaflet-control-color-scale"),
                      this.container
                    );
                  },
                  onRemove: function (t) {},
                  _addScales: function (t) {
                    (this._CScale = L.DomUtil.create(
                      "div",
                      t + "-line",
                      this.container
                    )),
                      this._updateScales();
                  },
                  _updateScales: function (t) {
                    if (t) {
                      var e = t.gradient;
                      (this._CScale.innerHTML = ""),
                        e.forEach(
                          function (e, i) {
                            (this.container.style.display = "block"),
                              (this.container.style.background = "none"),
                              (this.container.style.boxShadow = "none"),
                              (this.container.style.borderRadius = "none"),
                              (this.container.style.borderWidth = 0),
                              (this.container.style.marginRight = "10px"),
                              (this.container.style.width =
                                parseInt(t.width) + 60 + "px"),
                              (this.container.style.height =
                                27 * (i + 1) + "px"),
                              (this._CScale.style.backgroundImage = "none"),
                              (this._CScale.style.position = "relative"),
                              (this._CScale.style.borderWidth = 0),
                              (this._CScale.style.margin = 0);
                            var n = document.createElement("div");
                            n.className = "scale-details";
                            var o = document.createElement("div");
                            (o.innerHTML = t.legend.length
                              ? t.legend[i] + ", " + t.siText
                              : ""),
                              n.appendChild(o);
                            if (t.linearScale) {
                              var a = document.createElement("div");
                              (a.className = "scale-gradient"),
                                (a.style.width = "260px");
                              var r = Math.round(e[0].value),
                                s = Math.round(e[e.length - 1].value),
                                l = Math.round((s - r) / 4),
                                h = document.createElement("div");
                              h.className = "scale-dividers";
                              for (var u = 0; u <= 4; u++)
                                h.innerHTML += "<div>" + (r + l * u) + "</div>";
                              a.appendChild(h);
                              var c = document.createElement("div");
                              c.className = "horizontal-gradient-line";
                              for (
                                var p = "",
                                  d = e.length,
                                  m = (e[d - 1].value - e[0].value) / 100,
                                  f = 0 - e[0].value,
                                  u = 0;
                                u < e.length;
                                u++
                              )
                                (p +=
                                  e[u].color +
                                  " " +
                                  (e[u].value + f) / m +
                                  "%"),
                                  u < e.length - 1 && (p += ", ");
                              (c.style.backgroundImage =
                                "linear-gradient(to right, " + p + ")"),
                                a.appendChild(c),
                                n.appendChild(a),
                                this._CScale.appendChild(n);
                            } else {
                              var _ = document.createElement("div"),
                                g = document.createElement("div");
                              (_.style.width = "260px"),
                                (g.style.width = "260px"),
                                (_.className = "horizontal-gradient-line"),
                                (g.className = "horizontal-gradient-values"),
                                (g.className = "scale-dividers ");
                              for (
                                var v = "linear-gradient(to left ",
                                  u = e.length - 1;
                                u >= 0;
                                u--
                              )
                                v += ", " + e[u].color;
                              (v += ")"),
                                (_.style.background = v),
                                e.forEach(function (t) {
                                  g.innerHTML += "<div>" + t.value + "</div>";
                                });
                              var y = document.createElement("div");
                              (y.className = "gradient-container"),
                                y.appendChild(g),
                                y.appendChild(_),
                                n.appendChild(y),
                                this._CScale.appendChild(n),
                                this._CScale.appendChild(n);
                            }
                          }.bind(this)
                        );
                    } else
                      (this.container.style.display = "none"),
                        (this._CScale.style.backgroundImage = "none"),
                        (this._CScale.innerHTML = "");
                  },
                })),
                (this.PlayControl = L.Control.extend({
                  enterDate: (function () {
                    var t = new Date();
                    t.setMinutes(t.getMinutes() - 8);
                    var e = 10 * Math.floor(t.getUTCMinutes() / 10);
                    return (
                      t.setMinutes(e), t.setSeconds(0), t.setMilliseconds(0), t
                    );
                  })(),
                  options: { position: "topright" },
                  onAdd: function (t) {
                    return (
                      (this._div = L.DomUtil.create("div", "play-control")),
                      L.DomEvent.disableClickPropagation(this._div),
                      this.update(),
                      this._div
                    );
                  },
                  update: function (t) {
                    function e(t, e) {
                      e = Object.assign(e);
                      var i = document.createElement(t);
                      return (
                        Object.keys(e).forEach(function (t) {
                          void 0 !== e[t] && i.setAttribute(t, e[t]);
                        }),
                        i
                      );
                    }
                    var i, n, o, a;
                    (i = document.createElement("div")),
                      (n = document.createElement("div")),
                      (o = document.createElement("div")),
                      (a = document.createElement("div"));
                    var r = e("button", { id: "play-back-faster" }),
                      s = e("img", {
                        src: "/themes/openweathermap/assets/img/owm_icons/icon_down_black.svg",
                      });
                    r.appendChild(s),
                      r.appendChild(s.cloneNode(!0)),
                      i.append(r);
                    var l = e("button", { id: "play-back" });
                    (l.id = "play-back"),
                      l.appendChild(s.cloneNode(!0)),
                      i.append(l);
                    var h = e("button", { id: "play" }),
                      u = e("img", {
                        src: "/themes/openweathermap/assets/img/owm_icons/icon_down_white.svg",
                      });
                    h.appendChild(u), i.append(h);
                    var c = e("button", { id: "stop" }),
                      p = e("img", {
                        src: "/themes/openweathermap/assets/img/owm_icons/icon_pause_black.png",
                      });
                    c.appendChild(p), (c.style.display = "none"), i.append(c);
                    var d = e("button", { id: "play-forward" });
                    d.appendChild(s.cloneNode(!0)), i.append(d);
                    var m = e("button", { id: "play-forward-faster" });
                    document.createElement("button"),
                      m.appendChild(s.cloneNode(!0)),
                      m.appendChild(s.cloneNode(!0)),
                      i.append(m);
                    var f = e("span", { id: "current-moment" });
                    n.append(f);
                    var _ = e("input", {
                      id: "control-range",
                      type: "range",
                      min: "1",
                    });
                    o.appendChild(_);
                    var g = e("span", { id: "min-date" }),
                      v = e("span", { id: "max-date" });
                    a.appendChild(g),
                      a.appendChild(v),
                      this._div.appendChild(i),
                      this._div.appendChild(n),
                      this._div.appendChild(o),
                      this._div.appendChild(a);
                  },
                })),
                (this.getCustomColorScale = function (t) {
                  return new this.LayersColorScale(t);
                }),
                (this.getPlayControl = function () {
                  return new this.PlayControl();
                });
            }
            return (
              o(t, [
                {
                  key: "changeLayersScaling",
                  value: function (t) {
                    var e = t._layers;
                    for (var i in e)
                      if (
                        e.hasOwnProperty(i) &&
                        (document.location.hash.substr(1).toLowerCase() ===
                        e[i].options.name
                          ? e[i].options.name
                          : "")
                      ) {
                        var n = e[i].options.scaleParams,
                          o = new this.LayersColorScale(n);
                        o._updateScales(n);
                      }
                  },
                },
                {
                  key: "appendBaseLayerByURIParams",
                  value: function () {
                    var t = new r.default(document.location),
                      e = t.getData() ? t.getData().layer : "",
                      i = this.params.iconLayer._layers;
                    for (var n in i)
                      if (
                        i.hasOwnProperty(n) &&
                        i[n] &&
                        i[n].title.toLowerCase() === e.toLowerCase()
                      ) {
                        this.params.iconLayer.setActiveLayer(i[n].layer);
                        break;
                      }
                  },
                },
                {
                  key: "expandMarker",
                  value: function (t) {
                    var e = this,
                      i = e.lastMarker;
                    i && i._icon && e.collapseMarker(i),
                      (t._zIndex += 1e3),
                      (t._icon.className += " expanded"),
                      (e.lastMarker = t);
                  },
                },
                {
                  key: "collapseMarker",
                  value: function (t) {
                    (t._icon.className = t._icon.className.replace(
                      "expanded",
                      ""
                    )),
                      (this.lastMarker = void 0),
                      (t._zIndex -= 1e3),
                      t.update();
                  },
                },
                {
                  key: "toogleMarker",
                  value: function (t) {
                    var e = this;
                    t._icon.className.indexOf("expanded") + 1
                      ? e.collapseMarker(t)
                      : e.expandMarker(t);
                  },
                },
                {
                  key: "onClickOnMap",
                  value: function () {
                    var t = this,
                      e = t.lastMarker;
                    e && e._icon && t.collapseMarker(e);
                  },
                },
                {
                  key: "getWeatherLayer",
                  value: function (t) {
                    var e = this,
                      i = function (t) {
                        var e = "weather-none";
                        return (
                          t > -20 && t <= 6 && (e = "weather-cold"),
                          t <= 2 && (e = "weather-very-cold"),
                          t > 6 && t <= 20 && (e = "weather-average"),
                          t > 20 && t <= 28 && (e = "weather-hot"),
                          t > 28 && (e = "weather-very-hot"),
                          e
                        );
                      };
                    return new L.TileLayer.GeoJSON(
                      t,
                      { clipTiles: !0 },
                      {
                        pointToLayer: function (t, e) {
                          var n = t.properties.city.replace(" ", "В "),
                            o = t.properties.temp.toFixed(0);
                          "-0" === o && (o = "0");
                          var a = L.divIcon({
                            className: "marker-default",
                            html: [
                              "<div>",
                              '<span class="city-bullet"></span>',
                              '<div class="city-data">',
                              '<div class="row city-main-info">',
                              '<span class="city-weather">' + o + " </span>",
                              '<span class="city-name ' +
                                i(o) +
                                '">' +
                                n +
                                "</span>",
                              "</div>",
                              '<div class="row city-full-info">',
                              "<table>",
                              "<thead>",
                              "<tr>",
                              '<th colspan=2 class="city-param ' +
                                i(o) +
                                '">' +
                                n +
                                "</td>",
                              "</tr>",
                              "</thead>",
                              "<tbody>",
                              "<tr>",
                              '<td class="city-param-name">country</td>',
                              '<td class="city-param">' +
                                t.properties.country +
                                "</td>",
                              "</tr>",
                              "<tr>",
                              '<td class="city-param-name">temp</td>',
                              '<td class="city-param">' +
                                t.properties.temp +
                                "ВєC</td>",
                              "</tr>",
                              "<tr>",
                              '<td class="city-param-name">clouds</td>',
                              '<td class="city-param">' +
                                t.properties.clouds +
                                "%</td>",
                              "</tr>",
                              "<tr>",
                              '<td class="city-param-name">humidity</td>',
                              '<td class="city-param">' +
                                t.properties.humidity +
                                "%</td>",
                              "</tr>",
                              "<tr>",
                              '<td class="city-param-name">pressure</td>',
                              '<td class="city-param">' +
                                t.properties.pressure +
                                "hPa</td>",
                              "</tr>",
                              "<tr>",
                              '<td class="city-param-name">wind direction</td>',
                              '<td class="city-param">' +
                                t.properties.wind_deg +
                                "В°</td>",
                              "</tr>",
                              "<tr>",
                              '<td class="city-param-name">wind speed</td>',
                              '<td class="city-param">' +
                                t.properties.wind_speed +
                                "m/s</td>",
                              "</tr>",
                              "</tbody>",
                              "</table>",
                              "</div>",
                              "</div>",
                              "</div>",
                            ].join(""),
                          });
                          return L.marker(e, {
                            icon: a,
                            riseOnHover: !0,
                            clickable: !0,
                          });
                        },
                        onEachFeature: function (t, i) {
                          i instanceof L.Point ||
                            i.on("click", function (t) {
                              e.toogleMarker(t.target);
                            });
                        },
                      }
                    );
                  },
                },
                {
                  key: "getCitiesLayer",
                  value: function (t) {
                    return new TileLayerGeoJSON(
                      t,
                      {},
                      {
                        pointToLayer: function (t, e) {
                          var i = t.properties.city.replace(" ", "В "),
                            n = L.divIcon({
                              className: "marker-simple",
                              html: [
                                '<span class="city-simple-bullet"></span>',
                                '<span class="city-lable">' + i + "</span>",
                              ].join(""),
                            });
                          return L.marker(e, {
                            icon: n,
                            riseOnHover: !0,
                            clickable: !0,
                          });
                        },
                      }
                    );
                  },
                },
                {
                  key: "getCustomLayersControl",
                  value: function (t, e, i) {
                    return new this.CustomLayersControl(t, e, i);
                  },
                },
              ]),
              t
            );
          })();
        i.default = s;
      },
      { "./parseURL": 5 },
    ],
    9: [
      function (t, e, i) {
        "use strict";
        function n(t) {
          return t && t.__esModule ? t : { default: t };
        }
        function o(t, e) {
          if (!(t instanceof e))
            throw new TypeError("Cannot call a class as a function");
        }
        function a(t, e) {
          if (!t)
            throw new ReferenceError(
              "this hasn't been initialised - super() hasn't been called"
            );
          return !e || ("object" != typeof e && "function" != typeof e) ? t : e;
        }
        function r(t, e) {
          if ("function" != typeof e && null !== e)
            throw new TypeError(
              "Super expression must either be null or a function, not " +
                typeof e
            );
          (t.prototype = Object.create(e && e.prototype, {
            constructor: {
              value: t,
              enumerable: !1,
              writable: !0,
              configurable: !0,
            },
          })),
            e &&
              (Object.setPrototypeOf
                ? Object.setPrototypeOf(t, e)
                : (t.__proto__ = e));
        }
        Object.defineProperty(i, "__esModule", { value: !0 });
        var s = (function () {
            function t(t, e) {
              for (var i = 0; i < e.length; i++) {
                var n = e[i];
                (n.enumerable = n.enumerable || !1),
                  (n.configurable = !0),
                  "value" in n && (n.writable = !0),
                  Object.defineProperty(t, n.key, n);
              }
            }
            return function (e, i, n) {
              return i && t(e.prototype, i), n && t(e, n), e;
            };
          })(),
          l = t("./weather-layers"),
          h = n(l),
          u = t("./parseURL"),
          c = n(u),
          p = t("./layers"),
          d = n(p),
          m = t("./geo-location"),
          f = n(m),
          _ = (function (t) {
            function e(t) {
              o(this, e);
              var i = a(
                this,
                (e.__proto__ || Object.getPrototypeOf(e)).call(this, t)
              );
              return (
                (i.params = t),
                (i.params.url = i.initialMechanicalURI()),
                (i.layerFlag = !0),
                (i.arrBasemap = []),
                (i.latDefault = 30),
                (i.lonDefault = -20),
                (i.zoomDefault =
                  "https:" === document.location.protocol ? 5 : 3),
                "map" === i.params.url.getData("basemap")
                  ? (i.arrBasemap.push("map"), i.arrBasemap.push("satellite"))
                  : (i.arrBasemap.push("satellite"), i.arrBasemap.push("map")),
                i
              );
            }
            return (
              r(e, t),
              s(e, [
                {
                  key: "iconLayers",
                  value: function (t) {
                    var e = [],
                      i = {
                        title: "satellite",
                        layer: this.layers.satellite,
                        icon: "/themes/owm/assets/vendor/owm/img/layers-satellite.png",
                      },
                      n = {
                        title: "map",
                        layer: this.layers.vector,
                        icon: "/themes/owm/assets/vendor/owm/img/layers-vector.png",
                      };
                    e.push(i),
                      "map" === this.params.url.getData("basemap")
                        ? e.unshift(n)
                        : e.push(n);
                    var o = new this.params.L.control.iconLayers(e, {
                      position: "bottomleft",
                      maxLayersInRow: 5,
                    });
                    o.addTo(t);
                    document.querySelector(".leaflet-iconLayers");
                    return (
                      (this.getCurrentIconLayer =
                        this.getCurrentIconLayer.bind(this)),
                      o.on("activelayerchange", this.getCurrentIconLayer),
                      o
                    );
                  },
                },
                {
                  key: "getCurrentIconLayer",
                  value: function () {
                    this.layerFlag
                      ? this.params.url.setURIParamsNotReloadPage({
                          basemap: this.arrBasemap[1],
                        })
                      : this.params.url.setURIParamsNotReloadPage({
                          basemap: this.arrBasemap[0],
                        }),
                      (this.layerFlag = !this.layerFlag);
                  },
                },
                {
                  key: "initialMechanicalURI",
                  value: function () {
                    var t = [
                        "basemap",
                        "cities",
                        "layer",
                        "lat",
                        "lon",
                        "zoom",
                      ],
                      e = new c.default(document.location);
                    return (e.setUriSearch = t), e;
                  },
                },
                {
                  key: "setDefaultLayers",
                  value: function (t) {
                    var e = {};
                    (this.basemap = t.url.getData("basemap")),
                      this.basemap || (e.basemap = "map"),
                      (this.layer = t.url.getData("layer")),
                      this.layer ||
                        ((e.layer = "temperature"), (this.layer = e.layer)),
                      (this.cities = t.url.getData("cities")),
                      this.cities ||
                        ((e.cities = "true"), (this.cities = e.cities)),
                      (this.lat = t.url.getData("lat")),
                      this.lat ||
                        ((e.lat = t.url.lat || t.lat || this.latDefault),
                        (this.lat = e.lat)),
                      (this.lon = t.url.getData("lon")),
                      this.lon ||
                        ((e.lon = t.url.lon || t.lon || this.lonDefault),
                        (this.lon = e.lon)),
                      (this.zoom = t.url.getData("zoom")),
                      this.zoom ||
                        ((e.zoom = this.zoomDefault), (this.zoom = e.zoom)),
                      t.url.setURIParamsNotReloadPage(e),
                      (t.url.setActualLocation = document.location),
                      t.url.compareData("cities", "true")
                        ? (this.params.flagCities.checked = !0)
                        : (this.params.flagCities.checked = !1);
                  },
                },
                {
                  key: "renderConditionPanelOverlay",
                  value: function () {
                    var t = document.createElement("div");
                    return (
                      map.appendChild(t),
                      t.insertAdjacentHTML(
                        "afterBegin",
                        '<div>\n        <input type="checkbox" class="weather-layer-container__checkbox" id="citiesConditions" style="padding-right: 5px;">\n        <label class="weather-layer-container__label" for="citiesConditions">Cities</label>\n       </div>\n       <img src="/themes/openweathermap/assets/img/owm_icons/icon_chevron_up.png" id="img-toggle-overlays">'
                      ),
                      (t.className = "weather-layer-container__cities"),
                      t
                    );
                  },
                },
                {
                  key: "locationSuccess",
                  value: function (t) {
                    var e = t.coords;
                    return { lat: e.latitude, lon: e.longitude };
                  },
                },
                {
                  key: "locationError",
                  value: function (t) {
                    console.warn("ERROR(" + t.code + "): " + t.message);
                  },
                },
                {
                  key: "detectLocation",
                  value: function () {
                    function t(t) {
                      var e = this.locationSuccess(t),
                        i = e.lat,
                        n = e.lon;
                      this.render(i, n);
                    }
                    function e(t) {
                      this.locationError(t), this.render();
                    }
                    (t = t.bind(this)),
                      (e = e.bind(this)),
                      (0, f.default)(t, e);
                  },
                },
                {
                  key: "render",
                  value: function () {
                    function t() {
                      document
                        .querySelectorAll(".weather-control-layers-selector")
                        .forEach(function (t) {
                          if (!t.checked) {
                            var e = t.parentElement.style.display;
                            t.parentElement.style.display =
                              "none" === e ? "flex" : "none";
                          }
                        }),
                        "rotate(180deg)" === this.style.webkitTransform
                          ? (this.style.webkitTransform = "none")
                          : (this.style.webkitTransform = "rotate(180deg)");
                    }
                    var e =
                        arguments.length > 0 && void 0 !== arguments[0]
                          ? arguments[0]
                          : null,
                      i =
                        arguments.length > 1 && void 0 !== arguments[1]
                          ? arguments[1]
                          : null,
                      n = this.renderConditionPanelOverlay();
                    (this.params.flagCities =
                      document.getElementById("citiesConditions")),
                      e && (this.params.lat = parseFloat(e, 10).toFixed(4)),
                      i && (this.params.lon = parseFloat(i, 10).toFixed(4)),
                      this.setDefaultLayers(this.params);
                    var o = L.map("map", {
                      worldCopyJump: !0,
                      minZoom: 3,
                      maxZoom: 10,
                    }).setView(
                      [
                        this.params.url.getData("lat") || e || this.latDefault,
                        this.params.url.getData("lon") || i || this.lonDefault,
                      ],
                      this.params.url.getData("zoom") || this.zoomDefault
                    );
                    if (this.layer)
                      for (var a in this.layers)
                        this.layer === a && this.layers[a].addTo(o);
                    var r = {
                        Pressure: this.layers.pressure,
                        Temperature: this.layers.temperature,
                        "Wind speed": this.layers.windspeed,
                        Clouds: this.layers.clouds,
                        "Global Precipitation": this.layers.radar,
                      },
                      s = {};
                    (this.params.layers = this.iconLayers(o)),
                      (this.params.layer = this.layer),
                      (this.params.L = L);
                    var l = new h.default(o, this.params),
                      u = l.getCustomLayersControl(s, r);
                    o.addControl(u);
                    var c = document.querySelector(
                      ".weather-control-layers-new"
                    );
                    c && c.appendChild(n),
                      (document.getElementById("img-toggle-overlays").onclick =
                        t),
                      o.addControl(L.control.search());
                    var p = l
                        .getWeatherLayer(
                          this.baseURL +
                            "/weather/cities/{z}/{x}/{y}.geojson?appid=" +
                            this.params.appid
                        )
                        .addTo(o),
                      d = L.tileLayer(
                        "http://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png",
                        { zIndex: 7 }
                      ).addTo(o);
                    l.bindCities("showWeather", p, d), l.bindScales();
                    var m = l.getPlayControl();
                    o.addControl(m),
                      (this.params.playBack =
                        document.getElementById("play-back")),
                      (this.params.playBackFaster =
                        document.getElementById("play-back-faster")),
                      (this.params.playForward =
                        document.getElementById("play-forward")),
                      (this.params.playForwardFaster = document.getElementById(
                        "play-forward-faster"
                      )),
                      (this.params.play = document.getElementById("play")),
                      (this.params.stop = document.getElementById("stop")),
                      (this.params.currMoment =
                        document.getElementById("current-moment")),
                      (this.params.minDate =
                        document.getElementById("min-date")),
                      (this.params.maxDate =
                        document.getElementById("max-date")),
                      (this.params.controlRange =
                        document.getElementById("control-range")),
                      l.bindPlayBack(o, m.enterDate);
                  },
                },
              ]),
              e
            );
          })(d.default);
        i.default = _;
      },
      {
        "./geo-location": 3,
        "./layers": 4,
        "./parseURL": 5,
        "./weather-layers": 8,
      },
    ],
    10: [
      function (t, e, i) {
        !(function (i) {
          void 0 !== e && e.exports
            ? (e.exports = i(t("leaflet")))
            : ((window.L.control.iconLayers = i(window.L)),
              (window.L.Control.IconLayers =
                window.L.control.iconLayers.Constructor));
        })(function (t) {
          function e(t, e) {
            for (var i in t) t.hasOwnProperty(i) && e(t[i], i, t);
          }
          function i(t, e) {
            if (t.length) {
              for (var i = 0; i < t.length; i++) if (e(t[i])) return t[i];
            } else for (var n in t) if (t.hasOwnProperty(n) && e(t[n])) return t[n];
          }
          function n(t) {
            for (var e in t) if (t.hasOwnProperty(e)) return t[e];
          }
          function o(t) {
            var e = 0;
            for (var i in t) t.hasOwnProperty(i) && e++;
            return e;
          }
          function a(t, e) {
            t.children.length
              ? t.insertBefore(e, t.children[0])
              : t.appendChild(e);
          }
          var r = t.Control.extend({
              includes: t.Mixin.Events,
              _getActiveLayer: function () {
                return this._activeLayerId
                  ? this._layers[this._activeLayerId]
                  : o(this._layers)
                  ? n(this._layers)
                  : null;
              },
              _getPreviousLayer: function () {
                var t = this._getActiveLayer();
                return t
                  ? this._previousLayerId
                    ? this._layers[this._previousLayerId]
                    : i(
                        this._layers,
                        function (e) {
                          return e.id !== t.id;
                        }.bind(this)
                      ) || null
                  : null;
              },
              _getInactiveLayers: function () {
                var t = [],
                  i = this._getActiveLayer() ? this._getActiveLayer().id : null,
                  n = this._getPreviousLayer()
                    ? this._getPreviousLayer().id
                    : null;
                return (
                  e(this._layers, function (e) {
                    e.id !== i && e.id !== n && t.push(e);
                  }),
                  t
                );
              },
              _arrangeLayers: function () {
                var t = {};
                return (
                  (t.previous = function () {
                    var t = this._getInactiveLayers();
                    return (
                      this._getActiveLayer() &&
                        t.unshift(this._getActiveLayer()),
                      this._getPreviousLayer() &&
                        t.unshift(this._getPreviousLayer()),
                      t
                    );
                  }),
                  t[this.options.behavior].apply(this, arguments)
                );
              },
              _getLayerCellByLayerId: function (t) {
                for (
                  var e = this._container.getElementsByClassName(
                      "leaflet-iconLayers-layerCell"
                    ),
                    i = 0;
                  i < e.length;
                  i++
                )
                  if (e[i].getAttribute("data-layerid") == t) return e[i];
              },
              _createLayerElement: function (e) {
                var i = t.DomUtil.create("div", "leaflet-iconLayers-layer");
                if (e.title) {
                  var n = t.DomUtil.create(
                      "div",
                      "leaflet-iconLayers-layerTitleContainer"
                    ),
                    o = t.DomUtil.create(
                      "div",
                      "leaflet-iconLayers-layerTitle"
                    ),
                    a = t.DomUtil.create(
                      "div",
                      "leaflet-iconLayers-layerCheckIcon"
                    );
                  (o.innerHTML = e.title),
                    n.appendChild(o),
                    i.appendChild(n),
                    i.appendChild(a);
                }
                return (
                  e.icon &&
                    i.setAttribute(
                      "style",
                      "background-image: url('" + e.icon + "')"
                    ),
                  i
                );
              },
              _createLayerElements: function () {
                for (
                  var e,
                    i,
                    n = this._arrangeLayers(),
                    o = this._getActiveLayer() && this._getActiveLayer().id,
                    r = 0;
                  r < n.length;
                  r++
                )
                  r % this.options.maxLayersInRow == 0 &&
                    ((e = t.DomUtil.create(
                      "div",
                      "leaflet-iconLayers-layersRow"
                    )),
                    -1 === this.options.position.indexOf("bottom")
                      ? this._container.appendChild(e)
                      : a(this._container, e)),
                    (i = t.DomUtil.create(
                      "div",
                      "leaflet-iconLayers-layerCell"
                    )),
                    i.setAttribute("data-layerid", n[r].id),
                    0 !== r &&
                      t.DomUtil.addClass(
                        i,
                        "leaflet-iconLayers-layerCell_hidden"
                      ),
                    n[r].id === o &&
                      t.DomUtil.addClass(
                        i,
                        "leaflet-iconLayers-layerCell_active"
                      ),
                    "left" === this._expandDirection
                      ? t.DomUtil.addClass(
                          i,
                          "leaflet-iconLayers-layerCell_expandLeft"
                        )
                      : t.DomUtil.addClass(
                          i,
                          "leaflet-iconLayers-layerCell_expandRight"
                        ),
                    i.appendChild(this._createLayerElement(n[r])),
                    -1 === this.options.position.indexOf("right")
                      ? e.appendChild(i)
                      : a(e, i);
              },
              _onLayerClick: function (t) {
                t.stopPropagation();
                var e = t.currentTarget.getAttribute("data-layerid"),
                  i = this._layers[e];
                this.setActiveLayer(i.layer), this.expand();
              },
              _attachEvents: function () {
                e(
                  this._layers,
                  function (t) {
                    var e = this._getLayerCellByLayerId(t.id);
                    e &&
                      e.addEventListener(
                        "click",
                        this._onLayerClick.bind(this)
                      );
                  }.bind(this)
                );
                for (
                  var t = this._container.getElementsByClassName(
                      "leaflet-iconLayers-layersRow"
                    ),
                    i = function (t) {
                      t.stopPropagation(), this.expand();
                    }.bind(this),
                    n = function (t) {
                      t.stopPropagation(), this.collapse();
                    }.bind(this),
                    o = function (t) {
                      t.stopPropagation();
                    },
                    a = 0;
                  a < t.length;
                  a++
                ) {
                  var r = t[a];
                  r.addEventListener("mouseenter", i),
                    r.addEventListener("mouseleave", n),
                    r.addEventListener("mousemove", o);
                }
              },
              _render: function () {
                (this._container.innerHTML = ""),
                  this._createLayerElements(),
                  this._attachEvents();
              },
              _switchMapLayers: function () {
                if (this._map) {
                  var t = this._getActiveLayer(),
                    i = this._getPreviousLayer();
                  i
                    ? this._map.removeLayer(i.layer)
                    : e(
                        this._layers,
                        function (t) {
                          var e = t.layer;
                          this._map.removeLayer(e);
                        }.bind(this)
                      ),
                    t && this._map.addLayer(t.layer);
                }
              },
              options: {
                position: "bottomleft",
                behavior: "previous",
                expand: "horizontal",
                autoZIndex: !0,
                maxLayersInRow: 5,
                manageLayers: !0,
              },
              initialize: function (e, i) {
                t.Util.isArray(arguments[0]) || ((i = e), (e = [])),
                  t.setOptions(this, i),
                  (this._expandDirection =
                    -1 != this.options.position.indexOf("left")
                      ? "right"
                      : "left"),
                  this.options.manageLayers &&
                    this.on("activelayerchange", this._switchMapLayers, this),
                  this.setLayers(e);
              },
              onAdd: function (e) {
                return (
                  (this._container = t.DomUtil.create(
                    "div",
                    "leaflet-iconLayers"
                  )),
                  t.DomUtil.addClass(
                    this._container,
                    "leaflet-iconLayers_" + this.options.position
                  ),
                  this._render(),
                  e.on("click", this.collapse, this),
                  this.options.manageLayers && this._switchMapLayers(),
                  this._container
                );
              },
              onRemove: function (t) {
                t.off("click", this.collapse, this);
              },
              setLayers: function (e) {
                (this._layers = {}),
                  e.map(
                    function (e) {
                      var i = t.stamp(e.layer);
                      this._layers[i] = t.extend(e, { id: i });
                    }.bind(this)
                  ),
                  this._container && this._render();
              },
              setActiveLayer: function (e) {
                var i = e && this._layers[t.stamp(e)];
                i &&
                  i.id !== this._activeLayerId &&
                  ((this._previousLayerId = this._activeLayerId),
                  (this._activeLayerId = i.id),
                  this._container && this._render(),
                  this.fire("activelayerchange", { layer: e }));
              },
              expand: function () {
                this._arrangeLayers()
                  .slice(1)
                  .map(
                    function (e) {
                      var i = this._getLayerCellByLayerId(e.id);
                      t.DomUtil.removeClass(
                        i,
                        "leaflet-iconLayers-layerCell_hidden"
                      );
                    }.bind(this)
                  );
              },
              collapse: function () {
                this._arrangeLayers()
                  .slice(1)
                  .map(
                    function (e) {
                      var i = this._getLayerCellByLayerId(e.id);
                      t.DomUtil.addClass(
                        i,
                        "leaflet-iconLayers-layerCell_hidden"
                      );
                    }.bind(this)
                  );
              },
            }),
            s = function (t, e) {
              return new r(t, e);
            };
          return (s.Constructor = r), s;
        });
      },
      { leaflet: 11 },
    ],
    11: [
      function (t, e, i) {
        !(function (t, i, n) {
          var o = t.L,
            a = {};
          (a.version = "0.7.7"),
            "object" == typeof e && "object" == typeof e.exports
              ? (e.exports = a)
              : "function" == typeof define && define.amd && define(a),
            (a.noConflict = function () {
              return (t.L = o), this;
            }),
            (t.L = a),
            (a.Util = {
              extend: function (t) {
                var e,
                  i,
                  n,
                  o,
                  a = Array.prototype.slice.call(arguments, 1);
                for (i = 0, n = a.length; i < n; i++) {
                  o = a[i] || {};
                  for (e in o) o.hasOwnProperty(e) && (t[e] = o[e]);
                }
                return t;
              },
              bind: function (t, e) {
                var i =
                  arguments.length > 2
                    ? Array.prototype.slice.call(arguments, 2)
                    : null;
                return function () {
                  return t.apply(e, i || arguments);
                };
              },
              stamp: (function () {
                var t = 0,
                  e = "_leaflet_id";
                return function (i) {
                  return (i[e] = i[e] || ++t), i[e];
                };
              })(),
              invokeEach: function (t, e, i) {
                var n, o;
                if ("object" == typeof t) {
                  o = Array.prototype.slice.call(arguments, 3);
                  for (n in t) e.apply(i, [n, t[n]].concat(o));
                  return !0;
                }
                return !1;
              },
              limitExecByInterval: function (t, e, i) {
                var n, o;
                return function a() {
                  var r = arguments;
                  if (n) return void (o = !0);
                  (n = !0),
                    setTimeout(function () {
                      (n = !1), o && (a.apply(i, r), (o = !1));
                    }, e),
                    t.apply(i, r);
                };
              },
              falseFn: function () {
                return !1;
              },
              formatNum: function (t, e) {
                var i = Math.pow(10, e || 5);
                return Math.round(t * i) / i;
              },
              trim: function (t) {
                return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, "");
              },
              splitWords: function (t) {
                return a.Util.trim(t).split(/\s+/);
              },
              setOptions: function (t, e) {
                return (t.options = a.extend({}, t.options, e)), t.options;
              },
              getParamString: function (t, e, i) {
                var n = [];
                for (var o in t)
                  n.push(
                    encodeURIComponent(i ? o.toUpperCase() : o) +
                      "=" +
                      encodeURIComponent(t[o])
                  );
                return (e && -1 !== e.indexOf("?") ? "&" : "?") + n.join("&");
              },
              template: function (t, e) {
                return t.replace(/\{ *([\w_]+) *\}/g, function (t, i) {
                  var n = e[i];
                  if (void 0 === n)
                    throw new Error("No value provided for variable " + t);
                  return "function" == typeof n && (n = n(e)), n;
                });
              },
              isArray:
                Array.isArray ||
                function (t) {
                  return "[object Array]" === Object.prototype.toString.call(t);
                },
              emptyImageUrl:
                "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=",
            }),
            (function () {
              function e(e) {
                var i,
                  n,
                  o = ["webkit", "moz", "o", "ms"];
                for (i = 0; i < o.length && !n; i++) n = t[o[i] + e];
                return n;
              }
              function i(e) {
                var i = +new Date(),
                  o = Math.max(0, 16 - (i - n));
                return (n = i + o), t.setTimeout(e, o);
              }
              var n = 0,
                o = t.requestAnimationFrame || e("RequestAnimationFrame") || i,
                r =
                  t.cancelAnimationFrame ||
                  e("CancelAnimationFrame") ||
                  e("CancelRequestAnimationFrame") ||
                  function (e) {
                    t.clearTimeout(e);
                  };
              (a.Util.requestAnimFrame = function (e, n, r, s) {
                if (((e = a.bind(e, n)), !r || o !== i)) return o.call(t, e, s);
                e();
              }),
                (a.Util.cancelAnimFrame = function (e) {
                  e && r.call(t, e);
                });
            })(),
            (a.extend = a.Util.extend),
            (a.bind = a.Util.bind),
            (a.stamp = a.Util.stamp),
            (a.setOptions = a.Util.setOptions),
            (a.Class = function () {}),
            (a.Class.extend = function (t) {
              var e = function () {
                  this.initialize && this.initialize.apply(this, arguments),
                    this._initHooks && this.callInitHooks();
                },
                i = function () {};
              i.prototype = this.prototype;
              var n = new i();
              (n.constructor = e), (e.prototype = n);
              for (var o in this)
                this.hasOwnProperty(o) && "prototype" !== o && (e[o] = this[o]);
              t.statics && (a.extend(e, t.statics), delete t.statics),
                t.includes &&
                  (a.Util.extend.apply(null, [n].concat(t.includes)),
                  delete t.includes),
                t.options &&
                  n.options &&
                  (t.options = a.extend({}, n.options, t.options)),
                a.extend(n, t),
                (n._initHooks = []);
              var r = this;
              return (
                (e.__super__ = r.prototype),
                (n.callInitHooks = function () {
                  if (!this._initHooksCalled) {
                    r.prototype.callInitHooks &&
                      r.prototype.callInitHooks.call(this),
                      (this._initHooksCalled = !0);
                    for (var t = 0, e = n._initHooks.length; t < e; t++)
                      n._initHooks[t].call(this);
                  }
                }),
                e
              );
            }),
            (a.Class.include = function (t) {
              a.extend(this.prototype, t);
            }),
            (a.Class.mergeOptions = function (t) {
              a.extend(this.prototype.options, t);
            }),
            (a.Class.addInitHook = function (t) {
              var e = Array.prototype.slice.call(arguments, 1),
                i =
                  "function" == typeof t
                    ? t
                    : function () {
                        this[t].apply(this, e);
                      };
              (this.prototype._initHooks = this.prototype._initHooks || []),
                this.prototype._initHooks.push(i);
            });
          var r = "_leaflet_events";
          (a.Mixin = {}),
            (a.Mixin.Events = {
              addEventListener: function (t, e, i) {
                if (a.Util.invokeEach(t, this.addEventListener, this, e, i))
                  return this;
                var n,
                  o,
                  s,
                  l,
                  h,
                  u,
                  c,
                  p = (this[r] = this[r] || {}),
                  d = i && i !== this && a.stamp(i);
                for (t = a.Util.splitWords(t), n = 0, o = t.length; n < o; n++)
                  (s = { action: e, context: i || this }),
                    (l = t[n]),
                    d
                      ? ((h = l + "_idx"),
                        (u = h + "_len"),
                        (c = p[h] = p[h] || {}),
                        c[d] || ((c[d] = []), (p[u] = (p[u] || 0) + 1)),
                        c[d].push(s))
                      : ((p[l] = p[l] || []), p[l].push(s));
                return this;
              },
              hasEventListeners: function (t) {
                var e = this[r];
                return (
                  !!e &&
                  ((t in e && e[t].length > 0) ||
                    (t + "_idx" in e && e[t + "_idx_len"] > 0))
                );
              },
              removeEventListener: function (t, e, i) {
                if (!this[r]) return this;
                if (!t) return this.clearAllEventListeners();
                if (a.Util.invokeEach(t, this.removeEventListener, this, e, i))
                  return this;
                var n,
                  o,
                  s,
                  l,
                  h,
                  u,
                  c,
                  p,
                  d,
                  m = this[r],
                  f = i && i !== this && a.stamp(i);
                for (t = a.Util.splitWords(t), n = 0, o = t.length; n < o; n++)
                  if (
                    ((s = t[n]),
                    (u = s + "_idx"),
                    (c = u + "_len"),
                    (p = m[u]),
                    e)
                  ) {
                    if ((l = f && p ? p[f] : m[s])) {
                      for (h = l.length - 1; h >= 0; h--)
                        l[h].action !== e ||
                          (i && l[h].context !== i) ||
                          ((d = l.splice(h, 1)),
                          (d[0].action = a.Util.falseFn));
                      i && p && 0 === l.length && (delete p[f], m[c]--);
                    }
                  } else delete m[s], delete m[u], delete m[c];
                return this;
              },
              clearAllEventListeners: function () {
                return delete this[r], this;
              },
              fireEvent: function (t, e) {
                if (!this.hasEventListeners(t)) return this;
                var i,
                  n,
                  o,
                  s,
                  l,
                  h = a.Util.extend({}, e, { type: t, target: this }),
                  u = this[r];
                if (u[t])
                  for (i = u[t].slice(), n = 0, o = i.length; n < o; n++)
                    i[n].action.call(i[n].context, h);
                s = u[t + "_idx"];
                for (l in s)
                  if ((i = s[l].slice()))
                    for (n = 0, o = i.length; n < o; n++)
                      i[n].action.call(i[n].context, h);
                return this;
              },
              addOneTimeEventListener: function (t, e, i) {
                if (
                  a.Util.invokeEach(t, this.addOneTimeEventListener, this, e, i)
                )
                  return this;
                var n = a.bind(function () {
                  this.removeEventListener(t, e, i).removeEventListener(
                    t,
                    n,
                    i
                  );
                }, this);
                return this.addEventListener(t, e, i).addEventListener(t, n, i);
              },
            }),
            (a.Mixin.Events.on = a.Mixin.Events.addEventListener),
            (a.Mixin.Events.off = a.Mixin.Events.removeEventListener),
            (a.Mixin.Events.once = a.Mixin.Events.addOneTimeEventListener),
            (a.Mixin.Events.fire = a.Mixin.Events.fireEvent),
            (function () {
              var e = "ActiveXObject" in t,
                n = e && !i.addEventListener,
                o = navigator.userAgent.toLowerCase(),
                r = -1 !== o.indexOf("webkit"),
                s = -1 !== o.indexOf("chrome"),
                l = -1 !== o.indexOf("phantom"),
                h = -1 !== o.indexOf("android"),
                u = -1 !== o.search("android [23]"),
                c = -1 !== o.indexOf("gecko"),
                p = typeof orientation != void 0 + "",
                d = !t.PointerEvent && t.MSPointerEvent,
                m = (t.PointerEvent && t.navigator.pointerEnabled) || d,
                f =
                  ("devicePixelRatio" in t && t.devicePixelRatio > 1) ||
                  ("matchMedia" in t &&
                    t.matchMedia("(min-resolution:144dpi)") &&
                    t.matchMedia("(min-resolution:144dpi)").matches),
                _ = i.documentElement,
                g = e && "transition" in _.style,
                v =
                  "WebKitCSSMatrix" in t &&
                  "m11" in new t.WebKitCSSMatrix() &&
                  !u,
                y = "MozPerspective" in _.style,
                L = "OTransition" in _.style,
                b = !t.L_DISABLE_3D && (g || v || y || L) && !l,
                P =
                  !t.L_NO_TOUCH &&
                  !l &&
                  (m ||
                    "ontouchstart" in t ||
                    (t.DocumentTouch && i instanceof t.DocumentTouch));
              a.Browser = {
                ie: e,
                ielt9: n,
                webkit: r,
                gecko: c && !r && !t.opera && !e,
                android: h,
                android23: u,
                chrome: s,
                ie3d: g,
                webkit3d: v,
                gecko3d: y,
                opera3d: L,
                any3d: b,
                mobile: p,
                mobileWebkit: p && r,
                mobileWebkit3d: p && v,
                mobileOpera: p && t.opera,
                touch: P,
                msPointer: d,
                pointer: m,
                retina: f,
              };
            })(),
            (a.Point = function (t, e, i) {
              (this.x = i ? Math.round(t) : t),
                (this.y = i ? Math.round(e) : e);
            }),
            (a.Point.prototype = {
              clone: function () {
                return new a.Point(this.x, this.y);
              },
              add: function (t) {
                return this.clone()._add(a.point(t));
              },
              _add: function (t) {
                return (this.x += t.x), (this.y += t.y), this;
              },
              subtract: function (t) {
                return this.clone()._subtract(a.point(t));
              },
              _subtract: function (t) {
                return (this.x -= t.x), (this.y -= t.y), this;
              },
              divideBy: function (t) {
                return this.clone()._divideBy(t);
              },
              _divideBy: function (t) {
                return (this.x /= t), (this.y /= t), this;
              },
              multiplyBy: function (t) {
                return this.clone()._multiplyBy(t);
              },
              _multiplyBy: function (t) {
                return (this.x *= t), (this.y *= t), this;
              },
              round: function () {
                return this.clone()._round();
              },
              _round: function () {
                return (
                  (this.x = Math.round(this.x)),
                  (this.y = Math.round(this.y)),
                  this
                );
              },
              floor: function () {
                return this.clone()._floor();
              },
              _floor: function () {
                return (
                  (this.x = Math.floor(this.x)),
                  (this.y = Math.floor(this.y)),
                  this
                );
              },
              distanceTo: function (t) {
                t = a.point(t);
                var e = t.x - this.x,
                  i = t.y - this.y;
                return Math.sqrt(e * e + i * i);
              },
              equals: function (t) {
                return (t = a.point(t)), t.x === this.x && t.y === this.y;
              },
              contains: function (t) {
                return (
                  (t = a.point(t)),
                  Math.abs(t.x) <= Math.abs(this.x) &&
                    Math.abs(t.y) <= Math.abs(this.y)
                );
              },
              toString: function () {
                return (
                  "Point(" +
                  a.Util.formatNum(this.x) +
                  ", " +
                  a.Util.formatNum(this.y) +
                  ")"
                );
              },
            }),
            (a.point = function (t, e, i) {
              return t instanceof a.Point
                ? t
                : a.Util.isArray(t)
                ? new a.Point(t[0], t[1])
                : void 0 === t || null === t
                ? t
                : new a.Point(t, e, i);
            }),
            (a.Bounds = function (t, e) {
              if (t)
                for (var i = e ? [t, e] : t, n = 0, o = i.length; n < o; n++)
                  this.extend(i[n]);
            }),
            (a.Bounds.prototype = {
              extend: function (t) {
                return (
                  (t = a.point(t)),
                  this.min || this.max
                    ? ((this.min.x = Math.min(t.x, this.min.x)),
                      (this.max.x = Math.max(t.x, this.max.x)),
                      (this.min.y = Math.min(t.y, this.min.y)),
                      (this.max.y = Math.max(t.y, this.max.y)))
                    : ((this.min = t.clone()), (this.max = t.clone())),
                  this
                );
              },
              getCenter: function (t) {
                return new a.Point(
                  (this.min.x + this.max.x) / 2,
                  (this.min.y + this.max.y) / 2,
                  t
                );
              },
              getBottomLeft: function () {
                return new a.Point(this.min.x, this.max.y);
              },
              getTopRight: function () {
                return new a.Point(this.max.x, this.min.y);
              },
              getSize: function () {
                return this.max.subtract(this.min);
              },
              contains: function (t) {
                var e, i;
                return (
                  (t =
                    "number" == typeof t[0] || t instanceof a.Point
                      ? a.point(t)
                      : a.bounds(t)),
                  t instanceof a.Bounds
                    ? ((e = t.min), (i = t.max))
                    : (e = i = t),
                  e.x >= this.min.x &&
                    i.x <= this.max.x &&
                    e.y >= this.min.y &&
                    i.y <= this.max.y
                );
              },
              intersects: function (t) {
                t = a.bounds(t);
                var e = this.min,
                  i = this.max,
                  n = t.min,
                  o = t.max,
                  r = o.x >= e.x && n.x <= i.x,
                  s = o.y >= e.y && n.y <= i.y;
                return r && s;
              },
              isValid: function () {
                return !(!this.min || !this.max);
              },
            }),
            (a.bounds = function (t, e) {
              return !t || t instanceof a.Bounds ? t : new a.Bounds(t, e);
            }),
            (a.Transformation = function (t, e, i, n) {
              (this._a = t), (this._b = e), (this._c = i), (this._d = n);
            }),
            (a.Transformation.prototype = {
              transform: function (t, e) {
                return this._transform(t.clone(), e);
              },
              _transform: function (t, e) {
                return (
                  (e = e || 1),
                  (t.x = e * (this._a * t.x + this._b)),
                  (t.y = e * (this._c * t.y + this._d)),
                  t
                );
              },
              untransform: function (t, e) {
                return (
                  (e = e || 1),
                  new a.Point(
                    (t.x / e - this._b) / this._a,
                    (t.y / e - this._d) / this._c
                  )
                );
              },
            }),
            (a.DomUtil = {
              get: function (t) {
                return "string" == typeof t ? i.getElementById(t) : t;
              },
              getStyle: function (t, e) {
                var n = t.style[e];
                if (
                  (!n && t.currentStyle && (n = t.currentStyle[e]),
                  (!n || "auto" === n) && i.defaultView)
                ) {
                  var o = i.defaultView.getComputedStyle(t, null);
                  n = o ? o[e] : null;
                }
                return "auto" === n ? null : n;
              },
              getViewportOffset: function (t) {
                var e,
                  n = 0,
                  o = 0,
                  r = t,
                  s = i.body,
                  l = i.documentElement;
                do {
                  if (
                    ((n += r.offsetTop || 0),
                    (o += r.offsetLeft || 0),
                    (n +=
                      parseInt(a.DomUtil.getStyle(r, "borderTopWidth"), 10) ||
                      0),
                    (o +=
                      parseInt(a.DomUtil.getStyle(r, "borderLeftWidth"), 10) ||
                      0),
                    (e = a.DomUtil.getStyle(r, "position")),
                    r.offsetParent === s && "absolute" === e)
                  )
                    break;
                  if ("fixed" === e) {
                    (n += s.scrollTop || l.scrollTop || 0),
                      (o += s.scrollLeft || l.scrollLeft || 0);
                    break;
                  }
                  if ("relative" === e && !r.offsetLeft) {
                    var h = a.DomUtil.getStyle(r, "width"),
                      u = a.DomUtil.getStyle(r, "max-width"),
                      c = r.getBoundingClientRect();
                    ("none" === h && "none" === u) ||
                      (o += c.left + r.clientLeft),
                      (n += c.top + (s.scrollTop || l.scrollTop || 0));
                    break;
                  }
                  r = r.offsetParent;
                } while (r);
                r = t;
                do {
                  if (r === s) break;
                  (n -= r.scrollTop || 0),
                    (o -= r.scrollLeft || 0),
                    (r = r.parentNode);
                } while (r);
                return new a.Point(o, n);
              },
              documentIsLtr: function () {
                return (
                  a.DomUtil._docIsLtrCached ||
                    ((a.DomUtil._docIsLtrCached = !0),
                    (a.DomUtil._docIsLtr =
                      "ltr" === a.DomUtil.getStyle(i.body, "direction"))),
                  a.DomUtil._docIsLtr
                );
              },
              create: function (t, e, n) {
                var o = i.createElement(t);
                return (o.className = e), n && n.appendChild(o), o;
              },
              hasClass: function (t, e) {
                if (void 0 !== t.classList) return t.classList.contains(e);
                var i = a.DomUtil._getClass(t);
                return (
                  i.length > 0 && new RegExp("(^|\\s)" + e + "(\\s|$)").test(i)
                );
              },
              addClass: function (t, e) {
                if (void 0 !== t.classList)
                  for (
                    var i = a.Util.splitWords(e), n = 0, o = i.length;
                    n < o;
                    n++
                  )
                    t.classList.add(i[n]);
                else if (!a.DomUtil.hasClass(t, e)) {
                  var r = a.DomUtil._getClass(t);
                  a.DomUtil._setClass(t, (r ? r + " " : "") + e);
                }
              },
              removeClass: function (t, e) {
                void 0 !== t.classList
                  ? t.classList.remove(e)
                  : a.DomUtil._setClass(
                      t,
                      a.Util.trim(
                        (" " + a.DomUtil._getClass(t) + " ").replace(
                          " " + e + " ",
                          " "
                        )
                      )
                    );
              },
              _setClass: function (t, e) {
                void 0 === t.className.baseVal
                  ? (t.className = e)
                  : (t.className.baseVal = e);
              },
              _getClass: function (t) {
                return void 0 === t.className.baseVal
                  ? t.className
                  : t.className.baseVal;
              },
              setOpacity: function (t, e) {
                if ("opacity" in t.style) t.style.opacity = e;
                else if ("filter" in t.style) {
                  var i = !1,
                    n = "DXImageTransform.Microsoft.Alpha";
                  try {
                    i = t.filters.item(n);
                  } catch (t) {
                    if (1 === e) return;
                  }
                  (e = Math.round(100 * e)),
                    i
                      ? ((i.Enabled = 100 !== e), (i.Opacity = e))
                      : (t.style.filter +=
                          " progid:" + n + "(opacity=" + e + ")");
                }
              },
              testProp: function (t) {
                for (var e = i.documentElement.style, n = 0; n < t.length; n++)
                  if (t[n] in e) return t[n];
                return !1;
              },
              getTranslateString: function (t) {
                var e = a.Browser.webkit3d,
                  i = "translate" + (e ? "3d" : "") + "(",
                  n = (e ? ",0" : "") + ")";
                return i + t.x + "px," + t.y + "px" + n;
              },
              getScaleString: function (t, e) {
                return (
                  a.DomUtil.getTranslateString(e.add(e.multiplyBy(-1 * t))) +
                  " scale(" +
                  t +
                  ") "
                );
              },
              setPosition: function (t, e, i) {
                (t._leaflet_pos = e),
                  !i && a.Browser.any3d
                    ? (t.style[a.DomUtil.TRANSFORM] =
                        a.DomUtil.getTranslateString(e))
                    : ((t.style.left = e.x + "px"), (t.style.top = e.y + "px"));
              },
              getPosition: function (t) {
                return t._leaflet_pos;
              },
            }),
            (a.DomUtil.TRANSFORM = a.DomUtil.testProp([
              "transform",
              "WebkitTransform",
              "OTransform",
              "MozTransform",
              "msTransform",
            ])),
            (a.DomUtil.TRANSITION = a.DomUtil.testProp([
              "webkitTransition",
              "transition",
              "OTransition",
              "MozTransition",
              "msTransition",
            ])),
            (a.DomUtil.TRANSITION_END =
              "webkitTransition" === a.DomUtil.TRANSITION ||
              "OTransition" === a.DomUtil.TRANSITION
                ? a.DomUtil.TRANSITION + "End"
                : "transitionend"),
            (function () {
              if ("onselectstart" in i)
                a.extend(a.DomUtil, {
                  disableTextSelection: function () {
                    a.DomEvent.on(t, "selectstart", a.DomEvent.preventDefault);
                  },
                  enableTextSelection: function () {
                    a.DomEvent.off(t, "selectstart", a.DomEvent.preventDefault);
                  },
                });
              else {
                var e = a.DomUtil.testProp([
                  "userSelect",
                  "WebkitUserSelect",
                  "OUserSelect",
                  "MozUserSelect",
                  "msUserSelect",
                ]);
                a.extend(a.DomUtil, {
                  disableTextSelection: function () {
                    if (e) {
                      var t = i.documentElement.style;
                      (this._userSelect = t[e]), (t[e] = "none");
                    }
                  },
                  enableTextSelection: function () {
                    e &&
                      ((i.documentElement.style[e] = this._userSelect),
                      delete this._userSelect);
                  },
                });
              }
              a.extend(a.DomUtil, {
                disableImageDrag: function () {
                  a.DomEvent.on(t, "dragstart", a.DomEvent.preventDefault);
                },
                enableImageDrag: function () {
                  a.DomEvent.off(t, "dragstart", a.DomEvent.preventDefault);
                },
              });
            })(),
            (a.LatLng = function (t, e, i) {
              if (
                ((t = parseFloat(t)), (e = parseFloat(e)), isNaN(t) || isNaN(e))
              )
                throw new Error(
                  "Invalid LatLng object: (" + t + ", " + e + ")"
                );
              (this.lat = t),
                (this.lng = e),
                void 0 !== i && (this.alt = parseFloat(i));
            }),
            a.extend(a.LatLng, {
              DEG_TO_RAD: Math.PI / 180,
              RAD_TO_DEG: 180 / Math.PI,
              MAX_MARGIN: 1e-9,
            }),
            (a.LatLng.prototype = {
              equals: function (t) {
                return (
                  !!t &&
                  ((t = a.latLng(t)),
                  Math.max(
                    Math.abs(this.lat - t.lat),
                    Math.abs(this.lng - t.lng)
                  ) <= a.LatLng.MAX_MARGIN)
                );
              },
              toString: function (t) {
                return (
                  "LatLng(" +
                  a.Util.formatNum(this.lat, t) +
                  ", " +
                  a.Util.formatNum(this.lng, t) +
                  ")"
                );
              },
              distanceTo: function (t) {
                t = a.latLng(t);
                var e = a.LatLng.DEG_TO_RAD,
                  i = (t.lat - this.lat) * e,
                  n = (t.lng - this.lng) * e,
                  o = this.lat * e,
                  r = t.lat * e,
                  s = Math.sin(i / 2),
                  l = Math.sin(n / 2),
                  h = s * s + l * l * Math.cos(o) * Math.cos(r);
                return 12756274 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
              },
              wrap: function (t, e) {
                var i = this.lng;
                return (
                  (t = t || -180),
                  (e = e || 180),
                  (i = ((i + e) % (e - t)) + (i < t || i === e ? e : t)),
                  new a.LatLng(this.lat, i)
                );
              },
            }),
            (a.latLng = function (t, e) {
              return t instanceof a.LatLng
                ? t
                : a.Util.isArray(t)
                ? "number" == typeof t[0] || "string" == typeof t[0]
                  ? new a.LatLng(t[0], t[1], t[2])
                  : null
                : void 0 === t || null === t
                ? t
                : "object" == typeof t && "lat" in t
                ? new a.LatLng(t.lat, "lng" in t ? t.lng : t.lon)
                : void 0 === e
                ? null
                : new a.LatLng(t, e);
            }),
            (a.LatLngBounds = function (t, e) {
              if (t)
                for (var i = e ? [t, e] : t, n = 0, o = i.length; n < o; n++)
                  this.extend(i[n]);
            }),
            (a.LatLngBounds.prototype = {
              extend: function (t) {
                if (!t) return this;
                var e = a.latLng(t);
                return (
                  (t = null !== e ? e : a.latLngBounds(t)),
                  t instanceof a.LatLng
                    ? this._southWest || this._northEast
                      ? ((this._southWest.lat = Math.min(
                          t.lat,
                          this._southWest.lat
                        )),
                        (this._southWest.lng = Math.min(
                          t.lng,
                          this._southWest.lng
                        )),
                        (this._northEast.lat = Math.max(
                          t.lat,
                          this._northEast.lat
                        )),
                        (this._northEast.lng = Math.max(
                          t.lng,
                          this._northEast.lng
                        )))
                      : ((this._southWest = new a.LatLng(t.lat, t.lng)),
                        (this._northEast = new a.LatLng(t.lat, t.lng)))
                    : t instanceof a.LatLngBounds &&
                      (this.extend(t._southWest), this.extend(t._northEast)),
                  this
                );
              },
              pad: function (t) {
                var e = this._southWest,
                  i = this._northEast,
                  n = Math.abs(e.lat - i.lat) * t,
                  o = Math.abs(e.lng - i.lng) * t;
                return new a.LatLngBounds(
                  new a.LatLng(e.lat - n, e.lng - o),
                  new a.LatLng(i.lat + n, i.lng + o)
                );
              },
              getCenter: function () {
                return new a.LatLng(
                  (this._southWest.lat + this._northEast.lat) / 2,
                  (this._southWest.lng + this._northEast.lng) / 2
                );
              },
              getSouthWest: function () {
                return this._southWest;
              },
              getNorthEast: function () {
                return this._northEast;
              },
              getNorthWest: function () {
                return new a.LatLng(this.getNorth(), this.getWest());
              },
              getSouthEast: function () {
                return new a.LatLng(this.getSouth(), this.getEast());
              },
              getWest: function () {
                return this._southWest.lng;
              },
              getSouth: function () {
                return this._southWest.lat;
              },
              getEast: function () {
                return this._northEast.lng;
              },
              getNorth: function () {
                return this._northEast.lat;
              },
              contains: function (t) {
                t =
                  "number" == typeof t[0] || t instanceof a.LatLng
                    ? a.latLng(t)
                    : a.latLngBounds(t);
                var e,
                  i,
                  n = this._southWest,
                  o = this._northEast;
                return (
                  t instanceof a.LatLngBounds
                    ? ((e = t.getSouthWest()), (i = t.getNorthEast()))
                    : (e = i = t),
                  e.lat >= n.lat &&
                    i.lat <= o.lat &&
                    e.lng >= n.lng &&
                    i.lng <= o.lng
                );
              },
              intersects: function (t) {
                t = a.latLngBounds(t);
                var e = this._southWest,
                  i = this._northEast,
                  n = t.getSouthWest(),
                  o = t.getNorthEast(),
                  r = o.lat >= e.lat && n.lat <= i.lat,
                  s = o.lng >= e.lng && n.lng <= i.lng;
                return r && s;
              },
              toBBoxString: function () {
                return [
                  this.getWest(),
                  this.getSouth(),
                  this.getEast(),
                  this.getNorth(),
                ].join(",");
              },
              equals: function (t) {
                return (
                  !!t &&
                  ((t = a.latLngBounds(t)),
                  this._southWest.equals(t.getSouthWest()) &&
                    this._northEast.equals(t.getNorthEast()))
                );
              },
              isValid: function () {
                return !(!this._southWest || !this._northEast);
              },
            }),
            (a.latLngBounds = function (t, e) {
              return !t || t instanceof a.LatLngBounds
                ? t
                : new a.LatLngBounds(t, e);
            }),
            (a.Projection = {}),
            (a.Projection.SphericalMercator = {
              MAX_LATITUDE: 85.0511287798,
              project: function (t) {
                var e = a.LatLng.DEG_TO_RAD,
                  i = this.MAX_LATITUDE,
                  n = Math.max(Math.min(i, t.lat), -i),
                  o = t.lng * e,
                  r = n * e;
                return (
                  (r = Math.log(Math.tan(Math.PI / 4 + r / 2))),
                  new a.Point(o, r)
                );
              },
              unproject: function (t) {
                var e = a.LatLng.RAD_TO_DEG,
                  i = t.x * e,
                  n = (2 * Math.atan(Math.exp(t.y)) - Math.PI / 2) * e;
                return new a.LatLng(n, i);
              },
            }),
            (a.Projection.LonLat = {
              project: function (t) {
                return new a.Point(t.lng, t.lat);
              },
              unproject: function (t) {
                return new a.LatLng(t.y, t.x);
              },
            }),
            (a.CRS = {
              latLngToPoint: function (t, e) {
                var i = this.projection.project(t),
                  n = this.scale(e);
                return this.transformation._transform(i, n);
              },
              pointToLatLng: function (t, e) {
                var i = this.scale(e),
                  n = this.transformation.untransform(t, i);
                return this.projection.unproject(n);
              },
              project: function (t) {
                return this.projection.project(t);
              },
              scale: function (t) {
                return 256 * Math.pow(2, t);
              },
              getSize: function (t) {
                var e = this.scale(t);
                return a.point(e, e);
              },
            }),
            (a.CRS.Simple = a.extend({}, a.CRS, {
              projection: a.Projection.LonLat,
              transformation: new a.Transformation(1, 0, -1, 0),
              scale: function (t) {
                return Math.pow(2, t);
              },
            })),
            (a.CRS.EPSG3857 = a.extend({}, a.CRS, {
              code: "EPSG:3857",
              projection: a.Projection.SphericalMercator,
              transformation: new a.Transformation(
                0.5 / Math.PI,
                0.5,
                -0.5 / Math.PI,
                0.5
              ),
              project: function (t) {
                return this.projection.project(t).multiplyBy(6378137);
              },
            })),
            (a.CRS.EPSG900913 = a.extend({}, a.CRS.EPSG3857, {
              code: "EPSG:900913",
            })),
            (a.CRS.EPSG4326 = a.extend({}, a.CRS, {
              code: "EPSG:4326",
              projection: a.Projection.LonLat,
              transformation: new a.Transformation(1 / 360, 0.5, -1 / 360, 0.5),
            })),
            (a.Map = a.Class.extend({
              includes: a.Mixin.Events,
              options: {
                crs: a.CRS.EPSG3857,
                fadeAnimation: a.DomUtil.TRANSITION && !a.Browser.android23,
                trackResize: !0,
                markerZoomAnimation: a.DomUtil.TRANSITION && a.Browser.any3d,
              },
              initialize: function (t, e) {
                (e = a.setOptions(this, e)),
                  this._initContainer(t),
                  this._initLayout(),
                  (this._onResize = a.bind(this._onResize, this)),
                  this._initEvents(),
                  e.maxBounds && this.setMaxBounds(e.maxBounds),
                  e.center &&
                    void 0 !== e.zoom &&
                    this.setView(a.latLng(e.center), e.zoom, { reset: !0 }),
                  (this._handlers = []),
                  (this._layers = {}),
                  (this._zoomBoundLayers = {}),
                  (this._tileLayersNum = 0),
                  this.callInitHooks(),
                  this._addLayers(e.layers);
              },
              setView: function (t, e) {
                return (
                  (e = void 0 === e ? this.getZoom() : e),
                  this._resetView(a.latLng(t), this._limitZoom(e)),
                  this
                );
              },
              setZoom: function (t, e) {
                return this._loaded
                  ? this.setView(this.getCenter(), t, { zoom: e })
                  : ((this._zoom = this._limitZoom(t)), this);
              },
              zoomIn: function (t, e) {
                return this.setZoom(this._zoom + (t || 1), e);
              },
              zoomOut: function (t, e) {
                return this.setZoom(this._zoom - (t || 1), e);
              },
              setZoomAround: function (t, e, i) {
                var n = this.getZoomScale(e),
                  o = this.getSize().divideBy(2),
                  r = t instanceof a.Point ? t : this.latLngToContainerPoint(t),
                  s = r.subtract(o).multiplyBy(1 - 1 / n),
                  l = this.containerPointToLatLng(o.add(s));
                return this.setView(l, e, { zoom: i });
              },
              fitBounds: function (t, e) {
                (e = e || {}),
                  (t = t.getBounds ? t.getBounds() : a.latLngBounds(t));
                var i = a.point(e.paddingTopLeft || e.padding || [0, 0]),
                  n = a.point(e.paddingBottomRight || e.padding || [0, 0]),
                  o = this.getBoundsZoom(t, !1, i.add(n));
                o = e.maxZoom ? Math.min(e.maxZoom, o) : o;
                var r = n.subtract(i).divideBy(2),
                  s = this.project(t.getSouthWest(), o),
                  l = this.project(t.getNorthEast(), o),
                  h = this.unproject(s.add(l).divideBy(2).add(r), o);
                return this.setView(h, o, e);
              },
              fitWorld: function (t) {
                return this.fitBounds(
                  [
                    [-90, -180],
                    [90, 180],
                  ],
                  t
                );
              },
              panTo: function (t, e) {
                return this.setView(t, this._zoom, { pan: e });
              },
              panBy: function (t) {
                return (
                  this.fire("movestart"),
                  this._rawPanBy(a.point(t)),
                  this.fire("move"),
                  this.fire("moveend")
                );
              },
              setMaxBounds: function (t) {
                return (
                  (t = a.latLngBounds(t)),
                  (this.options.maxBounds = t),
                  t
                    ? (this._loaded && this._panInsideMaxBounds(),
                      this.on("moveend", this._panInsideMaxBounds, this))
                    : this.off("moveend", this._panInsideMaxBounds, this)
                );
              },
              panInsideBounds: function (t, e) {
                var i = this.getCenter(),
                  n = this._limitCenter(i, this._zoom, t);
                return i.equals(n) ? this : this.panTo(n, e);
              },
              addLayer: function (t) {
                var e = a.stamp(t);
                return this._layers[e]
                  ? this
                  : ((this._layers[e] = t),
                    !t.options ||
                      (isNaN(t.options.maxZoom) && isNaN(t.options.minZoom)) ||
                      ((this._zoomBoundLayers[e] = t),
                      this._updateZoomLevels()),
                    this.options.zoomAnimation &&
                      a.TileLayer &&
                      t instanceof a.TileLayer &&
                      (this._tileLayersNum++,
                      this._tileLayersToLoad++,
                      t.on("load", this._onTileLayerLoad, this)),
                    this._loaded && this._layerAdd(t),
                    this);
              },
              removeLayer: function (t) {
                var e = a.stamp(t);
                return this._layers[e]
                  ? (this._loaded && t.onRemove(this),
                    delete this._layers[e],
                    this._loaded && this.fire("layerremove", { layer: t }),
                    this._zoomBoundLayers[e] &&
                      (delete this._zoomBoundLayers[e],
                      this._updateZoomLevels()),
                    this.options.zoomAnimation &&
                      a.TileLayer &&
                      t instanceof a.TileLayer &&
                      (this._tileLayersNum--,
                      this._tileLayersToLoad--,
                      t.off("load", this._onTileLayerLoad, this)),
                    this)
                  : this;
              },
              hasLayer: function (t) {
                return !!t && a.stamp(t) in this._layers;
              },
              eachLayer: function (t, e) {
                for (var i in this._layers) t.call(e, this._layers[i]);
                return this;
              },
              invalidateSize: function (t) {
                if (!this._loaded) return this;
                t = a.extend(
                  { animate: !1, pan: !0 },
                  !0 === t ? { animate: !0 } : t
                );
                var e = this.getSize();
                (this._sizeChanged = !0), (this._initialCenter = null);
                var i = this.getSize(),
                  n = e.divideBy(2).round(),
                  o = i.divideBy(2).round(),
                  r = n.subtract(o);
                return r.x || r.y
                  ? (t.animate && t.pan
                      ? this.panBy(r)
                      : (t.pan && this._rawPanBy(r),
                        this.fire("move"),
                        t.debounceMoveend
                          ? (clearTimeout(this._sizeTimer),
                            (this._sizeTimer = setTimeout(
                              a.bind(this.fire, this, "moveend"),
                              200
                            )))
                          : this.fire("moveend")),
                    this.fire("resize", { oldSize: e, newSize: i }))
                  : this;
              },
              addHandler: function (t, e) {
                if (!e) return this;
                var i = (this[t] = new e(this));
                return (
                  this._handlers.push(i), this.options[t] && i.enable(), this
                );
              },
              remove: function () {
                this._loaded && this.fire("unload"), this._initEvents("off");
                try {
                  delete this._container._leaflet;
                } catch (t) {
                  this._container._leaflet = void 0;
                }
                return (
                  this._clearPanes(),
                  this._clearControlPos && this._clearControlPos(),
                  this._clearHandlers(),
                  this
                );
              },
              getCenter: function () {
                return (
                  this._checkIfLoaded(),
                  this._initialCenter && !this._moved()
                    ? this._initialCenter
                    : this.layerPointToLatLng(this._getCenterLayerPoint())
                );
              },
              getZoom: function () {
                return this._zoom;
              },
              getBounds: function () {
                var t = this.getPixelBounds(),
                  e = this.unproject(t.getBottomLeft()),
                  i = this.unproject(t.getTopRight());
                return new a.LatLngBounds(e, i);
              },
              getMinZoom: function () {
                return void 0 === this.options.minZoom
                  ? void 0 === this._layersMinZoom
                    ? 0
                    : this._layersMinZoom
                  : this.options.minZoom;
              },
              getMaxZoom: function () {
                return void 0 === this.options.maxZoom
                  ? void 0 === this._layersMaxZoom
                    ? 1 / 0
                    : this._layersMaxZoom
                  : this.options.maxZoom;
              },
              getBoundsZoom: function (t, e, i) {
                t = a.latLngBounds(t);
                var n,
                  o = this.getMinZoom() - (e ? 1 : 0),
                  r = this.getMaxZoom(),
                  s = this.getSize(),
                  l = t.getNorthWest(),
                  h = t.getSouthEast(),
                  u = !0;
                i = a.point(i || [0, 0]);
                do {
                  o++,
                    (n = this.project(h, o)
                      .subtract(this.project(l, o))
                      .add(i)),
                    (u = e ? n.x < s.x || n.y < s.y : s.contains(n));
                } while (u && o <= r);
                return u && e ? null : e ? o : o - 1;
              },
              getSize: function () {
                return (
                  (this._size && !this._sizeChanged) ||
                    ((this._size = new a.Point(
                      this._container.clientWidth,
                      this._container.clientHeight
                    )),
                    (this._sizeChanged = !1)),
                  this._size.clone()
                );
              },
              getPixelBounds: function () {
                var t = this._getTopLeftPoint();
                return new a.Bounds(t, t.add(this.getSize()));
              },
              getPixelOrigin: function () {
                return this._checkIfLoaded(), this._initialTopLeftPoint;
              },
              getPanes: function () {
                return this._panes;
              },
              getContainer: function () {
                return this._container;
              },
              getZoomScale: function (t) {
                var e = this.options.crs;
                return e.scale(t) / e.scale(this._zoom);
              },
              getScaleZoom: function (t) {
                return this._zoom + Math.log(t) / Math.LN2;
              },
              project: function (t, e) {
                return (
                  (e = void 0 === e ? this._zoom : e),
                  this.options.crs.latLngToPoint(a.latLng(t), e)
                );
              },
              unproject: function (t, e) {
                return (
                  (e = void 0 === e ? this._zoom : e),
                  this.options.crs.pointToLatLng(a.point(t), e)
                );
              },
              layerPointToLatLng: function (t) {
                var e = a.point(t).add(this.getPixelOrigin());
                return this.unproject(e);
              },
              latLngToLayerPoint: function (t) {
                return this.project(a.latLng(t))
                  ._round()
                  ._subtract(this.getPixelOrigin());
              },
              containerPointToLayerPoint: function (t) {
                return a.point(t).subtract(this._getMapPanePos());
              },
              layerPointToContainerPoint: function (t) {
                return a.point(t).add(this._getMapPanePos());
              },
              containerPointToLatLng: function (t) {
                var e = this.containerPointToLayerPoint(a.point(t));
                return this.layerPointToLatLng(e);
              },
              latLngToContainerPoint: function (t) {
                return this.layerPointToContainerPoint(
                  this.latLngToLayerPoint(a.latLng(t))
                );
              },
              mouseEventToContainerPoint: function (t) {
                return a.DomEvent.getMousePosition(t, this._container);
              },
              mouseEventToLayerPoint: function (t) {
                return this.containerPointToLayerPoint(
                  this.mouseEventToContainerPoint(t)
                );
              },
              mouseEventToLatLng: function (t) {
                return this.layerPointToLatLng(this.mouseEventToLayerPoint(t));
              },
              _initContainer: function (t) {
                var e = (this._container = a.DomUtil.get(t));
                if (!e) throw new Error("Map container not found.");
                if (e._leaflet)
                  throw new Error("Map container is already initialized.");
                e._leaflet = !0;
              },
              _initLayout: function () {
                var t = this._container;
                a.DomUtil.addClass(
                  t,
                  "leaflet-container" +
                    (a.Browser.touch ? " leaflet-touch" : "") +
                    (a.Browser.retina ? " leaflet-retina" : "") +
                    (a.Browser.ielt9 ? " leaflet-oldie" : "") +
                    (this.options.fadeAnimation ? " leaflet-fade-anim" : "")
                );
                var e = a.DomUtil.getStyle(t, "position");
                "absolute" !== e &&
                  "relative" !== e &&
                  "fixed" !== e &&
                  (t.style.position = "relative"),
                  this._initPanes(),
                  this._initControlPos && this._initControlPos();
              },
              _initPanes: function () {
                var t = (this._panes = {});
                (this._mapPane = t.mapPane =
                  this._createPane("leaflet-map-pane", this._container)),
                  (this._tilePane = t.tilePane =
                    this._createPane("leaflet-tile-pane", this._mapPane)),
                  (t.objectsPane = this._createPane(
                    "leaflet-objects-pane",
                    this._mapPane
                  )),
                  (t.shadowPane = this._createPane("leaflet-shadow-pane")),
                  (t.overlayPane = this._createPane("leaflet-overlay-pane")),
                  (t.markerPane = this._createPane("leaflet-marker-pane")),
                  (t.popupPane = this._createPane("leaflet-popup-pane"));
                var e = " leaflet-zoom-hide";
                this.options.markerZoomAnimation ||
                  (a.DomUtil.addClass(t.markerPane, e),
                  a.DomUtil.addClass(t.shadowPane, e),
                  a.DomUtil.addClass(t.popupPane, e));
              },
              _createPane: function (t, e) {
                return a.DomUtil.create("div", t, e || this._panes.objectsPane);
              },
              _clearPanes: function () {
                this._container.removeChild(this._mapPane);
              },
              _addLayers: function (t) {
                t = t ? (a.Util.isArray(t) ? t : [t]) : [];
                for (var e = 0, i = t.length; e < i; e++) this.addLayer(t[e]);
              },
              _resetView: function (t, e, i, n) {
                var o = this._zoom !== e;
                n || (this.fire("movestart"), o && this.fire("zoomstart")),
                  (this._zoom = e),
                  (this._initialCenter = t),
                  (this._initialTopLeftPoint = this._getNewTopLeftPoint(t)),
                  i
                    ? this._initialTopLeftPoint._add(this._getMapPanePos())
                    : a.DomUtil.setPosition(this._mapPane, new a.Point(0, 0)),
                  (this._tileLayersToLoad = this._tileLayersNum);
                var r = !this._loaded;
                (this._loaded = !0),
                  this.fire("viewreset", { hard: !i }),
                  r &&
                    (this.fire("load"), this.eachLayer(this._layerAdd, this)),
                  this.fire("move"),
                  (o || n) && this.fire("zoomend"),
                  this.fire("moveend", { hard: !i });
              },
              _rawPanBy: function (t) {
                a.DomUtil.setPosition(
                  this._mapPane,
                  this._getMapPanePos().subtract(t)
                );
              },
              _getZoomSpan: function () {
                return this.getMaxZoom() - this.getMinZoom();
              },
              _updateZoomLevels: function () {
                var t,
                  e = 1 / 0,
                  i = -1 / 0,
                  n = this._getZoomSpan();
                for (t in this._zoomBoundLayers) {
                  var o = this._zoomBoundLayers[t];
                  isNaN(o.options.minZoom) ||
                    (e = Math.min(e, o.options.minZoom)),
                    isNaN(o.options.maxZoom) ||
                      (i = Math.max(i, o.options.maxZoom));
                }
                void 0 === t
                  ? (this._layersMaxZoom = this._layersMinZoom = void 0)
                  : ((this._layersMaxZoom = i), (this._layersMinZoom = e)),
                  n !== this._getZoomSpan() && this.fire("zoomlevelschange");
              },
              _panInsideMaxBounds: function () {
                this.panInsideBounds(this.options.maxBounds);
              },
              _checkIfLoaded: function () {
                if (!this._loaded)
                  throw new Error("Set map center and zoom first.");
              },
              _initEvents: function (e) {
                if (a.DomEvent) {
                  (e = e || "on"),
                    a.DomEvent[e](
                      this._container,
                      "click",
                      this._onMouseClick,
                      this
                    );
                  var i,
                    n,
                    o = [
                      "dblclick",
                      "mousedown",
                      "mouseup",
                      "mouseenter",
                      "mouseleave",
                      "mousemove",
                      "contextmenu",
                    ];
                  for (i = 0, n = o.length; i < n; i++)
                    a.DomEvent[e](
                      this._container,
                      o[i],
                      this._fireMouseEvent,
                      this
                    );
                  this.options.trackResize &&
                    a.DomEvent[e](t, "resize", this._onResize, this);
                }
              },
              _onResize: function () {
                a.Util.cancelAnimFrame(this._resizeRequest),
                  (this._resizeRequest = a.Util.requestAnimFrame(
                    function () {
                      this.invalidateSize({ debounceMoveend: !0 });
                    },
                    this,
                    !1,
                    this._container
                  ));
              },
              _onMouseClick: function (t) {
                !this._loaded ||
                  (!t._simulated &&
                    ((this.dragging && this.dragging.moved()) ||
                      (this.boxZoom && this.boxZoom.moved()))) ||
                  a.DomEvent._skipped(t) ||
                  (this.fire("preclick"), this._fireMouseEvent(t));
              },
              _fireMouseEvent: function (t) {
                if (this._loaded && !a.DomEvent._skipped(t)) {
                  var e = t.type;
                  if (
                    ((e =
                      "mouseenter" === e
                        ? "mouseover"
                        : "mouseleave" === e
                        ? "mouseout"
                        : e),
                    this.hasEventListeners(e))
                  ) {
                    "contextmenu" === e && a.DomEvent.preventDefault(t);
                    var i = this.mouseEventToContainerPoint(t),
                      n = this.containerPointToLayerPoint(i),
                      o = this.layerPointToLatLng(n);
                    this.fire(e, {
                      latlng: o,
                      layerPoint: n,
                      containerPoint: i,
                      originalEvent: t,
                    });
                  }
                }
              },
              _onTileLayerLoad: function () {
                this._tileLayersToLoad--,
                  this._tileLayersNum &&
                    !this._tileLayersToLoad &&
                    this.fire("tilelayersload");
              },
              _clearHandlers: function () {
                for (var t = 0, e = this._handlers.length; t < e; t++)
                  this._handlers[t].disable();
              },
              whenReady: function (t, e) {
                return (
                  this._loaded
                    ? t.call(e || this, this)
                    : this.on("load", t, e),
                  this
                );
              },
              _layerAdd: function (t) {
                t.onAdd(this), this.fire("layeradd", { layer: t });
              },
              _getMapPanePos: function () {
                return a.DomUtil.getPosition(this._mapPane);
              },
              _moved: function () {
                var t = this._getMapPanePos();
                return t && !t.equals([0, 0]);
              },
              _getTopLeftPoint: function () {
                return this.getPixelOrigin().subtract(this._getMapPanePos());
              },
              _getNewTopLeftPoint: function (t, e) {
                var i = this.getSize()._divideBy(2);
                return this.project(t, e)._subtract(i)._round();
              },
              _latLngToNewLayerPoint: function (t, e, i) {
                var n = this._getNewTopLeftPoint(i, e).add(
                  this._getMapPanePos()
                );
                return this.project(t, e)._subtract(n);
              },
              _getCenterLayerPoint: function () {
                return this.containerPointToLayerPoint(
                  this.getSize()._divideBy(2)
                );
              },
              _getCenterOffset: function (t) {
                return this.latLngToLayerPoint(t).subtract(
                  this._getCenterLayerPoint()
                );
              },
              _limitCenter: function (t, e, i) {
                if (!i) return t;
                var n = this.project(t, e),
                  o = this.getSize().divideBy(2),
                  r = new a.Bounds(n.subtract(o), n.add(o)),
                  s = this._getBoundsOffset(r, i, e);
                return this.unproject(n.add(s), e);
              },
              _limitOffset: function (t, e) {
                if (!e) return t;
                var i = this.getPixelBounds(),
                  n = new a.Bounds(i.min.add(t), i.max.add(t));
                return t.add(this._getBoundsOffset(n, e));
              },
              _getBoundsOffset: function (t, e, i) {
                var n = this.project(e.getNorthWest(), i).subtract(t.min),
                  o = this.project(e.getSouthEast(), i).subtract(t.max),
                  r = this._rebound(n.x, -o.x),
                  s = this._rebound(n.y, -o.y);
                return new a.Point(r, s);
              },
              _rebound: function (t, e) {
                return t + e > 0
                  ? Math.round(t - e) / 2
                  : Math.max(0, Math.ceil(t)) - Math.max(0, Math.floor(e));
              },
              _limitZoom: function (t) {
                var e = this.getMinZoom(),
                  i = this.getMaxZoom();
                return Math.max(e, Math.min(i, t));
              },
            })),
            (a.map = function (t, e) {
              return new a.Map(t, e);
            }),
            (a.Projection.Mercator = {
              MAX_LATITUDE: 85.0840591556,
              R_MINOR: 6356752.314245179,
              R_MAJOR: 6378137,
              project: function (t) {
                var e = a.LatLng.DEG_TO_RAD,
                  i = this.MAX_LATITUDE,
                  n = Math.max(Math.min(i, t.lat), -i),
                  o = this.R_MAJOR,
                  r = this.R_MINOR,
                  s = t.lng * e * o,
                  l = n * e,
                  h = r / o,
                  u = Math.sqrt(1 - h * h),
                  c = u * Math.sin(l);
                c = Math.pow((1 - c) / (1 + c), 0.5 * u);
                var p = Math.tan(0.5 * (0.5 * Math.PI - l)) / c;
                return (l = -o * Math.log(p)), new a.Point(s, l);
              },
              unproject: function (t) {
                for (
                  var e,
                    i = a.LatLng.RAD_TO_DEG,
                    n = this.R_MAJOR,
                    o = this.R_MINOR,
                    r = (t.x * i) / n,
                    s = o / n,
                    l = Math.sqrt(1 - s * s),
                    h = Math.exp(-t.y / n),
                    u = Math.PI / 2 - 2 * Math.atan(h),
                    c = 15,
                    p = 0.1;
                  Math.abs(p) > 1e-7 && --c > 0;

                )
                  (e = l * Math.sin(u)),
                    (p =
                      Math.PI / 2 -
                      2 * Math.atan(h * Math.pow((1 - e) / (1 + e), 0.5 * l)) -
                      u),
                    (u += p);
                return new a.LatLng(u * i, r);
              },
            }),
            (a.CRS.EPSG3395 = a.extend({}, a.CRS, {
              code: "EPSG:3395",
              projection: a.Projection.Mercator,
              transformation: (function () {
                var t = a.Projection.Mercator,
                  e = t.R_MAJOR,
                  i = 0.5 / (Math.PI * e);
                return new a.Transformation(i, 0.5, -i, 0.5);
              })(),
            })),
            (a.TileLayer = a.Class.extend({
              includes: a.Mixin.Events,
              options: {
                minZoom: 0,
                maxZoom: 18,
                tileSize: 256,
                subdomains: "abc",
                errorTileUrl: "",
                attribution: "",
                zoomOffset: 0,
                opacity: 1,
                unloadInvisibleTiles: a.Browser.mobile,
                updateWhenIdle: a.Browser.mobile,
              },
              initialize: function (t, e) {
                (e = a.setOptions(this, e)),
                  e.detectRetina &&
                    a.Browser.retina &&
                    e.maxZoom > 0 &&
                    ((e.tileSize = Math.floor(e.tileSize / 2)),
                    e.zoomOffset++,
                    e.minZoom > 0 && e.minZoom--,
                    this.options.maxZoom--),
                  e.bounds && (e.bounds = a.latLngBounds(e.bounds)),
                  (this._url = t);
                var i = this.options.subdomains;
                "string" == typeof i && (this.options.subdomains = i.split(""));
              },
              onAdd: function (t) {
                (this._map = t),
                  (this._animated = t._zoomAnimated),
                  this._initContainer(),
                  t.on({ viewreset: this._reset, moveend: this._update }, this),
                  this._animated &&
                    t.on(
                      {
                        zoomanim: this._animateZoom,
                        zoomend: this._endZoomAnim,
                      },
                      this
                    ),
                  this.options.updateWhenIdle ||
                    ((this._limitedUpdate = a.Util.limitExecByInterval(
                      this._update,
                      150,
                      this
                    )),
                    t.on("move", this._limitedUpdate, this)),
                  this._reset(),
                  this._update();
              },
              addTo: function (t) {
                return t.addLayer(this), this;
              },
              onRemove: function (t) {
                this._container.parentNode.removeChild(this._container),
                  t.off(
                    { viewreset: this._reset, moveend: this._update },
                    this
                  ),
                  this._animated &&
                    t.off(
                      {
                        zoomanim: this._animateZoom,
                        zoomend: this._endZoomAnim,
                      },
                      this
                    ),
                  this.options.updateWhenIdle ||
                    t.off("move", this._limitedUpdate, this),
                  (this._container = null),
                  (this._map = null);
              },
              bringToFront: function () {
                var t = this._map._panes.tilePane;
                return (
                  this._container &&
                    (t.appendChild(this._container),
                    this._setAutoZIndex(t, Math.max)),
                  this
                );
              },
              bringToBack: function () {
                var t = this._map._panes.tilePane;
                return (
                  this._container &&
                    (t.insertBefore(this._container, t.firstChild),
                    this._setAutoZIndex(t, Math.min)),
                  this
                );
              },
              getAttribution: function () {
                return this.options.attribution;
              },
              getContainer: function () {
                return this._container;
              },
              setOpacity: function (t) {
                return (
                  (this.options.opacity = t),
                  this._map && this._updateOpacity(),
                  this
                );
              },
              setZIndex: function (t) {
                return (this.options.zIndex = t), this._updateZIndex(), this;
              },
              setUrl: function (t, e) {
                return (this._url = t), e || this.redraw(), this;
              },
              redraw: function () {
                return (
                  this._map && (this._reset({ hard: !0 }), this._update()), this
                );
              },
              _updateZIndex: function () {
                this._container &&
                  void 0 !== this.options.zIndex &&
                  (this._container.style.zIndex = this.options.zIndex);
              },
              _setAutoZIndex: function (t, e) {
                var i,
                  n,
                  o,
                  a = t.children,
                  r = -e(1 / 0, -1 / 0);
                for (n = 0, o = a.length; n < o; n++)
                  a[n] !== this._container &&
                    ((i = parseInt(a[n].style.zIndex, 10)),
                    isNaN(i) || (r = e(r, i)));
                this.options.zIndex = this._container.style.zIndex =
                  (isFinite(r) ? r : 0) + e(1, -1);
              },
              _updateOpacity: function () {
                var t,
                  e = this._tiles;
                if (a.Browser.ielt9)
                  for (t in e) a.DomUtil.setOpacity(e[t], this.options.opacity);
                else
                  a.DomUtil.setOpacity(this._container, this.options.opacity);
              },
              _initContainer: function () {
                var t = this._map._panes.tilePane;
                if (!this._container) {
                  if (
                    ((this._container = a.DomUtil.create(
                      "div",
                      "leaflet-layer"
                    )),
                    this._updateZIndex(),
                    this._animated)
                  ) {
                    (this._bgBuffer = a.DomUtil.create(
                      "div",
                      "leaflet-tile-container",
                      this._container
                    )),
                      (this._tileContainer = a.DomUtil.create(
                        "div",
                        "leaflet-tile-container",
                        this._container
                      ));
                  } else this._tileContainer = this._container;
                  t.appendChild(this._container),
                    this.options.opacity < 1 && this._updateOpacity();
                }
              },
              _reset: function (t) {
                for (var e in this._tiles)
                  this.fire("tileunload", { tile: this._tiles[e] });
                (this._tiles = {}),
                  (this._tilesToLoad = 0),
                  this.options.reuseTiles && (this._unusedTiles = []),
                  (this._tileContainer.innerHTML = ""),
                  this._animated && t && t.hard && this._clearBgBuffer(),
                  this._initContainer();
              },
              _getTileSize: function () {
                var t = this._map,
                  e = t.getZoom() + this.options.zoomOffset,
                  i = this.options.maxNativeZoom,
                  n = this.options.tileSize;
                return (
                  i &&
                    e > i &&
                    (n = Math.round(
                      (t.getZoomScale(e) / t.getZoomScale(i)) * n
                    )),
                  n
                );
              },
              _update: function () {
                if (this._map) {
                  var t = this._map,
                    e = t.getPixelBounds(),
                    i = t.getZoom(),
                    n = this._getTileSize();
                  if (!(i > this.options.maxZoom || i < this.options.minZoom)) {
                    var o = a.bounds(
                      e.min.divideBy(n)._floor(),
                      e.max.divideBy(n)._floor()
                    );
                    this._addTilesFromCenterOut(o),
                      (this.options.unloadInvisibleTiles ||
                        this.options.reuseTiles) &&
                        this._removeOtherTiles(o);
                  }
                }
              },
              _addTilesFromCenterOut: function (t) {
                var e,
                  n,
                  o,
                  r = [],
                  s = t.getCenter();
                for (e = t.min.y; e <= t.max.y; e++)
                  for (n = t.min.x; n <= t.max.x; n++)
                    (o = new a.Point(n, e)),
                      this._tileShouldBeLoaded(o) && r.push(o);
                var l = r.length;
                if (0 !== l) {
                  r.sort(function (t, e) {
                    return t.distanceTo(s) - e.distanceTo(s);
                  });
                  var h = i.createDocumentFragment();
                  for (
                    this._tilesToLoad || this.fire("loading"),
                      this._tilesToLoad += l,
                      n = 0;
                    n < l;
                    n++
                  )
                    this._addTile(r[n], h);
                  this._tileContainer.appendChild(h);
                }
              },
              _tileShouldBeLoaded: function (t) {
                if (t.x + ":" + t.y in this._tiles) return !1;
                var e = this.options;
                if (!e.continuousWorld) {
                  var i = this._getWrapTileNum();
                  if (
                    (e.noWrap && (t.x < 0 || t.x >= i.x)) ||
                    t.y < 0 ||
                    t.y >= i.y
                  )
                    return !1;
                }
                if (e.bounds) {
                  var n = this._getTileSize(),
                    o = t.multiplyBy(n),
                    a = o.add([n, n]),
                    r = this._map.unproject(o),
                    s = this._map.unproject(a);
                  if (
                    (e.continuousWorld ||
                      e.noWrap ||
                      ((r = r.wrap()), (s = s.wrap())),
                    !e.bounds.intersects([r, s]))
                  )
                    return !1;
                }
                return !0;
              },
              _removeOtherTiles: function (t) {
                var e, i, n, o;
                for (o in this._tiles)
                  (e = o.split(":")),
                    (i = parseInt(e[0], 10)),
                    (n = parseInt(e[1], 10)),
                    (i < t.min.x ||
                      i > t.max.x ||
                      n < t.min.y ||
                      n > t.max.y) &&
                      this._removeTile(o);
              },
              _removeTile: function (t) {
                var e = this._tiles[t];
                this.fire("tileunload", { tile: e, url: e.src }),
                  this.options.reuseTiles
                    ? (a.DomUtil.removeClass(e, "leaflet-tile-loaded"),
                      this._unusedTiles.push(e))
                    : e.parentNode === this._tileContainer &&
                      this._tileContainer.removeChild(e),
                  a.Browser.android ||
                    ((e.onload = null), (e.src = a.Util.emptyImageUrl)),
                  delete this._tiles[t];
              },
              _addTile: function (t, e) {
                var i = this._getTilePos(t),
                  n = this._getTile();
                a.DomUtil.setPosition(n, i, a.Browser.chrome),
                  (this._tiles[t.x + ":" + t.y] = n),
                  this._loadTile(n, t),
                  n.parentNode !== this._tileContainer && e.appendChild(n);
              },
              _getZoomForUrl: function () {
                var t = this.options,
                  e = this._map.getZoom();
                return (
                  t.zoomReverse && (e = t.maxZoom - e),
                  (e += t.zoomOffset),
                  t.maxNativeZoom ? Math.min(e, t.maxNativeZoom) : e
                );
              },
              _getTilePos: function (t) {
                var e = this._map.getPixelOrigin(),
                  i = this._getTileSize();
                return t.multiplyBy(i).subtract(e);
              },
              getTileUrl: function (t) {
                return a.Util.template(
                  this._url,
                  a.extend(
                    { s: this._getSubdomain(t), z: t.z, x: t.x, y: t.y },
                    this.options
                  )
                );
              },
              _getWrapTileNum: function () {
                return this._map.options.crs
                  .getSize(this._map.getZoom())
                  .divideBy(this._getTileSize())
                  ._floor();
              },
              _adjustTilePoint: function (t) {
                var e = this._getWrapTileNum();
                this.options.continuousWorld ||
                  this.options.noWrap ||
                  (t.x = ((t.x % e.x) + e.x) % e.x),
                  this.options.tms && (t.y = e.y - t.y - 1),
                  (t.z = this._getZoomForUrl());
              },
              _getSubdomain: function (t) {
                var e = Math.abs(t.x + t.y) % this.options.subdomains.length;
                return this.options.subdomains[e];
              },
              _getTile: function () {
                if (this.options.reuseTiles && this._unusedTiles.length > 0) {
                  var t = this._unusedTiles.pop();
                  return this._resetTile(t), t;
                }
                return this._createTile();
              },
              _resetTile: function () {},
              _createTile: function () {
                var t = a.DomUtil.create("img", "leaflet-tile");
                return (
                  (t.style.width = t.style.height = this._getTileSize() + "px"),
                  (t.galleryimg = "no"),
                  (t.onselectstart = t.onmousemove = a.Util.falseFn),
                  a.Browser.ielt9 &&
                    void 0 !== this.options.opacity &&
                    a.DomUtil.setOpacity(t, this.options.opacity),
                  a.Browser.mobileWebkit3d &&
                    (t.style.WebkitBackfaceVisibility = "hidden"),
                  t
                );
              },
              _loadTile: function (t, e) {
                (t._layer = this),
                  (t.onload = this._tileOnLoad),
                  (t.onerror = this._tileOnError),
                  this._adjustTilePoint(e),
                  (t.src = this.getTileUrl(e)),
                  this.fire("tileloadstart", { tile: t, url: t.src });
              },
              _tileLoaded: function () {
                this._tilesToLoad--,
                  this._animated &&
                    a.DomUtil.addClass(
                      this._tileContainer,
                      "leaflet-zoom-animated"
                    ),
                  this._tilesToLoad ||
                    (this.fire("load"),
                    this._animated &&
                      (clearTimeout(this._clearBgBufferTimer),
                      (this._clearBgBufferTimer = setTimeout(
                        a.bind(this._clearBgBuffer, this),
                        500
                      ))));
              },
              _tileOnLoad: function () {
                var t = this._layer;
                this.src !== a.Util.emptyImageUrl &&
                  (a.DomUtil.addClass(this, "leaflet-tile-loaded"),
                  t.fire("tileload", { tile: this, url: this.src })),
                  t._tileLoaded();
              },
              _tileOnError: function () {
                var t = this._layer;
                t.fire("tileerror", { tile: this, url: this.src });
                var e = t.options.errorTileUrl;
                e && (this.src = e), t._tileLoaded();
              },
            })),
            (a.tileLayer = function (t, e) {
              return new a.TileLayer(t, e);
            }),
            (a.TileLayer.WMS = a.TileLayer.extend({
              defaultWmsParams: {
                service: "WMS",
                request: "GetMap",
                version: "1.1.1",
                layers: "",
                styles: "",
                format: "image/jpeg",
                transparent: !1,
              },
              initialize: function (t, e) {
                this._url = t;
                var i = a.extend({}, this.defaultWmsParams),
                  n = e.tileSize || this.options.tileSize;
                e.detectRetina && a.Browser.retina
                  ? (i.width = i.height = 2 * n)
                  : (i.width = i.height = n);
                for (var o in e)
                  this.options.hasOwnProperty(o) ||
                    "crs" === o ||
                    (i[o] = e[o]);
                (this.wmsParams = i), a.setOptions(this, e);
              },
              onAdd: function (t) {
                (this._crs = this.options.crs || t.options.crs),
                  (this._wmsVersion = parseFloat(this.wmsParams.version));
                var e = this._wmsVersion >= 1.3 ? "crs" : "srs";
                (this.wmsParams[e] = this._crs.code),
                  a.TileLayer.prototype.onAdd.call(this, t);
              },
              getTileUrl: function (t) {
                var e = this._map,
                  i = this.options.tileSize,
                  n = t.multiplyBy(i),
                  o = n.add([i, i]),
                  r = this._crs.project(e.unproject(n, t.z)),
                  s = this._crs.project(e.unproject(o, t.z)),
                  l =
                    this._wmsVersion >= 1.3 && this._crs === a.CRS.EPSG4326
                      ? [s.y, r.x, r.y, s.x].join(",")
                      : [r.x, s.y, s.x, r.y].join(","),
                  h = a.Util.template(this._url, { s: this._getSubdomain(t) });
                return (
                  h +
                  a.Util.getParamString(this.wmsParams, h, !0) +
                  "&BBOX=" +
                  l
                );
              },
              setParams: function (t, e) {
                return a.extend(this.wmsParams, t), e || this.redraw(), this;
              },
            })),
            (a.tileLayer.wms = function (t, e) {
              return new a.TileLayer.WMS(t, e);
            }),
            (a.TileLayer.Canvas = a.TileLayer.extend({
              options: { async: !1 },
              initialize: function (t) {
                a.setOptions(this, t);
              },
              redraw: function () {
                this._map && (this._reset({ hard: !0 }), this._update());
                for (var t in this._tiles) this._redrawTile(this._tiles[t]);
                return this;
              },
              _redrawTile: function (t) {
                this.drawTile(t, t._tilePoint, this._map._zoom);
              },
              _createTile: function () {
                var t = a.DomUtil.create("canvas", "leaflet-tile");
                return (
                  (t.width = t.height = this.options.tileSize),
                  (t.onselectstart = t.onmousemove = a.Util.falseFn),
                  t
                );
              },
              _loadTile: function (t, e) {
                (t._layer = this),
                  (t._tilePoint = e),
                  this._redrawTile(t),
                  this.options.async || this.tileDrawn(t);
              },
              drawTile: function () {},
              tileDrawn: function (t) {
                this._tileOnLoad.call(t);
              },
            })),
            (a.tileLayer.canvas = function (t) {
              return new a.TileLayer.Canvas(t);
            }),
            (a.ImageOverlay = a.Class.extend({
              includes: a.Mixin.Events,
              options: { opacity: 1 },
              initialize: function (t, e, i) {
                (this._url = t),
                  (this._bounds = a.latLngBounds(e)),
                  a.setOptions(this, i);
              },
              onAdd: function (t) {
                (this._map = t),
                  this._image || this._initImage(),
                  t._panes.overlayPane.appendChild(this._image),
                  t.on("viewreset", this._reset, this),
                  t.options.zoomAnimation &&
                    a.Browser.any3d &&
                    t.on("zoomanim", this._animateZoom, this),
                  this._reset();
              },
              onRemove: function (t) {
                t.getPanes().overlayPane.removeChild(this._image),
                  t.off("viewreset", this._reset, this),
                  t.options.zoomAnimation &&
                    t.off("zoomanim", this._animateZoom, this);
              },
              addTo: function (t) {
                return t.addLayer(this), this;
              },
              setOpacity: function (t) {
                return (this.options.opacity = t), this._updateOpacity(), this;
              },
              bringToFront: function () {
                return (
                  this._image &&
                    this._map._panes.overlayPane.appendChild(this._image),
                  this
                );
              },
              bringToBack: function () {
                var t = this._map._panes.overlayPane;
                return (
                  this._image && t.insertBefore(this._image, t.firstChild), this
                );
              },
              setUrl: function (t) {
                (this._url = t), (this._image.src = this._url);
              },
              getAttribution: function () {
                return this.options.attribution;
              },
              _initImage: function () {
                (this._image = a.DomUtil.create("img", "leaflet-image-layer")),
                  this._map.options.zoomAnimation && a.Browser.any3d
                    ? a.DomUtil.addClass(this._image, "leaflet-zoom-animated")
                    : a.DomUtil.addClass(this._image, "leaflet-zoom-hide"),
                  this._updateOpacity(),
                  a.extend(this._image, {
                    galleryimg: "no",
                    onselectstart: a.Util.falseFn,
                    onmousemove: a.Util.falseFn,
                    onload: a.bind(this._onImageLoad, this),
                    src: this._url,
                  });
              },
              _animateZoom: function (t) {
                var e = this._map,
                  i = this._image,
                  n = e.getZoomScale(t.zoom),
                  o = this._bounds.getNorthWest(),
                  r = this._bounds.getSouthEast(),
                  s = e._latLngToNewLayerPoint(o, t.zoom, t.center),
                  l = e
                    ._latLngToNewLayerPoint(r, t.zoom, t.center)
                    ._subtract(s),
                  h = s._add(l._multiplyBy(0.5 * (1 - 1 / n)));
                i.style[a.DomUtil.TRANSFORM] =
                  a.DomUtil.getTranslateString(h) + " scale(" + n + ") ";
              },
              _reset: function () {
                var t = this._image,
                  e = this._map.latLngToLayerPoint(this._bounds.getNorthWest()),
                  i = this._map
                    .latLngToLayerPoint(this._bounds.getSouthEast())
                    ._subtract(e);
                a.DomUtil.setPosition(t, e),
                  (t.style.width = i.x + "px"),
                  (t.style.height = i.y + "px");
              },
              _onImageLoad: function () {
                this.fire("load");
              },
              _updateOpacity: function () {
                a.DomUtil.setOpacity(this._image, this.options.opacity);
              },
            })),
            (a.imageOverlay = function (t, e, i) {
              return new a.ImageOverlay(t, e, i);
            }),
            (a.Icon = a.Class.extend({
              options: { className: "" },
              initialize: function (t) {
                a.setOptions(this, t);
              },
              createIcon: function (t) {
                return this._createIcon("icon", t);
              },
              createShadow: function (t) {
                return this._createIcon("shadow", t);
              },
              _createIcon: function (t, e) {
                var i = this._getIconUrl(t);
                if (!i) {
                  if ("icon" === t)
                    throw new Error(
                      "iconUrl not set in Icon options (see the docs)."
                    );
                  return null;
                }
                var n;
                return (
                  (n =
                    e && "IMG" === e.tagName
                      ? this._createImg(i, e)
                      : this._createImg(i)),
                  this._setIconStyles(n, t),
                  n
                );
              },
              _setIconStyles: function (t, e) {
                var i,
                  n = this.options,
                  o = a.point(n[e + "Size"]);
                (i =
                  "shadow" === e
                    ? a.point(n.shadowAnchor || n.iconAnchor)
                    : a.point(n.iconAnchor)),
                  !i && o && (i = o.divideBy(2, !0)),
                  (t.className = "leaflet-marker-" + e + " " + n.className),
                  i &&
                    ((t.style.marginLeft = -i.x + "px"),
                    (t.style.marginTop = -i.y + "px")),
                  o &&
                    ((t.style.width = o.x + "px"),
                    (t.style.height = o.y + "px"));
              },
              _createImg: function (t, e) {
                return (e = e || i.createElement("img")), (e.src = t), e;
              },
              _getIconUrl: function (t) {
                return a.Browser.retina && this.options[t + "RetinaUrl"]
                  ? this.options[t + "RetinaUrl"]
                  : this.options[t + "Url"];
              },
            })),
            (a.icon = function (t) {
              return new a.Icon(t);
            }),
            (a.Icon.Default = a.Icon.extend({
              options: {
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41],
              },
              _getIconUrl: function (t) {
                var e = t + "Url";
                if (this.options[e]) return this.options[e];
                a.Browser.retina && "icon" === t && (t += "-2x");
                var i = a.Icon.Default.imagePath;
                if (!i)
                  throw new Error(
                    "Couldn't autodetect L.Icon.Default.imagePath, set it manually."
                  );
                return i + "/marker-" + t + ".png";
              },
            })),
            (a.Icon.Default.imagePath = (function () {
              var t,
                e,
                n,
                o,
                a = i.getElementsByTagName("script"),
                r = /[\/^]leaflet[\-\._]?([\w\-\._]*)\.js\??/;
              for (t = 0, e = a.length; t < e; t++)
                if (((n = a[t].src), n.match(r)))
                  return (o = n.split(r)[0]), (o ? o + "/" : "") + "images";
            })()),
            (a.Marker = a.Class.extend({
              includes: a.Mixin.Events,
              options: {
                icon: new a.Icon.Default(),
                title: "",
                alt: "",
                clickable: !0,
                draggable: !1,
                keyboard: !0,
                zIndexOffset: 0,
                opacity: 1,
                riseOnHover: !1,
                riseOffset: 250,
              },
              initialize: function (t, e) {
                a.setOptions(this, e), (this._latlng = a.latLng(t));
              },
              onAdd: function (t) {
                (this._map = t),
                  t.on("viewreset", this.update, this),
                  this._initIcon(),
                  this.update(),
                  this.fire("add"),
                  t.options.zoomAnimation &&
                    t.options.markerZoomAnimation &&
                    t.on("zoomanim", this._animateZoom, this);
              },
              addTo: function (t) {
                return t.addLayer(this), this;
              },
              onRemove: function (t) {
                this.dragging && this.dragging.disable(),
                  this._removeIcon(),
                  this._removeShadow(),
                  this.fire("remove"),
                  t.off(
                    { viewreset: this.update, zoomanim: this._animateZoom },
                    this
                  ),
                  (this._map = null);
              },
              getLatLng: function () {
                return this._latlng;
              },
              setLatLng: function (t) {
                return (
                  (this._latlng = a.latLng(t)),
                  this.update(),
                  this.fire("move", { latlng: this._latlng })
                );
              },
              setZIndexOffset: function (t) {
                return (this.options.zIndexOffset = t), this.update(), this;
              },
              setIcon: function (t) {
                return (
                  (this.options.icon = t),
                  this._map && (this._initIcon(), this.update()),
                  this._popup && this.bindPopup(this._popup),
                  this
                );
              },
              update: function () {
                return (
                  this._icon &&
                    this._setPos(
                      this._map.latLngToLayerPoint(this._latlng).round()
                    ),
                  this
                );
              },
              _initIcon: function () {
                var t = this.options,
                  e = this._map,
                  i = e.options.zoomAnimation && e.options.markerZoomAnimation,
                  n = i ? "leaflet-zoom-animated" : "leaflet-zoom-hide",
                  o = t.icon.createIcon(this._icon),
                  r = !1;
                o !== this._icon &&
                  (this._icon && this._removeIcon(),
                  (r = !0),
                  t.title && (o.title = t.title),
                  t.alt && (o.alt = t.alt)),
                  a.DomUtil.addClass(o, n),
                  t.keyboard && (o.tabIndex = "0"),
                  (this._icon = o),
                  this._initInteraction(),
                  t.riseOnHover &&
                    a.DomEvent.on(o, "mouseover", this._bringToFront, this).on(
                      o,
                      "mouseout",
                      this._resetZIndex,
                      this
                    );
                var s = t.icon.createShadow(this._shadow),
                  l = !1;
                s !== this._shadow && (this._removeShadow(), (l = !0)),
                  s && a.DomUtil.addClass(s, n),
                  (this._shadow = s),
                  t.opacity < 1 && this._updateOpacity();
                var h = this._map._panes;
                r && h.markerPane.appendChild(this._icon),
                  s && l && h.shadowPane.appendChild(this._shadow);
              },
              _removeIcon: function () {
                this.options.riseOnHover &&
                  a.DomEvent.off(
                    this._icon,
                    "mouseover",
                    this._bringToFront
                  ).off(this._icon, "mouseout", this._resetZIndex),
                  this._map._panes.markerPane.removeChild(this._icon),
                  (this._icon = null);
              },
              _removeShadow: function () {
                this._shadow &&
                  this._map._panes.shadowPane.removeChild(this._shadow),
                  (this._shadow = null);
              },
              _setPos: function (t) {
                a.DomUtil.setPosition(this._icon, t),
                  this._shadow && a.DomUtil.setPosition(this._shadow, t),
                  (this._zIndex = t.y + this.options.zIndexOffset),
                  this._resetZIndex();
              },
              _updateZIndex: function (t) {
                this._icon.style.zIndex = this._zIndex + t;
              },
              _animateZoom: function (t) {
                var e = this._map
                  ._latLngToNewLayerPoint(this._latlng, t.zoom, t.center)
                  .round();
                this._setPos(e);
              },
              _initInteraction: function () {
                if (this.options.clickable) {
                  var t = this._icon,
                    e = [
                      "dblclick",
                      "mousedown",
                      "mouseover",
                      "mouseout",
                      "contextmenu",
                    ];
                  a.DomUtil.addClass(t, "leaflet-clickable"),
                    a.DomEvent.on(t, "click", this._onMouseClick, this),
                    a.DomEvent.on(t, "keypress", this._onKeyPress, this);
                  for (var i = 0; i < e.length; i++)
                    a.DomEvent.on(t, e[i], this._fireMouseEvent, this);
                  a.Handler.MarkerDrag &&
                    ((this.dragging = new a.Handler.MarkerDrag(this)),
                    this.options.draggable && this.dragging.enable());
                }
              },
              _onMouseClick: function (t) {
                var e = this.dragging && this.dragging.moved();
                (this.hasEventListeners(t.type) || e) &&
                  a.DomEvent.stopPropagation(t),
                  e ||
                    (((this.dragging && this.dragging._enabled) ||
                      !this._map.dragging ||
                      !this._map.dragging.moved()) &&
                      this.fire(t.type, {
                        originalEvent: t,
                        latlng: this._latlng,
                      }));
              },
              _onKeyPress: function (t) {
                13 === t.keyCode &&
                  this.fire("click", {
                    originalEvent: t,
                    latlng: this._latlng,
                  });
              },
              _fireMouseEvent: function (t) {
                this.fire(t.type, { originalEvent: t, latlng: this._latlng }),
                  "contextmenu" === t.type &&
                    this.hasEventListeners(t.type) &&
                    a.DomEvent.preventDefault(t),
                  "mousedown" !== t.type
                    ? a.DomEvent.stopPropagation(t)
                    : a.DomEvent.preventDefault(t);
              },
              setOpacity: function (t) {
                return (
                  (this.options.opacity = t),
                  this._map && this._updateOpacity(),
                  this
                );
              },
              _updateOpacity: function () {
                a.DomUtil.setOpacity(this._icon, this.options.opacity),
                  this._shadow &&
                    a.DomUtil.setOpacity(this._shadow, this.options.opacity);
              },
              _bringToFront: function () {
                this._updateZIndex(this.options.riseOffset);
              },
              _resetZIndex: function () {
                this._updateZIndex(0);
              },
            })),
            (a.marker = function (t, e) {
              return new a.Marker(t, e);
            }),
            (a.DivIcon = a.Icon.extend({
              options: {
                iconSize: [12, 12],
                className: "leaflet-div-icon",
                html: !1,
              },
              createIcon: function (t) {
                var e = t && "DIV" === t.tagName ? t : i.createElement("div"),
                  n = this.options;
                return (
                  !1 !== n.html ? (e.innerHTML = n.html) : (e.innerHTML = ""),
                  n.bgPos &&
                    (e.style.backgroundPosition =
                      -n.bgPos.x + "px " + -n.bgPos.y + "px"),
                  this._setIconStyles(e, "icon"),
                  e
                );
              },
              createShadow: function () {
                return null;
              },
            })),
            (a.divIcon = function (t) {
              return new a.DivIcon(t);
            }),
            a.Map.mergeOptions({ closePopupOnClick: !0 }),
            (a.Popup = a.Class.extend({
              includes: a.Mixin.Events,
              options: {
                minWidth: 50,
                maxWidth: 300,
                autoPan: !0,
                closeButton: !0,
                offset: [0, 7],
                autoPanPadding: [5, 5],
                keepInView: !1,
                className: "",
                zoomAnimation: !0,
              },
              initialize: function (t, e) {
                a.setOptions(this, t),
                  (this._source = e),
                  (this._animated =
                    a.Browser.any3d && this.options.zoomAnimation),
                  (this._isOpen = !1);
              },
              onAdd: function (t) {
                (this._map = t), this._container || this._initLayout();
                var e = t.options.fadeAnimation;
                e && a.DomUtil.setOpacity(this._container, 0),
                  t._panes.popupPane.appendChild(this._container),
                  t.on(this._getEvents(), this),
                  this.update(),
                  e && a.DomUtil.setOpacity(this._container, 1),
                  this.fire("open"),
                  t.fire("popupopen", { popup: this }),
                  this._source &&
                    this._source.fire("popupopen", { popup: this });
              },
              addTo: function (t) {
                return t.addLayer(this), this;
              },
              openOn: function (t) {
                return t.openPopup(this), this;
              },
              onRemove: function (t) {
                t._panes.popupPane.removeChild(this._container),
                  a.Util.falseFn(this._container.offsetWidth),
                  t.off(this._getEvents(), this),
                  t.options.fadeAnimation &&
                    a.DomUtil.setOpacity(this._container, 0),
                  (this._map = null),
                  this.fire("close"),
                  t.fire("popupclose", { popup: this }),
                  this._source &&
                    this._source.fire("popupclose", { popup: this });
              },
              getLatLng: function () {
                return this._latlng;
              },
              setLatLng: function (t) {
                return (
                  (this._latlng = a.latLng(t)),
                  this._map && (this._updatePosition(), this._adjustPan()),
                  this
                );
              },
              getContent: function () {
                return this._content;
              },
              setContent: function (t) {
                return (this._content = t), this.update(), this;
              },
              update: function () {
                this._map &&
                  ((this._container.style.visibility = "hidden"),
                  this._updateContent(),
                  this._updateLayout(),
                  this._updatePosition(),
                  (this._container.style.visibility = ""),
                  this._adjustPan());
              },
              _getEvents: function () {
                var t = { viewreset: this._updatePosition };
                return (
                  this._animated && (t.zoomanim = this._zoomAnimation),
                  ("closeOnClick" in this.options
                    ? this.options.closeOnClick
                    : this._map.options.closePopupOnClick) &&
                    (t.preclick = this._close),
                  this.options.keepInView && (t.moveend = this._adjustPan),
                  t
                );
              },
              _close: function () {
                this._map && this._map.closePopup(this);
              },
              _initLayout: function () {
                var t,
                  e = "leaflet-popup",
                  i =
                    e +
                    " " +
                    this.options.className +
                    " leaflet-zoom-" +
                    (this._animated ? "animated" : "hide"),
                  n = (this._container = a.DomUtil.create("div", i));
                this.options.closeButton &&
                  ((t = this._closeButton =
                    a.DomUtil.create("a", e + "-close-button", n)),
                  (t.href = "#close"),
                  (t.innerHTML = "&#215;"),
                  a.DomEvent.disableClickPropagation(t),
                  a.DomEvent.on(t, "click", this._onCloseButtonClick, this));
                var o = (this._wrapper = a.DomUtil.create(
                  "div",
                  e + "-content-wrapper",
                  n
                ));
                a.DomEvent.disableClickPropagation(o),
                  (this._contentNode = a.DomUtil.create(
                    "div",
                    e + "-content",
                    o
                  )),
                  a.DomEvent.disableScrollPropagation(this._contentNode),
                  a.DomEvent.on(o, "contextmenu", a.DomEvent.stopPropagation),
                  (this._tipContainer = a.DomUtil.create(
                    "div",
                    e + "-tip-container",
                    n
                  )),
                  (this._tip = a.DomUtil.create(
                    "div",
                    e + "-tip",
                    this._tipContainer
                  ));
              },
              _updateContent: function () {
                if (this._content) {
                  if ("string" == typeof this._content)
                    this._contentNode.innerHTML = this._content;
                  else {
                    for (; this._contentNode.hasChildNodes(); )
                      this._contentNode.removeChild(
                        this._contentNode.firstChild
                      );
                    this._contentNode.appendChild(this._content);
                  }
                  this.fire("contentupdate");
                }
              },
              _updateLayout: function () {
                var t = this._contentNode,
                  e = t.style;
                (e.width = ""), (e.whiteSpace = "nowrap");
                var i = t.offsetWidth;
                (i = Math.min(i, this.options.maxWidth)),
                  (i = Math.max(i, this.options.minWidth)),
                  (e.width = i + 1 + "px"),
                  (e.whiteSpace = ""),
                  (e.height = "");
                var n = t.offsetHeight,
                  o = this.options.maxHeight;
                o && n > o
                  ? ((e.height = o + "px"),
                    a.DomUtil.addClass(t, "leaflet-popup-scrolled"))
                  : a.DomUtil.removeClass(t, "leaflet-popup-scrolled"),
                  (this._containerWidth = this._container.offsetWidth);
              },
              _updatePosition: function () {
                if (this._map) {
                  var t = this._map.latLngToLayerPoint(this._latlng),
                    e = this._animated,
                    i = a.point(this.options.offset);
                  e && a.DomUtil.setPosition(this._container, t),
                    (this._containerBottom = -i.y - (e ? 0 : t.y)),
                    (this._containerLeft =
                      -Math.round(this._containerWidth / 2) +
                      i.x +
                      (e ? 0 : t.x)),
                    (this._container.style.bottom =
                      this._containerBottom + "px"),
                    (this._container.style.left = this._containerLeft + "px");
                }
              },
              _zoomAnimation: function (t) {
                var e = this._map._latLngToNewLayerPoint(
                  this._latlng,
                  t.zoom,
                  t.center
                );
                a.DomUtil.setPosition(this._container, e);
              },
              _adjustPan: function () {
                if (this.options.autoPan) {
                  var t = this._map,
                    e = this._container.offsetHeight,
                    i = this._containerWidth,
                    n = new a.Point(
                      this._containerLeft,
                      -e - this._containerBottom
                    );
                  this._animated &&
                    n._add(a.DomUtil.getPosition(this._container));
                  var o = t.layerPointToContainerPoint(n),
                    r = a.point(this.options.autoPanPadding),
                    s = a.point(this.options.autoPanPaddingTopLeft || r),
                    l = a.point(this.options.autoPanPaddingBottomRight || r),
                    h = t.getSize(),
                    u = 0,
                    c = 0;
                  o.x + i + l.x > h.x && (u = o.x + i - h.x + l.x),
                    o.x - u - s.x < 0 && (u = o.x - s.x),
                    o.y + e + l.y > h.y && (c = o.y + e - h.y + l.y),
                    o.y - c - s.y < 0 && (c = o.y - s.y),
                    (u || c) && t.fire("autopanstart").panBy([u, c]);
                }
              },
              _onCloseButtonClick: function (t) {
                this._close(), a.DomEvent.stop(t);
              },
            })),
            (a.popup = function (t, e) {
              return new a.Popup(t, e);
            }),
            a.Map.include({
              openPopup: function (t, e, i) {
                if ((this.closePopup(), !(t instanceof a.Popup))) {
                  var n = t;
                  t = new a.Popup(i).setLatLng(e).setContent(n);
                }
                return (t._isOpen = !0), (this._popup = t), this.addLayer(t);
              },
              closePopup: function (t) {
                return (
                  (t && t !== this._popup) ||
                    ((t = this._popup), (this._popup = null)),
                  t && (this.removeLayer(t), (t._isOpen = !1)),
                  this
                );
              },
            }),
            a.Marker.include({
              openPopup: function () {
                return (
                  this._popup &&
                    this._map &&
                    !this._map.hasLayer(this._popup) &&
                    (this._popup.setLatLng(this._latlng),
                    this._map.openPopup(this._popup)),
                  this
                );
              },
              closePopup: function () {
                return this._popup && this._popup._close(), this;
              },
              togglePopup: function () {
                return (
                  this._popup &&
                    (this._popup._isOpen
                      ? this.closePopup()
                      : this.openPopup()),
                  this
                );
              },
              bindPopup: function (t, e) {
                var i = a.point(
                  this.options.icon.options.popupAnchor || [0, 0]
                );
                return (
                  (i = i.add(a.Popup.prototype.options.offset)),
                  e && e.offset && (i = i.add(e.offset)),
                  (e = a.extend({ offset: i }, e)),
                  this._popupHandlersAdded ||
                    (this.on("click", this.togglePopup, this)
                      .on("remove", this.closePopup, this)
                      .on("move", this._movePopup, this),
                    (this._popupHandlersAdded = !0)),
                  t instanceof a.Popup
                    ? (a.setOptions(t, e),
                      (this._popup = t),
                      (t._source = this))
                    : (this._popup = new a.Popup(e, this).setContent(t)),
                  this
                );
              },
              setPopupContent: function (t) {
                return this._popup && this._popup.setContent(t), this;
              },
              unbindPopup: function () {
                return (
                  this._popup &&
                    ((this._popup = null),
                    this.off("click", this.togglePopup, this)
                      .off("remove", this.closePopup, this)
                      .off("move", this._movePopup, this),
                    (this._popupHandlersAdded = !1)),
                  this
                );
              },
              getPopup: function () {
                return this._popup;
              },
              _movePopup: function (t) {
                this._popup.setLatLng(t.latlng);
              },
            }),
            (a.LayerGroup = a.Class.extend({
              initialize: function (t) {
                this._layers = {};
                var e, i;
                if (t)
                  for (e = 0, i = t.length; e < i; e++) this.addLayer(t[e]);
              },
              addLayer: function (t) {
                var e = this.getLayerId(t);
                return (
                  (this._layers[e] = t),
                  this._map && this._map.addLayer(t),
                  this
                );
              },
              removeLayer: function (t) {
                var e = t in this._layers ? t : this.getLayerId(t);
                return (
                  this._map &&
                    this._layers[e] &&
                    this._map.removeLayer(this._layers[e]),
                  delete this._layers[e],
                  this
                );
              },
              hasLayer: function (t) {
                return (
                  !!t &&
                  (t in this._layers || this.getLayerId(t) in this._layers)
                );
              },
              clearLayers: function () {
                return this.eachLayer(this.removeLayer, this), this;
              },
              invoke: function (t) {
                var e,
                  i,
                  n = Array.prototype.slice.call(arguments, 1);
                for (e in this._layers)
                  (i = this._layers[e]), i[t] && i[t].apply(i, n);
                return this;
              },
              onAdd: function (t) {
                (this._map = t), this.eachLayer(t.addLayer, t);
              },
              onRemove: function (t) {
                this.eachLayer(t.removeLayer, t), (this._map = null);
              },
              addTo: function (t) {
                return t.addLayer(this), this;
              },
              eachLayer: function (t, e) {
                for (var i in this._layers) t.call(e, this._layers[i]);
                return this;
              },
              getLayer: function (t) {
                return this._layers[t];
              },
              getLayers: function () {
                var t = [];
                for (var e in this._layers) t.push(this._layers[e]);
                return t;
              },
              setZIndex: function (t) {
                return this.invoke("setZIndex", t);
              },
              getLayerId: function (t) {
                return a.stamp(t);
              },
            })),
            (a.layerGroup = function (t) {
              return new a.LayerGroup(t);
            }),
            (a.FeatureGroup = a.LayerGroup.extend({
              includes: a.Mixin.Events,
              statics: {
                EVENTS:
                  "click dblclick mouseover mouseout mousemove contextmenu popupopen popupclose",
              },
              addLayer: function (t) {
                return this.hasLayer(t)
                  ? this
                  : ("on" in t &&
                      t.on(a.FeatureGroup.EVENTS, this._propagateEvent, this),
                    a.LayerGroup.prototype.addLayer.call(this, t),
                    this._popupContent &&
                      t.bindPopup &&
                      t.bindPopup(this._popupContent, this._popupOptions),
                    this.fire("layeradd", { layer: t }));
              },
              removeLayer: function (t) {
                return this.hasLayer(t)
                  ? (t in this._layers && (t = this._layers[t]),
                    "off" in t &&
                      t.off(a.FeatureGroup.EVENTS, this._propagateEvent, this),
                    a.LayerGroup.prototype.removeLayer.call(this, t),
                    this._popupContent && this.invoke("unbindPopup"),
                    this.fire("layerremove", { layer: t }))
                  : this;
              },
              bindPopup: function (t, e) {
                return (
                  (this._popupContent = t),
                  (this._popupOptions = e),
                  this.invoke("bindPopup", t, e)
                );
              },
              openPopup: function (t) {
                for (var e in this._layers) {
                  this._layers[e].openPopup(t);
                  break;
                }
                return this;
              },
              setStyle: function (t) {
                return this.invoke("setStyle", t);
              },
              bringToFront: function () {
                return this.invoke("bringToFront");
              },
              bringToBack: function () {
                return this.invoke("bringToBack");
              },
              getBounds: function () {
                var t = new a.LatLngBounds();
                return (
                  this.eachLayer(function (e) {
                    t.extend(
                      e instanceof a.Marker ? e.getLatLng() : e.getBounds()
                    );
                  }),
                  t
                );
              },
              _propagateEvent: function (t) {
                (t = a.extend({ layer: t.target, target: this }, t)),
                  this.fire(t.type, t);
              },
            })),
            (a.featureGroup = function (t) {
              return new a.FeatureGroup(t);
            }),
            (a.Path = a.Class.extend({
              includes: [a.Mixin.Events],
              statics: {
                CLIP_PADDING: (function () {
                  var e = a.Browser.mobile ? 1280 : 2e3,
                    i = (e / Math.max(t.outerWidth, t.outerHeight) - 1) / 2;
                  return Math.max(0, Math.min(0.5, i));
                })(),
              },
              options: {
                stroke: !0,
                color: "#0033ff",
                dashArray: null,
                lineCap: null,
                lineJoin: null,
                weight: 5,
                opacity: 0.5,
                fill: !1,
                fillColor: null,
                fillOpacity: 0.2,
                clickable: !0,
              },
              initialize: function (t) {
                a.setOptions(this, t);
              },
              onAdd: function (t) {
                (this._map = t),
                  this._container || (this._initElements(), this._initEvents()),
                  this.projectLatlngs(),
                  this._updatePath(),
                  this._container &&
                    this._map._pathRoot.appendChild(this._container),
                  this.fire("add"),
                  t.on(
                    {
                      viewreset: this.projectLatlngs,
                      moveend: this._updatePath,
                    },
                    this
                  );
              },
              addTo: function (t) {
                return t.addLayer(this), this;
              },
              onRemove: function (t) {
                t._pathRoot.removeChild(this._container),
                  this.fire("remove"),
                  (this._map = null),
                  a.Browser.vml &&
                    ((this._container = null),
                    (this._stroke = null),
                    (this._fill = null)),
                  t.off(
                    {
                      viewreset: this.projectLatlngs,
                      moveend: this._updatePath,
                    },
                    this
                  );
              },
              projectLatlngs: function () {},
              setStyle: function (t) {
                return (
                  a.setOptions(this, t),
                  this._container && this._updateStyle(),
                  this
                );
              },
              redraw: function () {
                return (
                  this._map && (this.projectLatlngs(), this._updatePath()), this
                );
              },
            })),
            a.Map.include({
              _updatePathViewport: function () {
                var t = a.Path.CLIP_PADDING,
                  e = this.getSize(),
                  i = a.DomUtil.getPosition(this._mapPane),
                  n = i.multiplyBy(-1)._subtract(e.multiplyBy(t)._round()),
                  o = n.add(e.multiplyBy(1 + 2 * t)._round());
                this._pathViewport = new a.Bounds(n, o);
              },
            }),
            (a.Path.SVG_NS = "http://www.w3.org/2000/svg"),
            (a.Browser.svg = !(
              !i.createElementNS ||
              !i.createElementNS(a.Path.SVG_NS, "svg").createSVGRect
            )),
            (a.Path = a.Path.extend({
              statics: { SVG: a.Browser.svg },
              bringToFront: function () {
                var t = this._map._pathRoot,
                  e = this._container;
                return e && t.lastChild !== e && t.appendChild(e), this;
              },
              bringToBack: function () {
                var t = this._map._pathRoot,
                  e = this._container,
                  i = t.firstChild;
                return e && i !== e && t.insertBefore(e, i), this;
              },
              getPathString: function () {},
              _createElement: function (t) {
                return i.createElementNS(a.Path.SVG_NS, t);
              },
              _initElements: function () {
                this._map._initPathRoot(), this._initPath(), this._initStyle();
              },
              _initPath: function () {
                (this._container = this._createElement("g")),
                  (this._path = this._createElement("path")),
                  this.options.className &&
                    a.DomUtil.addClass(this._path, this.options.className),
                  this._container.appendChild(this._path);
              },
              _initStyle: function () {
                this.options.stroke &&
                  (this._path.setAttribute("stroke-linejoin", "round"),
                  this._path.setAttribute("stroke-linecap", "round")),
                  this.options.fill &&
                    this._path.setAttribute("fill-rule", "evenodd"),
                  this.options.pointerEvents &&
                    this._path.setAttribute(
                      "pointer-events",
                      this.options.pointerEvents
                    ),
                  this.options.clickable ||
                    this.options.pointerEvents ||
                    this._path.setAttribute("pointer-events", "none"),
                  this._updateStyle();
              },
              _updateStyle: function () {
                this.options.stroke
                  ? (this._path.setAttribute("stroke", this.options.color),
                    this._path.setAttribute(
                      "stroke-opacity",
                      this.options.opacity
                    ),
                    this._path.setAttribute(
                      "stroke-width",
                      this.options.weight
                    ),
                    this.options.dashArray
                      ? this._path.setAttribute(
                          "stroke-dasharray",
                          this.options.dashArray
                        )
                      : this._path.removeAttribute("stroke-dasharray"),
                    this.options.lineCap &&
                      this._path.setAttribute(
                        "stroke-linecap",
                        this.options.lineCap
                      ),
                    this.options.lineJoin &&
                      this._path.setAttribute(
                        "stroke-linejoin",
                        this.options.lineJoin
                      ))
                  : this._path.setAttribute("stroke", "none"),
                  this.options.fill
                    ? (this._path.setAttribute(
                        "fill",
                        this.options.fillColor || this.options.color
                      ),
                      this._path.setAttribute(
                        "fill-opacity",
                        this.options.fillOpacity
                      ))
                    : this._path.setAttribute("fill", "none");
              },
              _updatePath: function () {
                var t = this.getPathString();
                t || (t = "M0 0"), this._path.setAttribute("d", t);
              },
              _initEvents: function () {
                if (this.options.clickable) {
                  (!a.Browser.svg && a.Browser.vml) ||
                    a.DomUtil.addClass(this._path, "leaflet-clickable"),
                    a.DomEvent.on(
                      this._container,
                      "click",
                      this._onMouseClick,
                      this
                    );
                  for (
                    var t = [
                        "dblclick",
                        "mousedown",
                        "mouseover",
                        "mouseout",
                        "mousemove",
                        "contextmenu",
                      ],
                      e = 0;
                    e < t.length;
                    e++
                  )
                    a.DomEvent.on(
                      this._container,
                      t[e],
                      this._fireMouseEvent,
                      this
                    );
                }
              },
              _onMouseClick: function (t) {
                (this._map.dragging && this._map.dragging.moved()) ||
                  this._fireMouseEvent(t);
              },
              _fireMouseEvent: function (t) {
                if (this._map && this.hasEventListeners(t.type)) {
                  var e = this._map,
                    i = e.mouseEventToContainerPoint(t),
                    n = e.containerPointToLayerPoint(i),
                    o = e.layerPointToLatLng(n);
                  this.fire(t.type, {
                    latlng: o,
                    layerPoint: n,
                    containerPoint: i,
                    originalEvent: t,
                  }),
                    "contextmenu" === t.type && a.DomEvent.preventDefault(t),
                    "mousemove" !== t.type && a.DomEvent.stopPropagation(t);
                }
              },
            })),
            a.Map.include({
              _initPathRoot: function () {
                this._pathRoot ||
                  ((this._pathRoot = a.Path.prototype._createElement("svg")),
                  this._panes.overlayPane.appendChild(this._pathRoot),
                  this.options.zoomAnimation && a.Browser.any3d
                    ? (a.DomUtil.addClass(
                        this._pathRoot,
                        "leaflet-zoom-animated"
                      ),
                      this.on({
                        zoomanim: this._animatePathZoom,
                        zoomend: this._endPathZoom,
                      }))
                    : a.DomUtil.addClass(this._pathRoot, "leaflet-zoom-hide"),
                  this.on("moveend", this._updateSvgViewport),
                  this._updateSvgViewport());
              },
              _animatePathZoom: function (t) {
                var e = this.getZoomScale(t.zoom),
                  i = this._getCenterOffset(t.center)
                    ._multiplyBy(-e)
                    ._add(this._pathViewport.min);
                (this._pathRoot.style[a.DomUtil.TRANSFORM] =
                  a.DomUtil.getTranslateString(i) + " scale(" + e + ") "),
                  (this._pathZooming = !0);
              },
              _endPathZoom: function () {
                this._pathZooming = !1;
              },
              _updateSvgViewport: function () {
                if (!this._pathZooming) {
                  this._updatePathViewport();
                  var t = this._pathViewport,
                    e = t.min,
                    i = t.max,
                    n = i.x - e.x,
                    o = i.y - e.y,
                    r = this._pathRoot,
                    s = this._panes.overlayPane;
                  a.Browser.mobileWebkit && s.removeChild(r),
                    a.DomUtil.setPosition(r, e),
                    r.setAttribute("width", n),
                    r.setAttribute("height", o),
                    r.setAttribute("viewBox", [e.x, e.y, n, o].join(" ")),
                    a.Browser.mobileWebkit && s.appendChild(r);
                }
              },
            }),
            a.Path.include({
              bindPopup: function (t, e) {
                return (
                  t instanceof a.Popup
                    ? (this._popup = t)
                    : ((this._popup && !e) ||
                        (this._popup = new a.Popup(e, this)),
                      this._popup.setContent(t)),
                  this._popupHandlersAdded ||
                    (this.on("click", this._openPopup, this).on(
                      "remove",
                      this.closePopup,
                      this
                    ),
                    (this._popupHandlersAdded = !0)),
                  this
                );
              },
              unbindPopup: function () {
                return (
                  this._popup &&
                    ((this._popup = null),
                    this.off("click", this._openPopup).off(
                      "remove",
                      this.closePopup
                    ),
                    (this._popupHandlersAdded = !1)),
                  this
                );
              },
              openPopup: function (t) {
                return (
                  this._popup &&
                    ((t =
                      t ||
                      this._latlng ||
                      this._latlngs[Math.floor(this._latlngs.length / 2)]),
                    this._openPopup({ latlng: t })),
                  this
                );
              },
              closePopup: function () {
                return this._popup && this._popup._close(), this;
              },
              _openPopup: function (t) {
                this._popup.setLatLng(t.latlng),
                  this._map.openPopup(this._popup);
              },
            }),
            (a.Browser.vml =
              !a.Browser.svg &&
              (function () {
                try {
                  var t = i.createElement("div");
                  t.innerHTML = '<v:shape adj="1"/>';
                  var e = t.firstChild;
                  return (
                    (e.style.behavior = "url(#default#VML)"),
                    e && "object" == typeof e.adj
                  );
                } catch (t) {
                  return !1;
                }
              })()),
            (a.Path =
              a.Browser.svg || !a.Browser.vml
                ? a.Path
                : a.Path.extend({
                    statics: { VML: !0, CLIP_PADDING: 0.02 },
                    _createElement: (function () {
                      try {
                        return (
                          i.namespaces.add(
                            "lvml",
                            "urn:schemas-microsoft-com:vml"
                          ),
                          function (t) {
                            return i.createElement(
                              "<lvml:" + t + ' class="lvml">'
                            );
                          }
                        );
                      } catch (t) {
                        return function (t) {
                          return i.createElement(
                            "<" +
                              t +
                              ' xmlns="urn:schemas-microsoft.com:vml" class="lvml">'
                          );
                        };
                      }
                    })(),
                    _initPath: function () {
                      var t = (this._container = this._createElement("shape"));
                      a.DomUtil.addClass(
                        t,
                        "leaflet-vml-shape" +
                          (this.options.className
                            ? " " + this.options.className
                            : "")
                      ),
                        this.options.clickable &&
                          a.DomUtil.addClass(t, "leaflet-clickable"),
                        (t.coordsize = "1 1"),
                        (this._path = this._createElement("path")),
                        t.appendChild(this._path),
                        this._map._pathRoot.appendChild(t);
                    },
                    _initStyle: function () {
                      this._updateStyle();
                    },
                    _updateStyle: function () {
                      var t = this._stroke,
                        e = this._fill,
                        i = this.options,
                        n = this._container;
                      (n.stroked = i.stroke),
                        (n.filled = i.fill),
                        i.stroke
                          ? (t ||
                              ((t = this._stroke =
                                this._createElement("stroke")),
                              (t.endcap = "round"),
                              n.appendChild(t)),
                            (t.weight = i.weight + "px"),
                            (t.color = i.color),
                            (t.opacity = i.opacity),
                            i.dashArray
                              ? (t.dashStyle = a.Util.isArray(i.dashArray)
                                  ? i.dashArray.join(" ")
                                  : i.dashArray.replace(/( *, *)/g, " "))
                              : (t.dashStyle = ""),
                            i.lineCap &&
                              (t.endcap = i.lineCap.replace("butt", "flat")),
                            i.lineJoin && (t.joinstyle = i.lineJoin))
                          : t && (n.removeChild(t), (this._stroke = null)),
                        i.fill
                          ? (e ||
                              ((e = this._fill = this._createElement("fill")),
                              n.appendChild(e)),
                            (e.color = i.fillColor || i.color),
                            (e.opacity = i.fillOpacity))
                          : e && (n.removeChild(e), (this._fill = null));
                    },
                    _updatePath: function () {
                      var t = this._container.style;
                      (t.display = "none"),
                        (this._path.v = this.getPathString() + " "),
                        (t.display = "");
                    },
                  })),
            a.Map.include(
              a.Browser.svg || !a.Browser.vml
                ? {}
                : {
                    _initPathRoot: function () {
                      if (!this._pathRoot) {
                        var t = (this._pathRoot = i.createElement("div"));
                        (t.className = "leaflet-vml-container"),
                          this._panes.overlayPane.appendChild(t),
                          this.on("moveend", this._updatePathViewport),
                          this._updatePathViewport();
                      }
                    },
                  }
            ),
            (a.Browser.canvas = (function () {
              return !!i.createElement("canvas").getContext;
            })()),
            (a.Path =
              (a.Path.SVG && !t.L_PREFER_CANVAS) || !a.Browser.canvas
                ? a.Path
                : a.Path.extend({
                    statics: { CANVAS: !0, SVG: !1 },
                    redraw: function () {
                      return (
                        this._map &&
                          (this.projectLatlngs(), this._requestUpdate()),
                        this
                      );
                    },
                    setStyle: function (t) {
                      return (
                        a.setOptions(this, t),
                        this._map &&
                          (this._updateStyle(), this._requestUpdate()),
                        this
                      );
                    },
                    onRemove: function (t) {
                      t
                        .off("viewreset", this.projectLatlngs, this)
                        .off("moveend", this._updatePath, this),
                        this.options.clickable &&
                          (this._map.off("click", this._onClick, this),
                          this._map.off("mousemove", this._onMouseMove, this)),
                        this._requestUpdate(),
                        this.fire("remove"),
                        (this._map = null);
                    },
                    _requestUpdate: function () {
                      this._map &&
                        !a.Path._updateRequest &&
                        (a.Path._updateRequest = a.Util.requestAnimFrame(
                          this._fireMapMoveEnd,
                          this._map
                        ));
                    },
                    _fireMapMoveEnd: function () {
                      (a.Path._updateRequest = null), this.fire("moveend");
                    },
                    _initElements: function () {
                      this._map._initPathRoot(),
                        (this._ctx = this._map._canvasCtx);
                    },
                    _updateStyle: function () {
                      var t = this.options;
                      t.stroke &&
                        ((this._ctx.lineWidth = t.weight),
                        (this._ctx.strokeStyle = t.color)),
                        t.fill &&
                          (this._ctx.fillStyle = t.fillColor || t.color),
                        t.lineCap && (this._ctx.lineCap = t.lineCap),
                        t.lineJoin && (this._ctx.lineJoin = t.lineJoin);
                    },
                    _drawPath: function () {
                      var t, e, i, n, o, r;
                      for (
                        this._ctx.beginPath(), t = 0, i = this._parts.length;
                        t < i;
                        t++
                      ) {
                        for (e = 0, n = this._parts[t].length; e < n; e++)
                          (o = this._parts[t][e]),
                            (r = (0 === e ? "move" : "line") + "To"),
                            this._ctx[r](o.x, o.y);
                        this instanceof a.Polygon && this._ctx.closePath();
                      }
                    },
                    _checkIfEmpty: function () {
                      return !this._parts.length;
                    },
                    _updatePath: function () {
                      if (!this._checkIfEmpty()) {
                        var t = this._ctx,
                          e = this.options;
                        this._drawPath(),
                          t.save(),
                          this._updateStyle(),
                          e.fill &&
                            ((t.globalAlpha = e.fillOpacity),
                            t.fill(e.fillRule || "evenodd")),
                          e.stroke && ((t.globalAlpha = e.opacity), t.stroke()),
                          t.restore();
                      }
                    },
                    _initEvents: function () {
                      this.options.clickable &&
                        (this._map.on("mousemove", this._onMouseMove, this),
                        this._map.on(
                          "click dblclick contextmenu",
                          this._fireMouseEvent,
                          this
                        ));
                    },
                    _fireMouseEvent: function (t) {
                      this._containsPoint(t.layerPoint) && this.fire(t.type, t);
                    },
                    _onMouseMove: function (t) {
                      this._map &&
                        !this._map._animatingZoom &&
                        (this._containsPoint(t.layerPoint)
                          ? ((this._ctx.canvas.style.cursor = "pointer"),
                            (this._mouseInside = !0),
                            this.fire("mouseover", t))
                          : this._mouseInside &&
                            ((this._ctx.canvas.style.cursor = ""),
                            (this._mouseInside = !1),
                            this.fire("mouseout", t)));
                    },
                  })),
            a.Map.include(
              (a.Path.SVG && !t.L_PREFER_CANVAS) || !a.Browser.canvas
                ? {}
                : {
                    _initPathRoot: function () {
                      var t,
                        e = this._pathRoot;
                      e ||
                        ((e = this._pathRoot = i.createElement("canvas")),
                        (e.style.position = "absolute"),
                        (t = this._canvasCtx = e.getContext("2d")),
                        (t.lineCap = "round"),
                        (t.lineJoin = "round"),
                        this._panes.overlayPane.appendChild(e),
                        this.options.zoomAnimation &&
                          ((this._pathRoot.className = "leaflet-zoom-animated"),
                          this.on("zoomanim", this._animatePathZoom),
                          this.on("zoomend", this._endPathZoom)),
                        this.on("moveend", this._updateCanvasViewport),
                        this._updateCanvasViewport());
                    },
                    _updateCanvasViewport: function () {
                      if (!this._pathZooming) {
                        this._updatePathViewport();
                        var t = this._pathViewport,
                          e = t.min,
                          i = t.max.subtract(e),
                          n = this._pathRoot;
                        a.DomUtil.setPosition(n, e),
                          (n.width = i.x),
                          (n.height = i.y),
                          n.getContext("2d").translate(-e.x, -e.y);
                      }
                    },
                  }
            ),
            (a.LineUtil = {
              simplify: function (t, e) {
                if (!e || !t.length) return t.slice();
                var i = e * e;
                return (
                  (t = this._reducePoints(t, i)), (t = this._simplifyDP(t, i))
                );
              },
              pointToSegmentDistance: function (t, e, i) {
                return Math.sqrt(this._sqClosestPointOnSegment(t, e, i, !0));
              },
              closestPointOnSegment: function (t, e, i) {
                return this._sqClosestPointOnSegment(t, e, i);
              },
              _simplifyDP: function (t, e) {
                var i = t.length,
                  n = typeof Uint8Array != void 0 + "" ? Uint8Array : Array,
                  o = new n(i);
                (o[0] = o[i - 1] = 1), this._simplifyDPStep(t, o, e, 0, i - 1);
                var a,
                  r = [];
                for (a = 0; a < i; a++) o[a] && r.push(t[a]);
                return r;
              },
              _simplifyDPStep: function (t, e, i, n, o) {
                var a,
                  r,
                  s,
                  l = 0;
                for (r = n + 1; r <= o - 1; r++)
                  (s = this._sqClosestPointOnSegment(t[r], t[n], t[o], !0)) >
                    l && ((a = r), (l = s));
                l > i &&
                  ((e[a] = 1),
                  this._simplifyDPStep(t, e, i, n, a),
                  this._simplifyDPStep(t, e, i, a, o));
              },
              _reducePoints: function (t, e) {
                for (var i = [t[0]], n = 1, o = 0, a = t.length; n < a; n++)
                  this._sqDist(t[n], t[o]) > e && (i.push(t[n]), (o = n));
                return o < a - 1 && i.push(t[a - 1]), i;
              },
              clipSegment: function (t, e, i, n) {
                var o,
                  a,
                  r,
                  s = n ? this._lastCode : this._getBitCode(t, i),
                  l = this._getBitCode(e, i);
                for (this._lastCode = l; ; ) {
                  if (!(s | l)) return [t, e];
                  if (s & l) return !1;
                  (o = s || l),
                    (a = this._getEdgeIntersection(t, e, o, i)),
                    (r = this._getBitCode(a, i)),
                    o === s ? ((t = a), (s = r)) : ((e = a), (l = r));
                }
              },
              _getEdgeIntersection: function (t, e, i, n) {
                var o = e.x - t.x,
                  r = e.y - t.y,
                  s = n.min,
                  l = n.max;
                return 8 & i
                  ? new a.Point(t.x + (o * (l.y - t.y)) / r, l.y)
                  : 4 & i
                  ? new a.Point(t.x + (o * (s.y - t.y)) / r, s.y)
                  : 2 & i
                  ? new a.Point(l.x, t.y + (r * (l.x - t.x)) / o)
                  : 1 & i
                  ? new a.Point(s.x, t.y + (r * (s.x - t.x)) / o)
                  : void 0;
              },
              _getBitCode: function (t, e) {
                var i = 0;
                return (
                  t.x < e.min.x ? (i |= 1) : t.x > e.max.x && (i |= 2),
                  t.y < e.min.y ? (i |= 4) : t.y > e.max.y && (i |= 8),
                  i
                );
              },
              _sqDist: function (t, e) {
                var i = e.x - t.x,
                  n = e.y - t.y;
                return i * i + n * n;
              },
              _sqClosestPointOnSegment: function (t, e, i, n) {
                var o,
                  r = e.x,
                  s = e.y,
                  l = i.x - r,
                  h = i.y - s,
                  u = l * l + h * h;
                return (
                  u > 0 &&
                    ((o = ((t.x - r) * l + (t.y - s) * h) / u),
                    o > 1
                      ? ((r = i.x), (s = i.y))
                      : o > 0 && ((r += l * o), (s += h * o))),
                  (l = t.x - r),
                  (h = t.y - s),
                  n ? l * l + h * h : new a.Point(r, s)
                );
              },
            }),
            (a.Polyline = a.Path.extend({
              initialize: function (t, e) {
                a.Path.prototype.initialize.call(this, e),
                  (this._latlngs = this._convertLatLngs(t));
              },
              options: { smoothFactor: 1, noClip: !1 },
              projectLatlngs: function () {
                this._originalPoints = [];
                for (var t = 0, e = this._latlngs.length; t < e; t++)
                  this._originalPoints[t] = this._map.latLngToLayerPoint(
                    this._latlngs[t]
                  );
              },
              getPathString: function () {
                for (var t = 0, e = this._parts.length, i = ""; t < e; t++)
                  i += this._getPathPartStr(this._parts[t]);
                return i;
              },
              getLatLngs: function () {
                return this._latlngs;
              },
              setLatLngs: function (t) {
                return (this._latlngs = this._convertLatLngs(t)), this.redraw();
              },
              addLatLng: function (t) {
                return this._latlngs.push(a.latLng(t)), this.redraw();
              },
              spliceLatLngs: function () {
                var t = [].splice.apply(this._latlngs, arguments);
                return (
                  this._convertLatLngs(this._latlngs, !0), this.redraw(), t
                );
              },
              closestLayerPoint: function (t) {
                for (
                  var e,
                    i,
                    n = 1 / 0,
                    o = this._parts,
                    r = null,
                    s = 0,
                    l = o.length;
                  s < l;
                  s++
                )
                  for (var h = o[s], u = 1, c = h.length; u < c; u++) {
                    (e = h[u - 1]), (i = h[u]);
                    var p = a.LineUtil._sqClosestPointOnSegment(t, e, i, !0);
                    p < n &&
                      ((n = p),
                      (r = a.LineUtil._sqClosestPointOnSegment(t, e, i)));
                  }
                return r && (r.distance = Math.sqrt(n)), r;
              },
              getBounds: function () {
                return new a.LatLngBounds(this.getLatLngs());
              },
              _convertLatLngs: function (t, e) {
                var i,
                  n,
                  o = e ? t : [];
                for (i = 0, n = t.length; i < n; i++) {
                  if (a.Util.isArray(t[i]) && "number" != typeof t[i][0])
                    return;
                  o[i] = a.latLng(t[i]);
                }
                return o;
              },
              _initEvents: function () {
                a.Path.prototype._initEvents.call(this);
              },
              _getPathPartStr: function (t) {
                for (
                  var e, i = a.Path.VML, n = 0, o = t.length, r = "";
                  n < o;
                  n++
                )
                  (e = t[n]),
                    i && e._round(),
                    (r += (n ? "L" : "M") + e.x + " " + e.y);
                return r;
              },
              _clipPoints: function () {
                var t,
                  e,
                  i,
                  n = this._originalPoints,
                  o = n.length;
                if (this.options.noClip) return void (this._parts = [n]);
                this._parts = [];
                var r = this._parts,
                  s = this._map._pathViewport,
                  l = a.LineUtil;
                for (t = 0, e = 0; t < o - 1; t++)
                  (i = l.clipSegment(n[t], n[t + 1], s, t)) &&
                    ((r[e] = r[e] || []),
                    r[e].push(i[0]),
                    (i[1] === n[t + 1] && t !== o - 2) ||
                      (r[e].push(i[1]), e++));
              },
              _simplifyPoints: function () {
                for (
                  var t = this._parts, e = a.LineUtil, i = 0, n = t.length;
                  i < n;
                  i++
                )
                  t[i] = e.simplify(t[i], this.options.smoothFactor);
              },
              _updatePath: function () {
                this._map &&
                  (this._clipPoints(),
                  this._simplifyPoints(),
                  a.Path.prototype._updatePath.call(this));
              },
            })),
            (a.polyline = function (t, e) {
              return new a.Polyline(t, e);
            }),
            (a.PolyUtil = {}),
            (a.PolyUtil.clipPolygon = function (t, e) {
              var i,
                n,
                o,
                r,
                s,
                l,
                h,
                u,
                c,
                p = [1, 4, 2, 8],
                d = a.LineUtil;
              for (n = 0, h = t.length; n < h; n++)
                t[n]._code = d._getBitCode(t[n], e);
              for (r = 0; r < 4; r++) {
                for (
                  u = p[r], i = [], n = 0, h = t.length, o = h - 1;
                  n < h;
                  o = n++
                )
                  (s = t[n]),
                    (l = t[o]),
                    s._code & u
                      ? l._code & u ||
                        ((c = d._getEdgeIntersection(l, s, u, e)),
                        (c._code = d._getBitCode(c, e)),
                        i.push(c))
                      : (l._code & u &&
                          ((c = d._getEdgeIntersection(l, s, u, e)),
                          (c._code = d._getBitCode(c, e)),
                          i.push(c)),
                        i.push(s));
                t = i;
              }
              return t;
            }),
            (a.Polygon = a.Polyline.extend({
              options: { fill: !0 },
              initialize: function (t, e) {
                a.Polyline.prototype.initialize.call(this, t, e),
                  this._initWithHoles(t);
              },
              _initWithHoles: function (t) {
                var e, i, n;
                if (t && a.Util.isArray(t[0]) && "number" != typeof t[0][0])
                  for (
                    this._latlngs = this._convertLatLngs(t[0]),
                      this._holes = t.slice(1),
                      e = 0,
                      i = this._holes.length;
                    e < i;
                    e++
                  )
                    (n = this._holes[e] = this._convertLatLngs(this._holes[e])),
                      n[0].equals(n[n.length - 1]) && n.pop();
                (t = this._latlngs),
                  t.length >= 2 && t[0].equals(t[t.length - 1]) && t.pop();
              },
              projectLatlngs: function () {
                if (
                  (a.Polyline.prototype.projectLatlngs.call(this),
                  (this._holePoints = []),
                  this._holes)
                ) {
                  var t, e, i, n;
                  for (t = 0, i = this._holes.length; t < i; t++)
                    for (
                      this._holePoints[t] = [],
                        e = 0,
                        n = this._holes[t].length;
                      e < n;
                      e++
                    )
                      this._holePoints[t][e] = this._map.latLngToLayerPoint(
                        this._holes[t][e]
                      );
                }
              },
              setLatLngs: function (t) {
                return t && a.Util.isArray(t[0]) && "number" != typeof t[0][0]
                  ? (this._initWithHoles(t), this.redraw())
                  : a.Polyline.prototype.setLatLngs.call(this, t);
              },
              _clipPoints: function () {
                var t = this._originalPoints,
                  e = [];
                if (
                  ((this._parts = [t].concat(this._holePoints)),
                  !this.options.noClip)
                ) {
                  for (var i = 0, n = this._parts.length; i < n; i++) {
                    var o = a.PolyUtil.clipPolygon(
                      this._parts[i],
                      this._map._pathViewport
                    );
                    o.length && e.push(o);
                  }
                  this._parts = e;
                }
              },
              _getPathPartStr: function (t) {
                return (
                  a.Polyline.prototype._getPathPartStr.call(this, t) +
                  (a.Browser.svg ? "z" : "x")
                );
              },
            })),
            (a.polygon = function (t, e) {
              return new a.Polygon(t, e);
            }),
            (function () {
              function t(t) {
                return a.FeatureGroup.extend({
                  initialize: function (t, e) {
                    (this._layers = {}),
                      (this._options = e),
                      this.setLatLngs(t);
                  },
                  setLatLngs: function (e) {
                    var i = 0,
                      n = e.length;
                    for (
                      this.eachLayer(function (t) {
                        i < n ? t.setLatLngs(e[i++]) : this.removeLayer(t);
                      }, this);
                      i < n;

                    )
                      this.addLayer(new t(e[i++], this._options));
                    return this;
                  },
                  getLatLngs: function () {
                    var t = [];
                    return (
                      this.eachLayer(function (e) {
                        t.push(e.getLatLngs());
                      }),
                      t
                    );
                  },
                });
              }
              (a.MultiPolyline = t(a.Polyline)),
                (a.MultiPolygon = t(a.Polygon)),
                (a.multiPolyline = function (t, e) {
                  return new a.MultiPolyline(t, e);
                }),
                (a.multiPolygon = function (t, e) {
                  return new a.MultiPolygon(t, e);
                });
            })(),
            (a.Rectangle = a.Polygon.extend({
              initialize: function (t, e) {
                a.Polygon.prototype.initialize.call(
                  this,
                  this._boundsToLatLngs(t),
                  e
                );
              },
              setBounds: function (t) {
                this.setLatLngs(this._boundsToLatLngs(t));
              },
              _boundsToLatLngs: function (t) {
                return (
                  (t = a.latLngBounds(t)),
                  [
                    t.getSouthWest(),
                    t.getNorthWest(),
                    t.getNorthEast(),
                    t.getSouthEast(),
                  ]
                );
              },
            })),
            (a.rectangle = function (t, e) {
              return new a.Rectangle(t, e);
            }),
            (a.Circle = a.Path.extend({
              initialize: function (t, e, i) {
                a.Path.prototype.initialize.call(this, i),
                  (this._latlng = a.latLng(t)),
                  (this._mRadius = e);
              },
              options: { fill: !0 },
              setLatLng: function (t) {
                return (this._latlng = a.latLng(t)), this.redraw();
              },
              setRadius: function (t) {
                return (this._mRadius = t), this.redraw();
              },
              projectLatlngs: function () {
                var t = this._getLngRadius(),
                  e = this._latlng,
                  i = this._map.latLngToLayerPoint([e.lat, e.lng - t]);
                (this._point = this._map.latLngToLayerPoint(e)),
                  (this._radius = Math.max(this._point.x - i.x, 1));
              },
              getBounds: function () {
                var t = this._getLngRadius(),
                  e = (this._mRadius / 40075017) * 360,
                  i = this._latlng;
                return new a.LatLngBounds(
                  [i.lat - e, i.lng - t],
                  [i.lat + e, i.lng + t]
                );
              },
              getLatLng: function () {
                return this._latlng;
              },
              getPathString: function () {
                var t = this._point,
                  e = this._radius;
                return this._checkIfEmpty()
                  ? ""
                  : a.Browser.svg
                  ? "M" +
                    t.x +
                    "," +
                    (t.y - e) +
                    "A" +
                    e +
                    "," +
                    e +
                    ",0,1,1," +
                    (t.x - 0.1) +
                    "," +
                    (t.y - e) +
                    " z"
                  : (t._round(),
                    (e = Math.round(e)),
                    "AL " +
                      t.x +
                      "," +
                      t.y +
                      " " +
                      e +
                      "," +
                      e +
                      " 0,23592600");
              },
              getRadius: function () {
                return this._mRadius;
              },
              _getLatRadius: function () {
                return (this._mRadius / 40075017) * 360;
              },
              _getLngRadius: function () {
                return (
                  this._getLatRadius() /
                  Math.cos(a.LatLng.DEG_TO_RAD * this._latlng.lat)
                );
              },
              _checkIfEmpty: function () {
                if (!this._map) return !1;
                var t = this._map._pathViewport,
                  e = this._radius,
                  i = this._point;
                return (
                  i.x - e > t.max.x ||
                  i.y - e > t.max.y ||
                  i.x + e < t.min.x ||
                  i.y + e < t.min.y
                );
              },
            })),
            (a.circle = function (t, e, i) {
              return new a.Circle(t, e, i);
            }),
            (a.CircleMarker = a.Circle.extend({
              options: { radius: 10, weight: 2 },
              initialize: function (t, e) {
                a.Circle.prototype.initialize.call(this, t, null, e),
                  (this._radius = this.options.radius);
              },
              projectLatlngs: function () {
                this._point = this._map.latLngToLayerPoint(this._latlng);
              },
              _updateStyle: function () {
                a.Circle.prototype._updateStyle.call(this),
                  this.setRadius(this.options.radius);
              },
              setLatLng: function (t) {
                return (
                  a.Circle.prototype.setLatLng.call(this, t),
                  this._popup &&
                    this._popup._isOpen &&
                    this._popup.setLatLng(t),
                  this
                );
              },
              setRadius: function (t) {
                return (this.options.radius = this._radius = t), this.redraw();
              },
              getRadius: function () {
                return this._radius;
              },
            })),
            (a.circleMarker = function (t, e) {
              return new a.CircleMarker(t, e);
            }),
            a.Polyline.include(
              a.Path.CANVAS
                ? {
                    _containsPoint: function (t, e) {
                      var i,
                        n,
                        o,
                        r,
                        s,
                        l,
                        h = this.options.weight / 2;
                      for (
                        a.Browser.touch && (h += 10),
                          i = 0,
                          r = this._parts.length;
                        i < r;
                        i++
                      )
                        for (
                          l = this._parts[i], n = 0, s = l.length, o = s - 1;
                          n < s;
                          o = n++
                        )
                          if (
                            (e || 0 !== n) &&
                            a.LineUtil.pointToSegmentDistance(t, l[o], l[n]) <=
                              h
                          )
                            return !0;
                      return !1;
                    },
                  }
                : {}
            ),
            a.Polygon.include(
              a.Path.CANVAS
                ? {
                    _containsPoint: function (t) {
                      var e,
                        i,
                        n,
                        o,
                        r,
                        s,
                        l,
                        h,
                        u = !1;
                      if (a.Polyline.prototype._containsPoint.call(this, t, !0))
                        return !0;
                      for (o = 0, l = this._parts.length; o < l; o++)
                        for (
                          e = this._parts[o], r = 0, h = e.length, s = h - 1;
                          r < h;
                          s = r++
                        )
                          (i = e[r]),
                            (n = e[s]),
                            i.y > t.y != n.y > t.y &&
                              t.x <
                                ((n.x - i.x) * (t.y - i.y)) / (n.y - i.y) +
                                  i.x &&
                              (u = !u);
                      return u;
                    },
                  }
                : {}
            ),
            a.Circle.include(
              a.Path.CANVAS
                ? {
                    _drawPath: function () {
                      var t = this._point;
                      this._ctx.beginPath(),
                        this._ctx.arc(
                          t.x,
                          t.y,
                          this._radius,
                          0,
                          2 * Math.PI,
                          !1
                        );
                    },
                    _containsPoint: function (t) {
                      var e = this._point,
                        i = this.options.stroke ? this.options.weight / 2 : 0;
                      return t.distanceTo(e) <= this._radius + i;
                    },
                  }
                : {}
            ),
            a.CircleMarker.include(
              a.Path.CANVAS
                ? {
                    _updateStyle: function () {
                      a.Path.prototype._updateStyle.call(this);
                    },
                  }
                : {}
            ),
            (a.GeoJSON = a.FeatureGroup.extend({
              initialize: function (t, e) {
                a.setOptions(this, e),
                  (this._layers = {}),
                  t && this.addData(t);
              },
              addData: function (t) {
                var e,
                  i,
                  n,
                  o = a.Util.isArray(t) ? t : t.features;
                if (o) {
                  for (e = 0, i = o.length; e < i; e++)
                    (n = o[e]),
                      (n.geometries ||
                        n.geometry ||
                        n.features ||
                        n.coordinates) &&
                        this.addData(o[e]);
                  return this;
                }
                var r = this.options;
                if (!r.filter || r.filter(t)) {
                  var s = a.GeoJSON.geometryToLayer(
                    t,
                    r.pointToLayer,
                    r.coordsToLatLng,
                    r
                  );
                  return (
                    (s.feature = a.GeoJSON.asFeature(t)),
                    (s.defaultOptions = s.options),
                    this.resetStyle(s),
                    r.onEachFeature && r.onEachFeature(t, s),
                    this.addLayer(s)
                  );
                }
              },
              resetStyle: function (t) {
                var e = this.options.style;
                e &&
                  (a.Util.extend(t.options, t.defaultOptions),
                  this._setLayerStyle(t, e));
              },
              setStyle: function (t) {
                this.eachLayer(function (e) {
                  this._setLayerStyle(e, t);
                }, this);
              },
              _setLayerStyle: function (t, e) {
                "function" == typeof e && (e = e(t.feature)),
                  t.setStyle && t.setStyle(e);
              },
            })),
            a.extend(a.GeoJSON, {
              geometryToLayer: function (t, e, i, n) {
                var o,
                  r,
                  s,
                  l,
                  h = "Feature" === t.type ? t.geometry : t,
                  u = h.coordinates,
                  c = [];
                switch (((i = i || this.coordsToLatLng), h.type)) {
                  case "Point":
                    return (o = i(u)), e ? e(t, o) : new a.Marker(o);
                  case "MultiPoint":
                    for (s = 0, l = u.length; s < l; s++)
                      (o = i(u[s])), c.push(e ? e(t, o) : new a.Marker(o));
                    return new a.FeatureGroup(c);
                  case "LineString":
                    return (
                      (r = this.coordsToLatLngs(u, 0, i)), new a.Polyline(r, n)
                    );
                  case "Polygon":
                    if (2 === u.length && !u[1].length)
                      throw new Error("Invalid GeoJSON object.");
                    return (
                      (r = this.coordsToLatLngs(u, 1, i)), new a.Polygon(r, n)
                    );
                  case "MultiLineString":
                    return (
                      (r = this.coordsToLatLngs(u, 1, i)),
                      new a.MultiPolyline(r, n)
                    );
                  case "MultiPolygon":
                    return (
                      (r = this.coordsToLatLngs(u, 2, i)),
                      new a.MultiPolygon(r, n)
                    );
                  case "GeometryCollection":
                    for (s = 0, l = h.geometries.length; s < l; s++)
                      c.push(
                        this.geometryToLayer(
                          {
                            geometry: h.geometries[s],
                            type: "Feature",
                            properties: t.properties,
                          },
                          e,
                          i,
                          n
                        )
                      );
                    return new a.FeatureGroup(c);
                  default:
                    throw new Error("Invalid GeoJSON object.");
                }
              },
              coordsToLatLng: function (t) {
                return new a.LatLng(t[1], t[0], t[2]);
              },
              coordsToLatLngs: function (t, e, i) {
                var n,
                  o,
                  a,
                  r = [];
                for (o = 0, a = t.length; o < a; o++)
                  (n = e
                    ? this.coordsToLatLngs(t[o], e - 1, i)
                    : (i || this.coordsToLatLng)(t[o])),
                    r.push(n);
                return r;
              },
              latLngToCoords: function (t) {
                var e = [t.lng, t.lat];
                return void 0 !== t.alt && e.push(t.alt), e;
              },
              latLngsToCoords: function (t) {
                for (var e = [], i = 0, n = t.length; i < n; i++)
                  e.push(a.GeoJSON.latLngToCoords(t[i]));
                return e;
              },
              getFeature: function (t, e) {
                return t.feature
                  ? a.extend({}, t.feature, { geometry: e })
                  : a.GeoJSON.asFeature(e);
              },
              asFeature: function (t) {
                return "Feature" === t.type
                  ? t
                  : { type: "Feature", properties: {}, geometry: t };
              },
            });
          var s = {
            toGeoJSON: function () {
              return a.GeoJSON.getFeature(this, {
                type: "Point",
                coordinates: a.GeoJSON.latLngToCoords(this.getLatLng()),
              });
            },
          };
          a.Marker.include(s),
            a.Circle.include(s),
            a.CircleMarker.include(s),
            a.Polyline.include({
              toGeoJSON: function () {
                return a.GeoJSON.getFeature(this, {
                  type: "LineString",
                  coordinates: a.GeoJSON.latLngsToCoords(this.getLatLngs()),
                });
              },
            }),
            a.Polygon.include({
              toGeoJSON: function () {
                var t,
                  e,
                  i,
                  n = [a.GeoJSON.latLngsToCoords(this.getLatLngs())];
                if ((n[0].push(n[0][0]), this._holes))
                  for (t = 0, e = this._holes.length; t < e; t++)
                    (i = a.GeoJSON.latLngsToCoords(this._holes[t])),
                      i.push(i[0]),
                      n.push(i);
                return a.GeoJSON.getFeature(this, {
                  type: "Polygon",
                  coordinates: n,
                });
              },
            }),
            (function () {
              function t(t) {
                return function () {
                  var e = [];
                  return (
                    this.eachLayer(function (t) {
                      e.push(t.toGeoJSON().geometry.coordinates);
                    }),
                    a.GeoJSON.getFeature(this, { type: t, coordinates: e })
                  );
                };
              }
              a.MultiPolyline.include({ toGeoJSON: t("MultiLineString") }),
                a.MultiPolygon.include({ toGeoJSON: t("MultiPolygon") }),
                a.LayerGroup.include({
                  toGeoJSON: function () {
                    var e,
                      i = this.feature && this.feature.geometry,
                      n = [];
                    if (i && "MultiPoint" === i.type)
                      return t("MultiPoint").call(this);
                    var o = i && "GeometryCollection" === i.type;
                    return (
                      this.eachLayer(function (t) {
                        t.toGeoJSON &&
                          ((e = t.toGeoJSON()),
                          n.push(o ? e.geometry : a.GeoJSON.asFeature(e)));
                      }),
                      o
                        ? a.GeoJSON.getFeature(this, {
                            geometries: n,
                            type: "GeometryCollection",
                          })
                        : { type: "FeatureCollection", features: n }
                    );
                  },
                });
            })(),
            (a.geoJson = function (t, e) {
              return new a.GeoJSON(t, e);
            }),
            (a.DomEvent = {
              addListener: function (t, e, i, n) {
                var o,
                  r,
                  s,
                  l = a.stamp(i),
                  h = "_leaflet_" + e + l;
                return t[h]
                  ? this
                  : ((o = function (e) {
                      return i.call(n || t, e || a.DomEvent._getEvent());
                    }),
                    a.Browser.pointer && 0 === e.indexOf("touch")
                      ? this.addPointerListener(t, e, o, l)
                      : (a.Browser.touch &&
                          "dblclick" === e &&
                          this.addDoubleTapListener &&
                          this.addDoubleTapListener(t, o, l),
                        "addEventListener" in t
                          ? "mousewheel" === e
                            ? (t.addEventListener("DOMMouseScroll", o, !1),
                              t.addEventListener(e, o, !1))
                            : "mouseenter" === e || "mouseleave" === e
                            ? ((r = o),
                              (s =
                                "mouseenter" === e ? "mouseover" : "mouseout"),
                              (o = function (e) {
                                if (a.DomEvent._checkMouse(t, e)) return r(e);
                              }),
                              t.addEventListener(s, o, !1))
                            : "click" === e && a.Browser.android
                            ? ((r = o),
                              (o = function (t) {
                                return a.DomEvent._filterClick(t, r);
                              }),
                              t.addEventListener(e, o, !1))
                            : t.addEventListener(e, o, !1)
                          : "attachEvent" in t && t.attachEvent("on" + e, o),
                        (t[h] = o),
                        this));
              },
              removeListener: function (t, e, i) {
                var n = a.stamp(i),
                  o = "_leaflet_" + e + n,
                  r = t[o];
                return r
                  ? (a.Browser.pointer && 0 === e.indexOf("touch")
                      ? this.removePointerListener(t, e, n)
                      : a.Browser.touch &&
                        "dblclick" === e &&
                        this.removeDoubleTapListener
                      ? this.removeDoubleTapListener(t, n)
                      : "removeEventListener" in t
                      ? "mousewheel" === e
                        ? (t.removeEventListener("DOMMouseScroll", r, !1),
                          t.removeEventListener(e, r, !1))
                        : "mouseenter" === e || "mouseleave" === e
                        ? t.removeEventListener(
                            "mouseenter" === e ? "mouseover" : "mouseout",
                            r,
                            !1
                          )
                        : t.removeEventListener(e, r, !1)
                      : "detachEvent" in t && t.detachEvent("on" + e, r),
                    (t[o] = null),
                    this)
                  : this;
              },
              stopPropagation: function (t) {
                return (
                  t.stopPropagation
                    ? t.stopPropagation()
                    : (t.cancelBubble = !0),
                  a.DomEvent._skipped(t),
                  this
                );
              },
              disableScrollPropagation: function (t) {
                var e = a.DomEvent.stopPropagation;
                return a.DomEvent.on(t, "mousewheel", e).on(
                  t,
                  "MozMousePixelScroll",
                  e
                );
              },
              disableClickPropagation: function (t) {
                for (
                  var e = a.DomEvent.stopPropagation,
                    i = a.Draggable.START.length - 1;
                  i >= 0;
                  i--
                )
                  a.DomEvent.on(t, a.Draggable.START[i], e);
                return a.DomEvent.on(t, "click", a.DomEvent._fakeStop).on(
                  t,
                  "dblclick",
                  e
                );
              },
              preventDefault: function (t) {
                return (
                  t.preventDefault ? t.preventDefault() : (t.returnValue = !1),
                  this
                );
              },
              stop: function (t) {
                return a.DomEvent.preventDefault(t).stopPropagation(t);
              },
              getMousePosition: function (t, e) {
                if (!e) return new a.Point(t.clientX, t.clientY);
                var i = e.getBoundingClientRect();
                return new a.Point(
                  t.clientX - i.left - e.clientLeft,
                  t.clientY - i.top - e.clientTop
                );
              },
              getWheelDelta: function (t) {
                var e = 0;
                return (
                  t.wheelDelta && (e = t.wheelDelta / 120),
                  t.detail && (e = -t.detail / 3),
                  e
                );
              },
              _skipEvents: {},
              _fakeStop: function (t) {
                a.DomEvent._skipEvents[t.type] = !0;
              },
              _skipped: function (t) {
                var e = this._skipEvents[t.type];
                return (this._skipEvents[t.type] = !1), e;
              },
              _checkMouse: function (t, e) {
                var i = e.relatedTarget;
                if (!i) return !0;
                try {
                  for (; i && i !== t; ) i = i.parentNode;
                } catch (t) {
                  return !1;
                }
                return i !== t;
              },
              _getEvent: function () {
                var e = t.event;
                if (!e)
                  for (
                    var i = arguments.callee.caller;
                    i && (!(e = i.arguments[0]) || t.Event !== e.constructor);

                  )
                    i = i.caller;
                return e;
              },
              _filterClick: function (t, e) {
                var i = t.timeStamp || t.originalEvent.timeStamp,
                  n = a.DomEvent._lastClick && i - a.DomEvent._lastClick;
                return (n && n > 100 && n < 500) ||
                  (t.target._simulatedClick && !t._simulated)
                  ? void a.DomEvent.stop(t)
                  : ((a.DomEvent._lastClick = i), e(t));
              },
            }),
            (a.DomEvent.on = a.DomEvent.addListener),
            (a.DomEvent.off = a.DomEvent.removeListener),
            (a.Draggable = a.Class.extend({
              includes: a.Mixin.Events,
              statics: {
                START: a.Browser.touch
                  ? ["touchstart", "mousedown"]
                  : ["mousedown"],
                END: {
                  mousedown: "mouseup",
                  touchstart: "touchend",
                  pointerdown: "touchend",
                  MSPointerDown: "touchend",
                },
                MOVE: {
                  mousedown: "mousemove",
                  touchstart: "touchmove",
                  pointerdown: "touchmove",
                  MSPointerDown: "touchmove",
                },
              },
              initialize: function (t, e) {
                (this._element = t), (this._dragStartTarget = e || t);
              },
              enable: function () {
                if (!this._enabled) {
                  for (var t = a.Draggable.START.length - 1; t >= 0; t--)
                    a.DomEvent.on(
                      this._dragStartTarget,
                      a.Draggable.START[t],
                      this._onDown,
                      this
                    );
                  this._enabled = !0;
                }
              },
              disable: function () {
                if (this._enabled) {
                  for (var t = a.Draggable.START.length - 1; t >= 0; t--)
                    a.DomEvent.off(
                      this._dragStartTarget,
                      a.Draggable.START[t],
                      this._onDown,
                      this
                    );
                  (this._enabled = !1), (this._moved = !1);
                }
              },
              _onDown: function (t) {
                if (
                  ((this._moved = !1),
                  !t.shiftKey &&
                    (1 === t.which || 1 === t.button || t.touches) &&
                    (a.DomEvent.stopPropagation(t),
                    !a.Draggable._disabled &&
                      (a.DomUtil.disableImageDrag(),
                      a.DomUtil.disableTextSelection(),
                      !this._moving)))
                ) {
                  var e = t.touches ? t.touches[0] : t;
                  (this._startPoint = new a.Point(e.clientX, e.clientY)),
                    (this._startPos = this._newPos =
                      a.DomUtil.getPosition(this._element)),
                    a.DomEvent.on(
                      i,
                      a.Draggable.MOVE[t.type],
                      this._onMove,
                      this
                    ).on(i, a.Draggable.END[t.type], this._onUp, this);
                }
              },
              _onMove: function (t) {
                if (t.touches && t.touches.length > 1)
                  return void (this._moved = !0);
                var e = t.touches && 1 === t.touches.length ? t.touches[0] : t,
                  n = new a.Point(e.clientX, e.clientY),
                  o = n.subtract(this._startPoint);
                (o.x || o.y) &&
                  ((a.Browser.touch && Math.abs(o.x) + Math.abs(o.y) < 3) ||
                    (a.DomEvent.preventDefault(t),
                    this._moved ||
                      (this.fire("dragstart"),
                      (this._moved = !0),
                      (this._startPos = a.DomUtil.getPosition(
                        this._element
                      ).subtract(o)),
                      a.DomUtil.addClass(i.body, "leaflet-dragging"),
                      (this._lastTarget = t.target || t.srcElement),
                      a.DomUtil.addClass(
                        this._lastTarget,
                        "leaflet-drag-target"
                      )),
                    (this._newPos = this._startPos.add(o)),
                    (this._moving = !0),
                    a.Util.cancelAnimFrame(this._animRequest),
                    (this._animRequest = a.Util.requestAnimFrame(
                      this._updatePosition,
                      this,
                      !0,
                      this._dragStartTarget
                    ))));
              },
              _updatePosition: function () {
                this.fire("predrag"),
                  a.DomUtil.setPosition(this._element, this._newPos),
                  this.fire("drag");
              },
              _onUp: function () {
                a.DomUtil.removeClass(i.body, "leaflet-dragging"),
                  this._lastTarget &&
                    (a.DomUtil.removeClass(
                      this._lastTarget,
                      "leaflet-drag-target"
                    ),
                    (this._lastTarget = null));
                for (var t in a.Draggable.MOVE)
                  a.DomEvent.off(i, a.Draggable.MOVE[t], this._onMove).off(
                    i,
                    a.Draggable.END[t],
                    this._onUp
                  );
                a.DomUtil.enableImageDrag(),
                  a.DomUtil.enableTextSelection(),
                  this._moved &&
                    this._moving &&
                    (a.Util.cancelAnimFrame(this._animRequest),
                    this.fire("dragend", {
                      distance: this._newPos.distanceTo(this._startPos),
                    })),
                  (this._moving = !1);
              },
            })),
            (a.Handler = a.Class.extend({
              initialize: function (t) {
                this._map = t;
              },
              enable: function () {
                this._enabled || ((this._enabled = !0), this.addHooks());
              },
              disable: function () {
                this._enabled && ((this._enabled = !1), this.removeHooks());
              },
              enabled: function () {
                return !!this._enabled;
              },
            })),
            a.Map.mergeOptions({
              dragging: !0,
              inertia: !a.Browser.android23,
              inertiaDeceleration: 3400,
              inertiaMaxSpeed: 1 / 0,
              inertiaThreshold: a.Browser.touch ? 32 : 18,
              easeLinearity: 0.25,
              worldCopyJump: !1,
            }),
            (a.Map.Drag = a.Handler.extend({
              addHooks: function () {
                if (!this._draggable) {
                  var t = this._map;
                  (this._draggable = new a.Draggable(t._mapPane, t._container)),
                    this._draggable.on(
                      {
                        dragstart: this._onDragStart,
                        drag: this._onDrag,
                        dragend: this._onDragEnd,
                      },
                      this
                    ),
                    t.options.worldCopyJump &&
                      (this._draggable.on("predrag", this._onPreDrag, this),
                      t.on("viewreset", this._onViewReset, this),
                      t.whenReady(this._onViewReset, this));
                }
                this._draggable.enable();
              },
              removeHooks: function () {
                this._draggable.disable();
              },
              moved: function () {
                return this._draggable && this._draggable._moved;
              },
              _onDragStart: function () {
                var t = this._map;
                t._panAnim && t._panAnim.stop(),
                  t.fire("movestart").fire("dragstart"),
                  t.options.inertia &&
                    ((this._positions = []), (this._times = []));
              },
              _onDrag: function () {
                if (this._map.options.inertia) {
                  var t = (this._lastTime = +new Date()),
                    e = (this._lastPos = this._draggable._newPos);
                  this._positions.push(e),
                    this._times.push(t),
                    t - this._times[0] > 200 &&
                      (this._positions.shift(), this._times.shift());
                }
                this._map.fire("move").fire("drag");
              },
              _onViewReset: function () {
                var t = this._map.getSize()._divideBy(2),
                  e = this._map.latLngToLayerPoint([0, 0]);
                (this._initialWorldOffset = e.subtract(t).x),
                  (this._worldWidth = this._map.project([0, 180]).x);
              },
              _onPreDrag: function () {
                var t = this._worldWidth,
                  e = Math.round(t / 2),
                  i = this._initialWorldOffset,
                  n = this._draggable._newPos.x,
                  o = ((n - e + i) % t) + e - i,
                  a = ((n + e + i) % t) - e - i,
                  r = Math.abs(o + i) < Math.abs(a + i) ? o : a;
                this._draggable._newPos.x = r;
              },
              _onDragEnd: function (t) {
                var e = this._map,
                  i = e.options,
                  n = +new Date() - this._lastTime,
                  o =
                    !i.inertia || n > i.inertiaThreshold || !this._positions[0];
                if ((e.fire("dragend", t), o)) e.fire("moveend");
                else {
                  var r = this._lastPos.subtract(this._positions[0]),
                    s = (this._lastTime + n - this._times[0]) / 1e3,
                    l = i.easeLinearity,
                    h = r.multiplyBy(l / s),
                    u = h.distanceTo([0, 0]),
                    c = Math.min(i.inertiaMaxSpeed, u),
                    p = h.multiplyBy(c / u),
                    d = c / (i.inertiaDeceleration * l),
                    m = p.multiplyBy(-d / 2).round();
                  m.x && m.y
                    ? ((m = e._limitOffset(m, e.options.maxBounds)),
                      a.Util.requestAnimFrame(function () {
                        e.panBy(m, {
                          duration: d,
                          easeLinearity: l,
                          noMoveStart: !0,
                        });
                      }))
                    : e.fire("moveend");
                }
              },
            })),
            a.Map.addInitHook("addHandler", "dragging", a.Map.Drag),
            a.Map.mergeOptions({ doubleClickZoom: !0 }),
            (a.Map.DoubleClickZoom = a.Handler.extend({
              addHooks: function () {
                this._map.on("dblclick", this._onDoubleClick, this);
              },
              removeHooks: function () {
                this._map.off("dblclick", this._onDoubleClick, this);
              },
              _onDoubleClick: function (t) {
                var e = this._map,
                  i = e.getZoom() + (t.originalEvent.shiftKey ? -1 : 1);
                "center" === e.options.doubleClickZoom
                  ? e.setZoom(i)
                  : e.setZoomAround(t.containerPoint, i);
              },
            })),
            a.Map.addInitHook(
              "addHandler",
              "doubleClickZoom",
              a.Map.DoubleClickZoom
            ),
            a.Map.mergeOptions({ scrollWheelZoom: !0 }),
            (a.Map.ScrollWheelZoom = a.Handler.extend({
              addHooks: function () {
                a.DomEvent.on(
                  this._map._container,
                  "mousewheel",
                  this._onWheelScroll,
                  this
                ),
                  a.DomEvent.on(
                    this._map._container,
                    "MozMousePixelScroll",
                    a.DomEvent.preventDefault
                  ),
                  (this._delta = 0);
              },
              removeHooks: function () {
                a.DomEvent.off(
                  this._map._container,
                  "mousewheel",
                  this._onWheelScroll
                ),
                  a.DomEvent.off(
                    this._map._container,
                    "MozMousePixelScroll",
                    a.DomEvent.preventDefault
                  );
              },
              _onWheelScroll: function (t) {
                var e = a.DomEvent.getWheelDelta(t);
                (this._delta += e),
                  (this._lastMousePos =
                    this._map.mouseEventToContainerPoint(t)),
                  this._startTime || (this._startTime = +new Date());
                var i = Math.max(40 - (+new Date() - this._startTime), 0);
                clearTimeout(this._timer),
                  (this._timer = setTimeout(
                    a.bind(this._performZoom, this),
                    i
                  )),
                  a.DomEvent.preventDefault(t),
                  a.DomEvent.stopPropagation(t);
              },
              _performZoom: function () {
                var t = this._map,
                  e = this._delta,
                  i = t.getZoom();
                (e = e > 0 ? Math.ceil(e) : Math.floor(e)),
                  (e = Math.max(Math.min(e, 4), -4)),
                  (e = t._limitZoom(i + e) - i),
                  (this._delta = 0),
                  (this._startTime = null),
                  e &&
                    ("center" === t.options.scrollWheelZoom
                      ? t.setZoom(i + e)
                      : t.setZoomAround(this._lastMousePos, i + e));
              },
            })),
            a.Map.addInitHook(
              "addHandler",
              "scrollWheelZoom",
              a.Map.ScrollWheelZoom
            ),
            a.extend(a.DomEvent, {
              _touchstart: a.Browser.msPointer
                ? "MSPointerDown"
                : a.Browser.pointer
                ? "pointerdown"
                : "touchstart",
              _touchend: a.Browser.msPointer
                ? "MSPointerUp"
                : a.Browser.pointer
                ? "pointerup"
                : "touchend",
              addDoubleTapListener: function (t, e, n) {
                function o(t) {
                  var e;
                  if (
                    (a.Browser.pointer
                      ? (d.push(t.pointerId), (e = d.length))
                      : (e = t.touches.length),
                    !(e > 1))
                  ) {
                    var i = Date.now(),
                      n = i - (s || i);
                    (l = t.touches ? t.touches[0] : t),
                      (h = n > 0 && n <= u),
                      (s = i);
                  }
                }
                function r(t) {
                  if (a.Browser.pointer) {
                    var i = d.indexOf(t.pointerId);
                    if (-1 === i) return;
                    d.splice(i, 1);
                  }
                  if (h) {
                    if (a.Browser.pointer) {
                      var n,
                        o = {};
                      for (var r in l)
                        (n = l[r]),
                          (o[r] = "function" == typeof n ? n.bind(l) : n);
                      l = o;
                    }
                    (l.type = "dblclick"), e(l), (s = null);
                  }
                }
                var s,
                  l,
                  h = !1,
                  u = 250,
                  c = this._touchstart,
                  p = this._touchend,
                  d = [];
                (t["_leaflet_" + c + n] = o), (t["_leaflet_" + p + n] = r);
                var m = a.Browser.pointer ? i.documentElement : t;
                return (
                  t.addEventListener(c, o, !1),
                  m.addEventListener(p, r, !1),
                  a.Browser.pointer &&
                    m.addEventListener(a.DomEvent.POINTER_CANCEL, r, !1),
                  this
                );
              },
              removeDoubleTapListener: function (t, e) {
                var n = "_leaflet_";
                return (
                  t.removeEventListener(
                    this._touchstart,
                    t[n + this._touchstart + e],
                    !1
                  ),
                  (a.Browser.pointer
                    ? i.documentElement
                    : t
                  ).removeEventListener(
                    this._touchend,
                    t[n + this._touchend + e],
                    !1
                  ),
                  a.Browser.pointer &&
                    i.documentElement.removeEventListener(
                      a.DomEvent.POINTER_CANCEL,
                      t[n + this._touchend + e],
                      !1
                    ),
                  this
                );
              },
            }),
            a.extend(a.DomEvent, {
              POINTER_DOWN: a.Browser.msPointer
                ? "MSPointerDown"
                : "pointerdown",
              POINTER_MOVE: a.Browser.msPointer
                ? "MSPointerMove"
                : "pointermove",
              POINTER_UP: a.Browser.msPointer ? "MSPointerUp" : "pointerup",
              POINTER_CANCEL: a.Browser.msPointer
                ? "MSPointerCancel"
                : "pointercancel",
              _pointers: [],
              _pointerDocumentListener: !1,
              addPointerListener: function (t, e, i, n) {
                switch (e) {
                  case "touchstart":
                    return this.addPointerListenerStart(t, e, i, n);
                  case "touchend":
                    return this.addPointerListenerEnd(t, e, i, n);
                  case "touchmove":
                    return this.addPointerListenerMove(t, e, i, n);
                  default:
                    throw "Unknown touch event type";
                }
              },
              addPointerListenerStart: function (t, e, n, o) {
                var r = this._pointers,
                  s = function (t) {
                    "mouse" !== t.pointerType &&
                      t.pointerType !== t.MSPOINTER_TYPE_MOUSE &&
                      a.DomEvent.preventDefault(t);
                    for (var e = !1, i = 0; i < r.length; i++)
                      if (r[i].pointerId === t.pointerId) {
                        e = !0;
                        break;
                      }
                    e || r.push(t),
                      (t.touches = r.slice()),
                      (t.changedTouches = [t]),
                      n(t);
                  };
                if (
                  ((t["_leaflet_touchstart" + o] = s),
                  t.addEventListener(this.POINTER_DOWN, s, !1),
                  !this._pointerDocumentListener)
                ) {
                  var l = function (t) {
                    for (var e = 0; e < r.length; e++)
                      if (r[e].pointerId === t.pointerId) {
                        r.splice(e, 1);
                        break;
                      }
                  };
                  i.documentElement.addEventListener(this.POINTER_UP, l, !1),
                    i.documentElement.addEventListener(
                      this.POINTER_CANCEL,
                      l,
                      !1
                    ),
                    (this._pointerDocumentListener = !0);
                }
                return this;
              },
              addPointerListenerMove: function (t, e, i, n) {
                function o(t) {
                  if (
                    (t.pointerType !== t.MSPOINTER_TYPE_MOUSE &&
                      "mouse" !== t.pointerType) ||
                    0 !== t.buttons
                  ) {
                    for (var e = 0; e < a.length; e++)
                      if (a[e].pointerId === t.pointerId) {
                        a[e] = t;
                        break;
                      }
                    (t.touches = a.slice()), (t.changedTouches = [t]), i(t);
                  }
                }
                var a = this._pointers;
                return (
                  (t["_leaflet_touchmove" + n] = o),
                  t.addEventListener(this.POINTER_MOVE, o, !1),
                  this
                );
              },
              addPointerListenerEnd: function (t, e, i, n) {
                var o = this._pointers,
                  a = function (t) {
                    for (var e = 0; e < o.length; e++)
                      if (o[e].pointerId === t.pointerId) {
                        o.splice(e, 1);
                        break;
                      }
                    (t.touches = o.slice()), (t.changedTouches = [t]), i(t);
                  };
                return (
                  (t["_leaflet_touchend" + n] = a),
                  t.addEventListener(this.POINTER_UP, a, !1),
                  t.addEventListener(this.POINTER_CANCEL, a, !1),
                  this
                );
              },
              removePointerListener: function (t, e, i) {
                var n = t["_leaflet_" + e + i];
                switch (e) {
                  case "touchstart":
                    t.removeEventListener(this.POINTER_DOWN, n, !1);
                    break;
                  case "touchmove":
                    t.removeEventListener(this.POINTER_MOVE, n, !1);
                    break;
                  case "touchend":
                    t.removeEventListener(this.POINTER_UP, n, !1),
                      t.removeEventListener(this.POINTER_CANCEL, n, !1);
                }
                return this;
              },
            }),
            a.Map.mergeOptions({
              touchZoom: a.Browser.touch && !a.Browser.android23,
              bounceAtZoomLimits: !0,
            }),
            (a.Map.TouchZoom = a.Handler.extend({
              addHooks: function () {
                a.DomEvent.on(
                  this._map._container,
                  "touchstart",
                  this._onTouchStart,
                  this
                );
              },
              removeHooks: function () {
                a.DomEvent.off(
                  this._map._container,
                  "touchstart",
                  this._onTouchStart,
                  this
                );
              },
              _onTouchStart: function (t) {
                var e = this._map;
                if (
                  t.touches &&
                  2 === t.touches.length &&
                  !e._animatingZoom &&
                  !this._zooming
                ) {
                  var n = e.mouseEventToLayerPoint(t.touches[0]),
                    o = e.mouseEventToLayerPoint(t.touches[1]),
                    r = e._getCenterLayerPoint();
                  (this._startCenter = n.add(o)._divideBy(2)),
                    (this._startDist = n.distanceTo(o)),
                    (this._moved = !1),
                    (this._zooming = !0),
                    (this._centerOffset = r.subtract(this._startCenter)),
                    e._panAnim && e._panAnim.stop(),
                    a.DomEvent.on(i, "touchmove", this._onTouchMove, this).on(
                      i,
                      "touchend",
                      this._onTouchEnd,
                      this
                    ),
                    a.DomEvent.preventDefault(t);
                }
              },
              _onTouchMove: function (t) {
                var e = this._map;
                if (t.touches && 2 === t.touches.length && this._zooming) {
                  var i = e.mouseEventToLayerPoint(t.touches[0]),
                    n = e.mouseEventToLayerPoint(t.touches[1]);
                  (this._scale = i.distanceTo(n) / this._startDist),
                    (this._delta = i
                      ._add(n)
                      ._divideBy(2)
                      ._subtract(this._startCenter)),
                    1 !== this._scale &&
                      ((!e.options.bounceAtZoomLimits &&
                        ((e.getZoom() === e.getMinZoom() && this._scale < 1) ||
                          (e.getZoom() === e.getMaxZoom() &&
                            this._scale > 1))) ||
                        (this._moved ||
                          (a.DomUtil.addClass(e._mapPane, "leaflet-touching"),
                          e.fire("movestart").fire("zoomstart"),
                          (this._moved = !0)),
                        a.Util.cancelAnimFrame(this._animRequest),
                        (this._animRequest = a.Util.requestAnimFrame(
                          this._updateOnMove,
                          this,
                          !0,
                          this._map._container
                        )),
                        a.DomEvent.preventDefault(t)));
                }
              },
              _updateOnMove: function () {
                var t = this._map,
                  e = this._getScaleOrigin(),
                  i = t.layerPointToLatLng(e),
                  n = t.getScaleZoom(this._scale);
                t._animateZoom(
                  i,
                  n,
                  this._startCenter,
                  this._scale,
                  this._delta,
                  !1,
                  !0
                );
              },
              _onTouchEnd: function () {
                if (!this._moved || !this._zooming)
                  return void (this._zooming = !1);
                var t = this._map;
                (this._zooming = !1),
                  a.DomUtil.removeClass(t._mapPane, "leaflet-touching"),
                  a.Util.cancelAnimFrame(this._animRequest),
                  a.DomEvent.off(i, "touchmove", this._onTouchMove).off(
                    i,
                    "touchend",
                    this._onTouchEnd
                  );
                var e = this._getScaleOrigin(),
                  n = t.layerPointToLatLng(e),
                  o = t.getZoom(),
                  r = t.getScaleZoom(this._scale) - o,
                  s = r > 0 ? Math.ceil(r) : Math.floor(r),
                  l = t._limitZoom(o + s),
                  h = t.getZoomScale(l) / this._scale;
                t._animateZoom(n, l, e, h);
              },
              _getScaleOrigin: function () {
                var t = this._centerOffset
                  .subtract(this._delta)
                  .divideBy(this._scale);
                return this._startCenter.add(t);
              },
            })),
            a.Map.addInitHook("addHandler", "touchZoom", a.Map.TouchZoom),
            a.Map.mergeOptions({ tap: !0, tapTolerance: 15 }),
            (a.Map.Tap = a.Handler.extend({
              addHooks: function () {
                a.DomEvent.on(
                  this._map._container,
                  "touchstart",
                  this._onDown,
                  this
                );
              },
              removeHooks: function () {
                a.DomEvent.off(
                  this._map._container,
                  "touchstart",
                  this._onDown,
                  this
                );
              },
              _onDown: function (t) {
                if (t.touches) {
                  if (
                    (a.DomEvent.preventDefault(t),
                    (this._fireClick = !0),
                    t.touches.length > 1)
                  )
                    return (
                      (this._fireClick = !1),
                      void clearTimeout(this._holdTimeout)
                    );
                  var e = t.touches[0],
                    n = e.target;
                  (this._startPos = this._newPos =
                    new a.Point(e.clientX, e.clientY)),
                    n.tagName &&
                      "a" === n.tagName.toLowerCase() &&
                      a.DomUtil.addClass(n, "leaflet-active"),
                    (this._holdTimeout = setTimeout(
                      a.bind(function () {
                        this._isTapValid() &&
                          ((this._fireClick = !1),
                          this._onUp(),
                          this._simulateEvent("contextmenu", e));
                      }, this),
                      1e3
                    )),
                    a.DomEvent.on(i, "touchmove", this._onMove, this).on(
                      i,
                      "touchend",
                      this._onUp,
                      this
                    );
                }
              },
              _onUp: function (t) {
                if (
                  (clearTimeout(this._holdTimeout),
                  a.DomEvent.off(i, "touchmove", this._onMove, this).off(
                    i,
                    "touchend",
                    this._onUp,
                    this
                  ),
                  this._fireClick && t && t.changedTouches)
                ) {
                  var e = t.changedTouches[0],
                    n = e.target;
                  n &&
                    n.tagName &&
                    "a" === n.tagName.toLowerCase() &&
                    a.DomUtil.removeClass(n, "leaflet-active"),
                    this._isTapValid() && this._simulateEvent("click", e);
                }
              },
              _isTapValid: function () {
                return (
                  this._newPos.distanceTo(this._startPos) <=
                  this._map.options.tapTolerance
                );
              },
              _onMove: function (t) {
                var e = t.touches[0];
                this._newPos = new a.Point(e.clientX, e.clientY);
              },
              _simulateEvent: function (e, n) {
                var o = i.createEvent("MouseEvents");
                (o._simulated = !0),
                  (n.target._simulatedClick = !0),
                  o.initMouseEvent(
                    e,
                    !0,
                    !0,
                    t,
                    1,
                    n.screenX,
                    n.screenY,
                    n.clientX,
                    n.clientY,
                    !1,
                    !1,
                    !1,
                    !1,
                    0,
                    null
                  ),
                  n.target.dispatchEvent(o);
              },
            })),
            a.Browser.touch &&
              !a.Browser.pointer &&
              a.Map.addInitHook("addHandler", "tap", a.Map.Tap),
            a.Map.mergeOptions({ boxZoom: !0 }),
            (a.Map.BoxZoom = a.Handler.extend({
              initialize: function (t) {
                (this._map = t),
                  (this._container = t._container),
                  (this._pane = t._panes.overlayPane),
                  (this._moved = !1);
              },
              addHooks: function () {
                a.DomEvent.on(
                  this._container,
                  "mousedown",
                  this._onMouseDown,
                  this
                );
              },
              removeHooks: function () {
                a.DomEvent.off(this._container, "mousedown", this._onMouseDown),
                  (this._moved = !1);
              },
              moved: function () {
                return this._moved;
              },
              _onMouseDown: function (t) {
                if (
                  ((this._moved = !1),
                  !t.shiftKey || (1 !== t.which && 1 !== t.button))
                )
                  return !1;
                a.DomUtil.disableTextSelection(),
                  a.DomUtil.disableImageDrag(),
                  (this._startLayerPoint = this._map.mouseEventToLayerPoint(t)),
                  a.DomEvent.on(i, "mousemove", this._onMouseMove, this)
                    .on(i, "mouseup", this._onMouseUp, this)
                    .on(i, "keydown", this._onKeyDown, this);
              },
              _onMouseMove: function (t) {
                this._moved ||
                  ((this._box = a.DomUtil.create(
                    "div",
                    "leaflet-zoom-box",
                    this._pane
                  )),
                  a.DomUtil.setPosition(this._box, this._startLayerPoint),
                  (this._container.style.cursor = "crosshair"),
                  this._map.fire("boxzoomstart"));
                var e = this._startLayerPoint,
                  i = this._box,
                  n = this._map.mouseEventToLayerPoint(t),
                  o = n.subtract(e),
                  r = new a.Point(Math.min(n.x, e.x), Math.min(n.y, e.y));
                a.DomUtil.setPosition(i, r),
                  (this._moved = !0),
                  (i.style.width = Math.max(0, Math.abs(o.x) - 4) + "px"),
                  (i.style.height = Math.max(0, Math.abs(o.y) - 4) + "px");
              },
              _finish: function () {
                this._moved &&
                  (this._pane.removeChild(this._box),
                  (this._container.style.cursor = "")),
                  a.DomUtil.enableTextSelection(),
                  a.DomUtil.enableImageDrag(),
                  a.DomEvent.off(i, "mousemove", this._onMouseMove)
                    .off(i, "mouseup", this._onMouseUp)
                    .off(i, "keydown", this._onKeyDown);
              },
              _onMouseUp: function (t) {
                this._finish();
                var e = this._map,
                  i = e.mouseEventToLayerPoint(t);
                if (!this._startLayerPoint.equals(i)) {
                  var n = new a.LatLngBounds(
                    e.layerPointToLatLng(this._startLayerPoint),
                    e.layerPointToLatLng(i)
                  );
                  e.fitBounds(n), e.fire("boxzoomend", { boxZoomBounds: n });
                }
              },
              _onKeyDown: function (t) {
                27 === t.keyCode && this._finish();
              },
            })),
            a.Map.addInitHook("addHandler", "boxZoom", a.Map.BoxZoom),
            a.Map.mergeOptions({
              keyboard: !0,
              keyboardPanOffset: 80,
              keyboardZoomOffset: 1,
            }),
            (a.Map.Keyboard = a.Handler.extend({
              keyCodes: {
                left: [37],
                right: [39],
                down: [40],
                up: [38],
                zoomIn: [187, 107, 61, 171],
                zoomOut: [189, 109, 173],
              },
              initialize: function (t) {
                (this._map = t),
                  this._setPanOffset(t.options.keyboardPanOffset),
                  this._setZoomOffset(t.options.keyboardZoomOffset);
              },
              addHooks: function () {
                var t = this._map._container;
                -1 === t.tabIndex && (t.tabIndex = "0"),
                  a.DomEvent.on(t, "focus", this._onFocus, this)
                    .on(t, "blur", this._onBlur, this)
                    .on(t, "mousedown", this._onMouseDown, this),
                  this._map
                    .on("focus", this._addHooks, this)
                    .on("blur", this._removeHooks, this);
              },
              removeHooks: function () {
                this._removeHooks();
                var t = this._map._container;
                a.DomEvent.off(t, "focus", this._onFocus, this)
                  .off(t, "blur", this._onBlur, this)
                  .off(t, "mousedown", this._onMouseDown, this),
                  this._map
                    .off("focus", this._addHooks, this)
                    .off("blur", this._removeHooks, this);
              },
              _onMouseDown: function () {
                if (!this._focused) {
                  var e = i.body,
                    n = i.documentElement,
                    o = e.scrollTop || n.scrollTop,
                    a = e.scrollLeft || n.scrollLeft;
                  this._map._container.focus(), t.scrollTo(a, o);
                }
              },
              _onFocus: function () {
                (this._focused = !0), this._map.fire("focus");
              },
              _onBlur: function () {
                (this._focused = !1), this._map.fire("blur");
              },
              _setPanOffset: function (t) {
                var e,
                  i,
                  n = (this._panKeys = {}),
                  o = this.keyCodes;
                for (e = 0, i = o.left.length; e < i; e++)
                  n[o.left[e]] = [-1 * t, 0];
                for (e = 0, i = o.right.length; e < i; e++)
                  n[o.right[e]] = [t, 0];
                for (e = 0, i = o.down.length; e < i; e++)
                  n[o.down[e]] = [0, t];
                for (e = 0, i = o.up.length; e < i; e++)
                  n[o.up[e]] = [0, -1 * t];
              },
              _setZoomOffset: function (t) {
                var e,
                  i,
                  n = (this._zoomKeys = {}),
                  o = this.keyCodes;
                for (e = 0, i = o.zoomIn.length; e < i; e++) n[o.zoomIn[e]] = t;
                for (e = 0, i = o.zoomOut.length; e < i; e++)
                  n[o.zoomOut[e]] = -t;
              },
              _addHooks: function () {
                a.DomEvent.on(i, "keydown", this._onKeyDown, this);
              },
              _removeHooks: function () {
                a.DomEvent.off(i, "keydown", this._onKeyDown, this);
              },
              _onKeyDown: function (t) {
                var e = t.keyCode,
                  i = this._map;
                if (e in this._panKeys) {
                  if (i._panAnim && i._panAnim._inProgress) return;
                  i.panBy(this._panKeys[e]),
                    i.options.maxBounds &&
                      i.panInsideBounds(i.options.maxBounds);
                } else {
                  if (!(e in this._zoomKeys)) return;
                  i.setZoom(i.getZoom() + this._zoomKeys[e]);
                }
                a.DomEvent.stop(t);
              },
            })),
            a.Map.addInitHook("addHandler", "keyboard", a.Map.Keyboard),
            (a.Handler.MarkerDrag = a.Handler.extend({
              initialize: function (t) {
                this._marker = t;
              },
              addHooks: function () {
                var t = this._marker._icon;
                this._draggable || (this._draggable = new a.Draggable(t, t)),
                  this._draggable
                    .on("dragstart", this._onDragStart, this)
                    .on("drag", this._onDrag, this)
                    .on("dragend", this._onDragEnd, this),
                  this._draggable.enable(),
                  a.DomUtil.addClass(
                    this._marker._icon,
                    "leaflet-marker-draggable"
                  );
              },
              removeHooks: function () {
                this._draggable
                  .off("dragstart", this._onDragStart, this)
                  .off("drag", this._onDrag, this)
                  .off("dragend", this._onDragEnd, this),
                  this._draggable.disable(),
                  a.DomUtil.removeClass(
                    this._marker._icon,
                    "leaflet-marker-draggable"
                  );
              },
              moved: function () {
                return this._draggable && this._draggable._moved;
              },
              _onDragStart: function () {
                this._marker.closePopup().fire("movestart").fire("dragstart");
              },
              _onDrag: function () {
                var t = this._marker,
                  e = t._shadow,
                  i = a.DomUtil.getPosition(t._icon),
                  n = t._map.layerPointToLatLng(i);
                e && a.DomUtil.setPosition(e, i),
                  (t._latlng = n),
                  t.fire("move", { latlng: n }).fire("drag");
              },
              _onDragEnd: function (t) {
                this._marker.fire("moveend").fire("dragend", t);
              },
            })),
            (a.Control = a.Class.extend({
              options: { position: "topright" },
              initialize: function (t) {
                a.setOptions(this, t);
              },
              getPosition: function () {
                return this.options.position;
              },
              setPosition: function (t) {
                var e = this._map;
                return (
                  e && e.removeControl(this),
                  (this.options.position = t),
                  e && e.addControl(this),
                  this
                );
              },
              getContainer: function () {
                return this._container;
              },
              addTo: function (t) {
                this._map = t;
                var e = (this._container = this.onAdd(t)),
                  i = this.getPosition(),
                  n = t._controlCorners[i];
                return (
                  a.DomUtil.addClass(e, "leaflet-control"),
                  -1 !== i.indexOf("bottom")
                    ? n.insertBefore(e, n.firstChild)
                    : n.appendChild(e),
                  this
                );
              },
              removeFrom: function (t) {
                var e = this.getPosition();
                return (
                  t._controlCorners[e].removeChild(this._container),
                  (this._map = null),
                  this.onRemove && this.onRemove(t),
                  this
                );
              },
              _refocusOnMap: function () {
                this._map && this._map.getContainer().focus();
              },
            })),
            (a.control = function (t) {
              return new a.Control(t);
            }),
            a.Map.include({
              addControl: function (t) {
                return t.addTo(this), this;
              },
              removeControl: function (t) {
                return t.removeFrom(this), this;
              },
              _initControlPos: function () {
                function t(t, o) {
                  var r = i + t + " " + i + o;
                  e[t + o] = a.DomUtil.create("div", r, n);
                }
                var e = (this._controlCorners = {}),
                  i = "leaflet-",
                  n = (this._controlContainer = a.DomUtil.create(
                    "div",
                    i + "control-container",
                    this._container
                  ));
                t("top", "left"),
                  t("top", "right"),
                  t("bottom", "left"),
                  t("bottom", "right");
              },
              _clearControlPos: function () {
                this._container.removeChild(this._controlContainer);
              },
            }),
            (a.Control.Zoom = a.Control.extend({
              options: {
                position: "topleft",
                zoomInText: "+",
                zoomInTitle: "Zoom in",
                zoomOutText: "-",
                zoomOutTitle: "Zoom out",
              },
              onAdd: function (t) {
                var e = "leaflet-control-zoom",
                  i = a.DomUtil.create("div", e + " leaflet-bar");
                return (
                  (this._map = t),
                  (this._zoomInButton = this._createButton(
                    this.options.zoomInText,
                    this.options.zoomInTitle,
                    e + "-in",
                    i,
                    this._zoomIn,
                    this
                  )),
                  (this._zoomOutButton = this._createButton(
                    this.options.zoomOutText,
                    this.options.zoomOutTitle,
                    e + "-out",
                    i,
                    this._zoomOut,
                    this
                  )),
                  this._updateDisabled(),
                  t.on("zoomend zoomlevelschange", this._updateDisabled, this),
                  i
                );
              },
              onRemove: function (t) {
                t.off("zoomend zoomlevelschange", this._updateDisabled, this);
              },
              _zoomIn: function (t) {
                this._map.zoomIn(t.shiftKey ? 3 : 1);
              },
              _zoomOut: function (t) {
                this._map.zoomOut(t.shiftKey ? 3 : 1);
              },
              _createButton: function (t, e, i, n, o, r) {
                var s = a.DomUtil.create("a", i, n);
                (s.innerHTML = t), (s.href = "#"), (s.title = e);
                var l = a.DomEvent.stopPropagation;
                return (
                  a.DomEvent.on(s, "click", l)
                    .on(s, "mousedown", l)
                    .on(s, "dblclick", l)
                    .on(s, "click", a.DomEvent.preventDefault)
                    .on(s, "click", o, r)
                    .on(s, "click", this._refocusOnMap, r),
                  s
                );
              },
              _updateDisabled: function () {
                var t = this._map,
                  e = "leaflet-disabled";
                a.DomUtil.removeClass(this._zoomInButton, e),
                  a.DomUtil.removeClass(this._zoomOutButton, e),
                  t._zoom === t.getMinZoom() &&
                    a.DomUtil.addClass(this._zoomOutButton, e),
                  t._zoom === t.getMaxZoom() &&
                    a.DomUtil.addClass(this._zoomInButton, e);
              },
            })),
            a.Map.mergeOptions({ zoomControl: !0 }),
            a.Map.addInitHook(function () {
              this.options.zoomControl &&
                ((this.zoomControl = new a.Control.Zoom()),
                this.addControl(this.zoomControl));
            }),
            (a.control.zoom = function (t) {
              return new a.Control.Zoom(t);
            }),
            (a.Control.Attribution = a.Control.extend({
              options: {
                position: "bottomright",
                prefix:
                  '<a href="http://leafletjs.com" title="A JS library for interactive maps">Leaflet</a>',
              },
              initialize: function (t) {
                a.setOptions(this, t), (this._attributions = {});
              },
              onAdd: function (t) {
                (this._container = a.DomUtil.create(
                  "div",
                  "leaflet-control-attribution"
                )),
                  a.DomEvent.disableClickPropagation(this._container);
                for (var e in t._layers)
                  t._layers[e].getAttribution &&
                    this.addAttribution(t._layers[e].getAttribution());
                return (
                  t
                    .on("layeradd", this._onLayerAdd, this)
                    .on("layerremove", this._onLayerRemove, this),
                  this._update(),
                  this._container
                );
              },
              onRemove: function (t) {
                t.off("layeradd", this._onLayerAdd).off(
                  "layerremove",
                  this._onLayerRemove
                );
              },
              setPrefix: function (t) {
                return (this.options.prefix = t), this._update(), this;
              },
              addAttribution: function (t) {
                if (t)
                  return (
                    this._attributions[t] || (this._attributions[t] = 0),
                    this._attributions[t]++,
                    this._update(),
                    this
                  );
              },
              removeAttribution: function (t) {
                if (t)
                  return (
                    this._attributions[t] &&
                      (this._attributions[t]--, this._update()),
                    this
                  );
              },
              _update: function () {
                if (this._map) {
                  var t = [];
                  for (var e in this._attributions)
                    this._attributions[e] && t.push(e);
                  var i = [];
                  this.options.prefix && i.push(this.options.prefix),
                    t.length && i.push(t.join(", ")),
                    (this._container.innerHTML = i.join(" | "));
                }
              },
              _onLayerAdd: function (t) {
                t.layer.getAttribution &&
                  this.addAttribution(t.layer.getAttribution());
              },
              _onLayerRemove: function (t) {
                t.layer.getAttribution &&
                  this.removeAttribution(t.layer.getAttribution());
              },
            })),
            a.Map.mergeOptions({ attributionControl: !0 }),
            a.Map.addInitHook(function () {
              this.options.attributionControl &&
                (this.attributionControl = new a.Control.Attribution().addTo(
                  this
                ));
            }),
            (a.control.attribution = function (t) {
              return new a.Control.Attribution(t);
            }),
            (a.Control.Scale = a.Control.extend({
              options: {
                position: "bottomleft",
                maxWidth: 100,
                metric: !0,
                imperial: !0,
                updateWhenIdle: !1,
              },
              onAdd: function (t) {
                this._map = t;
                var e = a.DomUtil.create("div", "leaflet-control-scale"),
                  i = this.options;
                return (
                  this._addScales(i, "leaflet-control-scale", e),
                  t.on(
                    i.updateWhenIdle ? "moveend" : "move",
                    this._update,
                    this
                  ),
                  t.whenReady(this._update, this),
                  e
                );
              },
              onRemove: function (t) {
                t.off(
                  this.options.updateWhenIdle ? "moveend" : "move",
                  this._update,
                  this
                );
              },
              _addScales: function (t, e, i) {
                t.metric &&
                  (this._mScale = a.DomUtil.create("div", e + "-line", i)),
                  t.imperial &&
                    (this._iScale = a.DomUtil.create("div", e + "-line", i));
              },
              _update: function () {
                var t = this._map.getBounds(),
                  e = t.getCenter().lat,
                  i = 6378137 * Math.PI * Math.cos((e * Math.PI) / 180),
                  n = (i * (t.getNorthEast().lng - t.getSouthWest().lng)) / 180,
                  o = this._map.getSize(),
                  a = this.options,
                  r = 0;
                o.x > 0 && (r = n * (a.maxWidth / o.x)),
                  this._updateScales(a, r);
              },
              _updateScales: function (t, e) {
                t.metric && e && this._updateMetric(e),
                  t.imperial && e && this._updateImperial(e);
              },
              _updateMetric: function (t) {
                var e = this._getRoundNum(t);
                (this._mScale.style.width = this._getScaleWidth(e / t) + "px"),
                  (this._mScale.innerHTML =
                    e < 1e3 ? e + " m" : e / 1e3 + " km");
              },
              _updateImperial: function (t) {
                var e,
                  i,
                  n,
                  o = 3.2808399 * t,
                  a = this._iScale;
                o > 5280
                  ? ((e = o / 5280),
                    (i = this._getRoundNum(e)),
                    (a.style.width = this._getScaleWidth(i / e) + "px"),
                    (a.innerHTML = i + " mi"))
                  : ((n = this._getRoundNum(o)),
                    (a.style.width = this._getScaleWidth(n / o) + "px"),
                    (a.innerHTML = n + " ft"));
              },
              _getScaleWidth: function (t) {
                return Math.round(this.options.maxWidth * t) - 10;
              },
              _getRoundNum: function (t) {
                var e = Math.pow(10, (Math.floor(t) + "").length - 1),
                  i = t / e;
                return (
                  (i = i >= 10 ? 10 : i >= 5 ? 5 : i >= 3 ? 3 : i >= 2 ? 2 : 1),
                  e * i
                );
              },
            })),
            (a.control.scale = function (t) {
              return new a.Control.Scale(t);
            }),
            (a.Control.Layers = a.Control.extend({
              options: { collapsed: !0, position: "topright", autoZIndex: !0 },
              initialize: function (t, e, i) {
                a.setOptions(this, i),
                  (this._layers = {}),
                  (this._lastZIndex = 0),
                  (this._handlingClick = !1);
                for (var n in t) this._addLayer(t[n], n);
                for (n in e) this._addLayer(e[n], n, !0);
              },
              onAdd: function (t) {
                return (
                  this._initLayout(),
                  this._update(),
                  t
                    .on("layeradd", this._onLayerChange, this)
                    .on("layerremove", this._onLayerChange, this),
                  this._container
                );
              },
              onRemove: function (t) {
                t.off("layeradd", this._onLayerChange, this).off(
                  "layerremove",
                  this._onLayerChange,
                  this
                );
              },
              addBaseLayer: function (t, e) {
                return this._addLayer(t, e), this._update(), this;
              },
              addOverlay: function (t, e) {
                return this._addLayer(t, e, !0), this._update(), this;
              },
              removeLayer: function (t) {
                var e = a.stamp(t);
                return delete this._layers[e], this._update(), this;
              },
              _initLayout: function () {
                var t = "leaflet-control-layers",
                  e = (this._container = a.DomUtil.create("div", t));
                e.setAttribute("aria-haspopup", !0),
                  a.Browser.touch
                    ? a.DomEvent.on(e, "click", a.DomEvent.stopPropagation)
                    : a.DomEvent.disableClickPropagation(
                        e
                      ).disableScrollPropagation(e);
                var i = (this._form = a.DomUtil.create("form", t + "-list"));
                if (this.options.collapsed) {
                  a.Browser.android ||
                    a.DomEvent.on(e, "mouseover", this._expand, this).on(
                      e,
                      "mouseout",
                      this._collapse,
                      this
                    );
                  var n = (this._layersLink = a.DomUtil.create(
                    "a",
                    t + "-toggle",
                    e
                  ));
                  (n.href = "#"),
                    (n.title = "Layers"),
                    a.Browser.touch
                      ? a.DomEvent.on(n, "click", a.DomEvent.stop).on(
                          n,
                          "click",
                          this._expand,
                          this
                        )
                      : a.DomEvent.on(n, "focus", this._expand, this),
                    a.DomEvent.on(
                      i,
                      "click",
                      function () {
                        setTimeout(a.bind(this._onInputClick, this), 0);
                      },
                      this
                    ),
                    this._map.on("click", this._collapse, this);
                } else this._expand();
                (this._baseLayersList = a.DomUtil.create(
                  "div",
                  t + "-base",
                  i
                )),
                  (this._separator = a.DomUtil.create(
                    "div",
                    t + "-separator",
                    i
                  )),
                  (this._overlaysList = a.DomUtil.create(
                    "div",
                    t + "-overlays",
                    i
                  )),
                  e.appendChild(i);
              },
              _addLayer: function (t, e, i) {
                var n = a.stamp(t);
                (this._layers[n] = { layer: t, name: e, overlay: i }),
                  this.options.autoZIndex &&
                    t.setZIndex &&
                    (this._lastZIndex++, t.setZIndex(this._lastZIndex));
              },
              _update: function () {
                if (this._container) {
                  (this._baseLayersList.innerHTML = ""),
                    (this._overlaysList.innerHTML = "");
                  var t,
                    e,
                    i = !1,
                    n = !1;
                  for (t in this._layers)
                    (e = this._layers[t]),
                      this._addItem(e),
                      (n = n || e.overlay),
                      (i = i || !e.overlay);
                  this._separator.style.display = n && i ? "" : "none";
                }
              },
              _onLayerChange: function (t) {
                var e = this._layers[a.stamp(t.layer)];
                if (e) {
                  this._handlingClick || this._update();
                  var i = e.overlay
                    ? "layeradd" === t.type
                      ? "overlayadd"
                      : "overlayremove"
                    : "layeradd" === t.type
                    ? "baselayerchange"
                    : null;
                  i && this._map.fire(i, e);
                }
              },
              _createRadioElement: function (t, e) {
                var n =
                  '<input type="radio" class="leaflet-control-layers-selector" name="' +
                  t +
                  '"';
                e && (n += ' checked="checked"'), (n += "/>");
                var o = i.createElement("div");
                return (o.innerHTML = n), o.firstChild;
              },
              _addItem: function (t) {
                var e,
                  n = i.createElement("label"),
                  o = this._map.hasLayer(t.layer);
                t.overlay
                  ? ((e = i.createElement("input")),
                    (e.type = "checkbox"),
                    (e.className = "leaflet-control-layers-selector"),
                    (e.defaultChecked = o))
                  : (e = this._createRadioElement("leaflet-base-layers", o)),
                  (e.layerId = a.stamp(t.layer)),
                  a.DomEvent.on(e, "click", this._onInputClick, this);
                var r = i.createElement("span");
                return (
                  (r.innerHTML = " " + t.name),
                  n.appendChild(e),
                  n.appendChild(r),
                  (t.overlay
                    ? this._overlaysList
                    : this._baseLayersList
                  ).appendChild(n),
                  n
                );
              },
              _onInputClick: function () {
                var t,
                  e,
                  i,
                  n = this._form.getElementsByTagName("input"),
                  o = n.length;
                for (this._handlingClick = !0, t = 0; t < o; t++)
                  (e = n[t]),
                    (i = this._layers[e.layerId]),
                    e.checked && !this._map.hasLayer(i.layer)
                      ? this._map.addLayer(i.layer)
                      : !e.checked &&
                        this._map.hasLayer(i.layer) &&
                        this._map.removeLayer(i.layer);
                (this._handlingClick = !1), this._refocusOnMap();
              },
              _expand: function () {
                a.DomUtil.addClass(
                  this._container,
                  "leaflet-control-layers-expanded"
                );
              },
              _collapse: function () {
                this._container.className = this._container.className.replace(
                  " leaflet-control-layers-expanded",
                  ""
                );
              },
            })),
            (a.control.layers = function (t, e, i) {
              return new a.Control.Layers(t, e, i);
            }),
            (a.PosAnimation = a.Class.extend({
              includes: a.Mixin.Events,
              run: function (t, e, i, n) {
                this.stop(),
                  (this._el = t),
                  (this._inProgress = !0),
                  (this._newPos = e),
                  this.fire("start"),
                  (t.style[a.DomUtil.TRANSITION] =
                    "all " +
                    (i || 0.25) +
                    "s cubic-bezier(0,0," +
                    (n || 0.5) +
                    ",1)"),
                  a.DomEvent.on(
                    t,
                    a.DomUtil.TRANSITION_END,
                    this._onTransitionEnd,
                    this
                  ),
                  a.DomUtil.setPosition(t, e),
                  a.Util.falseFn(t.offsetWidth),
                  (this._stepTimer = setInterval(
                    a.bind(this._onStep, this),
                    50
                  ));
              },
              stop: function () {
                this._inProgress &&
                  (a.DomUtil.setPosition(this._el, this._getPos()),
                  this._onTransitionEnd(),
                  a.Util.falseFn(this._el.offsetWidth));
              },
              _onStep: function () {
                var t = this._getPos();
                if (!t) return void this._onTransitionEnd();
                (this._el._leaflet_pos = t), this.fire("step");
              },
              _transformRe:
                /([-+]?(?:\d*\.)?\d+)\D*, ([-+]?(?:\d*\.)?\d+)\D*\)/,
              _getPos: function () {
                var e,
                  i,
                  n,
                  o = this._el,
                  r = t.getComputedStyle(o);
                if (a.Browser.any3d) {
                  if (!(n = r[a.DomUtil.TRANSFORM].match(this._transformRe)))
                    return;
                  (e = parseFloat(n[1])), (i = parseFloat(n[2]));
                } else (e = parseFloat(r.left)), (i = parseFloat(r.top));
                return new a.Point(e, i, !0);
              },
              _onTransitionEnd: function () {
                a.DomEvent.off(
                  this._el,
                  a.DomUtil.TRANSITION_END,
                  this._onTransitionEnd,
                  this
                ),
                  this._inProgress &&
                    ((this._inProgress = !1),
                    (this._el.style[a.DomUtil.TRANSITION] = ""),
                    (this._el._leaflet_pos = this._newPos),
                    clearInterval(this._stepTimer),
                    this.fire("step").fire("end"));
              },
            })),
            a.Map.include({
              setView: function (t, e, i) {
                if (
                  ((e = void 0 === e ? this._zoom : this._limitZoom(e)),
                  (t = this._limitCenter(
                    a.latLng(t),
                    e,
                    this.options.maxBounds
                  )),
                  (i = i || {}),
                  this._panAnim && this._panAnim.stop(),
                  this._loaded && !i.reset && !0 !== i)
                ) {
                  void 0 !== i.animate &&
                    ((i.zoom = a.extend({ animate: i.animate }, i.zoom)),
                    (i.pan = a.extend({ animate: i.animate }, i.pan)));
                  if (
                    this._zoom !== e
                      ? this._tryAnimatedZoom &&
                        this._tryAnimatedZoom(t, e, i.zoom)
                      : this._tryAnimatedPan(t, i.pan)
                  )
                    return clearTimeout(this._sizeTimer), this;
                }
                return this._resetView(t, e), this;
              },
              panBy: function (t, e) {
                if (((t = a.point(t).round()), (e = e || {}), !t.x && !t.y))
                  return this;
                if (
                  (this._panAnim ||
                    ((this._panAnim = new a.PosAnimation()),
                    this._panAnim.on(
                      {
                        step: this._onPanTransitionStep,
                        end: this._onPanTransitionEnd,
                      },
                      this
                    )),
                  e.noMoveStart || this.fire("movestart"),
                  !1 !== e.animate)
                ) {
                  a.DomUtil.addClass(this._mapPane, "leaflet-pan-anim");
                  var i = this._getMapPanePos().subtract(t);
                  this._panAnim.run(
                    this._mapPane,
                    i,
                    e.duration || 0.25,
                    e.easeLinearity
                  );
                } else this._rawPanBy(t), this.fire("move").fire("moveend");
                return this;
              },
              _onPanTransitionStep: function () {
                this.fire("move");
              },
              _onPanTransitionEnd: function () {
                a.DomUtil.removeClass(this._mapPane, "leaflet-pan-anim"),
                  this.fire("moveend");
              },
              _tryAnimatedPan: function (t, e) {
                var i = this._getCenterOffset(t)._floor();
                return (
                  !(!0 !== (e && e.animate) && !this.getSize().contains(i)) &&
                  (this.panBy(i, e), !0)
                );
              },
            }),
            (a.PosAnimation = a.DomUtil.TRANSITION
              ? a.PosAnimation
              : a.PosAnimation.extend({
                  run: function (t, e, i, n) {
                    this.stop(),
                      (this._el = t),
                      (this._inProgress = !0),
                      (this._duration = i || 0.25),
                      (this._easeOutPower = 1 / Math.max(n || 0.5, 0.2)),
                      (this._startPos = a.DomUtil.getPosition(t)),
                      (this._offset = e.subtract(this._startPos)),
                      (this._startTime = +new Date()),
                      this.fire("start"),
                      this._animate();
                  },
                  stop: function () {
                    this._inProgress && (this._step(), this._complete());
                  },
                  _animate: function () {
                    (this._animId = a.Util.requestAnimFrame(
                      this._animate,
                      this
                    )),
                      this._step();
                  },
                  _step: function () {
                    var t = +new Date() - this._startTime,
                      e = 1e3 * this._duration;
                    t < e
                      ? this._runFrame(this._easeOut(t / e))
                      : (this._runFrame(1), this._complete());
                  },
                  _runFrame: function (t) {
                    var e = this._startPos.add(this._offset.multiplyBy(t));
                    a.DomUtil.setPosition(this._el, e), this.fire("step");
                  },
                  _complete: function () {
                    a.Util.cancelAnimFrame(this._animId),
                      (this._inProgress = !1),
                      this.fire("end");
                  },
                  _easeOut: function (t) {
                    return 1 - Math.pow(1 - t, this._easeOutPower);
                  },
                })),
            a.Map.mergeOptions({
              zoomAnimation: !0,
              zoomAnimationThreshold: 4,
            }),
            a.DomUtil.TRANSITION &&
              a.Map.addInitHook(function () {
                (this._zoomAnimated =
                  this.options.zoomAnimation &&
                  a.DomUtil.TRANSITION &&
                  a.Browser.any3d &&
                  !a.Browser.android23 &&
                  !a.Browser.mobileOpera),
                  this._zoomAnimated &&
                    a.DomEvent.on(
                      this._mapPane,
                      a.DomUtil.TRANSITION_END,
                      this._catchTransitionEnd,
                      this
                    );
              }),
            a.Map.include(
              a.DomUtil.TRANSITION
                ? {
                    _catchTransitionEnd: function (t) {
                      this._animatingZoom &&
                        t.propertyName.indexOf("transform") >= 0 &&
                        this._onZoomTransitionEnd();
                    },
                    _nothingToAnimate: function () {
                      return !this._container.getElementsByClassName(
                        "leaflet-zoom-animated"
                      ).length;
                    },
                    _tryAnimatedZoom: function (t, e, i) {
                      if (this._animatingZoom) return !0;
                      if (
                        ((i = i || {}),
                        !this._zoomAnimated ||
                          !1 === i.animate ||
                          this._nothingToAnimate() ||
                          Math.abs(e - this._zoom) >
                            this.options.zoomAnimationThreshold)
                      )
                        return !1;
                      var n = this.getZoomScale(e),
                        o = this._getCenterOffset(t)._divideBy(1 - 1 / n),
                        a = this._getCenterLayerPoint()._add(o);
                      return (
                        !(!0 !== i.animate && !this.getSize().contains(o)) &&
                        (this.fire("movestart").fire("zoomstart"),
                        this._animateZoom(t, e, a, n, null, !0),
                        !0)
                      );
                    },
                    _animateZoom: function (t, e, i, n, o, r, s) {
                      s || (this._animatingZoom = !0),
                        a.DomUtil.addClass(this._mapPane, "leaflet-zoom-anim"),
                        (this._animateToCenter = t),
                        (this._animateToZoom = e),
                        a.Draggable && (a.Draggable._disabled = !0),
                        a.Util.requestAnimFrame(function () {
                          this.fire("zoomanim", {
                            center: t,
                            zoom: e,
                            origin: i,
                            scale: n,
                            delta: o,
                            backwards: r,
                          }),
                            setTimeout(
                              a.bind(this._onZoomTransitionEnd, this),
                              250
                            );
                        }, this);
                    },
                    _onZoomTransitionEnd: function () {
                      this._animatingZoom &&
                        ((this._animatingZoom = !1),
                        a.DomUtil.removeClass(
                          this._mapPane,
                          "leaflet-zoom-anim"
                        ),
                        a.Util.requestAnimFrame(function () {
                          this._resetView(
                            this._animateToCenter,
                            this._animateToZoom,
                            !0,
                            !0
                          ),
                            a.Draggable && (a.Draggable._disabled = !1);
                        }, this));
                    },
                  }
                : {}
            ),
            a.TileLayer.include({
              _animateZoom: function (t) {
                this._animating ||
                  ((this._animating = !0), this._prepareBgBuffer());
                var e = this._bgBuffer,
                  i = a.DomUtil.TRANSFORM,
                  n = t.delta
                    ? a.DomUtil.getTranslateString(t.delta)
                    : e.style[i],
                  o = a.DomUtil.getScaleString(t.scale, t.origin);
                e.style[i] = t.backwards ? o + " " + n : n + " " + o;
              },
              _endZoomAnim: function () {
                var t = this._tileContainer,
                  e = this._bgBuffer;
                (t.style.visibility = ""),
                  t.parentNode.appendChild(t),
                  a.Util.falseFn(e.offsetWidth);
                var i = this._map.getZoom();
                (i > this.options.maxZoom || i < this.options.minZoom) &&
                  this._clearBgBuffer(),
                  (this._animating = !1);
              },
              _clearBgBuffer: function () {
                var t = this._map;
                !t ||
                  t._animatingZoom ||
                  t.touchZoom._zooming ||
                  ((this._bgBuffer.innerHTML = ""),
                  (this._bgBuffer.style[a.DomUtil.TRANSFORM] = ""));
              },
              _prepareBgBuffer: function () {
                var t = this._tileContainer,
                  e = this._bgBuffer,
                  i = this._getLoadedTilesPercentage(e),
                  n = this._getLoadedTilesPercentage(t);
                if (e && i > 0.5 && n < 0.5)
                  return (
                    (t.style.visibility = "hidden"),
                    void this._stopLoadingImages(t)
                  );
                (e.style.visibility = "hidden"),
                  (e.style[a.DomUtil.TRANSFORM] = ""),
                  (this._tileContainer = e),
                  (e = this._bgBuffer = t),
                  this._stopLoadingImages(e),
                  clearTimeout(this._clearBgBufferTimer);
              },
              _getLoadedTilesPercentage: function (t) {
                var e,
                  i,
                  n = t.getElementsByTagName("img"),
                  o = 0;
                for (e = 0, i = n.length; e < i; e++) n[e].complete && o++;
                return o / i;
              },
              _stopLoadingImages: function (t) {
                var e,
                  i,
                  n,
                  o = Array.prototype.slice.call(t.getElementsByTagName("img"));
                for (e = 0, i = o.length; e < i; e++)
                  (n = o[e]),
                    n.complete ||
                      ((n.onload = a.Util.falseFn),
                      (n.onerror = a.Util.falseFn),
                      (n.src = a.Util.emptyImageUrl),
                      n.parentNode.removeChild(n));
              },
            }),
            a.Map.include({
              _defaultLocateOptions: {
                watch: !1,
                setView: !1,
                maxZoom: 1 / 0,
                timeout: 1e4,
                maximumAge: 0,
                enableHighAccuracy: !1,
              },
              locate: function (t) {
                if (
                  ((t = this._locateOptions =
                    a.extend(this._defaultLocateOptions, t)),
                  !navigator.geolocation)
                )
                  return (
                    this._handleGeolocationError({
                      code: 0,
                      message: "Geolocation not supported.",
                    }),
                    this
                  );
                var e = a.bind(this._handleGeolocationResponse, this),
                  i = a.bind(this._handleGeolocationError, this);
                return (
                  t.watch
                    ? (this._locationWatchId =
                        navigator.geolocation.watchPosition(e, i, t))
                    : navigator.geolocation.getCurrentPosition(e, i, t),
                  this
                );
              },
              stopLocate: function () {
                return (
                  navigator.geolocation &&
                    navigator.geolocation.clearWatch(this._locationWatchId),
                  this._locateOptions && (this._locateOptions.setView = !1),
                  this
                );
              },
              _handleGeolocationError: function (t) {
                var e = t.code,
                  i =
                    t.message ||
                    (1 === e
                      ? "permission denied"
                      : 2 === e
                      ? "position unavailable"
                      : "timeout");
                this._locateOptions.setView && !this._loaded && this.fitWorld(),
                  this.fire("locationerror", {
                    code: e,
                    message: "Geolocation error: " + i + ".",
                  });
              },
              _handleGeolocationResponse: function (t) {
                var e = t.coords.latitude,
                  i = t.coords.longitude,
                  n = new a.LatLng(e, i),
                  o = (180 * t.coords.accuracy) / 40075017,
                  r = o / Math.cos(a.LatLng.DEG_TO_RAD * e),
                  s = a.latLngBounds([e - o, i - r], [e + o, i + r]),
                  l = this._locateOptions;
                if (l.setView) {
                  var h = Math.min(this.getBoundsZoom(s), l.maxZoom);
                  this.setView(n, h);
                }
                var u = { latlng: n, bounds: s, timestamp: t.timestamp };
                for (var c in t.coords)
                  "number" == typeof t.coords[c] && (u[c] = t.coords[c]);
                this.fire("locationfound", u);
              },
            });
        })(window, document);
      },
      {},
    ],
    12: [
      function (t, e, i) {
        !(function (t, n) {
          "object" == typeof i && "object" == typeof e
            ? (e.exports = n())
            : "function" == typeof define && define.amd
            ? define([], n)
            : "object" == typeof i
            ? (i.parseURI = n())
            : (t.parseURI = n());
        })(window, function () {
          return (function (t) {
            function e(n) {
              if (i[n]) return i[n].exports;
              var o = (i[n] = { i: n, l: !1, exports: {} });
              return (
                t[n].call(o.exports, o, o.exports, e), (o.l = !0), o.exports
              );
            }
            var i = {};
            return (
              (e.m = t),
              (e.c = i),
              (e.d = function (t, i, n) {
                e.o(t, i) ||
                  Object.defineProperty(t, i, {
                    configurable: !1,
                    enumerable: !0,
                    get: n,
                  });
              }),
              (e.r = function (t) {
                Object.defineProperty(t, "__esModule", { value: !0 });
              }),
              (e.n = function (t) {
                var i =
                  t && t.__esModule
                    ? function () {
                        return t.default;
                      }
                    : function () {
                        return t;
                      };
                return e.d(i, "a", i), i;
              }),
              (e.o = function (t, e) {
                return Object.prototype.hasOwnProperty.call(t, e);
              }),
              (e.p = ""),
              e((e.s = 99))
            );
          })([
            function (t, e) {
              t.exports = function (t) {
                var e = typeof t;
                return null != t && ("object" == e || "function" == e);
              };
            },
            function (t, e, i) {
              var n = i(27),
                o =
                  "object" == typeof self &&
                  self &&
                  self.Object === Object &&
                  self,
                a = n || o || Function("return this")();
              t.exports = a;
            },
            function (t, e) {
              t.exports = function (t) {
                return null != t && "object" == typeof t;
              };
            },
            function (t, e, i) {
              var n = i(67);
              t.exports = function (t, e) {
                var i = t.__data__;
                return n(e)
                  ? i["string" == typeof e ? "string" : "hash"]
                  : i.map;
              };
            },
            function (t, e, i) {
              var n = i(13)(Object, "create");
              t.exports = n;
            },
            function (t, e, i) {
              var n = i(28),
                o = i(82),
                a = i(81),
                r = n ? n.toStringTag : void 0;
              t.exports = function (t) {
                return null == t
                  ? void 0 === t
                    ? "[object Undefined]"
                    : "[object Null]"
                  : r && r in Object(t)
                  ? o(t)
                  : a(t);
              };
            },
            function (t, e) {
              t.exports = function (t, e) {
                return t === e || (t != t && e != e);
              };
            },
            function (t, e, i) {
              var n = i(6);
              t.exports = function (t, e) {
                for (var i = t.length; i--; ) if (n(t[i][0], e)) return i;
                return -1;
              };
            },
            function (t, e, i) {
              function n(t) {
                var e = -1,
                  i = null == t ? 0 : t.length;
                for (this.clear(); ++e < i; ) {
                  var n = t[e];
                  this.set(n[0], n[1]);
                }
              }
              var o = i(94),
                a = i(93),
                r = i(92),
                s = i(91),
                l = i(90);
              (n.prototype.clear = o),
                (n.prototype.delete = a),
                (n.prototype.get = r),
                (n.prototype.has = s),
                (n.prototype.set = l),
                (t.exports = n);
            },
            function (t, e, i) {
              var n = i(12),
                o = i(20);
              t.exports = function (t) {
                return null != t && o(t.length) && !n(t);
              };
            },
            function (t, e) {
              t.exports = function (t) {
                return (
                  t.webpackPolyfill ||
                    ((t.deprecate = function () {}),
                    (t.paths = []),
                    t.children || (t.children = []),
                    Object.defineProperty(t, "loaded", {
                      enumerable: !0,
                      get: function () {
                        return t.l;
                      },
                    }),
                    Object.defineProperty(t, "id", {
                      enumerable: !0,
                      get: function () {
                        return t.i;
                      },
                    }),
                    (t.webpackPolyfill = 1)),
                  t
                );
              };
            },
            function (t, e, i) {
              var n = i(25);
              t.exports = function (t, e, i) {
                "__proto__" == e && n
                  ? n(t, e, {
                      configurable: !0,
                      enumerable: !0,
                      value: i,
                      writable: !0,
                    })
                  : (t[e] = i);
              };
            },
            function (t, e, i) {
              var n = i(5),
                o = i(0);
              t.exports = function (t) {
                if (!o(t)) return !1;
                var e = n(t);
                return (
                  "[object Function]" == e ||
                  "[object GeneratorFunction]" == e ||
                  "[object AsyncFunction]" == e ||
                  "[object Proxy]" == e
                );
              };
            },
            function (t, e, i) {
              var n = i(84),
                o = i(77);
              t.exports = function (t, e) {
                var i = o(t, e);
                return n(i) ? i : void 0;
              };
            },
            function (t, e) {
              t.exports = function (t) {
                return t;
              };
            },
            function (t, e) {
              var i = /^(?:0|[1-9]\d*)$/;
              t.exports = function (t, e) {
                var n = typeof t;
                return (
                  !!(e = null == e ? 9007199254740991 : e) &&
                  ("number" == n || ("symbol" != n && i.test(t))) &&
                  t > -1 &&
                  t % 1 == 0 &&
                  t < e
                );
              };
            },
            function (t, e, i) {
              var n = i(42),
                o = i(40),
                a = i(9);
              t.exports = function (t) {
                return a(t) ? n(t, !0) : o(t);
              };
            },
            function (t, e) {
              t.exports = function (t, e) {
                return "__proto__" == e ? void 0 : t[e];
              };
            },
            function (t, e, i) {
              var n = i(48),
                o = i(47),
                a = i(46),
                r = a && a.isTypedArray,
                s = r ? o(r) : n;
              t.exports = s;
            },
            function (t, e, i) {
              (function (t) {
                var n = i(1),
                  o = i(50),
                  a = "object" == typeof e && e && !e.nodeType && e,
                  r = a && "object" == typeof t && t && !t.nodeType && t,
                  s = r && r.exports === a ? n.Buffer : void 0,
                  l = (s ? s.isBuffer : void 0) || o;
                t.exports = l;
              }).call(this, i(10)(t));
            },
            function (t, e) {
              t.exports = function (t) {
                return (
                  "number" == typeof t &&
                  t > -1 &&
                  t % 1 == 0 &&
                  t <= 9007199254740991
                );
              };
            },
            function (t, e) {
              var i = Array.isArray;
              t.exports = i;
            },
            function (t, e, i) {
              var n = i(52),
                o = i(2),
                a = Object.prototype,
                r = a.hasOwnProperty,
                s = a.propertyIsEnumerable,
                l = n(
                  (function () {
                    return arguments;
                  })()
                )
                  ? n
                  : function (t) {
                      return (
                        o(t) && r.call(t, "callee") && !s.call(t, "callee")
                      );
                    };
              t.exports = l;
            },
            function (t, e) {
              var i = Object.prototype;
              t.exports = function (t) {
                var e = t && t.constructor;
                return t === (("function" == typeof e && e.prototype) || i);
              };
            },
            function (t, e, i) {
              var n = i(53)(Object.getPrototypeOf, Object);
              t.exports = n;
            },
            function (t, e, i) {
              var n = i(13),
                o = (function () {
                  try {
                    var t = n(Object, "defineProperty");
                    return t({}, "", {}), t;
                  } catch (t) {}
                })();
              t.exports = o;
            },
            function (t, e, i) {
              var n = i(11),
                o = i(6);
              t.exports = function (t, e, i) {
                ((void 0 === i || o(t[e], i)) && (void 0 !== i || e in t)) ||
                  n(t, e, i);
              };
            },
            function (t, e, i) {
              (function (e) {
                var i = "object" == typeof e && e && e.Object === Object && e;
                t.exports = i;
              }).call(this, i(83));
            },
            function (t, e, i) {
              var n = i(1).Symbol;
              t.exports = n;
            },
            function (t, e, i) {
              var n = i(13)(i(1), "Map");
              t.exports = n;
            },
            function (t, e, i) {
              var n = i(6),
                o = i(9),
                a = i(15),
                r = i(0);
              t.exports = function (t, e, i) {
                if (!r(i)) return !1;
                var s = typeof e;
                return (
                  !!("number" == s
                    ? o(i) && a(e, i.length)
                    : "string" == s && e in i) && n(i[e], t)
                );
              };
            },
            function (t, e) {
              var i = Date.now;
              t.exports = function (t) {
                var e = 0,
                  n = 0;
                return function () {
                  var o = i(),
                    a = 16 - (o - n);
                  if (((n = o), a > 0)) {
                    if (++e >= 800) return arguments[0];
                  } else e = 0;
                  return t.apply(void 0, arguments);
                };
              };
            },
            function (t, e) {
              t.exports = function (t) {
                return function () {
                  return t;
                };
              };
            },
            function (t, e, i) {
              var n = i(32),
                o = i(25),
                a = i(14),
                r = o
                  ? function (t, e) {
                      return o(t, "toString", {
                        configurable: !0,
                        enumerable: !1,
                        value: n(e),
                        writable: !0,
                      });
                    }
                  : a;
              t.exports = r;
            },
            function (t, e, i) {
              var n = i(33),
                o = i(31)(n);
              t.exports = o;
            },
            function (t, e) {
              t.exports = function (t, e, i) {
                switch (i.length) {
                  case 0:
                    return t.call(e);
                  case 1:
                    return t.call(e, i[0]);
                  case 2:
                    return t.call(e, i[0], i[1]);
                  case 3:
                    return t.call(e, i[0], i[1], i[2]);
                }
                return t.apply(e, i);
              };
            },
            function (t, e, i) {
              var n = i(35),
                o = Math.max;
              t.exports = function (t, e, i) {
                return (
                  (e = o(void 0 === e ? t.length - 1 : e, 0)),
                  function () {
                    for (
                      var a = arguments,
                        r = -1,
                        s = o(a.length - e, 0),
                        l = Array(s);
                      ++r < s;

                    )
                      l[r] = a[e + r];
                    r = -1;
                    for (var h = Array(e + 1); ++r < e; ) h[r] = a[r];
                    return (h[e] = i(l)), n(t, this, h);
                  }
                );
              };
            },
            function (t, e, i) {
              var n = i(14),
                o = i(36),
                a = i(34);
              t.exports = function (t, e) {
                return a(o(t, e, n), t + "");
              };
            },
            function (t, e, i) {
              var n = i(37),
                o = i(30);
              t.exports = function (t) {
                return n(function (e, i) {
                  var n = -1,
                    a = i.length,
                    r = a > 1 ? i[a - 1] : void 0,
                    s = a > 2 ? i[2] : void 0;
                  for (
                    r =
                      t.length > 3 && "function" == typeof r
                        ? (a--, r)
                        : void 0,
                      s &&
                        o(i[0], i[1], s) &&
                        ((r = a < 3 ? void 0 : r), (a = 1)),
                      e = Object(e);
                    ++n < a;

                  ) {
                    var l = i[n];
                    l && t(e, l, n, r);
                  }
                  return e;
                });
              };
            },
            function (t, e) {
              t.exports = function (t) {
                var e = [];
                if (null != t) for (var i in Object(t)) e.push(i);
                return e;
              };
            },
            function (t, e, i) {
              var n = i(0),
                o = i(23),
                a = i(39),
                r = Object.prototype.hasOwnProperty;
              t.exports = function (t) {
                if (!n(t)) return a(t);
                var e = o(t),
                  i = [];
                for (var s in t)
                  ("constructor" != s || (!e && r.call(t, s))) && i.push(s);
                return i;
              };
            },
            function (t, e) {
              t.exports = function (t, e) {
                for (var i = -1, n = Array(t); ++i < t; ) n[i] = e(i);
                return n;
              };
            },
            function (t, e, i) {
              var n = i(41),
                o = i(22),
                a = i(21),
                r = i(19),
                s = i(15),
                l = i(18),
                h = Object.prototype.hasOwnProperty;
              t.exports = function (t, e) {
                var i = a(t),
                  u = !i && o(t),
                  c = !i && !u && r(t),
                  p = !i && !u && !c && l(t),
                  d = i || u || c || p,
                  m = d ? n(t.length, String) : [],
                  f = m.length;
                for (var _ in t)
                  (!e && !h.call(t, _)) ||
                    (d &&
                      ("length" == _ ||
                        (c && ("offset" == _ || "parent" == _)) ||
                        (p &&
                          ("buffer" == _ ||
                            "byteLength" == _ ||
                            "byteOffset" == _)) ||
                        s(_, f))) ||
                    m.push(_);
                return m;
              };
            },
            function (t, e, i) {
              var n = i(11),
                o = i(6),
                a = Object.prototype.hasOwnProperty;
              t.exports = function (t, e, i) {
                var r = t[e];
                (a.call(t, e) && o(r, i) && (void 0 !== i || e in t)) ||
                  n(t, e, i);
              };
            },
            function (t, e, i) {
              var n = i(43),
                o = i(11);
              t.exports = function (t, e, i, a) {
                var r = !i;
                i || (i = {});
                for (var s = -1, l = e.length; ++s < l; ) {
                  var h = e[s],
                    u = a ? a(i[h], t[h], h, i, t) : void 0;
                  void 0 === u && (u = t[h]), r ? o(i, h, u) : n(i, h, u);
                }
                return i;
              };
            },
            function (t, e, i) {
              var n = i(44),
                o = i(16);
              t.exports = function (t) {
                return n(t, o(t));
              };
            },
            function (t, e, i) {
              (function (t) {
                var n = i(27),
                  o = "object" == typeof e && e && !e.nodeType && e,
                  a = o && "object" == typeof t && t && !t.nodeType && t,
                  r = a && a.exports === o && n.process,
                  s = (function () {
                    try {
                      return r && r.binding && r.binding("util");
                    } catch (t) {}
                  })();
                t.exports = s;
              }).call(this, i(10)(t));
            },
            function (t, e) {
              t.exports = function (t) {
                return function (e) {
                  return t(e);
                };
              };
            },
            function (t, e, i) {
              var n = i(5),
                o = i(20),
                a = i(2),
                r = {};
              (r["[object Float32Array]"] =
                r["[object Float64Array]"] =
                r["[object Int8Array]"] =
                r["[object Int16Array]"] =
                r["[object Int32Array]"] =
                r["[object Uint8Array]"] =
                r["[object Uint8ClampedArray]"] =
                r["[object Uint16Array]"] =
                r["[object Uint32Array]"] =
                  !0),
                (r["[object Arguments]"] =
                  r["[object Array]"] =
                  r["[object ArrayBuffer]"] =
                  r["[object Boolean]"] =
                  r["[object DataView]"] =
                  r["[object Date]"] =
                  r["[object Error]"] =
                  r["[object Function]"] =
                  r["[object Map]"] =
                  r["[object Number]"] =
                  r["[object Object]"] =
                  r["[object RegExp]"] =
                  r["[object Set]"] =
                  r["[object String]"] =
                  r["[object WeakMap]"] =
                    !1),
                (t.exports = function (t) {
                  return a(t) && o(t.length) && !!r[n(t)];
                });
            },
            function (t, e, i) {
              var n = i(5),
                o = i(24),
                a = i(2),
                r = Function.prototype,
                s = Object.prototype,
                l = r.toString,
                h = s.hasOwnProperty,
                u = l.call(Object);
              t.exports = function (t) {
                if (!a(t) || "[object Object]" != n(t)) return !1;
                var e = o(t);
                if (null === e) return !0;
                var i = h.call(e, "constructor") && e.constructor;
                return (
                  "function" == typeof i && i instanceof i && l.call(i) == u
                );
              };
            },
            function (t, e) {
              t.exports = function () {
                return !1;
              };
            },
            function (t, e, i) {
              var n = i(9),
                o = i(2);
              t.exports = function (t) {
                return o(t) && n(t);
              };
            },
            function (t, e, i) {
              var n = i(5),
                o = i(2);
              t.exports = function (t) {
                return o(t) && "[object Arguments]" == n(t);
              };
            },
            function (t, e) {
              t.exports = function (t, e) {
                return function (i) {
                  return t(e(i));
                };
              };
            },
            function (t, e, i) {
              var n = i(0),
                o = Object.create,
                a = (function () {
                  function t() {}
                  return function (e) {
                    if (!n(e)) return {};
                    if (o) return o(e);
                    t.prototype = e;
                    var i = new t();
                    return (t.prototype = void 0), i;
                  };
                })();
              t.exports = a;
            },
            function (t, e, i) {
              var n = i(54),
                o = i(24),
                a = i(23);
              t.exports = function (t) {
                return "function" != typeof t.constructor || a(t)
                  ? {}
                  : n(o(t));
              };
            },
            function (t, e) {
              t.exports = function (t, e) {
                var i = -1,
                  n = t.length;
                for (e || (e = Array(n)); ++i < n; ) e[i] = t[i];
                return e;
              };
            },
            function (t, e, i) {
              var n = i(1).Uint8Array;
              t.exports = n;
            },
            function (t, e, i) {
              var n = i(57);
              t.exports = function (t) {
                var e = new t.constructor(t.byteLength);
                return new n(e).set(new n(t)), e;
              };
            },
            function (t, e, i) {
              var n = i(58);
              t.exports = function (t, e) {
                var i = e ? n(t.buffer) : t.buffer;
                return new t.constructor(i, t.byteOffset, t.length);
              };
            },
            function (t, e, i) {
              (function (t) {
                var n = i(1),
                  o = "object" == typeof e && e && !e.nodeType && e,
                  a = o && "object" == typeof t && t && !t.nodeType && t,
                  r = a && a.exports === o ? n.Buffer : void 0,
                  s = r ? r.allocUnsafe : void 0;
                t.exports = function (t, e) {
                  if (e) return t.slice();
                  var i = t.length,
                    n = s ? s(i) : new t.constructor(i);
                  return t.copy(n), n;
                };
              }).call(this, i(10)(t));
            },
            function (t, e, i) {
              var n = i(26),
                o = i(60),
                a = i(59),
                r = i(56),
                s = i(55),
                l = i(22),
                h = i(21),
                u = i(51),
                c = i(19),
                p = i(12),
                d = i(0),
                m = i(49),
                f = i(18),
                _ = i(17),
                g = i(45);
              t.exports = function (t, e, i, v, y, L, b) {
                var P = _(t, i),
                  x = _(e, i),
                  w = b.get(x);
                if (w) n(t, i, w);
                else {
                  var C = L ? L(P, x, i + "", t, e, b) : void 0,
                    T = void 0 === C;
                  if (T) {
                    var E = h(x),
                      D = !E && c(x),
                      S = !E && !D && f(x);
                    (C = x),
                      E || D || S
                        ? h(P)
                          ? (C = P)
                          : u(P)
                          ? (C = r(P))
                          : D
                          ? ((T = !1), (C = o(x, !0)))
                          : S
                          ? ((T = !1), (C = a(x, !0)))
                          : (C = [])
                        : m(x) || l(x)
                        ? ((C = P),
                          l(P)
                            ? (C = g(P))
                            : (!d(P) || (v && p(P))) && (C = s(x)))
                        : (T = !1);
                  }
                  T && (b.set(x, C), y(C, x, v, L, b), b.delete(x)), n(t, i, C);
                }
              };
            },
            function (t, e) {
              t.exports = function (t) {
                return function (e, i, n) {
                  for (
                    var o = -1, a = Object(e), r = n(e), s = r.length;
                    s--;

                  ) {
                    var l = r[t ? s : ++o];
                    if (!1 === i(a[l], l, a)) break;
                  }
                  return e;
                };
              };
            },
            function (t, e, i) {
              var n = i(62)();
              t.exports = n;
            },
            function (t, e, i) {
              var n = i(3);
              t.exports = function (t, e) {
                var i = n(this, t),
                  o = i.size;
                return i.set(t, e), (this.size += i.size == o ? 0 : 1), this;
              };
            },
            function (t, e, i) {
              var n = i(3);
              t.exports = function (t) {
                return n(this, t).has(t);
              };
            },
            function (t, e, i) {
              var n = i(3);
              t.exports = function (t) {
                return n(this, t).get(t);
              };
            },
            function (t, e) {
              t.exports = function (t) {
                var e = typeof t;
                return "string" == e ||
                  "number" == e ||
                  "symbol" == e ||
                  "boolean" == e
                  ? "__proto__" !== t
                  : null === t;
              };
            },
            function (t, e, i) {
              var n = i(3);
              t.exports = function (t) {
                var e = n(this, t).delete(t);
                return (this.size -= e ? 1 : 0), e;
              };
            },
            function (t, e, i) {
              var n = i(4);
              t.exports = function (t, e) {
                var i = this.__data__;
                return (
                  (this.size += this.has(t) ? 0 : 1),
                  (i[t] = n && void 0 === e ? "__lodash_hash_undefined__" : e),
                  this
                );
              };
            },
            function (t, e, i) {
              var n = i(4),
                o = Object.prototype.hasOwnProperty;
              t.exports = function (t) {
                var e = this.__data__;
                return n ? void 0 !== e[t] : o.call(e, t);
              };
            },
            function (t, e, i) {
              var n = i(4),
                o = Object.prototype.hasOwnProperty;
              t.exports = function (t) {
                var e = this.__data__;
                if (n) {
                  var i = e[t];
                  return "__lodash_hash_undefined__" === i ? void 0 : i;
                }
                return o.call(e, t) ? e[t] : void 0;
              };
            },
            function (t, e) {
              t.exports = function (t) {
                var e = this.has(t) && delete this.__data__[t];
                return (this.size -= e ? 1 : 0), e;
              };
            },
            function (t, e, i) {
              var n = i(4);
              t.exports = function () {
                (this.__data__ = n ? n(null) : {}), (this.size = 0);
              };
            },
            function (t, e, i) {
              function n(t) {
                var e = -1,
                  i = null == t ? 0 : t.length;
                for (this.clear(); ++e < i; ) {
                  var n = t[e];
                  this.set(n[0], n[1]);
                }
              }
              var o = i(73),
                a = i(72),
                r = i(71),
                s = i(70),
                l = i(69);
              (n.prototype.clear = o),
                (n.prototype.delete = a),
                (n.prototype.get = r),
                (n.prototype.has = s),
                (n.prototype.set = l),
                (t.exports = n);
            },
            function (t, e, i) {
              var n = i(74),
                o = i(8),
                a = i(29);
              t.exports = function () {
                (this.size = 0),
                  (this.__data__ = {
                    hash: new n(),
                    map: new (a || o)(),
                    string: new n(),
                  });
              };
            },
            function (t, e, i) {
              function n(t) {
                var e = -1,
                  i = null == t ? 0 : t.length;
                for (this.clear(); ++e < i; ) {
                  var n = t[e];
                  this.set(n[0], n[1]);
                }
              }
              var o = i(75),
                a = i(68),
                r = i(66),
                s = i(65),
                l = i(64);
              (n.prototype.clear = o),
                (n.prototype.delete = a),
                (n.prototype.get = r),
                (n.prototype.has = s),
                (n.prototype.set = l),
                (t.exports = n);
            },
            function (t, e) {
              t.exports = function (t, e) {
                return null == t ? void 0 : t[e];
              };
            },
            function (t, e) {
              var i = Function.prototype.toString;
              t.exports = function (t) {
                if (null != t) {
                  try {
                    return i.call(t);
                  } catch (t) {}
                  try {
                    return t + "";
                  } catch (t) {}
                }
                return "";
              };
            },
            function (t, e, i) {
              var n = i(1)["__core-js_shared__"];
              t.exports = n;
            },
            function (t, e, i) {
              var n,
                o = i(79),
                a = (n = /[^.]+$/.exec((o && o.keys && o.keys.IE_PROTO) || ""))
                  ? "Symbol(src)_1." + n
                  : "";
              t.exports = function (t) {
                return !!a && a in t;
              };
            },
            function (t, e) {
              var i = Object.prototype.toString;
              t.exports = function (t) {
                return i.call(t);
              };
            },
            function (t, e, i) {
              var n = i(28),
                o = Object.prototype,
                a = o.hasOwnProperty,
                r = o.toString,
                s = n ? n.toStringTag : void 0;
              t.exports = function (t) {
                var e = a.call(t, s),
                  i = t[s];
                try {
                  t[s] = void 0;
                  var n = !0;
                } catch (t) {}
                var o = r.call(t);
                return n && (e ? (t[s] = i) : delete t[s]), o;
              };
            },
            function (t, e) {
              var i;
              i = (function () {
                return this;
              })();
              try {
                i = i || Function("return this")() || (0, eval)("this");
              } catch (t) {
                "object" == typeof window && (i = window);
              }
              t.exports = i;
            },
            function (t, e, i) {
              var n = i(12),
                o = i(80),
                a = i(0),
                r = i(78),
                s = /^\[object .+?Constructor\]$/,
                l = Function.prototype,
                h = Object.prototype,
                u = l.toString,
                c = h.hasOwnProperty,
                p = RegExp(
                  "^" +
                    u
                      .call(c)
                      .replace(/[\\^$.*+?()[\]{}|]/g, "\\$&")
                      .replace(
                        /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
                        "$1.*?"
                      ) +
                    "$"
                );
              t.exports = function (t) {
                return !(!a(t) || o(t)) && (n(t) ? p : s).test(r(t));
              };
            },
            function (t, e, i) {
              var n = i(8),
                o = i(29),
                a = i(76);
              t.exports = function (t, e) {
                var i = this.__data__;
                if (i instanceof n) {
                  var r = i.__data__;
                  if (!o || r.length < 199)
                    return r.push([t, e]), (this.size = ++i.size), this;
                  i = this.__data__ = new a(r);
                }
                return i.set(t, e), (this.size = i.size), this;
              };
            },
            function (t, e) {
              t.exports = function (t) {
                return this.__data__.has(t);
              };
            },
            function (t, e) {
              t.exports = function (t) {
                return this.__data__.get(t);
              };
            },
            function (t, e) {
              t.exports = function (t) {
                var e = this.__data__,
                  i = e.delete(t);
                return (this.size = e.size), i;
              };
            },
            function (t, e, i) {
              var n = i(8);
              t.exports = function () {
                (this.__data__ = new n()), (this.size = 0);
              };
            },
            function (t, e, i) {
              var n = i(7);
              t.exports = function (t, e) {
                var i = this.__data__,
                  o = n(i, t);
                return (
                  o < 0 ? (++this.size, i.push([t, e])) : (i[o][1] = e), this
                );
              };
            },
            function (t, e, i) {
              var n = i(7);
              t.exports = function (t) {
                return n(this.__data__, t) > -1;
              };
            },
            function (t, e, i) {
              var n = i(7);
              t.exports = function (t) {
                var e = this.__data__,
                  i = n(e, t);
                return i < 0 ? void 0 : e[i][1];
              };
            },
            function (t, e, i) {
              var n = i(7),
                o = Array.prototype.splice;
              t.exports = function (t) {
                var e = this.__data__,
                  i = n(e, t);
                return !(
                  i < 0 ||
                  (i == e.length - 1 ? e.pop() : o.call(e, i, 1),
                  --this.size,
                  0)
                );
              };
            },
            function (t, e) {
              t.exports = function () {
                (this.__data__ = []), (this.size = 0);
              };
            },
            function (t, e, i) {
              function n(t) {
                var e = (this.__data__ = new o(t));
                this.size = e.size;
              }
              var o = i(8),
                a = i(89),
                r = i(88),
                s = i(87),
                l = i(86),
                h = i(85);
              (n.prototype.clear = a),
                (n.prototype.delete = r),
                (n.prototype.get = s),
                (n.prototype.has = l),
                (n.prototype.set = h),
                (t.exports = n);
            },
            function (t, e, i) {
              var n = i(95),
                o = i(26),
                a = i(63),
                r = i(61),
                s = i(0),
                l = i(16),
                h = i(17);
              t.exports = function t(e, i, u, c, p) {
                e !== i &&
                  a(
                    i,
                    function (a, l) {
                      if (s(a)) p || (p = new n()), r(e, i, l, u, t, c, p);
                      else {
                        var d = c ? c(h(e, l), a, l + "", e, i, p) : void 0;
                        void 0 === d && (d = a), o(e, l, d);
                      }
                    },
                    l
                  );
              };
            },
            function (t, e, i) {
              var n = i(96),
                o = i(38)(function (t, e, i, o) {
                  n(t, e, i, o);
                });
              t.exports = o;
            },
            function (t, e, i) {
              "use strict";
              function n(t) {
                return "$empty$" === t || 0 === t.length;
              }
              Object.defineProperty(e, "__esModule", { value: !0 });
              var o = i(97);
              (e.parseHash = function (t) {
                return t.hash.length
                  ? { value: t.hash }
                  : { value: null, exist: !1 };
              }),
                (e.parseUsername = function (t) {
                  return t.username.length
                    ? { value: t.username }
                    : { value: null, exist: !1 };
                }),
                (e.parseUserPassword = function (t) {
                  return t.password.length
                    ? { value: t.password }
                    : { value: null, exist: !1 };
                }),
                (e.parseProtocol = function (t) {
                  return t.protocol.length
                    ? { value: t.protocol.replace(":", "") }
                    : { value: null, exist: !1 };
                }),
                (e.parseHostname = function (t) {
                  return t.hostname.length
                    ? { value: t.hostname }
                    : { value: null, exist: !1 };
                }),
                (e.parseOrigin = function (t, e) {
                  return (
                    void 0 === e && (e = !1),
                    t.origin.length
                      ? e
                        ? { value: t.origin.substring(7) }
                        : { value: t.origin }
                      : { value: null, exist: !1 }
                  );
                }),
                (e.parsePathname = function (t) {
                  return t.pathname.length
                    ? { value: t.pathname }
                    : { value: null, exist: !1 };
                }),
                (e.parsePort = function (t) {
                  return t.port.length
                    ? { value: t.port }
                    : { value: null, exist: !1 };
                }),
                (e.parseSearch = function (t) {
                  if (t.search.length) {
                    var e = {};
                    return (
                      t.search
                        .replace("?", "")
                        .split("&")
                        .forEach(function (t) {
                          var i = t.split("="),
                            a = i[0],
                            r = i[1];
                          !(function (t, e, i) {
                            if (-1 !== e.indexOf("[")) {
                              for (
                                var a = e
                                    .replace("[]", "[$empty$]")
                                    .split(/\[|\]/)
                                    .filter(function (t) {
                                      return t.length > 0;
                                    }),
                                  r = {},
                                  s = r;
                                a.length;

                              ) {
                                var l = a.shift();
                                if (a.length >= 1) {
                                  if (n(l)) throw new Error("error");
                                  r[l]
                                    ? (r = r[l])
                                    : parseInt(l).toString() === l
                                    ? r[parseInt(l)]
                                      ? (r = r[parseInt(l)])
                                      : ((r[parseInt(l)] = {}),
                                        (r = r[parseInt(l)]))
                                    : (n(a[0]) ||
                                      parseInt(a[0]).toString() === a[0]
                                        ? r[l] || (r[l] = [])
                                        : r[l] || (r[l] = {}),
                                      (r = r[l]));
                                } else
                                  n(l)
                                    ? Array.isArray(r)
                                      ? r.push(i)
                                      : (r = [i])
                                    : (r[l] = i);
                              }
                              o(t, s, function (t, e) {
                                if (Array.isArray(t))
                                  return t.concat(e).filter(function (t) {
                                    return void 0 !== t;
                                  });
                              });
                            } else t[e] = i;
                          })(e, a, r);
                        }),
                      { value: e }
                    );
                  }
                  return { value: null, exist: !1 };
                });
            },
            function (t, e, i) {
              "use strict";
              var n = i(98);
              t.exports = function (t) {
                if (-1 === t.indexOf("://")) {
                  var e = new URL("http://" + t);
                  return {
                    hash: n.parseHash(e).value || null,
                    host: n.parseHostname(e).value || null,
                    origin: n.parseOrigin(e, !0).value || null,
                    password: n.parseUserPassword(e).value || null,
                    pathname: n.parsePathname(e).value || null,
                    port: n.parsePort(e).value || null,
                    protocol: null,
                    query: n.parseSearch(e).value || null,
                    user: n.parseUsername(e).value || null,
                  };
                }
                var i = new URL(t);
                return {
                  hash: n.parseHash(i).value || null,
                  host: n.parseHostname(i).value || null,
                  origin: n.parseOrigin(i).value || null,
                  password: n.parseUserPassword(i).value || null,
                  pathname: n.parsePathname(i).value || null,
                  port: n.parsePort(i).value || null,
                  protocol: n.parseProtocol(i).value || null,
                  query: n.parseSearch(i).value || null,
                  user: n.parseUsername(i).value || null,
                };
              };
            },
          ]);
        });
      },
      {},
    ],
    13: [
      function (t, e, i) {
        (function (t) {
          !(function (t) {
            var e = (function () {
                try {
                  return !!Symbol.iterator;
                } catch (t) {
                  return !1;
                }
              })(),
              i = function (t) {
                var i = {
                  next: function () {
                    var e = t.shift();
                    return { done: void 0 === e, value: e };
                  },
                };
                return (
                  e &&
                    (i[Symbol.iterator] = function () {
                      return i;
                    }),
                  i
                );
              },
              n = function (t) {
                return encodeURIComponent(t).replace(/%20/g, "+");
              },
              o = function (t) {
                return decodeURIComponent(String(t).replace(/\+/g, " "));
              };
            ("URLSearchParams" in t &&
              "a=1" === new t.URLSearchParams("?a=1").toString()) ||
              (function () {
                var o = function (t) {
                    Object.defineProperty(this, "_entries", {
                      writable: !0,
                      value: {},
                    });
                    var e = typeof t;
                    if ("undefined" === e);
                    else if ("string" === e) "" !== t && this._fromString(t);
                    else if (t instanceof o) {
                      var i = this;
                      t.forEach(function (t, e) {
                        i.append(e, t);
                      });
                    } else {
                      if (null === t || "object" !== e)
                        throw new TypeError(
                          "Unsupported input's type for URLSearchParams"
                        );
                      if (
                        "[object Array]" === Object.prototype.toString.call(t)
                      )
                        for (var n = 0; n < t.length; n++) {
                          var a = t[n];
                          if (
                            "[object Array]" !==
                              Object.prototype.toString.call(a) &&
                            2 === a.length
                          )
                            throw new TypeError(
                              "Expected [string, any] as entry at index " +
                                n +
                                " of URLSearchParams's input"
                            );
                          this.append(a[0], a[1]);
                        }
                      else
                        for (var r in t)
                          t.hasOwnProperty(r) && this.append(r, t[r]);
                    }
                  },
                  a = o.prototype;
                (a.append = function (t, e) {
                  t in this._entries
                    ? this._entries[t].push(String(e))
                    : (this._entries[t] = [String(e)]);
                }),
                  (a.delete = function (t) {
                    delete this._entries[t];
                  }),
                  (a.get = function (t) {
                    return t in this._entries ? this._entries[t][0] : null;
                  }),
                  (a.getAll = function (t) {
                    return t in this._entries ? this._entries[t].slice(0) : [];
                  }),
                  (a.has = function (t) {
                    return t in this._entries;
                  }),
                  (a.set = function (t, e) {
                    this._entries[t] = [String(e)];
                  }),
                  (a.forEach = function (t, e) {
                    var i;
                    for (var n in this._entries)
                      if (this._entries.hasOwnProperty(n)) {
                        i = this._entries[n];
                        for (var o = 0; o < i.length; o++)
                          t.call(e, i[o], n, this);
                      }
                  }),
                  (a.keys = function () {
                    var t = [];
                    return (
                      this.forEach(function (e, i) {
                        t.push(i);
                      }),
                      i(t)
                    );
                  }),
                  (a.values = function () {
                    var t = [];
                    return (
                      this.forEach(function (e) {
                        t.push(e);
                      }),
                      i(t)
                    );
                  }),
                  (a.entries = function () {
                    var t = [];
                    return (
                      this.forEach(function (e, i) {
                        t.push([i, e]);
                      }),
                      i(t)
                    );
                  }),
                  e && (a[Symbol.iterator] = a.entries),
                  (a.toString = function () {
                    var t = [];
                    return (
                      this.forEach(function (e, i) {
                        t.push(n(i) + "=" + n(e));
                      }),
                      t.join("&")
                    );
                  }),
                  (t.URLSearchParams = o);
              })();
            var a = t.URLSearchParams.prototype;
            "function" != typeof a.sort &&
              (a.sort = function () {
                var t = this,
                  e = [];
                this.forEach(function (i, n) {
                  e.push([n, i]), t._entries || t.delete(n);
                }),
                  e.sort(function (t, e) {
                    return t[0] < e[0] ? -1 : t[0] > e[0] ? 1 : 0;
                  }),
                  t._entries && (t._entries = {});
                for (var i = 0; i < e.length; i++)
                  this.append(e[i][0], e[i][1]);
              }),
              "function" != typeof a._fromString &&
                Object.defineProperty(a, "_fromString", {
                  enumerable: !1,
                  configurable: !1,
                  writable: !1,
                  value: function (t) {
                    if (this._entries) this._entries = {};
                    else {
                      var e = [];
                      this.forEach(function (t, i) {
                        e.push(i);
                      });
                      for (var i = 0; i < e.length; i++) this.delete(e[i]);
                    }
                    t = t.replace(/^\?/, "");
                    for (var n, a = t.split("&"), i = 0; i < a.length; i++)
                      (n = a[i].split("=")),
                        this.append(o(n[0]), n.length > 1 ? o(n[1]) : "");
                  },
                });
          })(
            void 0 !== t
              ? t
              : "undefined" != typeof window
              ? window
              : "undefined" != typeof self
              ? self
              : this
          ),
            (function (t) {
              if (
                ((function () {
                  try {
                    var e = new t.URL("b", "http://a");
                    return (
                      (e.pathname = "c%20d"),
                      "http://a/c%20d" === e.href && e.searchParams
                    );
                  } catch (t) {
                    return !1;
                  }
                })() ||
                  (function () {
                    var e = t.URL,
                      i = function (e, i) {
                        "string" != typeof e && (e = String(e));
                        var n,
                          o = document;
                        if (
                          i &&
                          (void 0 === t.location || i !== t.location.href)
                        ) {
                          (o = document.implementation.createHTMLDocument("")),
                            (n = o.createElement("base")),
                            (n.href = i),
                            o.head.appendChild(n);
                          try {
                            if (0 !== n.href.indexOf(i))
                              throw new Error(n.href);
                          } catch (t) {
                            throw new Error(
                              "URL unable to set base " + i + " due to " + t
                            );
                          }
                        }
                        var a = o.createElement("a");
                        if (
                          ((a.href = e),
                          n && (o.body.appendChild(a), (a.href = a.href)),
                          ":" === a.protocol || !/:/.test(a.href))
                        )
                          throw new TypeError("Invalid URL");
                        Object.defineProperty(this, "_anchorElement", {
                          value: a,
                        });
                        var r = new t.URLSearchParams(this.search),
                          s = !0,
                          l = !0,
                          h = this;
                        ["append", "delete", "set"].forEach(function (t) {
                          var e = r[t];
                          r[t] = function () {
                            e.apply(r, arguments),
                              s &&
                                ((l = !1), (h.search = r.toString()), (l = !0));
                          };
                        }),
                          Object.defineProperty(this, "searchParams", {
                            value: r,
                            enumerable: !0,
                          });
                        var u = void 0;
                        Object.defineProperty(this, "_updateSearchParams", {
                          enumerable: !1,
                          configurable: !1,
                          writable: !1,
                          value: function () {
                            this.search !== u &&
                              ((u = this.search),
                              l &&
                                ((s = !1),
                                this.searchParams._fromString(this.search),
                                (s = !0)));
                          },
                        });
                      },
                      n = i.prototype,
                      o = function (t) {
                        Object.defineProperty(n, t, {
                          get: function () {
                            return this._anchorElement[t];
                          },
                          set: function (e) {
                            this._anchorElement[t] = e;
                          },
                          enumerable: !0,
                        });
                      };
                    ["hash", "host", "hostname", "port", "protocol"].forEach(
                      function (t) {
                        o(t);
                      }
                    ),
                      Object.defineProperty(n, "search", {
                        get: function () {
                          return this._anchorElement.search;
                        },
                        set: function (t) {
                          (this._anchorElement.search = t),
                            this._updateSearchParams();
                        },
                        enumerable: !0,
                      }),
                      Object.defineProperties(n, {
                        toString: {
                          get: function () {
                            var t = this;
                            return function () {
                              return t.href;
                            };
                          },
                        },
                        href: {
                          get: function () {
                            return this._anchorElement.href.replace(/\?$/, "");
                          },
                          set: function (t) {
                            (this._anchorElement.href = t),
                              this._updateSearchParams();
                          },
                          enumerable: !0,
                        },
                        pathname: {
                          get: function () {
                            return this._anchorElement.pathname.replace(
                              /(^\/?)/,
                              "/"
                            );
                          },
                          set: function (t) {
                            this._anchorElement.pathname = t;
                          },
                          enumerable: !0,
                        },
                        origin: {
                          get: function () {
                            var t = { "http:": 80, "https:": 443, "ftp:": 21 }[
                                this._anchorElement.protocol
                              ],
                              e =
                                this._anchorElement.port != t &&
                                "" !== this._anchorElement.port;
                            return (
                              this._anchorElement.protocol +
                              "//" +
                              this._anchorElement.hostname +
                              (e ? ":" + this._anchorElement.port : "")
                            );
                          },
                          enumerable: !0,
                        },
                        password: {
                          get: function () {
                            return "";
                          },
                          set: function (t) {},
                          enumerable: !0,
                        },
                        username: {
                          get: function () {
                            return "";
                          },
                          set: function (t) {},
                          enumerable: !0,
                        },
                      }),
                      (i.createObjectURL = function (t) {
                        return e.createObjectURL.apply(e, arguments);
                      }),
                      (i.revokeObjectURL = function (t) {
                        return e.revokeObjectURL.apply(e, arguments);
                      }),
                      (t.URL = i);
                  })(),
                void 0 !== t.location && !("origin" in t.location))
              ) {
                var e = function () {
                  return (
                    t.location.protocol +
                    "//" +
                    t.location.hostname +
                    (t.location.port ? ":" + t.location.port : "")
                  );
                };
                try {
                  Object.defineProperty(t.location, "origin", {
                    get: e,
                    enumerable: !0,
                  });
                } catch (i) {
                  setInterval(function () {
                    t.location.origin = e();
                  }, 100);
                }
              }
            })(
              void 0 !== t
                ? t
                : "undefined" != typeof window
                ? window
                : "undefined" != typeof self
                ? self
                : this
            );
        }).call(
          this,
          "undefined" != typeof global
            ? global
            : "undefined" != typeof self
            ? self
            : "undefined" != typeof window
            ? window
            : {}
        );
      },
      {},
    ],
  },
  {},
  [7]
);
*/
