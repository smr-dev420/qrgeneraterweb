const generateBtn = document.getElementById("generateBtn");
const resetBtn = document.getElementById("resetBtn");
const downloadBtn = document.getElementById("downloadBtn");
const qrContainer = document.getElementById("qrContainer");
const qrInput = document.getElementById("qrText");

generateBtn.addEventListener("click", () => {
  const qrText = qrInput.value.trim();
  qrContainer.innerHTML = "";
  downloadBtn.style.display = "none";

 
 const urlPattern = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/[^\s]*)?$/i;

  if (!urlPattern.test(qrText)) {
    alert("Please enter a valid URL (starting with http:// or https://)");
    return;
  }

 
  const qr = new QRCode(qrContainer, {
    text: qrText,
    width: 200,
    height: 200,
    colorDark: "#000000",
    colorLight: "#ffffff",
  });

  setTimeout(() => {
    const qrImg = qrContainer.querySelector("img");
    const qrCanvas = qrContainer.querySelector("canvas");

    if (qrImg || qrCanvas) {
      downloadBtn.style.display = "inline-block";

      downloadBtn.onclick = () => {
        let imageSrc;

        if (qrImg && qrImg.src) {
          imageSrc = qrImg.src;
        } else if (qrCanvas) {
          imageSrc = qrCanvas.toDataURL("image/png");
        }

        if (imageSrc) {
          const link = document.createElement("a");
          link.href = imageSrc;
          link.download = "qrcode.png";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } else {
          alert("Unable to download QR code");
        }
      };
    }
  }, 300);
});

resetBtn.addEventListener("click", () => {
  qrInput.value = "";
  qrContainer.innerHTML = "";
  downloadBtn.style.display = "none";
});

