import axios, { AxiosResponse } from "axios";
import { WriteStream, createWriteStream } from "fs";

let maxAlbumID: number = 100000000;
const apiUrl: string = "https://boom.ru/redirect/album/";

const fileStream: WriteStream = createWriteStream("results.txt", {
  flags: "a",
});

const vkBrute = async (): Promise<void> => {
  console.log("Поиск анрелизов запущен.");
  for (let i = 0; i < maxAlbumID; i++) {
    const htmlCode: string = await axios
      .get(`${apiUrl}${i}`)
      .then((response) => response.data);
    if (htmlCode.includes("не вышел")) {
      console.log(`${apiUrl}${i} - Анрелиз`);
      fileStream.write(`${apiUrl}${i} - Анрелиз`, "utf-8", (err) =>
        err ? console.error(err) : null
      );
    }
  }
};

vkBrute();
