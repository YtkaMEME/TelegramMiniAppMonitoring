import { NextResponse } from 'next/server';
import Database from 'better-sqlite3';
import path from 'path';

interface AllowedUserRow {
  id: number;
  first_name: string;
}

const db = new Database(path.resolve(process.cwd(), 'data/db.sqlite'));

db.exec(`
  CREATE TABLE IF NOT EXISTS allowed_users (
    id INTEGER PRIMARY KEY,
    first_name TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`);

// GET — получить список разрешенных
export async function GET() {
  const rows = db.prepare('SELECT * FROM allowed_users').all() as AllowedUserRow[];

  const allowedUserIds = rows.map(row => row.id);

  return NextResponse.json({ allowedUsers: allowedUserIds });
}

// POST — добавить нового разрешенного
export async function POST(request: Request) {
  const data = await request.json();

  db.prepare(`
    INSERT OR IGNORE INTO allowed_users (id, first_name)
    VALUES (?, ?)
  `).run(
    data.id,
    data.first_name || null
  );

  return NextResponse.json({ success: true });
}