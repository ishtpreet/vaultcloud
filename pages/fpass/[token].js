'use-client';
import {useState} from 'react'
import { Spacer, Text, Button, Card, Input, Grid} from '@nextui-org/react';
import {RiLockPasswordFill, RiMailOpenFill, RiText} from 'react-icons/ri'
import { useRouter } from 'next/router'
import {signIn, useSession} from 'next-auth/react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Fpass({props}) {
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [confirmPassword, setconfirmPassword] = useState()
    let router = useRouter()
    console.log("router", router)
    const {data: session} = useSession()
  if(session && session.user){
    router.push("/dashboard")
  }

    const resetPassword = async (e) => {
        console.log('test')
        // e.preventDefault()
        
        if (!password || !confirmPassword ) {
            return
        }
        if (password !== confirmPassword) {
            return
        }
        const token = router.query.token

        const res = await fetch('/api/auth/reset', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password, token }),
        })
        let data = await res.json()
        if (data.message) {
        // setMessage(data.name)
        console.log(data.message)
        }
        if (data.message == "success") {
          toast.success('Password Reset Successful, Please process with Login', {
            position: toast.POSITION.BOTTOM_RIGHT
        });
        // let options = { redirect: false, email, password }
        // const res = await signIn("credentials", options)
        // return router.push("/dashboard")
        }
        else{
          toast.error("Error Occured, Please Try Again!",{
            position: toast.POSITION.BOTTOM_RIGHT
          })
        }
        }

    const handleOnChangePassword = (e) =>{
        setPassword(e.target.value)
    }
    const handleOnChangeConfirmPassword = (e) =>{
        setconfirmPassword(e.target.value)
    }

  return (
    <Grid.Container justify="center" style={{marginTop: '10vh'}}>

          <Spacer y={1} />
      <Grid item xs={8} sm={8} md={8} alignItems="center" justify="center">
        {/* //    <Container>
        <Row style={{marginTop: "20vh"}}> */}
    <Card isHoverable css={{ mw: "500px" }} auto>
        <Card.Header>
            <Text h3 b style={{left:'auto'}}>Reset Password</Text>
        </Card.Header>
        <Card.Body>
        
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
          <Spacer y={1} />
          <Input
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            type="password"
            placeholder="Confirm password"
            contentLeft={<RiLockPasswordFill />}
            value={confirmPassword}
            onChange={handleOnChangeConfirmPassword}
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
          <Button auto onClick={resetPassword}>
            Reset Password
          </Button>
        </Card.Footer>
    </Card>
   
   </Grid>
   <ToastContainer />
    </Grid.Container>
  )
}

export async function getServerSideProps(ctx) {
    // Fetch data from external API
    const res = await fetch(`http://${ctx.req.headers.host}/api/auth/check?token=${ctx.query.token}`)
    const data = await res.json()
    console.log(data)
    if (data.message == "success") {
      return { props: { data } }
    }
    
    else{
      return {
        redirect: {
          permanent: false,
          destination: "/login",
        },
        props:{},
      };
    }
  }