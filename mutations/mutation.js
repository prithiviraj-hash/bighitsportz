const { GraphQLObjectType, GraphQLString, GraphQLInt } = require('graphql');
const { v4: uuidv4 } = require('uuid');
const eventObj = require('../schemas/eventSchema');
const events = require('../data/eventData');
const participantsObj = require('../schemas/participantsSchema');
const participants = require('../data/participantData');
const { STATUS_CODES } = require('http');

const Rootmutation = new GraphQLObjectType({
    name: 'RootMutation',
    fields: {
        createEvent: {
            type: eventObj,
            args: {
                eventName: { type: GraphQLString },
                eventType: { type: GraphQLString },
                eventDate: { type: GraphQLString },
                participantsLimit: { type: GraphQLInt }
            },
            resolve(parent, args) {
                const uuid = uuidv4();
                let EventIndex = events.findIndex(event => event.eventName.trim().toLowerCase() === args.eventName.trim().toLowerCase());
                if (EventIndex == -1) {
                    const newEvent = {
                        eventId: uuid,
                        eventName: args.eventName.trim(),
                        eventType: args.eventType,
                        eventDate: args.eventDate,
                        participantsLimit: args.participantsLimit,
                        totalNoOfParticipants: 0
                    };
                    events.push(newEvent);
                    return newEvent;
                } else {
                    throw new Error("Event Already Exists...");
                }
            }
        },
        updateEvent: {
            type: eventObj,
            args: {
                eventId: { type: GraphQLString },
                eventName: { type: GraphQLString },
                eventType: { type: GraphQLString },
                eventDate: { type: GraphQLString }
            },
            resolve(parent, args) {
                const index = events.findIndex(event => event.eventId === args.eventId);
                if (index !== -1) {
                    events[index].eventName = args.eventName || events[index].eventName;
                    events[index].eventType = args.eventType || events[index].eventType;
                    events[index].eventDate = args.eventDate || events[index].eventDate;
                    return events[index];
                } else {
                    throw new Error("Event not found..");
                }
            }
        },
        deleteEvent: {
            type: eventObj,
            args: {
                eventId: { type: GraphQLString }
            },
            resolve(parent, args) {
                const index = events.findIndex(event => event.eventId === args.eventId);
                if (index !== -1) {
                    events.splice(index, 1);
                    return "Event Deleted Successfully";
                } else {
                    throw new Error("Event not found");
                }
            }
        },
        registerToEvent: {
            type: participantsObj,
            args: {
                participantName: { type: GraphQLString },
                age: { type: GraphQLInt },
                email: { type: GraphQLString },
                phone: { type: GraphQLString },
                eventId: { type: GraphQLString }
            },
            resolve(parent, args) {
                const uuid = uuidv4();
                const participantIndex = participants.findIndex(person => person.email.trim().toLowerCase() === args.email.trim().toLowerCase());
                if (participantIndex !== -1) {
                    const eventExist = events.findIndex(event => event.eventId === args.eventId);
                    if (eventExist !== -1) {
                        if (events[eventExist].totalNoOfParticipants < events[eventExist].participantsLimit) {
                            const eventIndex = participants[participantIndex].eventId.findIndex(event => event === args.eventId);
                            if (eventIndex == -1) {
                                events[eventExist].totalNoOfParticipants = events[eventExist].totalNoOfParticipants + 1;
                                participants[participantIndex].eventId.push(args.eventId);
                                return participants[participantIndex];
                            } else {
                                throw new Error("You are Already Registered for this event");
                            }
                        } else {
                            throw new Error("Registration is closed..");
                        }
                    } else {
                        throw new Error("The Event you are trying to register is no longer exists, or check the eventId once..");
                    }
                } else {
                    const eventExist = events.findIndex(event => event.eventId === args.eventId);
                    if (eventExist !== -1) {
                        if (events[eventExist].totalNoOfParticipants < events[eventExist].participantsLimit) {
                            let eventIdvalue = [];
                            eventIdvalue.push(args.eventId);
                            const newParticipant = {
                                userId: uuid,
                                participantName: args.participantName,
                                age: args.age,
                                email: args.email,
                                phone: args.phone,
                                eventId: eventIdvalue
                            };
                            participants.push(newParticipant);
                            events[eventExist].totalNoOfParticipants = events[eventExist].totalNoOfParticipants + 1;
                            return newParticipant;
                        } else {
                            throw new Error("Registration is closed..");
                        }
                    } else {
                        throw new Error("The Event you are trying to register is no longer exists, or check the eventId once..");
                    }
                }
            }
        }
    }
});

module.exports = Rootmutation;
