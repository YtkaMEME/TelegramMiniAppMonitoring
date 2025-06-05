import { NextResponse } from 'next/server';

const allowedUsers = [864146808, 1132062376];

export async function POST(req: Request) {
    const body = await req.json();
    const userId = body.userId;

    if (allowedUsers.includes(userId)) {
        return NextResponse.json({ allowed: true });
    } else {
        return NextResponse.json({ allowed: false }, { status: 403 });
    }
}