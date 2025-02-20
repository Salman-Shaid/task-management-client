import { Link } from 'react-router-dom'
import useAuth from '../../../hooks/useAuth'
import avatarImg from '../../../assets/images/placeholder.jpg'
import logo from '../../../assets/images/tasksLogo.png'
import Container from '../Container'

const Navbar = () => {
  const { user, logOut } = useAuth()
  

  return (
    <div className='fixed w-full bg-white z-10 shadow-sm'>
      <div className='py-4 border-b-[1px]'> 
        <Container>
          <div className=' flex justify-between items-center px-4'>
          {/* Logo */}
          <Link to='/'>
            <img src={logo} alt='logo' width='80' height='80' />
          </Link>

          {/* Navigation Links */}
          <div className='flex items-center gap-4'>
            {user ? (
              <>
                <img
                  className='w-10 h-10 rounded-full border'
                  src={user.photoURL || avatarImg}
                  alt='profile'
                />
                
                <button onClick={logOut} className='btn btn-error btn-sm'>
                  Logout
                </button>
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
