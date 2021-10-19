import React from 'react'

function Success({step,setStep}) {
    return (
        <div id="success-div">
            REGISTRATION COMPLETE!!!
            <button onClick={setStep}>RESET FORM</button>
            
        </div>
    )
}

export default Success
