import { NextResponse } from 'next/server';
import Database from 'better-sqlite3';
import path from 'path';

const db = new Database(path.resolve(process.cwd(), 'data/db.sqlite'));

// Создаём таблицу при необходимости
db.exec(`
  CREATE TABLE IF NOT EXISTS calculation_results (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sampleSize INTEGER,
    targetPol TEXT,
    targetAge TEXT,
    targetArt TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`);

export async function GET() {
    const row = db.prepare('SELECT * FROM calculation_results ORDER BY created_at DESC LIMIT 1').get();

    if (!row) {
        return NextResponse.json({});
    }

    return NextResponse.json({
        sampleSize: row.sampleSize,
        targetPol: JSON.parse(row.targetPol),
        targetAge: JSON.parse(row.targetAge),
        targetArt: JSON.parse(row.targetArt)
    });
}