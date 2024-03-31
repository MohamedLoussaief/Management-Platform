import React from "react";


interface PopupProps{

isOpen:boolean;
onClose:()=>void;

}

const Popup: React.FC<PopupProps> = ({isOpen,  onClose})=>{

if (!isOpen) return null;

return (

<div style={{position:"fixed", top:0, right:"50%"}}>

<h5>Departement Name</h5>
<button onClick={onClose}>x</button>
<form>
<input type="text" />
<button type="submit">Add</button>
</form>
</div>

)

}


export default Popup;