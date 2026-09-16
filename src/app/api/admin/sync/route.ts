import { NextResponse } from 'next/server';
import { syncCurriculum } from '@/lib/curriculum-sync';

export async function POST() {
  try {
    await syncCurriculum();
    return NextResponse.json({ success: true, message: 'Curriculum synced successfully' });
  } catch (error) {
    console.error('Failed to sync curriculum:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
