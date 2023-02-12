import { Switch, Navbar, Text, Button, useTheme } from '@nextui-org/react'
import useDarkMode from 'use-dark-mode';
import {CiDark, CiLight } from 'react-icons/ci'
import {AiOutlineCloudServer } from 'react-icons/ai'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function NavbarHeader() {
      const darkMode = useDarkMode(false);
      const { type, isDark } = useTheme();
      // console.log('type, isDark', type, isDark)
      const router = useRouter()
      // console.log(router.pathname)
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
        <Navbar.Content hideIn="xs" variant="highlight-rounded">
        <Navbar.Link as={Link} isActive={router.pathname === '/' ? true : false} href="/">Home</Navbar.Link>
          <Navbar.Link as={Link} isActive={router.pathname === '/pricing' ? true : false} href="/pricing">Pricing</Navbar.Link>
        </Navbar.Content>
        <Navbar.Content>
          <Navbar.Link as={Link} isActive={router.pathname === '/login' ? true : false} href="/login">
            Login
          </Navbar.Link>
          <Navbar.Item>
          <Navbar.Link as={Link} isActive={router.pathname === '/register' ? true : false} href="/register">
            Sign Up
          </Navbar.Link>
           
            </Navbar.Item>
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
        </Navbar.Content>
      </Navbar>
        </>
      )
}
