export const typeDefs = `
    type Query {
        GetAll: [String]
    }

    type Mutation {
        AddWord(word: String!): [String]
    }

    type Subscription {
        subscribeToWords: [String]
    }
`;
