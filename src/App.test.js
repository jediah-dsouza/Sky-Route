import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

test('Flight Schedule PRD Verification Suite', async (t) => {
  const appTsxContent = fs.readFileSync(path.resolve('./src/App.tsx'), 'utf-8');
  const appJsContent = fs.readFileSync(path.resolve('./src/App.js'), 'utf-8');
  const schedulePageContent = fs.readFileSync(path.resolve('./src/components/FlightSchedulePage.tsx'), 'utf-8');
  const calendarContent = fs.readFileSync(path.resolve('./src/components/BackpackCalendar.tsx'), 'utf-8');

  await t.test('FR-002: Flight Schedule heading is defined in App and FlightSchedulePage', () => {
    assert.match(schedulePageContent, /<h1[^>]*>Flight Schedule<\/h1>/i, 'Must contain <h1>Flight Schedule</h1>');
  });

  await t.test('FR-003: Backpack Calendar component is rendered', () => {
    assert.match(schedulePageContent, /<BackpackCalendar/i, 'Must render BackpackCalendar component');
    assert.match(calendarContent, /bpk-calendar/i, 'Calendar should include bpk-calendar styling class');
  });

  await t.test('FR-004 & AC-005: Selected date is managed using React state', () => {
    assert.match(appTsxContent, /const\s*\[selectedDate,\s*setSelectedDate\]\s*=\s*useState/i, 'Must manage selectedDate state');
  });

  await t.test('FR-005 & AC-007: Continue button exists below calendar and displays Continue', () => {
    assert.match(schedulePageContent, /Continue/i, 'Button text must be Continue');
    assert.match(schedulePageContent, /id="continue-button"/i, 'Must contain continue-button element');
  });

  await t.test('AC-008: Does not contain the old Click me button label', () => {
    assert.doesNotMatch(schedulePageContent, />Click me</i, 'Must not contain old "Click me" text');
    assert.doesNotMatch(appTsxContent, />Click me</i, 'App must not contain old "Click me" text');
  });

  await t.test('AC-011 & AC-012: src/App.js is provided for submission deliverable', () => {
    assert.ok(fs.existsSync(path.resolve('./src/App.js')), 'src/App.js must exist');
    assert.ok(appJsContent.length > 0, 'src/App.js must not be empty');
  });
});
