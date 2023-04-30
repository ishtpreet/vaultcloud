'use-client';
import {useState} from 'react'
import { Spacer, Text, Button, Card, Input, Grid} from '@nextui-org/react';
import {RiLockPasswordFill, RiMailOpenFill, RiText} from 'react-icons/ri'
import { useRouter } from 'next/router'
import {signIn, useSession} from 'next-auth/react'

export default function Register() {
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    let router = useRouter()
    const {data: session} = useSession()
  if(session && session.user){
    router.push("/dashboard")
  }

    const registerUser = async (e) => {
        console.log('test')
        // e.preventDefault()
        
        if(!email || !password || !email){
            return
        }
        const res = await fetch('/api/register', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name }),
        })
        let data = await res.json()
        if (data.message) {
        // setMessage(data.name)
        console.log(data.name, data.message)
        }
        if (data.message == "success") {
        let options = { redirect: false, email, password }
        const res = await signIn("credentials", options)
        return router.push("/dashboard")
        }
        }
    const handleOnChangeEmail = (e) =>{
        setEmail(e.target.value)
    }
    const handleOnChangeName = (e) =>{
        setName(e.target.value)
    }
    const handleOnChangePassword = (e) =>{
        setPassword(e.target.value)
    }

  return (
    <Grid.Container justify="center" style={{marginTop: '10vh'}}>

          <Spacer y={1} />
      <Grid item xs={8} sm={8} md={8} alignItems="center" justify="center">
        {/* //    <Container>
        <Row style={{marginTop: "20vh"}}> */}
    <Card isHoverable css={{ mw: "500px" }} auto>
        <Card.Header>
            <Text h3 b style={{left:'auto'}}>Signup</Text>
        </Card.Header>
        <Card.Body>
        <Input
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Name"
            contentLeft={<RiText />}
            value={name}
            onChange={handleOnChangeName}
            />
          <Spacer y={1} />
        <Input
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Email"
            contentLeft={<RiMailOpenFill />}
            value={email}
            onChange={handleOnChangeEmail}
            />
          <Spacer y={1} />
          <Input
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            type="password"
            placeholder="Password"
            contentLeft={<RiLockPasswordFill />}
            value={password}
            onChange={handleOnChangePassword}
          />
          {/* <Row justify="space-between">
            <Checkbox>
              <Text size={14}>Remember me</Text>
            </Checkbox>
            <Text size={14}>Forgot password?</Text>
          </Row> */}
        </Card.Body>
        <Card.Footer>
        {/* <Button auto flat color="error">
            Close
          </Button> */}
          <Button auto onClick={registerUser}>
            Register
          </Button>
        </Card.Footer>
    </Card>
   
   </Grid>
    </Grid.Container>
  )
}
