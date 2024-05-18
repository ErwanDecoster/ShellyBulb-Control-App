// Change circle color

const circle = document.querySelector(".circle");
const colorInput = document.querySelector(".color-input");

colorInput.addEventListener("input", () => {
  circle.style.backgroundColor = colorInput.value;
  bulb.style.fill = colorInput.value;
});

// White/color button
const slideButton = document.getElementById("toggleSlide");
const modeWhite = document.getElementById("mode-white");
const modeColor = document.getElementById("mode-color");

if (slideButton.checked) {
  toggleSlide();
}

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
  const checkbox = document.getElementById("onOff");
  const isChecked = checkbox.checked;

  if (isChecked) {
    // Turning ON
    fetch(`/api/shellybulb/${id}/on`, { method: "POST" })
      .then((response) => {
        if (response.ok) {
          checkbox.checked = true;
        } else {
          checkbox.checked = false;
        }
      })
      .catch((error) => {
        console.error("Error turning on the bulb:", error);
        checkbox.checked = false;
      });
  } else {
    // Turning OFF
    fetch(`/api/shellybulb/${id}/off`, { method: "POST" })
      .then((response) => {
        if (response.ok) {
          checkbox.checked = false;
        } else {
          checkbox.checked = true;
        }
      })
      .catch((error) => {
        console.error("Error turning off the bulb:", error);
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

// Pass bulb color to color input

const colorInputRed = colorInput.dataset.red;
const colorInputGreen = colorInput.dataset.green;
const colorInputBlue = colorInput.dataset.blue;

function rgbToHex(r, g, b) {
  return "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1);
}

const colorInputDefaultValue = rgbToHex(colorInputRed, colorInputGreen, colorInputBlue);
colorInput.value = colorInputDefaultValue;
circle.style.backgroundColor = colorInputDefaultValue;

// Change bulb color

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

async function changeColor(id) {
  const hexColorInputValue = document.getElementById("color-input").value;
  const rgbColor = hexToRgb(hexColorInputValue);
  const red = rgbColor.r;
  const green = rgbColor.g;
  const blue = rgbColor.b;

  const body = JSON.stringify({
    red,
    green,
    blue,
  });

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  };

  try {
    const response = await fetch(`/api/shellybulb/${id}/color`, requestOptions);
    if (response.ok) {
      const data = await response.json();
      console.log(data.message);
      return true;
    } else {
      console.error("Error changing colors:", response.statusText);
      return false;
    }
  } catch (error) {
    console.error("Unknown error changing colors:", error);
    return false;
  }
}

// Modifying Gain

async function modifyGain(id) {
  const gainValue = document.getElementById("gain").value;

  try {
    const response = await fetch(`/api/shellybulb/${id}/gain`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ gain: gainValue }),
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data.message);
      return true;
    } else {
      console.error("Error modifying gain:", response.statusText);
      return false;
    }
  } catch (error) {
    console.error("Unknown error modifying gain:", error);
    return false;
  }
}

// Modifying Brightness

async function modifyBrightness(id) {
  const brightnessValue = document.getElementById("brightness").value;

  try {
    const response = await fetch(`/api/shellybulb/${id}/brightness`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ brightness: brightnessValue }),
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data.message);
      return true;
    } else {
      console.error("Error modifying brightness:", response.statusText);
      return false;
    }
  } catch (error) {
    console.error("Unknown error modifying brightness:", error);
    return false;
  }
}

// Modifying Temperature

async function modifyTemperature(id) {
  const tempValue = document.getElementById("temp").value;

  try {
    const response = await fetch(`/api/shellybulb/${id}/temp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ temp: tempValue }),
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data.message);
      return true;
    } else {
      console.error("Error modifying temperature:", response.statusText);
      return false;
    }
  } catch (error) {
    console.error("Unknown error modifying temperature:", error);
    return false;
  }
}
