import { pubsub } from "./pubsub";
import { addWord, handleGetAll } from "./utils";

export const resolvers = {
  Query: {
    GetAll: () => handleGetAll(),
  },
  Mutation: {
    AddWord: (_, { word }) => addWord(word),
  },
  Subscription: {
    subscribeToWords: {
      resolve: (message) => message,
      subscribe: () => pubsub.asyncIterator(["TRIGGER"]),
    },
  },
};
