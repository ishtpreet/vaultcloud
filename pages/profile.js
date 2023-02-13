import React from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { Container, Row, Card, Spacer, Text, User } from '@nextui-org/react'


export default function Profile() {
    const router = useRouter()
    const {data: session} = useSession({required: true, onUnauthenticated(){router.push("/")}})
  return (
    <Container fluid>
        <Spacer y={2} />
        <Row justify="center" align="center">
            <Text h1 b>Profile</Text>
            </Row>
            <Row justify="center" align="center">
            <Card css={{ $$cardColor: '$colors$primary', mw: "400px" }}>
                <Card.Body>
                <Row justify="center" align="center">

                <User
                src="https://i.pravatar.cc/450?img=66"
                name={session && session.user.name}
                squared
                />
                </Row>
                <Row justify="center" align="center">
                    {(session && session.user) && <Text h3 b>
                        Name: {session.user.name} <br />
                        Email: {session.user.email}
                        </Text>}
                        </Row>
                </Card.Body>
            </Card>
        </Row>
    </Container>
  )
}
