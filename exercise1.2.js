/*###########Event_DataType class############*/

class Event_DataType {
  constructor(time, place, type, unit) {
    this.place = place;
    this.time = time;
    this.type = type;
    this.unit = unit;
  }
  getTime() {
    return this.time;
  }
  getPlace() {
    return this.place;
  }
  getType() {
    return this.type;
  }
  getUnit() {
    return this.unit;
  }
}

/*############# WeatherData Class ############*/

class WeatherData extends Event_DataType {
  constructor(time, place, type, unit, value) {
    super(time, place, type, unit);
    this.value = value;
  }
  getValue() {
    return this.value;
  }
}

/*###########Temperature Class#########*/

class Temperature extends WeatherData {
  constructor(time, place, type, unit, value) {
    super(time, place, type, unit, value);
  }
  convertToF() {
    if (this.unit === "C") {
      this.unit = "F";
      this.value = this.value * 1.8 + 32;
    }
  }
  convertToC() {
    if (this.unit === "F") {
      this.unit = "C";
      this.value = (this.value - 32) / 1.8;
    }
  }
}

/*##########Precipitation Class########*/

class Precipitation extends WeatherData {
  constructor(time, place, type, unit, value) {
    super(time, place, type, unit, value);
  }
  getPrecipitationType() {
    return WeatherData.getType();
  }
  convertToInches() {
    if (this.unit === "MM") {
      this.unit = "Inches";
      this.value = this.value / 25.4;
    }
  }
  convertToMM() {
    if (this.unit === "Inches") {
      this.unit = "MM";
      this.value = this.value * 25.4;
    }
  }
}
/*##############Wind Class#############*/

class Wind extends WeatherData {
  constructor(time, place, type, unit, value, direction) {
    super(time, place, type, unit, value);
    this.direction = direction;
  }
  getDirection() {
    return this.direction;
  }
  convertToMPH() {
    if (this.unit === "MS") {
      this.unit = "MPH";
      this.value = this.value * 2.237;
    }
  }
  convertToMS() {
    if (this.unit === "MPH") {
      this.unit = "MS";
      this.value = this.value / 2.237;
    }
  }
}

/*#########CloudCoverage Class#########*

/* this class is originally empty so I got creative :))*/
class CloudCoverage extends WeatherData {
  constructor(time, place, type, unit, value, sky) {
    super(time, place, type, unit, value);
    this.sky = sky;
  }
  getSkyStatus() {
    switch (this.value) {
      case 0:
        this.sky = "the sky is empty";
        break;
      case 1:
        this.sky = "Clear";
        break;
      case 2:
        this.sky = "Clear";
        break;
      case 3:
        this.sky = "Kinda cloudy";
        break;
      case 4:
        this.sky = "Half Cloudy";
        break;
      case 5:
        this.sky = "Half Cloudy";
        break;
      case 6:
        this.sky = "very Cloudy";
        break;
      case 7:
        this.sky = "very Cloudy";
        break;
      case 8:
        this.sky = "Completely Cloudy";
        break;
      case 9:
        this.sky = "obstructed from view";
    }
    return "the sky is " + this.sky;
  }
}

/*##########DateInterval Class#########*/

class DateInterval {
  constructor(from, to) {
    this.from = from;
    this.to = to;
  }
  getFrom() {
    return this.from;
  }
  getTo() {
    return this.to;
  }
  contains(date) {
    if (date >= this.from && date <= this.to) {
      return true;
    } else {
      return false;
    }
  }
}

/*#########WeatherHistory Class########*/
class WeatherHistory {
  constructor(data, placeFilter, typeFilter, periodFilter) {
    this.data = data;
    this.placeFilter = placeFilter;
    this.typeFilter = typeFilter;
    this.periodFilter = periodFilter;
  }
  getData() {
    return this.data;
  }
  setPlaceFilter(arg) {
    this.placeFilter = arg;
  }
  getPlaceFilter() {
    return this.placeFilter;
  }
  clearPlaceFilter() {
    this.placeFilter = "";
  }
  setTypeFilter(arg) {
    this.typeFilter = arg;
  }
  getTypeFilter() {
    return this.typeFilter;
  }
  clearTypeFilter() {
    this.periodFilter = "";
  }
  setPeriodFilter(arg) {
    this.periodFilter = arg;
  }
  getPeriodFilter() {
    return this.periodFilter;
  }
  clearPeriodFilter() {
    this.periodFilter = "";
  }
  convertToUSUnits() {
    data.forEach((item) => {
      if (item.getType() === "Wind") {
        item.convertToMPH();
      } else if (item.getType() === "Temperature") {
        item.convertToF();
      } else if (item.getType() === "Precipitation") {
        item.convertToInches();
      }
    });
  }
  convertToInternationalUnit() {
    data.forEach((item) => {
      if (item.getType() === "Wind") {
        item.convertToMS();
      } else if (item.getType() === "Temperature") {
        item.convertToC();
      } else if (item.getType() === "Precipitation") {
        item.convertToMM();
      }
    });
  }
  addNew(newData) {
    this.data.push(newData);
  }
  getFilteredData() {
    this.data.filter(
      (item) =>
        item.getPlace() === this.placeFilter ||
        item.getType() === this.typeFilter ||
        this.getPeriodFilter().contains(item.time)
    );
  }
}

/*########tester#######*/
//WEATHER HISTORY TESTING
const fromTester = new Date("December 17, 1995 03:24:00");
const toTester = new Date("December 17, 2021 05:00:00");

let inter = new DateInterval(fromTester, toTester);
const currentTime = new Date("September 17, 2000 15:35:00");

const data1 = new Wind("West", currentTime, "Horsens", "Wind", "MS", 3);
const data2 = new Wind(
  (direction = "East"),
  (time = currentTime),
  (place = "Aarhus"),
  (type = "Wind"),
  (unit = "MPH"),
  (value = 15)
);

const data3 = new Temperature(
  "",
  (place = "Horsens"),
  (type = "Temperature"),
  (unit = "C"),
  (value = 30)
);
const data4 = new Temperature(
  (time = currentTime),
  (place = "Aarhus"),
  (type = "Temperature"),
  (unit = "F"),
  (value = 69)
);

const data5 = new Precipitation(
  (time = currentTime),
  (place = "Horsens"),
  (type = "Precipitation"),
  (unit = "MM"),
  (value = 30)
);
const data6 = new Precipitation(
  (time = currentTime),
  (place = "Aarhus"),
  (type = "Precipitation"),
  (unit = "Inch"),
  (value = 3)
);

dataList = [data1, data2, data3, data4, data5, data6];
// console.log(dataList)
//console.log(dataList)
const history = new WeatherHistory(dataList, "", "", "");

//history.setTypeFilter('Temperature')
//history.setPeriodFilter(inter)
// console.log(history)
//history.addNew(dataList)
history.setPlaceFilter("Horsens");
// console.log(history.getFilteredData())
list = history.getFilteredData();
console.log(list);

class WeatherPrediction extends Event_DataType {
  constructor(time, place, type, unit, min, max, data) {
    super(time, place, type, unit);
    this.min = min;
    this.max = max;
    this.data = data;
  }

  matches(data) {
    return data === this.data;
  }

  getMax() {
    return this.max;
  }

  getMin() {
    return this.min;
  }
}

class TemperaturePrediction extends WeatherPrediction {
  constructor(time, place, type, unit, min, max, data) {
    super(time, place, type, unit, min, max, data);
  }

  convertToF() {
    if (this.unit === "C") {
      this.unit = "F";
      this.value = this.value * 1.8 + 32;
    }
  }

  convertToC() {
    if (this.unit === "F") {
      this.unit = "C";
      this.value = (this.value - 32) / 1.8;
    }
  }

  toString() {}
}
