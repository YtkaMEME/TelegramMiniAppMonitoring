import { NextResponse } from 'next/server';
import { exec } from 'child_process';

export async function POST() {
  return new Promise((resolve) => {
    const pythonPath = '/develop/Bot-Monitoring/venv/bin/python';
    const scriptPath = '/develop/Bot-Monitoring/src/data_processing/calculate_for_web.py';

    exec(`${pythonPath} ${scriptPath}`, (error, stdout, stderr) => {
      if (error) {
        console.error('Ошибка выполнения скрипта:', error);
        return resolve(NextResponse.json({ message: 'Ошибка выполнения скрипта' }, { status: 500 }));
      }

      console.log('Результат скрипта:', stdout);
      resolve(NextResponse.json({ message: 'Скрипт успешно выполнен', output: stdout }));
    });
  });
}