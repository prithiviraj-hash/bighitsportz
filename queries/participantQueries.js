const participantsObj = require('../schemas/participantsSchema');
const _ = require('lodash');
const { GraphQLObjectType, GraphQLString, GraphQLList } = require('graphql');
const participants = require('../data/participantData');

const participantQuery = new GraphQLObjectType({
    name: 'ParticipantQuery',
    fields: {
        participantsDetail: {
            type: participantsObj,
            args: { 
                id: { type: GraphQLString }
            },
            resolve(parent, args) {
                return _.find(participants, { userId: args.id });
            }
        },
        participantsDetails: {
            type: new GraphQLList(participantsObj),
            resolve(parent, args) {
                return participants;
            }
        }
    }
});

module.exports = participantQuery;
