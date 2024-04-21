const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList } = require('graphql');

const participantsObj = new GraphQLObjectType({
    name: 'participantsType',
    fields: () => ({
        eventId: { type: new GraphQLList(GraphQLString) },
        userId: { type: GraphQLString },
        participantName: { type: GraphQLString },
        age: { type: GraphQLInt },
        email: { type: GraphQLString },
        phone: { type: GraphQLString }
    })
});

module.exports = participantsObj;
