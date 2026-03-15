import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import Database from "better-sqlite3";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("somiti.db");

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS notices (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    date TEXT NOT NULL,
    type TEXT NOT NULL,
    content TEXT,
    status TEXT DEFAULT 'Published'
  );

  CREATE TABLE IF NOT EXISTS members (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'Member',
    joined_date TEXT NOT NULL,
    status TEXT DEFAULT 'pending',
    profile_picture TEXT,
    mobile TEXT,
    email TEXT,
    nid_number TEXT,
    address TEXT,
    nid_front TEXT,
    nid_back TEXT
  );

  CREATE TABLE IF NOT EXISTS transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    member_id TEXT,
    member_name TEXT NOT NULL,
    description TEXT NOT NULL,
    date TEXT NOT NULL,
    amount INTEGER NOT NULL,
    receipt_no TEXT,
    type TEXT NOT NULL -- 'income' or 'expense'
  );

  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    date TEXT NOT NULL,
    status TEXT DEFAULT 'new'
  );

  CREATE TABLE IF NOT EXISTS site_content (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL
  );
`);

// Migration: Ensure all columns exist in members table
const columns = db.prepare("PRAGMA table_info(members)").all() as any[];
const columnNames = columns.map(c => c.name);
const requiredColumns = [
  { name: 'mobile', type: 'TEXT' },
  { name: 'email', type: 'TEXT' },
  { name: 'nid_number', type: 'TEXT' },
  { name: 'address', type: 'TEXT' },
  { name: 'nid_front', type: 'TEXT' },
  { name: 'nid_back', type: 'TEXT' }
];

requiredColumns.forEach(col => {
  if (!columnNames.includes(col.name)) {
    try {
      db.exec(`ALTER TABLE members ADD COLUMN ${col.name} ${col.type}`);
    } catch (e) {
      console.error(`Error adding column ${col.name}:`, e);
    }
  }
});

// Migration: Add status column to notices if it doesn't exist
try {
  db.prepare("ALTER TABLE notices ADD COLUMN status TEXT DEFAULT 'Published'").run();
} catch (e) {
  // Column already exists or table doesn't exist yet
}

// Seed data if empty
const contentCount = db.prepare("SELECT COUNT(*) as count FROM site_content").get() as { count: number };
if (contentCount.count === 0) {
  const initialContent = [
    ['hero_title', 'আমাদের সমিতিতে আপনাকে স্বাগতম'],
    ['hero_subtitle', 'আমরা একতাবদ্ধ হয়ে একটি সুখী ও সমৃদ্ধ সমাজ গড়ে তুলতে কাজ করছি। আমাদের লক্ষ্য সবার অর্থনৈতিক মুক্তি ও সামাজিক উন্নয়ন।'],
    ['about_text', 'আমাদের সমিতি সদস্যদের কল্যাণে কাজ করে যাচ্ছে। ক্ষুদ্র সঞ্চয় এবং পারস্পরিক সহযোগিতার মাধ্যমে সদস্যদের জীবনমান উন্নয়নই আমাদের প্রধান লক্ষ্য।'],
    ['mission_text', 'স্বচ্ছতা ও নিষ্ঠার সাথে সদস্যদের আমানত রক্ষা করা এবং সহজ শর্তে ক্ষুদ্র ঋণ প্রদানের মাধ্যমে কর্মসংস্থান তৈরি করা।'],
    ['vision_text', 'একটি দারিদ্র্যমুক্ত ডিজিটাল সমিতি হিসেবে আত্মপ্রকাশ করা যেখানে প্রতিটি সদস্য আধুনিক প্রযুক্তির মাধ্যমে সেবা গ্রহণ করবে।'],
    ['manual_total_funds', '0'],
    ['manual_paid_members', '0'],
    ['manual_due_amount', '0'],
    ['manual_reserve_capital', '0'],
    ['manual_operational_costs', '0'],
    ['fund_allocation', JSON.stringify([
      { label: 'Reserve', percentage: 80, amount: 0 },
      { label: 'Operational', percentage: 20, amount: 0 }
    ])],
    ['objectives', JSON.stringify([
      "সদস্যদের মধ্যে সঞ্চয়ের প্রবণতা বৃদ্ধি করা",
      "সামাজিক ও সাংস্কৃতিক উন্নয়নমূলক কাজ পরিচালনা করা",
      "সদস্যদের জরুরি প্রয়োজনে আর্থিক সহায়তা প্রদান"
    ])]
  ];
  const stmt = db.prepare("INSERT INTO site_content (key, value) VALUES (?, ?)");
  initialContent.forEach(([key, value]) => stmt.run(key, value));
}

// Mock data seeding removed to allow "Reset to Zero" to be truly zero.
// If you want mock data, you can add it manually through the admin panel.

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/notices", (req, res) => {
    const notices = db.prepare("SELECT * FROM notices ORDER BY id DESC").all();
    res.json(notices);
  });

  app.post("/api/notices", (req, res) => {
    const { title, date, type, content, status } = req.body;
    try {
      const stmt = db.prepare(`
        INSERT INTO notices (title, date, type, content, status)
        VALUES (?, ?, ?, ?, ?)
      `);
      const result = stmt.run(title, date, type || 'megaphone', content, status || 'Published');
      res.json({ success: true, id: result.lastInsertRowid });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  });

  app.put("/api/notices/:id", (req, res) => {
    const { id } = req.params;
    const { title, date, type, content, status } = req.body;
    try {
      const stmt = db.prepare(`
        UPDATE notices 
        SET title = ?, date = ?, type = ?, content = ?, status = ?
        WHERE id = ?
      `);
      stmt.run(title, date, type, content, status, id);
      res.json({ success: true });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  });

  app.delete("/api/notices/:id", (req, res) => {
    const { id } = req.params;
    try {
      db.prepare("DELETE FROM notices WHERE id = ?").run(id);
      res.json({ success: true });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  });

  app.get("/api/transactions", (req, res) => {
    const transactions = db.prepare("SELECT * FROM transactions ORDER BY id DESC LIMIT 50").all();
    res.json(transactions);
  });

  app.post("/api/transactions", (req, res) => {
    const { member_id, member_name, description, date, amount, receipt_no, type } = req.body;
    try {
      const stmt = db.prepare(`
        INSERT INTO transactions (member_id, member_name, description, date, amount, receipt_no, type)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `);
      const result = stmt.run(member_id, member_name, description, date, amount, receipt_no, type || 'income');
      res.json({ success: true, id: result.lastInsertRowid });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  });

  app.get("/api/members", (req, res) => {
    const members = db.prepare("SELECT * FROM members ORDER BY id DESC").all();
    res.json(members);
  });

  app.post("/api/members", (req, res) => {
    const { name, role, joined_date, status, profile_picture, mobile, email, nid_number, address, nid_front, nid_back } = req.body;
    try {
      const stmt = db.prepare(`
        INSERT INTO members (name, role, joined_date, status, profile_picture, mobile, email, nid_number, address, nid_front, nid_back)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);
      const date = joined_date || new Date().toISOString().split('T')[0];
      const result = stmt.run(name, role || 'Member', date, status || 'pending', profile_picture, mobile, email, nid_number, address, nid_front, nid_back);
      res.json({ success: true, id: result.lastInsertRowid });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  });

  app.put("/api/members/:id", (req, res) => {
    const { id } = req.params;
    const { name, role, joined_date, status, profile_picture, mobile, email, nid_number, address, nid_front, nid_back } = req.body;
    try {
      const stmt = db.prepare(`
        UPDATE members 
        SET name = ?, role = ?, joined_date = ?, status = ?, profile_picture = ?, mobile = ?, email = ?, nid_number = ?, address = ?, nid_front = ?, nid_back = ?
        WHERE id = ?
      `);
      stmt.run(name, role, joined_date, status, profile_picture, mobile, email, nid_number, address, nid_front, nid_back, id);
      res.json({ success: true });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  });

  app.delete("/api/members/:id", (req, res) => {
    const { id } = req.params;
    try {
      db.prepare("DELETE FROM members WHERE id = ?").run(id);
      res.json({ success: true });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  });

  // Messages API
  app.get("/api/messages", (req, res) => {
    const messages = db.prepare("SELECT * FROM messages ORDER BY id DESC").all();
    res.json(messages);
  });

  app.post("/api/messages", (req, res) => {
    const { name, email, subject, message } = req.body;
    try {
      const stmt = db.prepare(`
        INSERT INTO messages (name, email, subject, message, date)
        VALUES (?, ?, ?, ?, ?)
      `);
      const date = new Date().toISOString().split('T')[0];
      const result = stmt.run(name, email, subject, message, date);
      res.json({ success: true, id: result.lastInsertRowid });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  });

  app.patch("/api/messages/:id", (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
      db.prepare("UPDATE messages SET status = ? WHERE id = ?").run(status, id);
      res.json({ success: true });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  });

  // Site Content API
  app.get("/api/content", (req, res) => {
    const content = db.prepare("SELECT * FROM site_content").all();
    const contentMap = content.reduce((acc: any, item: any) => {
      acc[item.key] = item.value;
      return acc;
    }, {});
    res.json(contentMap);
  });

  app.post("/api/content", (req, res) => {
    const { key, value } = req.body;
    try {
      db.prepare("INSERT OR REPLACE INTO site_content (key, value) VALUES (?, ?)").run(key, value);
      res.json({ success: true });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  });

  app.get("/api/stats", (req, res) => {
    const memberCount = db.prepare("SELECT COUNT(*) as count FROM members").get() as { count: number };
    const activeMemberCount = db.prepare("SELECT COUNT(*) as count FROM members WHERE status = 'active'").get() as { count: number };
    const noticeCount = db.prepare("SELECT COUNT(*) as count FROM notices").get() as { count: number };
    const totalIncome = db.prepare("SELECT SUM(amount) as total FROM transactions WHERE type = 'income'").get() as { total: number };
    const newMessageCount = db.prepare("SELECT COUNT(*) as count FROM messages WHERE status = 'new'").get() as { count: number };
    
    // Calculate paid members (unique members who made a transaction in the current month)
    const paidMembersCount = db.prepare("SELECT COUNT(DISTINCT member_name) as count FROM transactions WHERE type = 'income'").get() as { count: number };
    
    // Fetch manual overrides
    const overrides = db.prepare("SELECT key, value FROM site_content WHERE key LIKE 'manual_%' OR key = 'fund_allocation'").all() as { key: string, value: string }[];
    const overrideMap = overrides.reduce((acc: any, item) => {
      acc[item.key] = item.value;
      return acc;
    }, {});

    const totalMembers = memberCount.count;
    const paidMembers = parseInt(overrideMap['manual_paid_members']) || paidMembersCount.count;
    const dueMembers = Math.max(0, totalMembers - paidMembers);

    res.json({
      totalMembers: totalMembers,
      activeMembers: activeMemberCount.count,
      activeNotices: noticeCount.count,
      totalFunds: parseInt(overrideMap['manual_total_funds']) || (totalIncome.total || 0),
      newMessages: newMessageCount.count,
      paidMembers: paidMembers,
      dueMembers: dueMembers,
      monthlyCollection: (totalIncome.total || 0),
      dueAmount: parseInt(overrideMap['manual_due_amount']) || 0,
      reserveCapital: parseInt(overrideMap['manual_reserve_capital']) || 0,
      operationalCosts: parseInt(overrideMap['manual_operational_costs']) || 0,
      fundAllocation: JSON.parse(overrideMap['fund_allocation'] || '[]')
    });
  });

  app.post("/api/dev/reset", (req, res) => {
    try {
      // Clear all tables
      db.prepare("DELETE FROM members").run();
      db.prepare("DELETE FROM transactions").run();
      db.prepare("DELETE FROM notices").run();
      db.prepare("DELETE FROM messages").run();
      db.prepare("DELETE FROM site_content").run();

      // Reset site_content to defaults
      const initialContent = [
        ['hero_title', 'আমাদের সমিতিতে আপনাকে স্বাগতম'],
        ['hero_subtitle', 'আমরা একতাবদ্ধ হয়ে একটি সুখী ও সমৃদ্ধ সমাজ গড়ে তুলতে কাজ করছি। আমাদের লক্ষ্য সবার অর্থনৈতিক মুক্তি ও সামাজিক উন্নয়ন।'],
        ['about_text', 'আমাদের সমিতি সদস্যদের কল্যাণে কাজ করে যাচ্ছে। ক্ষুদ্র সঞ্চয় এবং পারস্পরিক সহযোগিতার মাধ্যমে সদস্যদের জীবনমান উন্নয়নই আমাদের প্রধান লক্ষ্য।'],
        ['mission_text', 'স্বচ্ছতা ও নিষ্ঠার সাথে সদস্যদের আমানত রক্ষা করা এবং সহজ শর্তে ক্ষুদ্র ঋণ প্রদানের মাধ্যমে কর্মসংস্থান তৈরি করা।'],
        ['vision_text', 'একটি দারিদ্র্যমুক্ত ডিজিটাল সমিতি হিসেবে আত্মপ্রকাশ করা যেখানে প্রতিটি সদস্য আধুনিক প্রযুক্তির মাধ্যমে সেবা গ্রহণ করবে।'],
        ['objectives', JSON.stringify([
          "সদস্যদের মধ্যে সঞ্চয়ের প্রবণতা বৃদ্ধি করা",
          "সামাজিক ও সাংস্কৃতিক উন্নয়নমূলক কাজ পরিচালনা করা",
          "সদস্যদের জরুরি প্রয়োজনে আর্থিক সহায়তা প্রদান"
        ])]
      ];
      const stmt = db.prepare("INSERT INTO site_content (key, value) VALUES (?, ?)");
      initialContent.forEach(([key, value]) => stmt.run(key, value));

      res.json({ success: true, message: "System reset to zero successfully" });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

  app.post("/api/dev/execute", (req, res) => {
    const { query } = req.body;
    try {
      const stmt = db.prepare(query);
      if (query.trim().toLowerCase().startsWith("select")) {
        const result = stmt.all();
        res.json({ success: true, data: result });
      } else {
        const result = stmt.run();
        res.json({ success: true, data: result });
      }
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
