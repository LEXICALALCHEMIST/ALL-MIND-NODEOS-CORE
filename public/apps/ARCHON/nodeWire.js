// src/apps/archon/nodeWire.js — Fixed Intent Bus

const listeners = new Map();

const nodeWire = {
  emit(type, payload = {}) {
    console.log(`[NODEWIRE] EMIT → ${type}`, payload);

    const cbs = listeners.get(type);
    if (cbs) {
      [...cbs].forEach(cb => cb(payload));
    }
  },

  on(type, callback) {
    if (!listeners.has(type)) listeners.set(type, new Set());
    listeners.get(type).add(callback);
    return () => nodeWire.off(type, callback);
  },

  off(type, callback) {
    const cbs = listeners.get(type);
    if (cbs) {
      cbs.delete(callback);
      if (cbs.size === 0) listeners.delete(type);
    }
  },

  clear() {
    listeners.clear();
  }
};

export default nodeWire;