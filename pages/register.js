import { Spacer, Text, Button, Card, Input, Grid} from '@nextui-org/react';
import {RiLockPasswordFill, RiMailOpenFill, RiText} from 'react-icons/ri'

export default function Register() {
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
          <Button auto>
            Register
          </Button>
        </Card.Footer>
    </Card>
   
   </Grid>
    </Grid.Container>
  )
}
