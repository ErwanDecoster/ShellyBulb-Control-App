// Creating device

function createDevice() {
    const overlay = document.querySelector(".overlay");
    const deviceConfirmation = document.querySelector(".create-device");
  
    overlay.classList.add("active");
    deviceConfirmation.classList.add("active");
  
    overlay.addEventListener("click", function () {
      overlay.classList.remove("active");
      deviceConfirmation.classList.remove("active");
    });
  }
  

  