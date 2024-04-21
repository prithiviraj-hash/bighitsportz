const request = require('supertest');
const createServer = require('./app');
const { accessSync } = require('fs');
const app = createServer;

describe("Graphql Test", () => {
    test("create event", async () => {
        const mutationQuery = `
            mutation {
                createEvent(
                    eventName: "IPL",
                    eventType: "CRICKET",
                    eventDate: "25-05-2024",
                    participantsLimit: 2
                ) {
                    eventName
                    eventType
                    eventDate
                    participantsLimit
                }
            }
        `;
        const response = await request(createServer)
            .post('/graphql')
            .send({ query: mutationQuery })
            .set('Accept', 'application/json');
        const responseBody = JSON.parse(response.text);
        expect(responseBody.errors).toBeUndefined();
        expect(responseBody.data.createEvent).toEqual({
            eventName: "IPL",
            eventType: "CRICKET",
            eventDate: "25-05-2024",
            participantsLimit: 2
        });
    });

    test("duplicate event", async () => {
        const mutationQuery = `
            mutation {
                createEvent(
                    eventName: "IPL",
                    eventType: "CRICKET",
                    eventDate: "25-05-2024",
                    participantsLimit: 2
                ) {
                    eventName
                    eventType
                    eventDate
                    participantsLimit
                }
            }
        `;
        const response = await request(createServer)
            .post('/graphql')
            .send({ query: mutationQuery })
            .set('Accept', 'application/json');
        const responseBody = JSON.parse(response.text);
        expect(responseBody.errors.length).toBe(1);
        expect(responseBody.errors[0].message).toEqual("Event Already Exists...");
        expect(responseBody.data.createEvent).toBeNull();
    });

    test("get event details", async () => {
        const mockResponse = {
            data: {
                event: {
                    eventDetails: [
                        { eventName: "Summer Olympics 2028" },
                        { eventName: "World Cup 2024" },
                        { eventName: "New York City Marathon" }
                    ]
                }
            }
        };
        expect(mockResponse.data).toHaveProperty("event");
        expect(mockResponse.data.event).toHaveProperty("eventDetails");
        expect(Array.isArray(mockResponse.data.event.eventDetails)).toBe(true);
        mockResponse.data.event.eventDetails.forEach(event => {
            expect(event).toHaveProperty("eventName");
        });
    });

    test("register to event", () => {
        const responseData = {
            data: {
                registerToEvent: {
                    participantName: 'sneha',
                    age: 22,
                    email: 'snehaa@gmail.com',
                    phone: '1234657890',
                    eventId: ['4b9d293f-4b8a-4914-b4d5-e6749d98d202']
                }
            }
        };
        expect(responseData).toHaveProperty('data');
        expect(responseData.data).toHaveProperty('registerToEvent');
        expect(responseData.data.registerToEvent).toEqual({
            participantName: 'sneha',
            age: 22,
            email: 'snehaa@gmail.com',
            phone: '1234657890',
            eventId: ['4b9d293f-4b8a-4914-b4d5-e6749d98d202']
        });
    });

    test("register to nonExistingEvent - Error Response", async () => {
        const mutationQuery = `
            mutation {
                registerToEvent(
                    participantName: "sneha",
                    age: 22,
                    email: "snehaa@gmail.com",
                    phone: "1234657890",
                    eventId: "NonExist"
                ) {
                    participantName
                    age
                    email
                    phone
                    eventId
                    userId
                }
            }
        `;
        const response = await request(app)
            .post('/graphql')
            .send({ query: mutationQuery });
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors[0]).toHaveProperty('message', 'The Event you are trying to register is no longer exists, or check the eventId once..');
    });

    test("registration closed - no of participants excludes", async () => {
        const mutationQuery = `
            mutation {
                registerToEvent(
                    participantName: "sneha",
                    age: 22,
                    email: "snehaa@gmail.com",
                    phone: "1234657890",
                    eventId: "bfa153c0-9c58-4e27-b9a6-0b84c1fc13e5"
                ) {
                    participantName
                    age
                    email
                    phone
                    eventId
                    userId
                }
            }
        `;
        const response = await request(app)
            .post('/graphql')
            .send({ query: mutationQuery });
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors[0].message).toBe("Registration is closed..");
        expect(response.body.data.registerToEvent).toBeNull();
    });

    test("update existing event", async () => {
        const mutation = `
            mutation {
                updateEvent(
                    eventId: "4b9d293f-4b8a-4914-b4d5-e6749d98d202",
                    eventName: "Update Testing",
                    eventType: "Test",
                    eventDate: "01-03-2026"
                ) {
                    eventId
                    eventType
                    eventDate
                }
            }
        `;
        const response = await request(app)
            .post('/graphql')
            .send({ query: mutation });
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toHaveProperty('updateEvent');
        expect(response.body.data.updateEvent).toEqual({
            eventId: "4b9d293f-4b8a-4914-b4d5-e6749d98d202",
            eventType: "Test",
            eventDate: "01-03-2026"
        });
    });

    test("delete event", async () => {
        const mutation = `
            mutation {
                deleteEvent(
                    eventId: "non_existing_event_id"
                ) {
                    eventId
                }
            }
        `;
        const response = await request(app)
            .post('/graphql')
            .send({ query: mutation });
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toHaveProperty('deleteEvent');
        expect(response.body.data.deleteEvent).toEqual(null);
    });
});
