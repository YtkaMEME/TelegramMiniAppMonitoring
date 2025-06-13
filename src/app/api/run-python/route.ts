import { NextResponse } from 'next/server';
import { spawn } from 'child_process';
import path from 'path';

export async function GET(): Promise<Response> {
  const pythonPath = path.resolve('/develop/Bot-Monitoring/venv/bin/python3');
  const scriptPath = path.resolve('/develop/Bot-Monitoring/calculate_for_web.py');

  return new Promise<Response>((resolve) => {
    const process = spawn(pythonPath, [scriptPath]);

    let output = '';
    let errorOutput = '';

    process.stdout.on('data', (data) => {
      output += data.toString();
    });

    process.stderr.on('data', (data) => {
      errorOutput += data.toString();
    });

    process.on('close', (code) => {
      if (code === 0) {
        resolve(NextResponse.json({ result: output.trim() }));
      } else {
        resolve(
          NextResponse.json(
            { error: errorOutput.trim() || 'Ошибка выполнения Python-скрипта' },
            { status: 500 }
          )
        );
      }
    });
  });
}