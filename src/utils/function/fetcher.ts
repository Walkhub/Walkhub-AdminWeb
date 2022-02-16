import axios from "axios";
import instance from "../axios";

const fetcher = (url: string) => instance.get(url).then(res => res.data);

export default fetcher;
