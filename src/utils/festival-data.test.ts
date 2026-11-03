import test from 'node:test';
import assert from 'node:assert/strict';
import { EVENTS, filterEvents, generateTicketCode, getCountdownTime } from './festival-data';

test('EVENTS list contains valid items with required properties', () => {
  assert.ok(EVENTS.length >= 6, 'Should have at least 6 events');
  for (const event of EVENTS) {
    assert.ok(event.id, 'Event must have an id');
    assert.ok(event.title, 'Event must have a title');
    assert.ok(event.prizePool, 'Event must have a prize pool');
    assert.ok(Array.isArray(event.rules), 'Event rules must be an array');
  }
});

test('filterEvents correctly filters by category', () => {
  const allEvents = filterEvents('All');
  assert.equal(allEvents.length, EVENTS.length);

  const hackathons = filterEvents('Hackathon');
  assert.equal(hackathons.length, 1);
  assert.equal(hackathons[0].id, 'hack-matrix');

  const robotics = filterEvents('Robotics');
  assert.equal(robotics.length, 1);
  assert.equal(robotics[0].id, 'robo-wars');
});

test('generateTicketCode produces expected string format', () => {
  const ticket = generateTicketCode('John Doe', 'john@example.com', 'VIP');
  assert.ok(ticket.startsWith('TF26-VIP-JOH'), 'Ticket code should match pattern');
  assert.equal(ticket.split('-').length, 4, 'Ticket should have 4 dash-separated parts');
});

test('getCountdownTime computes remaining time correctly', () => {
  const future = Date.now() + 1000 * (3600 * 25 + 120 + 5); // 1 day, 1 hour, 2 min, 5 sec
  const res = getCountdownTime(future);
  assert.equal(res.days, 1);
  assert.equal(res.hours, 1);
  assert.equal(res.minutes, 2);
  assert.equal(res.seconds, 5);
});
