import { AsyncStorage } from "react-native";

const data = require(`src/basedata.json`)

export function fetchData() {
  return new Promise((resolve, reject) => {
    fetch("https://github.com/senolkeskin/newSucu/blob/master/tsconfig.json")   
      .then(res => {
        return data;
      })
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
}

export function loginUserService(username: string, password: string) {
  return new Promise((resolve, reject) => {
    let userToken = `${username}${password}`;
    AsyncStorage.setItem("userToken", userToken)
      .then(() => {
        resolve(userToken);
      })
      .catch(error => {
        reject(error);
      });
  });
}

export function logoutUserService() {
  return new Promise((resolve, reject) => {
    AsyncStorage.removeItem("userToken")
      .then(() => {
        resolve();
      })
      .catch(error => {
        reject(error);
      });
  });
}
