const { GraphQLObjectType } = require('graphql');
const eventQuery = require('./eventQueries');
const participantQuery = require('./participantQueries');

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryObj',
    fields: {
        event: {
            type: eventQuery,
            resolve() {
                return {};
            }
        },
        participant: {
            type: participantQuery,
            resolve() {
                return {};
            }
        }
    }
});

module.exports = RootQuery;
