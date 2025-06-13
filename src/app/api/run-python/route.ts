import type { NextApiRequest, NextApiResponse } from 'next'
import { spawn } from 'child_process'
import path from 'path'

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  const pythonPath = path.resolve('/develop/Bot-Monitoring/venv/bin/python3')
  const scriptPath = path.resolve('/develop/Bot-Monitoring/calculate_for_web.py')

  const process = spawn(pythonPath, [scriptPath])

  let output = ''
  let errorOutput = ''

  process.stdout.on('data', (data) => {
    output += data.toString()
  })

  process.stderr.on('data', (data) => {
    errorOutput += data.toString()
  })

  process.on('close', (code) => {
    if (code === 0) {
      res.status(200).json({ result: output.trim() })
    } else {
      res.status(500).json({ error: errorOutput.trim() || 'Ошибка выполнения Python-скрипта' })
    }
  })
}