// src/apps/archon/nodeWire.js — Intent Event Bus (Pub/Sub)

const listeners = new Map(); // eventType → Set<callback>

export const nodeWire = {
  emit(event) {
    const { type, ...payload } = event;
    console.log(`[NODEWIRE] Emitting: ${type}`, payload);

    const callbacks = listeners.get(type);
    if (callbacks) {
      callbacks.forEach(cb => cb(payload));
    }
  },

  on(eventType, callback) {
    if (!listeners.has(eventType)) {
      listeners.set(eventType, new Set());
    }
    listeners.get(eventType).add(callback);
    return () => nodeWire.off(eventType, callback); // Unsubscribe
  },

  off(eventType, callback) {
    const callbacks = listeners.get(eventType);
    if (callbacks) {
      callbacks.delete(callback);
      if (callbacks.size === 0) {
        listeners.delete(eventType);
      }
    }
  },

  once(eventType, callback) {
    const wrapped = (payload) => {
      callback(payload);
      nodeWire.off(eventType, wrapped);
    };
    nodeWire.on(eventType, wrapped);
  },

  clear() {
    listeners.clear();
  }
};

// Export as singleton
export default nodeWire;