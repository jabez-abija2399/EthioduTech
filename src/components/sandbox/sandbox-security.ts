import { SandboxFiles } from './sandbox-types';

/**
 * Generates the CSP for the iframe.
 * Restricts external scripts, network connections, forms, and objects.
 */
function generateCSP(): string {
  return `
    default-src 'none';
    script-src 'unsafe-inline';
    style-src 'unsafe-inline';
    img-src data: *;
    font-src 'none';
    frame-src 'none';
    object-src 'none';
    base-uri 'none';
    form-action 'none';
  `.replace(/\s+/g, ' ').trim();
}

/**
 * Injects a script into the iframe that intercepts console logs and errors,
 * forwarding them to the parent window via postMessage.
 */
const INJECTED_INTERCEPTOR = `
  <script>
    (function() {
      const MAX_LOGS = 200;
      let logCount = 0;

      function postToParent(msg) {
        if (logCount >= MAX_LOGS) return;
        logCount++;
        if (logCount === MAX_LOGS) {
          window.parent.postMessage({
            type: 'console',
            level: 'warn',
            args: ['Console output limit reached. Further messages were hidden.']
          }, '*');
          return;
        }
        window.parent.postMessage(msg, '*');
      }

      // Intercept console
      const originalConsole = {
        log: console.log,
        info: console.info,
        warn: console.warn,
        error: console.error
      };

      function stringifyArgs(args) {
        return args.map(arg => {
          if (typeof arg === 'object') {
            try {
              return JSON.stringify(arg, null, 2);
            } catch(e) {
              return String(arg);
            }
          }
          return String(arg);
        });
      }

      console.log = function(...args) {
        originalConsole.log.apply(console, args);
        postToParent({ type: 'console', level: 'log', args: stringifyArgs(args) });
      };
      
      console.info = function(...args) {
        originalConsole.info.apply(console, args);
        postToParent({ type: 'console', level: 'info', args: stringifyArgs(args) });
      };

      console.warn = function(...args) {
        originalConsole.warn.apply(console, args);
        postToParent({ type: 'console', level: 'warn', args: stringifyArgs(args) });
      };

      console.error = function(...args) {
        originalConsole.error.apply(console, args);
        postToParent({ type: 'console', level: 'error', args: stringifyArgs(args) });
      };

      // Intercept Global Errors
      window.onerror = function(message, source, line, column, error) {
        postToParent({
          type: 'runtime-error',
          message: String(message),
          source,
          line,
          column
        });
        return false; // let default handler run
      };

      window.addEventListener('unhandledrejection', function(event) {
        postToParent({
          type: 'runtime-error',
          message: 'Unhandled Promise Rejection: ' + String(event.reason)
        });
      });

      // Signal ready
      postToParent({ type: 'ready' });
    })();
  </script>
`;

/**
 * Safely combines the files into a single srcDoc HTML string.
 */
export function buildSandboxDocument(files: SandboxFiles): string {
  // Use a Blob URL or srcdoc. For low bandwidth, srcdoc is sufficient.
  // We wrap the user JS in a try/catch or just inject it straight (the window.onerror catches it)
  return `<!doctype html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="Content-Security-Policy" content="${generateCSP()}">
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; }
    /* Student CSS */
    ${files.css}
  </style>
</head>
<body>
  <!-- Interceptor Script -->
  ${INJECTED_INTERCEPTOR}
  
  <!-- Student HTML -->
  ${files.html}

  <!-- Student JS -->
  <script>
    ${files.js}
  </script>
</body>
</html>`;
}
