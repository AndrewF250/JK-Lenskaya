import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-auth';
import { getAuditLogs } from '@/lib/audit';

async function GET(request: NextRequest, context: any, user: any) {
  try {
    const { searchParams } = new URL(request.url);
    
    const options = {
      startDate: searchParams.get('startDate') || undefined,
      endDate: searchParams.get('endDate') || undefined,
      userId: searchParams.get('userId') || undefined,
      action: searchParams.get('action') || undefined,
    };

    const logs = getAuditLogs(options);

    return NextResponse.json({
      data: logs,
      meta: {
        total: logs.length,
      },
    });
  } catch (error) {
    console.error('Error fetching audit logs:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export const GET_PROTECTED = requireAdmin(GET);

export { GET_PROTECTED as GET };
