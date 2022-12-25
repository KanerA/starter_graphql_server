import fs from "fs";
import path from "path";
import { pubsub } from "./pubsub";
import dataFile from "./data.json";

export const handleGetAll = () => dataFile as string[];

export const addWord = (word: string) => {
  fs.writeFileSync(
    path.resolve(__dirname, "./data.json"),
    JSON.stringify([...dataFile, word])
  );
  pubsub.publish("TRIGGER", [word]);
  return ["success"];
};
