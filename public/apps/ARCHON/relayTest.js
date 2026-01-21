// src/apps/archon/relayTest.js — Mock Relay

import nodeWire from './nodeWire.js';

console.log('[RELAY TEST] Mock relay listening');

nodeWire.on('flight-command', (intent) => {
  const { droneId, cmd } = intent;
  console.log(`[RELAY TEST] Received: ${cmd} for ${droneId}`);

  if (cmd === 'takeoff') {
    console.log('[RELAY TEST] TAKEOFF EXECUTED — CRTP packets sent (simulated)');
    nodeWire.emit('exoprint', {  // ← Type string FIRST, payload object SECOND
      droneId,
      status: 'airborne',
      altitude: 50,
      timestamp: Date.now()
    });
  }
});