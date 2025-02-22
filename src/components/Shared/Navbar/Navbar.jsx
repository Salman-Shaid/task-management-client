import { Link } from 'react-router-dom'
import useAuth from '../../../hooks/useAuth'
import avatarImg from '../../../assets/images/placeholder.jpg'
import logo from '../../../assets/images/tasksLogo.png'
import Container from '../Container'
import ThemeToggleButton from '../Button/ThemeToggleButton'
import { IoMdLogOut } from "react-icons/io";
const Navbar = () => {
  const { user, logOut } = useAuth()


  return (
    <div className='fixed dark:bg-gray-900 border-b dark:border-gray-800 w-full bg-gray-50 z-10 shadow-sm'>
      <div className='py-4'>
        <Container>
          <div className=' flex justify-between items-center px-4'>
            {/* Logo */}
            <Link to='/'>
              <img src={logo} alt='logo' width='80' height='80' />
            </Link>
            <div>
              <ThemeToggleButton></ThemeToggleButton>
            </div>

            {/* Navigation Links */}
            <div className='flex items-center'>
              {user ? (
                <>
                  <img
                    className='w-16 h-16 rounded-full border p-2'
                    src={user.photoURL || avatarImg}
                    alt='profile'
                  />

                  <div className='border-y border-r pl-4 p-2 rounded-r-full'>
                    <button onClick={logOut} className='btn border btn-error rounded-full btn-sm'>
                      <IoMdLogOut /> Logout
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <Link to='/login' className='btn btn-primary btn-sm'>
                    Login
                  </Link>
                  <Link to='/signup' className='btn btn-secondary btn-sm'>
                    Register
                  </Link>
                  <img
                    className='w-10 h-10 rounded-full border'
                    src={avatarImg}
                    alt='profile'
                  />
                </>
              )}
            </div>
          </div>
        </Container>

      </div>
    </div>
  )
}

export default Navbar
