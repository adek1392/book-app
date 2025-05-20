import { NavLink } from "react-router-dom"
 
export default function MainNavigation() {
     return (
         <nav>
             <NavLink to='/'>Home</NavLink>
             <NavLink to='/read'>Przeczytane</NavLink>
    </nav>
)
}