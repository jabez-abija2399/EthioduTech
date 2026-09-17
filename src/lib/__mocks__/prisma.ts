import { PrismaClient } from '@prisma/client';
import { mockDeep, mockReset } from 'vitest-mock-extended';
import { beforeEach, vi } from 'vitest';
import { prisma } from '../prisma';

vi.mock('@/lib/prisma', () => ({
  prisma: mockDeep<PrismaClient>(),
}));

beforeEach(() => {
  mockReset(prisma);
});
