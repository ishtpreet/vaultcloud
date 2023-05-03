'use-client';
import { useState } from 'react';
import { Spacer, Container, Row, Text, Button, Card, Input, Checkbox, Grid,Modal} from '@nextui-org/react';
import {RiLockPasswordFill, RiMailOpenFill} from 'react-icons/ri'
import {signIn, useSession} from 'next-auth/react'
import {useRouter} from 'next/router'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Login() {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [visible, setVisible] = useState(false);
  const  [forgetEmail, setForgetEmail] = useState()
  const router = useRouter()
  const {data: session} = useSession()
  if(session && session.user){
    router.push("/dashboard")
  }
  //const handler = () => setVisible(true);
const handleSubmit = () => {
}
  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };
  const handleSignIn = async (e) =>{
    if(!email && !password){
      return
    }
    let options = { redirect: false, email, password }
        const res = await signIn("credentials", options)
        console.log("login",res)
        if(!res.ok){
          toast.error("Email or password is incorrect",{
            position: toast.POSITION.BOTTOM_RIGHT
          })
          return
        }
        return router.push("/dashboard")
  }
  const handleForgetPassword = async (e) =>{
    if(!forgetEmail){
      return
    }
    axios.get(`/api/auth/forgot?email=${forgetEmail}`)
      .then((res)=>{
      console.log(res.data)
      toast.success('Password Reset Link Sent', {
        position: toast.POSITION.BOTTOM_RIGHT
    });
    })
    .catch((err)=>{
      console.log(err)
    })
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
            {/* <Text size={14}>Forgot password?</Text> */}
            <Button color="secondary" auto onClick={() => setVisible(true)}>
            Forget Password
          </Button>
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
   <Modal
        closeButton
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Forgot Password
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
            value={forgetEmail} 
            onChange={(e) => setForgetEmail(e.target.value)}/>
                    
    </Modal.Body>
                <Modal.Footer><Button color="secondary" auto onClick={handleForgetPassword}>Submit</Button></Modal.Footer>
   </Modal>
    <ToastContainer />
    </Grid.Container>
  )
}
