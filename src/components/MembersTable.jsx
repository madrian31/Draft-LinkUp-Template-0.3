import { getMembers } from '../services/members'
import { useEffect, useMemo, useState } from 'react'
import { useSearch } from '../hooks/useSearch'

import SearchFilter from './SearchFilter'
import ElipsisMenu from './ElipsisMenu'

import './MembersTable.css'
import './SearchFilter.css'

import { formatDate } from '../utils/date'

const MEMBER_SEARCH_FIELDS = ['firstName', 'middleName', 'lastName', 'email']

export default function MembersTable() {
    const [members, setMembers] = useState([])
    const [loading, setLoading] = useState(true)
    const [gender, setGender] = useState('')
    const { search, setSearch, results } = useSearch(members, MEMBER_SEARCH_FIELDS)

    const filteredMembers = useMemo(
        () => (gender ? results.filter((m) => m.gender === gender) : results),
        [results, gender]
    )

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const data = await getMembers()
                setMembers(data)
            } catch (error) {
                console.error("Error fetching members:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchMembers()
    }, [])

    const handleEdit = (member) => {
        console.log('Edit', member)
        // TODO: buksan ang edit form/modal
    }

    const handleDelete = (member) => {
        if (!window.confirm(`Delete ${member.firstName} ${member.lastName}?`)) return
        console.log('Delete', member)
        // TODO: tawagin ang delete API tapos i-update ang members state
    }

    if (loading) {
        return <div className="member-list-status">Loading members...</div>
    }

    return (
        <div className="member-list">
            <div className="member-list-header">
                <h2 className="member-list-title">Member List</h2>
                <SearchFilter
                    value={search}
                    onChange={setSearch}
                    placeholder="Search members..."
                    gender={gender}
                    onGenderChange={setGender}
                />
                <span className="member-list-count">
                    {filteredMembers.length} {filteredMembers.length === 1 ? 'member' : 'members'}
                </span>
            </div>

            <div className="member-table-wrapper">
                <table className="member-table">
                    <thead>
                        <tr>
                            <th>Last Name</th>
                            <th>First Name</th>
                            <th>Middle Name</th>
                            <th className="col-email">Email</th>
                            <th>Birthday</th>
                            <th className="col-age">Age</th>
                            <th className="col-actions">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredMembers.length === 0 ? (
                            <tr>
                                <td colSpan="7" className="member-table-empty">
                                    {search || gender ? 'No members match your search.' : 'No members yet.'}
                                </td>
                            </tr>
                        ) : (
                            filteredMembers.map((member) => (
                                <tr key={member.id}>
                                    <td title={member.lastName}>{member.lastName}</td>
                                    <td title={member.firstName}>{member.firstName}</td>
                                    <td title={member.middleName}>{member.middleName}</td>
                                    <td title={member.email}>{member.email}</td>
                                    <td>{formatDate(member.birthday)}</td>
                                    <td className="col-age">{member.age}</td>
                                    <td className="col-actions">
                                        <ElipsisMenu
                                            onEdit={() => handleEdit(member)}
                                            onDelete={() => handleDelete(member)}
                                        />
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}