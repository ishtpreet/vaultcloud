import { useState } from 'react';
import { Spacer, Container, Row, Text, Button, Card, Input, Checkbox, Grid} from '@nextui-org/react';
import {RiLockPasswordFill, RiMailOpenFill} from 'react-icons/ri'
import {signIn, useSession} from 'next-auth/react'
import {useRouter} from 'next/router'


export default function Login() {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const router = useRouter()
  const {data: session} = useSession()
  if(session && session.user){
    router.push("/dashboard")
  }

  const handleSignIn = async (e) =>{
    if(!email && !password){
      return
    }
    let options = { redirect: false, email, password }
        const res = await signIn("credentials", options)
        return router.push("/dashboard")
  }

  return (
    <Grid.Container justify="center" style={{marginTop: '12vh'}}>

          <Spacer y={1} />
      <Grid item xs={8} sm={8} md={8} alignItems="center" justify="center">
        {/* //    <Container>
        <Row style={{marginTop: "20vh"}}> */}
    <Card isHoverable css={{ mw: "500px" }} auto>
        <Card.Header>
            <Text h3 b style={{left:'auto'}}>Login</Text>
        </Card.Header>
        <Card.Body>
        <Input
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Email"
            contentLeft={<RiMailOpenFill />}
            value={email}
            onChange={e=>setEmail(e.target.value)}
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
            onChange={e=>setPassword(e.target.value)}
          />
          <Spacer y={1} />
          <Row justify="space-between">
            <Checkbox>
              <Text size={14}>Remember me</Text>
            </Checkbox>
            <Text size={14}>Forgot password?</Text>
          </Row>
        </Card.Body>
        <Card.Footer>
        {/* <Button auto flat color="error">
            Close
          </Button> */}
          <Button auto onClick={handleSignIn}>
            Sign in
          </Button>
        </Card.Footer>
    </Card>
   
   </Grid>
    </Grid.Container>
  )
}
