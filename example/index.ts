import '../src/index.css'
import '../src/index.js'

if (import.meta.env.DEV || import.meta.env.MODE === 'staging') {
    localStorage.setItem('DEBUG', 'checkbox')
} else {
    localStorage.removeItem('DEBUG')
    localStorage.removeItem('debug')
}
