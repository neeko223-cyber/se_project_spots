const editProfileButton = document.querySelector(".profile__edit-button");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseButton = editProfileModal.querySelector(".modal__close-button");
const editProfileForm = document.forms["editProfileForm"];
const editProfileNameInput = editProfileModal.querySelector("#profile-name-input");
const editProfileDescriptionInput = editProfileModal.querySelector("#profile-description-input");

const newPostButton = document.querySelector(".profile__add-button");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseButton = newPostModal.querySelector(".modal__close-button");
const addCardFormElement = newPostModal.querySelector(".modal__form");
const cardImageInput = newPostModal.querySelector("#card-image-input");
const cardCaptionInput = newPostModal.querySelector("#card-caption-input");

const profileNameEl = document.querySelector(".profile__name");
const profileDescriptionEl = document.querySelector(".profile__description");

function openModal(modal) {
    modal.classList.add("modal_is-opened");
}
function closeModal(modal) {
    modal.classList.remove("modal_is-opened");
}

function handleEditProfileNameInput(evt) {
    evt.preventDefault();
    profileNameEl.textContent = editProfileNameInput.value;
    profileDescriptionEl.textContent = editProfileDescriptionInput.value;
    closeModal(editProfileModal);
    console.log("submitting");
}

function handleEditProfileFormSubmit(evt) {
    evt.preventDefault();
    profileNameEl.textContent = editProfileNameInput.value;
    profileDescriptionEl.textContent = editProfileDescriptionInput.value;
    console.log("submitting");
    closeModal(editProfileModal);
}

function handleNewPostFormSubmit(evt) {
    evt.preventDefault();
    console.log(cardImageInput.value);
    console.log(cardCaptionInput.value);
    closeModal(newPostModal);
}

editProfileButton.addEventListener("click", function () {
    editProfileNameInput.value = profileNameEl.textContent;
    editProfileDescriptionInput.value = profileDescriptionEl.textContent;
    openModal(editProfileModal);
});

editProfileCloseButton.addEventListener("click", function () {
    closeModal(editProfileModal);
});

newPostButton.addEventListener("click", function () {
    openModal(newPostModal);
});

newPostCloseButton.addEventListener("click", () => {
  closeModal(newPostModal);
});

addCardFormElement.addEventListener("submit", handleNewPostFormSubmit);
editProfileForm.addEventListener("submit", handleEditProfileFormSubmit);