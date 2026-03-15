import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

vi.mock('@supabase/supabase-js', () => {
  return {
    createClient: vi.fn(() => {
      return {
        auth: {
          getSession: vi.fn(async () => ({ data: { session: null }, error: null })),
          onAuthStateChange: vi.fn(() => ({ data: { subscription: { unsubscribe: vi.fn() } } })),
          signInWithPassword: vi.fn(async () => ({ data: {}, error: null })),
          signOut: vi.fn(async () => ({ error: null })),
        },
        from: vi.fn(() => ({
          select: vi.fn().mockReturnThis(),
          insert: vi.fn().mockReturnThis(),
          update: vi.fn().mockReturnThis(),
          delete: vi.fn().mockReturnThis(),
          eq: vi.fn().mockReturnThis(),
          single: vi.fn(async () => ({ data: null, error: null })),
          maybeSingle: vi.fn(async () => ({ data: null, error: null })),
        })),
      };
    }),
  };
});

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});
