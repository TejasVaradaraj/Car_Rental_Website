import React from 'react'
import {assets} from '../assets'
import {Link} from 'react-router-dom'
import { menuLinks } from '../assets/assets'

const Navigation_bar = () => {

    const location = useLocation()
    const [open, setOpen] = useState(false)
  return (
    <div className={`flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 text-gray-600 border-b border-borderColor relative transition-all ${location.pathname === "/" && "bg-light"}`}>
        <Link to='/'>
            <img src={assets.logo} alt="logo" className="h-8"/>
        </Link>
        <div className={`max-sn:fixed max-sm:h-screen max-sm:w-full max-sm:top-16 max-sm:border-t border-border-borderColor right-0 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 max-sm-4 transition-all duration-300 z-50 ${location.pathname == "/" ? "bg-light" : "bg-white"} $ {open ? "max-sm:translate-x-0 : "max-sm:translate-x-full"}`}>
            {menuLinks.map((link, index)=> (
                <Link key={index} to={link.path}>
                    {link.name}
                </Link>
            ))}
        </div>
    </div>
  )
}

export default Navigation_bar