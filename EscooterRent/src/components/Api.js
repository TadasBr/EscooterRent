import axios from "axios";

const Api = axios.create({
  baseURL: "https://localhost:7271/api",
});

const authConfig = {
  headers: {
    Authorization:  `Bearer ${sessionStorage.getItem("accessToken")}`,
  }
};

const isLoggedIn = () => sessionStorage.getItem("accessToken");

const isAdmin = () => sessionStorage.getItem("isAdmin") === "true";

const userId = () => sessionStorage.getItem("userId");

export { Api, authConfig, isLoggedIn, isAdmin, userId };