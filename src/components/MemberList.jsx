import { getMembers } from '../services/members'
import { useEffect, useMemo, useState } from 'react'
import { useSearch } from '../hooks/useSearch'

import SearchFilter from './SearchFilter'

import './MemberList.css'
import './SearchFilter.css'

import { formatDate } from '../utils/date'

const MEMBER_SEARCH_FIELDS = ['firstName', 'middleName', 'lastName', 'email']

export default function MemberList() {
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
                            <th>Email</th>
                            <th>Birthday</th>
                            <th className="col-age">Age</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredMembers.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="member-table-empty">
                                    {search || gender ? 'No members match your search.' : 'No members yet.'}
                                </td>
                            </tr>
                        ) : (
                            filteredMembers.map((member) => (
                                <tr key={member.id}>
                                    <td>{member.lastName}</td>
                                    <td>{member.firstName}</td>
                                    <td>{member.middleName}</td>
                                    <td>{member.email}</td>
                                    <td>{formatDate(member.birthday)}</td>
                                    <td className="col-age">{member.age}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}