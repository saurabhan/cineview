import { Button, Checkbox, Input, Modal, Row, Text } from '@nextui-org/react'
import React from 'react'
import { useAuth } from '../utils/AuthContext'

interface Props {}

const LoginModal = (props: Props) => {
  const [email, setEmail] = React.useState<string | ''>('')
  const [password, setPassword] = React.useState<string | ''>('')
  const { signIn, signUp, user, logout } = useAuth()
  const [login, setLogin] = React.useState<boolean>(true)
  console.log(user)
  console.log(login)

  const handleSubmit = (
    e: React.MouseEvent,
    email: string,
    password: string
  ) => {
    console.log('clicker')
    e.preventDefault()
    if (login) {
      signIn(email, password)
    } else {
      signUp(email, password)
    }
  }

  const [visible, setVisible] = React.useState(false)
  const handler = () => {
    setVisible(!visible)
  }

  const closeHandler = () => {
    setVisible(false)
  }

  return (
    <div>
      <Button auto shadow className="bg-brandamber" onClick={handler}>
       {
         user ? 'Logout' : 'Login'
       }
      </Button>
      <Modal closeButton open={visible} onClose={closeHandler}>
        {user ? (
          <>
            <Modal.Header>
              <Text>Welcome back, {user.email}</Text>
            </Modal.Header>
            <Modal.Body>
              <Button className="bg-brandamber" auto onClick={() => logout()}>
                logout
              </Button>
            </Modal.Body>
          </>
        ) : (
          <>
            <Modal.Header>
              <Text size={18}>
                Please Login or{' '}
                <Text b size={18}>
                  <a
                    className="text-brandamber underline underline-offset-1"
                    onClick={() => setLogin(!login)}
                  >
                    Singup
                  </a>
                </Text>
              </Text>
            </Modal.Header>
            <Modal.Body>
              <Input
                clearable
                bordered
                fullWidth
                color="primary"
                size="lg"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input.Password
                clearable
                bordered
                fullWidth
                color="primary"
                size="lg"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Row justify="space-between">
                <Checkbox>
                  <Text size={14}>Remember me</Text>
                </Checkbox>
                <Text size={14}>Forgot password?</Text>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              {login ? (
                <>
                  <Button auto flat color="error" onClick={closeHandler}>
                    Use Guest Login
                  </Button>
                  <Button
                    className="bg-brandamber"
                    auto
                    onClick={(e) => handleSubmit(e, email, password)}
                  >
                    Sign in
                  </Button>
                </>
              ) : (
                <Button
                  className="bg-brandamber"
                  auto
                  onClick={(e) => handleSubmit(e, 'guest@test.com', 'test124')}
                >
                  Sign Up
                </Button>
              )}
            </Modal.Footer>
          </>
        )}
      </Modal>
    </div>
  )
}

export default LoginModal
