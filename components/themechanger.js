import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { Switch, theme } from '@nextui-org/react'
import styles from '../styles/themechanger.module.css'

export default function ThemeChanger() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {setMounted(true)}, [])

  if (!mounted) {
    return null
  }

  return (
    <>
    <div className={styles.toggleText}>
      <span>Toggle dark mode:</span>
      <Switch 
        onChange={theme === "dark" ? e => setTheme("light") : e => setTheme("dark")}
        initialChecked={theme === "dark" ? true : false}
        size="sm"
      />
    </div>
    
    </>
    
  )
}