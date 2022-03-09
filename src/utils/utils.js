import axios from "axios";
import { store } from "redux/store";

export const base_url = "https://api.giftly.me/api/v1";

export const authService = () => {
  axios.interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    },
    function (error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      if (error.response.status === 401) {
        store.dispatch(setLoggedIn(false));
      }

      return Promise.reject(error);
    }
  );
};

export const INDUSTRIES = [
  "Arts and Entertainment",
  "Automotive",
  "Beauty and Fitness",
  "Books and Literature",
  "Business and Industrial Markets",
  "Computers and Electronics",
  "Finance",
  "Food and Drink",
  "Games",
  "Healthcare",
  "Hobbies and Leisure",
  "Home and Garden",
  "Internet and Telecoms",
  "Jobs and Education",
  "Law and Government",
  "News",
  "Online Communities",
  "People and Society",
  "Pets and Animals",
  "Real Estate",
  "Reference",
  "Science",
  "Shopping",
  "Sports",
];

export const formDataToJSON = (formData) => {
  let object = {};

  formData.forEach((value, key) => {
    // Reflect.has in favor of: object.hasOwnProperty(key)
    if (!Reflect.has(object, key)) {
      object[key] = value;
      return;
    }
    if (!Array.isArray(object[key])) {
      object[key] = [object[key]];
    }
    object[key].push(value);
  });

  return object;
};

export const parseJSON = (str) => JSON.parse(str);

export const parseDate = (d) => Date.parse(d);

export const getFormattedTime = (timestamp) => {
  let unix_timestamp = timestamp;

  let date = new Date(parseInt(unix_timestamp));
  // Hours part from the timestamp
  let hours = "0" + date.getHours();
  // Minutes part from the timestamp
  let minutes = "0" + date.getMinutes();

  let formattedTime;

  // Will display time in 10:30 am format
  if (date.getHours() >= 12) {
    formattedTime = hours.substr(-2) + ":" + minutes.substr(-2) + " pm";
  } else {
    formattedTime = hours.substr(-2) + ":" + minutes.substr(-2) + " am";
  }

  return formattedTime;
};

export const getFormattedDate = (timestamp, tomorrow = false) => {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  let unix_timestamp = timestamp;

  let date = new Date(parseInt(unix_timestamp));

  let month = monthNames[date.getMonth()];

  let day = "0" + date.getDate();

  let year = new Date(parseInt(unix_timestamp)).toLocaleString("en-US", {
    year: "numeric",
  });

  let formattedDate;

  if (tomorrow) {
    day = "0" + (date.getDate() + 1);
    formattedDate = day.substr(-2) + " " + month + " " + year;
  } else {
    formattedDate = day.substr(-2) + " " + month + " " + year;
  }

  return formattedDate;
};

export const isOnline = () => {
  return window.navigator.onLine;
};

export const greyFilter =
  "brightness(0%) saturate(100%) invert(93%) sepia(0%) saturate(326%) hue-rotate(139deg) brightness(84%) contrast(93%);";

export function getFormData(object) {
  const formData = new FormData();
  Object.keys(object).forEach((key) => {
    let val = object[key];
    if (typeof val === "object") {
      val = JSON.stringify(val);
    }
    formData.append(key, val);
  });
  return formData;
}

export const media_base_url =
  "https://postpaddy-s.fra1.digitaloceanspaces.com/Postpaddy";

export function isToday(someDate) {
  if (!someDate) return;

  const d = new Date(parseInt(someDate));
  const today = new Date();

  return (
    d.getDate() === today.getDate() &&
    d.getMonth() === today.getMonth() &&
    d.getFullYear() === today.getFullYear()
  );
}

export function isTomorrow(someDate) {
  if (!someDate) return;

  const d = new Date(parseInt(someDate));
  const today = new Date();
  const tomorrow = new Date(today.setDate(today.getDate() + 1));

  return (
    d.getDate() === tomorrow.getDate() &&
    d.getMonth() === tomorrow.getMonth() &&
    d.getFullYear() === tomorrow.getFullYear()
  );
}

export function isLater(someDate) {
  if (!someDate) return;

  const d = new Date(parseInt(someDate));
  const today = new Date();
  const tomorrow = new Date(today.setDate(today.getDate() + 1));

  return d.getTime() > tomorrow.getTime();
}

export function isYesterday(someDate) {
  if (!someDate) return;

  const d = new Date(parseInt(someDate));
  const today = new Date();
  const yesterday = new Date(today.setDate(today.getDate() - 1));

  return (
    d.getDate() === yesterday.getDate() &&
    d.getMonth() === yesterday.getMonth() &&
    d.getFullYear() === yesterday.getFullYear()
  );
}

export function isOlder(someDate) {
  if (!someDate) return;

  const d = new Date(parseInt(someDate));
  const today = new Date();
  const yesterday = new Date(today.setDate(today.getDate() - 1));

  return d.getTime() < yesterday.getTime();
}

export function isSameDay(d1, d2) {
  if (!d1 || !d2) return;

  const d = new Date(parseInt(d1));
  const current = new Date(d2);

  return (
    d.getDate() === current.getDate() &&
    d.getMonth() === current.getMonth() &&
    d.getFullYear() === current.getFullYear()
  );
}

export const getFileSize = (size) => {
  return size < 1000
    ? `${size.toFixed(1)} b`
    : size > 1000 && size < 1000 * 1000
    ? `${(size / 1000).toFixed(1)} kb`
    : `${(size / 1000 / 1000).toFixed(1)} mb`;
};
