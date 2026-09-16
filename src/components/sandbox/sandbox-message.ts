export type LogLevel = 'log' | 'info' | 'warn' | 'error';

export type SandboxMessage =
  | {
      type: 'console';
      level: LogLevel;
      args: string[]; // Convert args to string to avoid deep object serialization issues
    }
  | {
      type: 'runtime-error';
      message: string;
      source?: string;
      line?: number;
      column?: number;
    }
  | {
      type: 'ready';
    };

// Validation for incoming messages to ensure safety
export function isSandboxMessage(data: any): data is SandboxMessage {
  if (!data || typeof data !== 'object' || typeof data.type !== 'string') {
    return false;
  }

  switch (data.type) {
    case 'console':
      return (
        ['log', 'info', 'warn', 'error'].includes(data.level) &&
        Array.isArray(data.args)
      );
    case 'runtime-error':
      return typeof data.message === 'string';
    case 'ready':
      return true;
    default:
      return false;
  }
}
