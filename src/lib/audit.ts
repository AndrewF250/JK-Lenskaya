import fs from 'fs';
import path from 'path';

export interface AuditLogEntry {
  timestamp: string;
  action: string;
  userId?: string;
  ip: string;
  details?: Record<string, any>;
  status?: 'success' | 'error';
  statusCode?: number;
}

const LOG_DIR = path.join(process.cwd(), 'logs');
const LOG_FILE = path.join(LOG_DIR, 'audit.log');

function ensureLogDir(): void {
  if (!fs.existsSync(LOG_DIR)) {
    fs.mkdirSync(LOG_DIR, { recursive: true });
  }
}

function rotateLogFile(): void {
  const today = new Date().toISOString().split('T')[0];
  const rotatedFile = path.join(LOG_DIR, `audit-${today}.log`);
  
  if (fs.existsSync(LOG_FILE)) {
    const stats = fs.statSync(LOG_FILE);
    const fileDate = new Date(stats.mtime).toISOString().split('T')[0];
    
    if (fileDate !== today) {
      fs.renameSync(LOG_FILE, rotatedFile);
    }
  }
}

export function logAudit(entry: Omit<AuditLogEntry, 'timestamp'>): void {
  ensureLogDir();
  rotateLogFile();

  const logEntry: AuditLogEntry = {
    ...entry,
    timestamp: new Date().toISOString(),
  };

  const logLine = JSON.stringify(logEntry) + '\n';
  
  fs.appendFileSync(LOG_FILE, logLine, 'utf-8');
}

export function logLogin(userId: string, ip: string, success: boolean): void {
  logAudit({
    action: 'login',
    userId,
    ip,
    status: success ? 'success' : 'error',
    details: { success },
  });
}

export function logDataChange(
  userId: string,
  ip: string,
  action: string,
  details: Record<string, any>
): void {
  logAudit({
    action,
    userId,
    ip,
    details,
    status: 'success',
  });
}

export function logError(ip: string, statusCode: number, details: Record<string, any>): void {
  logAudit({
    action: 'error',
    ip,
    statusCode,
    details,
    status: 'error',
  });
}

export function getAuditLogs(options?: {
  startDate?: string;
  endDate?: string;
  userId?: string;
  action?: string;
}): AuditLogEntry[] {
  ensureLogDir();

  if (!fs.existsSync(LOG_FILE)) {
    return [];
  }

  const content = fs.readFileSync(LOG_FILE, 'utf-8');
  const lines = content.trim().split('\n').filter(Boolean);
  
  let logs: AuditLogEntry[] = lines.map(line => {
    try {
      return JSON.parse(line);
    } catch {
      return null;
    }
  }).filter(Boolean);

  if (options?.startDate) {
    logs = logs.filter(log => log.timestamp >= options.startDate!);
  }

  if (options?.endDate) {
    logs = logs.filter(log => log.timestamp <= options.endDate!);
  }

  if (options?.userId) {
    logs = logs.filter(log => log.userId === options.userId);
  }

  if (options?.action) {
    logs = logs.filter(log => log.action === options.action);
  }

  return logs;
}
