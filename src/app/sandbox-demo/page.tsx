import React from 'react';
import { CodeSandbox } from '@/components/sandbox/CodeSandbox';

export const metadata = {
  title: 'Sandbox Demo | Web Development Foundations'
};

const DEFAULT_FILES = {
  html: `<h1>Hello World</h1>
<p>Try changing this text.</p>
<button id="btn">Click me</button>`,
  css: `body {
  font-family: sans-serif;
  padding: 20px;
  background-color: #f0f0f0;
}

h1 {
  color: #FD7B41;
}`,
  js: `console.log("Hello from the sandbox!");

document.getElementById('btn').addEventListener('click', () => {
  console.log("Button clicked!");
  document.body.style.backgroundColor = 'lightblue';
});

// Deliberate error test (Uncomment to see runtime error)
// console.log(someUndefinedVariable);

// Infinite loop test (Uncomment and Run to see watchdog timeout)
// while(true) {}
`
};

export default function SandboxDemoPage() {
  return (
    <div className="min-h-screen bg-[#1a1a1a] p-4 md:p-8 text-white">
      <div className="max-w-6xl mx-auto space-y-4">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-[#FD7B41]">Feature Milestone 3: Sandbox Demo</h1>
          <p className="text-[#DDDCDB] mt-2">
            This route verifies the interactive Code Sandbox. It uses \`react-simple-code-editor\`, \`prismjs\`, and a secure iframe with robust postMessage validation.
          </p>
        </header>
        
        <CodeSandbox initialFiles={DEFAULT_FILES} />
      </div>
    </div>
  );
}
