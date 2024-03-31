import React from "react";
import { useState } from "react";



const usePopup = () => {
    const [isPopupOpen, setPopupOpen] = useState(false);
  
    const openPopup = () => {
      setPopupOpen(true);
    };
  
    const closePopup = () => {
      setPopupOpen(false);
    };
  
    return {
      isPopupOpen,
      openPopup,
      closePopup
    };
  };
  
  export default usePopup;






