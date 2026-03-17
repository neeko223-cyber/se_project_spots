export function setButtonText(button, isloading, loadingText = "Saving...", defaultText = "Save") {
  if (isloading) {
    button.textContent = loadingText;
  } else {
    button.textContent = defaultText;
  }
}