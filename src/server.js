require('dotenv').config();
const http = require('http');
const { WebSocketServer } = require('ws');
const app = require('./app');
const prisma = require('./config/prisma');

const PORT = process.env.PORT || 3000;

// ─── HTTP Server ───────────────────────────────────────────
const server = http.createServer(app);

// ─── WebSocket Server (for real-time plant tracking) ───────
const wss = new WebSocketServer({ server, path: '/ws/plants' });

// Store connected clients
const clients = new Map();

wss.on('connection', (ws, req) => {
  console.log('[WS] New client connected');

  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message);

      // Client subscribes to plant updates by plantTrackingId
      if (data.type === 'SUBSCRIBE' && data.plantId) {
        clients.set(ws, data.plantId);
        ws.send(JSON.stringify({
          type: 'SUBSCRIBED',
          plantId: data.plantId,
          message: `Subscribed to plant ${data.plantId} updates`,
        }));
      }
    } catch (e) {
      ws.send(JSON.stringify({ type: 'ERROR', message: 'Invalid message format' }));
    }
  });

  ws.on('close', () => {
    clients.delete(ws);
    console.log('[WS] Client disconnected');
  });

  ws.on('error', (err) => {
    console.error('[WS] Error:', err.message);
  });
});

/**
 * Broadcast plant update to subscribed clients
 * Called from plant tracking controller
 */
const broadcastPlantUpdate = (plantId, updateData) => {
  clients.forEach((subscribedPlantId, client) => {
    if (subscribedPlantId === plantId && client.readyState === 1) {
      client.send(JSON.stringify({
        type: 'PLANT_UPDATE',
        plantId,
        data: updateData,
        timestamp: new Date().toISOString(),
      }));
    }
  });
};

// Export for use in controllers
app.set('broadcastPlantUpdate', broadcastPlantUpdate);

// ─── Start Server ──────────────────────────────────────────
const start = async () => {
  try {
    await prisma.$connect();
    console.log('[DB] PostgreSQL connected via Prisma ✅');

    server.listen(PORT, () => {
      console.log(`\n🌱 Urban Farming Platform API`);
      console.log(`   HTTP  → http://localhost:${PORT}`);
      console.log(`   WS    → ws://localhost:${PORT}/ws/plants`);
      console.log(`   Env   → ${process.env.NODE_ENV}\n`);
    });
  } catch (err) {
    console.error('[FATAL] Failed to start server:', err);
    await prisma.$disconnect();
    process.exit(1);
  }
};

// ─── Graceful Shutdown ─────────────────────────────────────
process.on('SIGINT', async () => {
  console.log('\n[SHUTDOWN] Gracefully shutting down...');
  await prisma.$disconnect();
  server.close(() => process.exit(0));
});

process.on('SIGTERM', async () => {
  await prisma.$disconnect();
  server.close(() => process.exit(0));
});

start();