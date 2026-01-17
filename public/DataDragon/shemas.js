// src/dataDragon.js — Mock DataDragon with provider switch

class DataDragon {
  constructor() {
    this.providers = {
      local: {
        name: "Local Storage",
        save: (id, data) => {
          try {
            localStorage.setItem(`dragon_${id}`, JSON.stringify(data));
            console.log(`[LOCAL] Saved imprint ${id}`);
            return true;
          } catch (e) {
            console.error("[LOCAL] Save failed", e);
            return false;
          }
        },
        load: (id) => {
          const raw = localStorage.getItem(`dragon_${id}`);
          if (raw) {
            console.log(`[LOCAL] Loaded imprint ${id}`);
            return JSON.parse(raw);
          }
          console.log(`[LOCAL] No data for ${id}`);
          return null;
        }
      },

      flash: {
        name: "Flash (Ephemeral Memory)",
        save: (id, data) => {
          // Simulate in-memory flash (clears on reload)
          window.__flashCache = window.__flashCache || {};
          window.__flashCache[id] = data;
          console.log(`[FLASH] Saved imprint ${id} (ephemeral)`);
          return true;
        },
        load: (id) => {
          if (window.__flashCache && window.__flashCache[id]) {
            console.log(`[FLASH] Loaded imprint ${id}`);
            return window.__flashCache[id];
          }
          console.log(`[FLASH] No data for ${id}`);
          return null;
        }
      },

      allmind: {
        name: "ALL-MIND Hub DB",
        save: async (id, data) => {
          console.log(`[ALLMIND] Streaming save for ${id} to hub...`);
          // Simulate async hub call
          await new Promise(r => setTimeout(r, 800));
          console.log(`[ALLMIND] Imprint ${id} persisted centrally`);
          return true;
        },
        load: async (id) => {
          console.log(`[ALLMIND] Fetching imprint ${id} from hub...`);
          await new Promise(r => setTimeout(r, 600));
          // Mock data
          return { id, source: "central hub", timestamp: Date.now() };
        }
      },

      aws: {
        name: "AWS (S3/DynamoDB)",
        save: async (id, data) => {
          console.log(`[AWS] Uploading imprint ${id} to S3/Dynamo...`);
          await new Promise(r => setTimeout(r, 1200));
          console.log(`[AWS] Upload complete for ${id}`);
          return true;
        },
        load: async (id) => {
          console.log(`[AWS] Retrieving imprint ${id}...`);
          await new Promise(r => setTimeout(r, 900));
          return { id, source: "AWS cloud", size: "unknown" };
        }
      },

      firebase: {
        name: "Firebase Realtime/Firestore",
        save: async (id, data) => {
          console.log(`[FIREBASE] Writing imprint ${id} to Firestore...`);
          await new Promise(r => setTimeout(r, 700));
          console.log(`[FIREBASE] Write successful for ${id}`);
          return true;
        },
        load: async (id) => {
          console.log(`[FIREBASE] Reading imprint ${id}...`);
          await new Promise(r => setTimeout(r, 500));
          return { id, source: "Firebase realtime", synced: true };
        }
      }
    };

    this.currentProvider = 'local'; // Default
  }

  // Change provider dynamically
  setProvider(providerKey) {
    if (this.providers[providerKey]) {
      this.currentProvider = providerKey;
      console.log(`DataDragon provider switched to: ${this.providers[providerKey].name}`);
    } else {
      console.error(`Unknown provider: ${providerKey}. Available: ${Object.keys(this.providers).join(', ')}`);
    }
  }

  // Unified save method
  async save(id, data) {
    const provider = this.providers[this.currentProvider];
    console.log(`DataDragon saving ${id} using ${provider.name}`);
    return await provider.save(id, data);
  }

  // Unified load method
  async load(id) {
    const provider = this.providers[this.currentProvider];
    console.log(`DataDragon loading ${id} from ${provider.name}`);
    return await provider.load(id);
  }

  // Quick demo usage
  demo() {
    console.log("DataDragon demo starting...");
    this.save('test-imprint-001', { value: 469, operation: 'add' });
    setTimeout(async () => {
      const loaded = await this.load('test-imprint-001');
      console.log("Loaded data:", loaded);
    }, 1500);
  }
}

// Export singleton instance
const dataDragon = new DataDragon();
export default dataDragon;

// Example usage:
// dataDragon.setProvider('allmind');
// dataDragon.save('calc-001', { result: 469 });
// dataDragon.setProvider('flash');
// dataDragon.load('calc-001');