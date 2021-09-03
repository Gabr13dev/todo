import '../styles/header.scss'

import Cookies from "js-cookie";
import { FiMoon, FiSun } from 'react-icons/fi'
import { useState } from 'react';

export function Header() {
  const [themeApp, setThemeApp ] = useState('default');

  function switchTheme() {
    var currentTheme = Cookies.get("theme") ? Cookies.get("theme") : "default";
    if (currentTheme == null) {
      Cookies.set("theme", "dark");
    } else {
      if (currentTheme == "dark") {
        Cookies.set("theme", "default");
      } else if (currentTheme == "default") {
        Cookies.set("theme", "dark");
      }
    }
    var Theme: string = `${Cookies.get("theme")}`;
    setThemeApp(Theme);
    document
      .getElementsByTagName("html")[0]
      .setAttribute("data-theme", Theme);
  }

  return (
    <header className="header">
      <div>
        <img src="/logo.svg" alt="to.do"/>
        {themeApp == "default" ? (<FiMoon size={20} onClick={switchTheme} />):(<FiSun size={20} onClick={switchTheme} />)}
      </div>
    </header>
  )
}