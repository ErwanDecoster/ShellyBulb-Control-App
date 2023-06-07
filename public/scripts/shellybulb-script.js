// Change circle color

const circle = document.querySelector(".circle");
const bulb = document.querySelector(".image-bulb svg");
const colorInput = document.querySelector(".color-input");

colorInput.addEventListener("input", () => {
  circle.style.backgroundColor = colorInput.value;
  bulb.style.fill = colorInput.value;
});

// White/color button
const slideButton = document.getElementById("toggleSlide");
const modeWhite = document.getElementById("mode-white");
const modeColor = document.getElementById("mode-color");

function toggleSlide() {
  if (slideButton.checked) {
    modeWhite.style.transform = "translateX(-250px)";
    modeWhite.style.opacity = 0;
    modeWhite.style.visibility = "hidden";

    modeColor.style.transform = "translate(0px)";
    modeColor.style.opacity = 1;
    modeColor.style.visibility = "visible";
  } else {
    modeColor.style.transform = "translateX(250px)";
    modeColor.style.opacity = 0;
    modeColor.style.visibility = "hidden";

    modeWhite.style.transform = "translateX(0px)";
    modeWhite.style.opacity = 1;
    modeWhite.style.visibility = "visible";
  }
}

// On/OFF button

function onOff(id) {
  const checkbox = document.getElementById('onOff');
  const isChecked = checkbox.checked;

  if (isChecked) {
    // Turning ON
    fetch(`/api/shellybulb/${id}/on`, { method: 'POST' })
    .then(response => {
      if (response.ok) {
        checkbox.checked = true;
      } else {
        checkbox.checked = false;
      }
    })
    .catch(error => {
      console.error('Error turning on the bulb:', error);
      checkbox.checked = false;
    });


  } else {
    // Turning OFF
    fetch(`/api/shellybulb/${id}/off`, { method: 'POST' })
      .then(response => {
        if (response.ok) {
          checkbox.checked = false;
        } else {
          checkbox.checked = true;
        }
      })
      .catch(error => {
        console.error('Error turning off the bulb:', error);
        checkbox.checked = true;
      });

    }

}

// Automatically update value on range
function getRangeValue(name, rangeValue) {
  rangeValue.textContent = name.value;
  name.addEventListener("input", (event) => {
    rangeValue.textContent = event.target.value;
  });
}

// Temp Value
const temp = document.getElementById("temp");
const tempRangeValue = document.getElementById("tempValue");
getRangeValue(temp, tempRangeValue);

// Brightness Value
const brightness = document.getElementById("brightness");
const brightnessRangeValue = document.getElementById("brightnessValue");
getRangeValue(brightness, brightnessRangeValue);

// White Value
const white = document.getElementById("white");
const whiteRangeValue = document.getElementById("whiteValue");
getRangeValue(white, whiteRangeValue);

// Gain Value
const gain = document.getElementById("gain");
const gainRangeValue = document.getElementById("gainValue");
getRangeValue(gain, gainRangeValue);

// Deleting device

function toggleConfirmation(id) {
  const confirmed = confirm("Are you sure you want to delete this bulb?");
  if (confirmed) {
    fetch(`/api/shellybulb/delete/${id}`, { method: "DELETE" })
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
        window.location.href = "/";
      })
      .catch((error) => {
        console.error("Error deleting bulb:", error);
      });
  }
}