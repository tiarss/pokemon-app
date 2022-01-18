import React from 'react'

function Icons({url}: {url:string}) {
   return (
      <div>
         <img src={url} alt="pokemon" style={{width: "40px"}}/>
      </div>
   )
}

export default Icons
