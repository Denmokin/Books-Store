const { useEffect, useState } = React

import { eventBus } from "../services/event-bus.service.js"

export function UserMsg() {

    const [msg, setMsg] = useState(null)

    useEffect(() => {
        eventBus.on('user-msg', onShowMsg)
    }, [])

    function onShowMsg(msg) {
        setMsg(msg)
        setTimeout(() => setMsg(null), 1500)
    }

    if (!msg) return <span></span>

    return <section className={`user-msg ${msg.type}`}>
        {msg.txt}
    </section>
}


