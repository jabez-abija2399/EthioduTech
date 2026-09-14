'use client'

import * as React from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { FileText, Search, ShieldAlert } from 'lucide-react'
import { Input } from '@/components/ui/input'

// Mock audit logs for UI scaffolding
const MOCK_LOGS = [
  { id: 'log-1', timestamp: new Date().toISOString(), actorName: 'Admin Sarah', action: 'CHANGE_ROLE', targetName: 'Dawit', reason: 'Promoted to instructor for Cohort A.', details: { newRole: 'instructor' } },
  { id: 'log-2', timestamp: new Date(Date.now() - 3600000).toISOString(), actorName: 'Admin Sarah', action: 'RESOLVE_SAFETY_ALERT', targetName: 'Alert #84', reason: 'Contacted school counselor, resolved false positive.', details: {} },
]

export default function AuditLogPage() {
  const [search, setSearch] = React.useState('')
  
  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[var(--foreground)] flex items-center gap-3">
          <ShieldAlert className="w-8 h-8 text-[var(--error)]" />
          Audit Logs
        </h1>
        <p className="text-gray-500 mt-2">Append-only record of all sensitive platform actions (REQ-085).</p>
      </div>

      <Card>
        <CardHeader className="bg-[var(--surface-variant)] border-b border-[var(--surface-variant)]">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <Input 
              className="pl-10" 
              placeholder="Search logs by actor or action..." 
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-[var(--surface)] text-gray-500 font-medium">
              <tr>
                <th className="p-4 border-b">Timestamp</th>
                <th className="p-4 border-b">Actor</th>
                <th className="p-4 border-b">Action Type</th>
                <th className="p-4 border-b">Target</th>
                <th className="p-4 border-b w-full">Audit Reason</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--surface-variant)]">
              {MOCK_LOGS.map(log => (
                <tr key={log.id} className="hover:bg-[var(--surface-variant)]/50 transition-colors">
                  <td className="p-4 text-gray-500 font-mono text-xs">{new Date(log.timestamp).toLocaleString()}</td>
                  <td className="p-4 font-semibold">{log.actorName}</td>
                  <td className="p-4">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-bold tracking-wider">
                      {log.action}
                    </span>
                  </td>
                  <td className="p-4 text-gray-700">{log.targetName}</td>
                  <td className="p-4">
                    <p className="text-gray-900 whitespace-normal min-w-[200px]">{log.reason}</p>
                    {Object.keys(log.details).length > 0 && (
                      <pre className="mt-1 text-[10px] text-gray-500 bg-gray-100 p-1 rounded">
                        {JSON.stringify(log.details)}
                      </pre>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {MOCK_LOGS.length === 0 && (
            <div className="p-8 text-center text-gray-500 flex flex-col items-center gap-2">
              <FileText className="w-8 h-8 opacity-50" />
              No logs found.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
