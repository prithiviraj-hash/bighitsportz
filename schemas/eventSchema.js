const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList } = require('graphql');
const participants = require('../data/participantData');
const participantsObj = require('./participantsSchema');
const _ = require('lodash');

const eventObj = new GraphQLObjectType({
    name: 'event',
    fields: () => ({
        eventId: { type: GraphQLString },
        eventName: { type: GraphQLString },
        eventType: { type: GraphQLString },
        eventDate: { type: GraphQLString },
        participantsLimit: { type: GraphQLInt },
        totalNoOfParticipants: { type: GraphQLInt },
        participants: {
            type: new GraphQLList(participantsObj),
            resolve(parent, args) {
                return _.filter(participants, participant => participant.eventId.includes(parent.eventId));
            }
        }
    })
});

module.exports = eventObj;
