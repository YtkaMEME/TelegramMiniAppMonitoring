import { NextResponse } from 'next/server';
import { exec } from 'child_process';

export async function POST() {
  return new Promise((resolve) => {
    const pythonPath = '/home/your_user/scripts/venv/bin/python';
    const scriptPath = '/home/your_user/scripts/calculate.py';

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