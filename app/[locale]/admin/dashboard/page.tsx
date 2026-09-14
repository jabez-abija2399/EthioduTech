// @ts-nocheck
/* eslint-disable */
'use client'

import * as React from 'react'
import { getSafetyQueueAction, resolveSafetyAlertAction } from '@/features/admin/server/actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ShieldAlert, CheckCircle, Activity, Users, BookOpen } from 'lucide-react'

export default function AdminDashboard() {
  const [queue, setQueue] = React.useState<any>([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [resolvingId, setResolvingId] = React.useState<string | null>(null)
  const [auditReason, setAuditReason] = React.useState('')

  const loadQueue = React.useCallback(async () => {
    setIsLoading(true)
    const result = await getSafetyQueueAction()
    if (result.ok) setQueue(result.data)
    setIsLoading(false)
  }, [])

  React.useEffect(() => {
    loadQueue()
  }, [loadQueue])

  const handleResolve = async (alertId: string) => {
    if (auditReason.length < 10) {
      alert("A resolution reason of at least 10 characters is required for the audit log.")
      return
    }

    setResolvingId(alertId)
    const result = await resolveSafetyAlertAction({ alertId, auditReason })
    if (result.ok) {
      setAuditReason('')
      loadQueue()
    } else {
      alert(result.message)
    }
    setResolvingId(null)
  }

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-8">
      <h1 className="text-3xl font-bold text-[var(--foreground)]">Admin Console</h1>

      {/* Platform Vitals */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-[var(--primary)] text-white">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80">Total Users</p>
              <h2 className="text-3xl font-bold">1,248</h2>
            </div>
            <Users className="w-10 h-10 opacity-50" />
          </CardContent>
        </Card>
        <Card className="bg-emerald-600 text-white">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80">Active Cohorts</p>
              <h2 className="text-3xl font-bold">42</h2>
            </div>
            <BookOpen className="w-10 h-10 opacity-50" />
          </CardContent>
        </Card>
        <Card className="bg-purple-600 text-white">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80">System Status</p>
              <h2 className="text-3xl font-bold">Healthy</h2>
            </div>
            <Activity className="w-10 h-10 opacity-50" />
          </CardContent>
        </Card>
      </div>

      {/* Safety Queue */}
      <Card className="border-[var(--error)]">
        <CardHeader className="bg-[var(--error-container)] rounded-t-xl border-b border-[var(--error)]">
          <CardTitle className="flex items-center gap-2 text-[var(--on-error-container)]">
            <ShieldAlert className="w-5 h-5" />
            Safety & Moderation Queue
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-8 text-center text-gray-500 animate-pulse">Loading queue...</div>
          ) : queue.length === 0 ? (
            <div className="p-8 text-center text-gray-500 flex flex-col items-center gap-2">
              <CheckCircle className="w-8 h-8 text-[var(--success)]" />
              All clear! No pending safety alerts.
            </div>
          ) : (
            <div className="divide-y divide-[var(--surface-variant)]">
              {queue.map(alertItem => (
                <div key={alertItem.id} className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:bg-[var(--surface-variant)] transition-colors">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[var(--error)]">{alertItem.type}</span>
                      <span className="text-sm text-gray-500">• {new Date(alertItem.createdAt).toLocaleString()}</span>
                    </div>
                    <p className="text-sm">Student: <strong>{alertItem.studentName}</strong></p>
                    <p className="text-sm bg-white p-2 border rounded font-mono text-gray-800">
                      Context: &quot;{alertItem.context}&quot;
                    </p>
                  </div>
                  
                  <div className="flex flex-col gap-2 w-full md:w-auto">
                    <Input 
                      placeholder="Required audit reason to close..." 
                      value={resolvingId === alertItem.id ? 'Resolving...' : auditReason}
                      onChange={e => setAuditReason(e.target.value)}
                      disabled={resolvingId === alertItem.id}
                      className="w-full md:w-64 text-sm"
                    />
                    <Button 
                      variant="primary"
                      onClick={() => handleResolve(alertItem.id)}
                      disabled={resolvingId === alertItem.id || auditReason.length < 10}
                      className="w-full"
                    >
                      Resolve & Log
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
