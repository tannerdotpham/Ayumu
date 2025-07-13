'use client'
import { useFormStatus } from "react-dom"
import {BeatLoader} from 'react-spinners'

function LoadingMessages()
{
    const {pending} = useFormStatus()
    return <div>LoadingMessages</div>
}

export default LoadingMessages