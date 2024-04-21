const eventObj = require('../schemas/eventSchema');
const _ = require('lodash');
const { GraphQLObjectType, GraphQLString, GraphQLList } = require('graphql');
const events = require('../data/eventData');

const eventQuery = new GraphQLObjectType({
    name: 'EventQuery',
    fields: {
        eventDetail: {
            type: eventObj,
            args: { 
                eventId: { type: GraphQLString }
            },
            resolve(parent, args) {
                return _.find(events, { eventId: args.eventId });
            }
        },
        eventDetails: {
            type: new GraphQLList(eventObj),
            resolve(parent, args) {
                return events;
            }
        }
    }
});

module.exports = eventQuery;
