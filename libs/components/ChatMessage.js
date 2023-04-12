import React from 'react'
import { Avatar, Text } from '@nextui-org/react'

export default function ChatMessage (props){
    const {text, userId, userName} = props
    // TODO: Message Class
    console.log(userId)
    const messageClass = userId === true ? 'sent' : 'received'
    const textClass = userId === true ? 'primary' : 'secondary'

    return(
        <div className={`message ${messageClass}`}>
            {/* TODO: Replace text with user Name */}
            <Avatar  squared text={userName}/>
            <Text color={textClass}>{text}</Text>
        </div>
    )
}
