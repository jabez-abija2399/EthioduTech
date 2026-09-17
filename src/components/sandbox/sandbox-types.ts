export type SandboxFiles = {
  html: string;
  css: string;
  js: string;
};

export type ActiveTab = 'html' | 'css' | 'js' | 'console';

export type SandboxExercise = {
  id: string;
  starterFiles: SandboxFiles;
  languageSet: ('html' | 'css' | 'js')[];
  instructions?: string;
  expectedBehavior?: string;
  validationMode?: 'manual' | 'tests' | 'hybrid';
};

export type TestCase = {
  description: string;
  condition: string;
};

export type TestResult = {
  description: string;
  passed: boolean;
  error?: string;
};
