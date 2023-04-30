'use client';
import { Spacer, Container, Row, Text, Button} from '@nextui-org/react';
import Link from 'next/link'

export default function Home() {
  return (
   <Container>
    <Spacer y={1} />
    <Row style={{marginTop: "20vh"}}>
      <Container alignContent="center" alignItems='center'>
    <Text
        h1
        size={60}
        color='primary'
        >
        VaultCloud
      </Text>
      <Text h2 size={40} color='success'>
      File Sharing WebApp
      </Text>
        </Container>
          </Row>
          <div>
          <Spacer y={1} x={1}>
          <Button as={Link} href="/register" size="lg">Get Started</Button></Spacer>
          </div>
   </Container>
  )
}
