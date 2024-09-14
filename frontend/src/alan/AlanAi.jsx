import React, { useEffect } from 'react'
import alanBtn from '@alan-ai/alan-sdk-web'

const alanKey = '3f681abb55d1f5596386df5316265b562e956eca572e1d8b807a3e2338fdd0dc/stage';

function AlanAi() {

    useEffect(() => {
        alanBtn({
            key: alanKey,
            onCommand: ({ command }) => {
                if (command === 'testCommand') {
                    alert('This code was done');
                }
            }

        })
    }, [])


    return (
        <></>
    )
}

export default AlanAi