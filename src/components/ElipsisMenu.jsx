import { useEffect, useRef, useState } from 'react'
import './ElipsisMenu.css'
import {useNavigate} from "react-router-dom";

const MENU_WIDTH = 140

export default function ElipsisMenu({ onEdit, onDelete }) {
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()
    const [pos, setPos] = useState({ top: 0, left: 0 })
    const buttonRef = useRef(null)
    const menuRef = useRef(null)

    const toggle = () => {
        if (!open) {
            const rect = buttonRef.current.getBoundingClientRect()
            setPos({ top: rect.bottom + 4, left: rect.right - MENU_WIDTH })
        }
        setOpen((prev) => !prev)
    }

    useEffect(() => {
        if (!open) return

        const handleOutsideClick = (e) => {
            if (
                menuRef.current?.contains(e.target) ||
                buttonRef.current?.contains(e.target)
            ) return
            setOpen(false)
        }
        const handleKey = (e) => e.key === 'Escape' && setOpen(false)
        const close = () => setOpen(false)

        document.addEventListener('mousedown', handleOutsideClick)
        document.addEventListener('keydown', handleKey)
        window.addEventListener('scroll', close, true)
        window.addEventListener('resize', close)

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick)
            document.removeEventListener('keydown', handleKey)
            window.removeEventListener('scroll', close, true)
            window.removeEventListener('resize', close)
        }
    }, [open])

    const handleSelect = (action) => {
        setOpen(false)
        action?.()
    }

    return (
        <>
            <button
                ref={buttonRef}
                type="button"
                className="elipsis-trigger"
                onClick={toggle}
                aria-haspopup="menu"
                aria-expanded={open}
                aria-label="Open actions menu"
            >
                ...
            </button>

            {open && (
                <div
                    className="elipsis-menu"
                    role="menu"
                >
                    <button
                        type="button"
                        role="menuitem"
                        onClick={() => handleSelect(() => navigate('/members/edit'))}
                    >
                        Edit
                    </button>
                </div>
            )}
        </>
    )
}