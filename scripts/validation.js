const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-button",
  inactiveButtonClass: "modal__submit-button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__input_error_visible"
}


const showInputError = (formEl, inputEl, errorMsg, config) => {
   const errorMsgEl = formEl.querySelector(`#${inputEl.id}-error`);
    errorMsgEl.textContent = errorMsg;
    errorMsgEl.classList.add(config.errorClass);
    inputEl.classList.add(config.inputErrorClass);
    console.log("showInputError called:", errorMsg);
};

function hideInputError(formEl, inputEl, config) {
    const errorMsgEl = formEl.querySelector(`#${inputEl.id}-error`);
    errorMsgEl.textContent = "";
    errorMsgEl.classList.remove(config.errorClass);
    inputEl.classList.remove(config.inputErrorClass);
}

const checkInputValidity = (formEl, inputElement, config) => {
    if (!inputElement.validity.valid) {
        showInputError(formEl, inputElement, inputElement.validationMessage, config);
    } else {
        hideInputError(formEl, inputElement, config);
    }
};

const hasInvalidInput = (inputList, config) => {
    return inputList.some((inputEl) => {
        return !inputEl.validity.valid;
    });

}

const toggleButtonState = (inputList, buttonEl, config) => {
    if (hasInvalidInput(inputList, config)) {
        disableSubmitButton(buttonEl, config);
    } else {
        buttonEl.classList.remove(config.inactiveButtonClass);
        buttonEl.disabled = false;
    }
    
};

const disableSubmitButton = (buttonEl, config) => {
    buttonEl.classList.add(config.inactiveButtonClass);
    buttonEl.disabled = true;
};

const resetValidation = (formEl, config) => {
    const inputList = Array.from(formEl.querySelectorAll(config.inputSelector));
    inputList.forEach((inputEl) => {
        hideInputError(formEl, inputEl, config);
    });
};

const setEventListeners = (formEl, config) => {
    const inputList = Array.from(formEl.querySelectorAll(config.inputSelector));
    const buttonElement = formEl.querySelector(config.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, config);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", function () {
            checkInputValidity(formEl, inputElement, config);
            toggleButtonState(inputList, buttonElement, config);
        });
    });
};
    

const enableValidation = (config) => {
    const formList = (document.querySelectorAll(config.formSelector));
    formList.forEach((formEl) => {
        setEventListeners(formEl, config);
    });
};

enableValidation(settings);