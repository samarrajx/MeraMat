import React from 'react'

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('MeraMat Error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          textAlign: 'center',
          fontFamily: 'var(--font-body)'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🗳️</div>
          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '20px',
            color: 'var(--color-navy)',
            marginBottom: '12px'
          }}>
            Something went wrong
          </h2>
          <p style={{
            fontSize: '14px',
            color: 'var(--color-text-secondary)',
            marginBottom: '24px',
            maxWidth: '280px',
            lineHeight: '1.6'
          }}>
            Please refresh the page and try again.
            Voter Helpline: 1950
          </p>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            aria-label="Try again"
            style={{
              background: 'var(--color-primary)',
              color: 'white',
              border: 'none',
              borderRadius: 'var(--radius-full)',
              padding: '12px 28px',
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              fontWeight: 500,
              minHeight: '48px',
              cursor: 'pointer'
            }}
          >
            Try Again
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
