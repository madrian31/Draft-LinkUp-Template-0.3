import { getMembers } from '../services/members'
import { useEffect, useState } from 'react'
import { useSearch } from '../hooks/useSearch'

import SearchBar from './SearchBar'

import './MemberList.css'
import './SearchBar.css'

import { formatDate } from '../utils/date'

const MEMBER_SEARCH_FIELDS = ['firstName', 'middleName', 'lastName', 'email']

export default function MemberList() {
    const [members, setMembers] = useState([])
    const [loading, setLoading] = useState(true)
    const { search, setSearch, results } = useSearch(members, MEMBER_SEARCH_FIELDS)

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
                <SearchBar value={search} onChange={setSearch} placeholder="Search members..." />
                <span className="member-list-count">
                    {results.length} {results.length === 1 ? 'member' : 'members'}
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
                        {results.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="member-table-empty">
                                    {search ? 'No members match your search.' : 'No members yet.'}
                                </td>
                            </tr>
                        ) : (
                            results.map((member) => (
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