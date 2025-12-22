import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'




const root = document.getElementById('root');

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

root.style.flexDirection = `column`
root.style.display = `flex`

function resizeBody() {
  root.style.height = ``
  if (root.clientHeight < window.innerHeight) {
    root.style.height = `${window.innerHeight}px`
  }
}

resizeBody()

window.onresize = resizeBody