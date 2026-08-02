import { useEffect, useRef, useState } from 'react'

export default function CommandPalette({ commands }) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [highlight, setHighlight] = useState(0)
  const inputRef = useRef(null)

  const filtered = commands.filter((c) =>
    c.label.toLowerCase().includes(query.toLowerCase())
  )

  useEffect(() => {
    function onKeyDown(e) {
      const isK = e.key === 'k' || e.key === 'K'
      if ((e.metaKey || e.ctrlKey) && isK) {
        e.preventDefault()
        setOpen((o) => !o)
      }
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  useEffect(() => {
    if (open) {
      setQuery('')
      setHighlight(0)
      requestAnimationFrame(() => inputRef.current?.focus())
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  function runCommand(cmd) {
    cmd.action()
    setOpen(false)
  }

  function onInputKeyDown(e) {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHighlight((h) => Math.min(h + 1, filtered.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlight((h) => Math.max(h - 1, 0))
    } else if (e.key === 'Enter' && filtered[highlight]) {
      runCommand(filtered[highlight])
    }
  }

  return (
    <>
      <button
        className="palette-trigger"
        onClick={() => setOpen(true)}
        aria-label="Open command menu"
      >
        <span>Quick nav</span>
        <kbd>⌘K</kbd>
      </button>

      {open && (
        <div className="palette-overlay" onClick={() => setOpen(false)}>
          <div
            className="palette"
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="palette-input-row">
              <span className="palette-prompt">›</span>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => { setQuery(e.target.value); setHighlight(0) }}
                onKeyDown={onInputKeyDown}
                placeholder="Jump to a section, or run a command..."
                aria-label="Command search"
              />
              <kbd>esc</kbd>
            </div>
            <div className="palette-list">
              {filtered.length === 0 && (
                <div className="palette-empty">No matches.</div>
              )}
              {filtered.map((cmd, i) => (
                <button
                  key={cmd.id}
                  className={'palette-item' + (i === highlight ? ' active' : '')}
                  onMouseEnter={() => setHighlight(i)}
                  onClick={() => runCommand(cmd)}
                >
                  <span>{cmd.label}</span>
                  <span className="palette-hint">{cmd.hint}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
