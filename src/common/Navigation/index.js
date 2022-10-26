import React from 'react'
import Link from 'next/link'
import WithUserLogin from '../../hoc/WithUserLogin'
import Auth from '../../auth'
import styles from './Navigation.module.scss'
import { useRouter } from 'next/router'
import { isEmpty } from 'lodash'
import { Navbar, Container, Dropdown } from 'react-bootstrap'

const Navigation = (props) => {
  const router = useRouter()

  const logout = () => {
    Auth.removeToken()
    router.reload('/')
  }

  return (
    <Navbar bg="dark" expand="lg">
      <Container>
        <Link href="/" passHref>
          <Navbar.Brand className={styles.navigationBrand}>
            <span className="ms-2 tex">FOR TEST</span>
          </Navbar.Brand>
        </Link>
        <div className="justify-content-end">
          {!isEmpty(props.profile) ? (
            <Dropdown>
              <Dropdown.Toggle id="topbar-dropdown" as="div" className={styles.navigationProfile}>
                {props.profile.firstName}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="/profile">Profile</Dropdown.Item>
                <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Link href="/register">Register</Link>
          )}
        </div>
      </Container>
    </Navbar>
  )
}

export default WithUserLogin(Navigation)
