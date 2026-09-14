// @ts-nocheck
/* eslint-disable */
'use client'

import * as React from 'react'
import { changeUserRoleAction } from '@/features/admin/server/actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Search, UserCog, ShieldAlert } from 'lucide-react'

const MOCK_USERS = [
  { id: '1111-2222', name: 'Almaz (Parent)', email: 'almaz@example.com', role: 'parent' },
  { id: '3333-4444', name: 'Dawit (Instructor)', email: 'dawit@school.edu', role: 'instructor' },
]

export default function AdminUsersPage() {
  const [search, setSearch] = React.useState('')
  const [users, setUsers] = React.useState(MOCK_USERS) // Mocking search results
  const [editingId, setEditingId] = React.useState<string | null>(null)
  
  // Edit State
  const [newRole, setNewRole] = React.useState<unknown>('student')
  const [auditReason, setAuditReason] = React.useState('')
  const [isSaving, setIsSaving] = React.useState(false)

  const handleEditClick = (user: any) => {
    setEditingId(user.id)
    setNewRole(user.role)
    setAuditReason('')
  }

  const handleSave = async (userId: string) => {
    if (auditReason.length < 10) {
      alert("A reason of at least 10 characters is required.")
      return
    }

    setIsSaving(true)
    const result = await changeUserRoleAction({
      targetUserId: userId,
      newRole,
      auditReason
    })

    if (result.ok) {
      setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u))
      setEditingId(null)
    } else {
      alert(result.message)
    }
    setIsSaving(false)
  }

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[var(--foreground)]">User Management</h1>
        <p className="text-gray-500 mt-2">Search users and manage roles. All changes are logged.</p>
      </div>

      <Card>
        <CardHeader className="bg-[var(--surface-variant)] border-b border-[var(--surface-variant)]">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <Input 
              className="pl-10" 
              placeholder="Search by email or name..." 
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-[var(--surface-variant)]">
            {users.map(user => (
              <div key={user.id} className="p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h3 className="font-bold">{user.name}</h3>
                  <p className="text-sm text-gray-500">{user.email}</p>
                  <span className="inline-block mt-2 px-2 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded uppercase tracking-wider">
                    {user.role}
                  </span>
                </div>

                {editingId === user.id ? (
                  <div className="bg-[var(--surface-variant)] p-4 rounded-lg flex flex-col gap-3 w-full sm:w-auto min-w-[300px]">
                    <div className="flex items-center gap-2 text-[var(--error)] text-sm font-semibold">
                      <ShieldAlert className="w-4 h-4" />
                      Audited Action
                    </div>
                    
                    <select 
                      className="w-full p-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[var(--primary)]"
                      value={newRole}
                      onChange={e => setNewRole(e.target.value)}
                    >
                      <option value="student">Student</option>
                      <option value="parent">Parent</option>
                      <option value="instructor">Instructor</option>
                      <option value="admin">Admin</option>
                    </select>

                    <Input 
                      placeholder="Audit Reason (min 10 chars)..." 
                      value={auditReason}
                      onChange={e => setAuditReason(e.target.value)}
                      className="text-sm"
                    />
                    
                    <div className="flex gap-2 justify-end mt-2">
                      <Button variant="ghost" size="sm" onClick={() => setEditingId(null)} disabled={isSaving}>Cancel</Button>
                      <Button 
                        variant="primary" 
                        size="sm" 
                        onClick={() => handleSave(user.id)}
                        disabled={isSaving || auditReason.length < 10 || newRole === user.role}
                      >
                        {isSaving ? 'Saving...' : 'Confirm Change'}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Button variant="secondary" onClick={() => handleEditClick(user)}>
                    <UserCog className="w-4 h-4 mr-2" />
                    Edit Role
                  </Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
