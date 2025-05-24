import axios from "axios";

const instance = axios.create({
    baseURL: "hhttps://notes-resti-be-598740328533.us-central1.run.app", // sesuaikan
    withCredentials: true,
});


export default instance;
