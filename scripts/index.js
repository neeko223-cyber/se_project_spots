const editProfileButton = document.querySelector(".profile__edit-button");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseButton = editProfileModal.querySelector(".modal__close-button");
const editProfileForm = editProfileModal.querySelector(".modal__form");
const editProfileNameInput = editProfileModal.querySelector("#profile-name-input");
const editProfileDescriptionInput = editProfileModal.querySelector("#profile-description-input");

const newPostButton = document.querySelector(".profile__add-button");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseButton = newPostModal.querySelector(".modal__close-button");
const addCardFormElement = newPostModal.querySelector(".modal__form");
const ProfileDescriptionInput = newPostModal.querySelector("#profile-description-input");
const CardImageInput = newPostModal.querySelector("#card-image-input");

const profileNameEl = document.querySelector(".profile__name");
const profileDescriptionEl = document.querySelector(".profile__description");

function handleEditProfileFormSubmit(evt) {
    evt.preventDefault();
    profileNameEl.textContent = editProfileNameInput.value;
    editProfileModal.classList.remove("modal_is-opened");
    console.log("submitting");
}

function handleNewPostFormSubmit(evt) {
    evt.preventDefault();
    console.log(ProfileDescriptionInput.value);
    console.log(CardImageInput.value);
    newPostModal.classList.remove("modal_is-opened");
}

editProfileButton.addEventListener("click", function () {
    editProfileNameInput.value = profileNameEl.textContent;
    editProfileDescriptionInput.value = profileDescriptionEl.textContent;
    editProfileModal.classList.add("modal_is-opened");
});

editProfileCloseButton.addEventListener("click", function () {
    editProfileModal.classList.remove("modal_is-opened");
});

newPostButton.addEventListener("click", function () {
    newPostModal.classList.add("modal_is-opened");
});

newPostCloseButton.addEventListener("click", function () {
    newPostModal.classList.remove("modal_is-opened");
});

addCardFormElement.addEventListener("submit", handleNewPostFormSubmit);
editProfileForm.addEventListener("submit", handleEditProfileFormSubmit);