import { Spacer, Container, Row, Text, Button, Card, Input, Checkbox, Grid} from '@nextui-org/react';
import {RiLockPasswordFill, RiMailOpenFill} from 'react-icons/ri'

export default function Login() {
  return (
    <Grid.Container justify="center" style={{marginTop: '15vh'}}>

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
          />
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
          <Button auto>
            Sign in
          </Button>
        </Card.Footer>
    </Card>
   
   </Grid>
    </Grid.Container>
  )
}
