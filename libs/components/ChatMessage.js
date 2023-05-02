import React from 'react'
import { Image} from '@nextui-org/react'

export default function ChatMessage (props){
    const {text, userEmail, userName, sessionEmail, time, messageType, publicUrl} = props
    const date = (time && time.seconds) ? new Date(time.seconds*1000) : new Date()
    console.table(props)
    const messageClass = userEmail === sessionEmail ? 'sent' : 'received'
    const textClass = userEmail === sessionEmail ? 'primary' : 'secondary'
    const bubble = userEmail === sessionEmail ? 'own' : 'other'
    return(
        // <div className={`message ${messageClass}`}>
        //     <Avatar size="xs" color={textClass === 'primary' ? 'secondary' : 'gradient'} text={userName}/>&nbsp;
        //     <Text color={textClass}>{text}</Text>
        // </div>
        <div className="bubbleWrapper">
		<div className={`inlineContainer ${bubble === 'own' ? 'own' : null}`}>
			{bubble === 'other' ? <img className="inlineIcon" src="https://cdn2.iconfinder.com/data/icons/ninja-turtles-flaticons/64/raphael-avatar-people-super_hero-ninja-ninja_turtles-warrior-cultures-japanese-oriental-1024.png" /> : <img className="inlineIcon" src="https://www.pinclipart.com/picdir/middle/205-2059398_blinkk-en-mac-app-store-ninja-icon-transparent.png" />}
			{messageType === 'message' ? <div className={`${bubble}Bubble ${bubble}`}>
				{text}
			</div> : <div className={`${bubble}BubbleImage ${bubble}`}>
                <Image src={publicUrl} height={180} width={220} />
                </div>}
		    </div>
            <span className={`${bubble}`}>{userName} at {date.getDate()+'/'+date.getMonth()} {date.toLocaleTimeString('en-IN')}</span>
	    </div>
    )
}
