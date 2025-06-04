import { NextResponse } from 'next/server';
import Database from 'better-sqlite3';
import path from 'path';

// Определяем интерфейс для типизации строки из базы
interface FormDataRow {
  id: number;
  menCount: string;
  womenCount: string;
  artSchools: string; // хранится как JSON-строка
  ageGroups: string;  // хранится как JSON-строка
}

// Подключаемся к базе
const db = new Database(path.resolve(process.cwd(), 'data/db.sqlite'));

// Создаём таблицу при необходимости
db.exec(`
  CREATE TABLE IF NOT EXISTS form_data (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    menCount TEXT,
    womenCount TEXT,
    artSchools TEXT,
    ageGroups TEXT
  )
`);

export async function GET() {
    const row = db.prepare('SELECT * FROM form_data ORDER BY id DESC LIMIT 1').get() as FormDataRow;

    if (!row) {
        return NextResponse.json({});
    }

    const data = {
        menCount: row.menCount,
        womenCount: row.womenCount,
        artSchools: JSON.parse(row.artSchools),
        ageGroups: JSON.parse(row.ageGroups),
    };

    return NextResponse.json(data);
}

export async function POST(request: Request) {
    const data = await request.json();

    db.prepare(`
        INSERT INTO form_data (menCount, womenCount, artSchools, ageGroups)
        VALUES (?, ?, ?, ?)
    `).run(
        data.menCount,
        data.womenCount,
        JSON.stringify(data.artSchools),
        JSON.stringify(data.ageGroups)
    );

    return NextResponse.json({ success: true });
}