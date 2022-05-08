import { Link } from 'react-router-dom'
export default function Expenses() {
  return (
    <main style={{ padding: '1rem 0' }}>
      <Link to="/">
        <div>
          <p>Home</p>
        </div>
      </Link>
      <h2>Expenses</h2>
    </main>
  )
}
