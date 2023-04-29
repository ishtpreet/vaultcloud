import { Switch, Navbar, Text, Button, useTheme } from '@nextui-org/react'
import useDarkMode from 'use-dark-mode';
import {CiDark, CiLight } from 'react-icons/ci'
import {AiOutlineCloudServer } from 'react-icons/ai'
import { useRouter } from 'next/router'
import Link from 'next/link'
import {useSession, signOut} from 'next-auth/react'

export default function NavbarHeader() {
      const {data: session} = useSession()
      const darkMode = useDarkMode(true);
      const { type, isDark } = useTheme();
      // console.log('type, isDark', type, isDark)
      const router = useRouter()
      // console.log(router.pathname)

      const handleSignOut = async (e) =>{
        await signOut()
        // router.push("/")
      }
      return (
        <>
        <Navbar isBordered variant="floating">
        <Navbar.Brand>
          {/* <AcmeLogo /> */}
          <AiOutlineCloudServer size={24}/>
          <Text b color="inherit" hideIn="xs">
            VaultCloud
          </Text>
        </Navbar.Brand>
        {(session && session.user) ? 
         <Navbar.Content variant="highlight-rounded">
          <Navbar.Link as={Link} isActive={router.pathname === '/dashboard' ? true : false} href="/dashboard">Dashboard</Navbar.Link>
          <Navbar.Link as={Link} isActive={router.pathname === '/rooms' ? true : false} href="/rooms">Rooms</Navbar.Link>
          <Navbar.Link as={Link} isActive={router.pathname === '/requests' ? true : false} href="/requests">Requests</Navbar.Link>
          <Navbar.Link as={Link} isActive={router.pathname === '/listfiles' ? true : false} href="/listfiles">Files</Navbar.Link>
          <Navbar.Link as={Link} isActive={router.pathname === '/upload' ? true : false} href="/upload">Upload Files</Navbar.Link>
          <Navbar.Link as={Link} isActive={router.pathname === '/profile' ? true : false} href="/profile">{session.user.name}</Navbar.Link>
         </Navbar.Content>
         : 
         <Navbar.Content hideIn="xs" variant="highlight-rounded">
        <Navbar.Link as={Link} isActive={router.pathname === '/' ? true : false} href="/">Home</Navbar.Link>
          <Navbar.Link as={Link} isActive={router.pathname === '/pricing' ? true : false} href="/pricing">Pricing</Navbar.Link>
        </Navbar.Content>}
        {(session && session.user) 
        ? <Navbar.Content>
         <Button auto flat onClick={handleSignOut}>Sign Out</Button>
        </Navbar.Content>
        : <Navbar.Content>
          <Navbar.Link as={Link} isActive={router.pathname === '/login' ? true : false} href="/login">
            Login
          </Navbar.Link>
          <Navbar.Link as={Link} isActive={router.pathname === '/register' ? true : false} href="/register">
            Sign Up
          </Navbar.Link>
            <Navbar.Item>
              <div>
              <CiLight size={24}/>
          <Switch
            checked={darkMode.value}
            onChange={() => darkMode.toggle()}
            />
            <CiDark size={24}/>
            </div>
            </Navbar.Item>
        </Navbar.Content>}
      </Navbar>
        </>
      )
}
