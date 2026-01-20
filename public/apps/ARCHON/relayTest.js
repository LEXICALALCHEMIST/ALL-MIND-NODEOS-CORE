// src/apps/ARCHON/relayTest.js — Mock Drone Relay (Simulates Pi Execution)

import nodeWire from './nodeWire.js';  // Intent bus

console.log('[RELAY TEST] Mock relay awakened — listening for intents');

nodeWire.on('flight-command', (intent) => {
  const { droneId, cmd } = intent;

  console.log(`[RELAY TEST] Received intent for ${droneId}: ${cmd}`);

  if (cmd === 'takeoff') {
    console.log('[RELAY TEST] TAKEOFF EXECUTED — CRTP packets sent (simulated)');
    nodeWire.emit('exoprint', {
      droneId,
      status: 'airborne',
      altitude: 50,
      timestamp: Date.now()
    });
  } else {
    console.log('[RELAY TEST] Unknown command: ${cmd}');
  };
});