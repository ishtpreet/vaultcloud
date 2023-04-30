import React from 'react'
import { Avatar, Text } from '@nextui-org/react'

export default function ChatMessage (props){
    const {text, userEmail, userName, sessionEmail} = props

    console.table(props)
    const messageClass = userEmail === sessionEmail ? 'sent' : 'received'
    const textClass = userEmail === sessionEmail ? 'primary' : 'secondary'

    return(
        <div className={`message ${messageClass}`}>
            {/* TODO: Replace text with user Name */}
            <Avatar size="xs" color={textClass === 'primary' ? 'secondary' : 'gradient'} text={userName}/>&nbsp;
            <Text color={textClass}>{text}</Text>
        </div>
    )
}
