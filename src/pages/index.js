import "../pages/index.css";

import {
  enableValidation,
  resetValidation,
  disableSubmitButton,
  validationConfig,
} from "../scripts/validation.js";

import {setButtonText} from "../utils/helpers.js";

import Api from "../utils/Api.js";

let currentUserId;

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "b3b79d51-e157-4e49-bde8-36f1f7d380b7",
    "Content-Type": "application/json",
  },
});

/* ---------------- PROFILE ELEMENTS ---------------- */

const profileNameEl = document.querySelector(".profile__name");
const profileDescriptionEl = document.querySelector(".profile__description");
const profileAvatarEl = document.querySelector(".profile__avatar");

/* ---------------- CARD ELEMENTS ---------------- */

const cardTemplate = document.querySelector("#card-template");
const cardList = document.querySelector(".cards__list");

/* ---------------- EDIT PROFILE MODAL ---------------- */

const editProfileButton = document.querySelector(".profile__edit-button");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseButton =
  editProfileModal.querySelector(".modal__close-button");

const editProfileForm = document.forms["editProfileForm"];
const editProfileNameInput =
  editProfileModal.querySelector("#profile-name-input");
const editProfileDescriptionInput =
  editProfileModal.querySelector("#profile-description-input");

/* ---------------- NEW CARD MODAL ---------------- */

const newPostButton = document.querySelector(".profile__add-button");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseButton =
  newPostModal.querySelector(".modal__close-button");

const addCardFormElement = newPostModal.querySelector(".modal__form");
const cardSubmitButton =
  newPostModal.querySelector(".modal__submit-button");

const cardImageInput =
  newPostModal.querySelector("#card-image-input");

const cardCaptionInput =
  newPostModal.querySelector("#card-caption-input");

/* ---------------- EDIT AVATAR MODAL ---------------- */

const avatarEditButton =
  document.querySelector(".profile__avatar-edit-button");

const editAvatarModal =
  document.querySelector("#edit-avatar-modal");

const avatarForm =
  editAvatarModal.querySelector(".modal__form");

const avatarModalCloseButton =
  editAvatarModal.querySelector(".modal__close-button");

const avatarImageInput =
  editAvatarModal.querySelector("#profile-avatar-input");

/* ---------------- DELETE MODAL ---------------- */

const deleteModal = document.querySelector("#delete-modal");
const deleteModalCloseButton =
  deleteModal.querySelector(".modal__close-button");

const deleteConfirmButton =
  deleteModal.querySelector(".modal__delete-button");

const cancelDeleteButton =
  deleteModal.querySelector(".modal__cancel-button");

let cardToDelete = null;
let cardIdToDelete = null;

/* ---------------- PREVIEW MODAL ---------------- */

const previewModal =
  document.querySelector("#preview-modal");

const previewModalCloseButton =
  previewModal.querySelector(".modal__close-button");

const previewImageEl =
  previewModal.querySelector(".modal__image-preview");

const previewCaptionEl =
  previewModal.querySelector(".modal__caption");

/* ---------------- CARD CREATION ---------------- */

function getCardElement(data) {

  const cardElement =
    cardTemplate.content
      .querySelector(".card")
      .cloneNode(true);

  const cardImageEl =
    cardElement.querySelector(".card__image");

  const cardTitleEl =
    cardElement.querySelector(".card__title");

  const likeButton =
    cardElement.querySelector(".card__like-button");

  const deleteButton =
    cardElement.querySelector(".card__delete-button");

  if (data.isLiked){
    likeButton.classList.add("card__like-button_active");
  }

  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;
  cardTitleEl.textContent = data.name;

  /* ---- LIKE BUTTON ---- */

 likeButton.addEventListener("click", () => {

  const isLiked = likeButton.classList.contains("card__like-button_active");

  api.changeLikeCardStatus(data._id, isLiked)
    .then((updatedCard) => {

      const likedByUser =
        updatedCard.likes &&
        updatedCard.likes.some(user => user._id === currentUserId);

      likeButton.classList.toggle("card__like-button_active", likedByUser);

    })
    .catch(console.error);

});

  /* ---- DELETE BUTTON ---- */

  deleteButton.addEventListener("click", () => {

    cardToDelete = cardElement;
    cardIdToDelete = data._id;

    openModal(deleteModal);

  });

  /* ---- IMAGE PREVIEW ---- */

  cardImageEl.addEventListener("click", () => {

    previewImageEl.src = data.link;
    previewImageEl.alt = data.name;
    previewCaptionEl.textContent = data.name;

    openModal(previewModal);

  });

  return cardElement;
}

/* ---------------- MODAL FUNCTIONS ---------------- */

function openModal(modal) {
  modal.classList.add("modal_is-opened");
  document.addEventListener("keydown", handleEscapeKey);
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
  document.removeEventListener("keydown", handleEscapeKey);
}
const modals = document.querySelectorAll(".modal");

function handleOverlayClick(evt) {

  if (evt.target.classList.contains("modal")) {
    closeModal(evt.target);
  }

}

modals.forEach((modal) => {
  modal.addEventListener("click", handleOverlayClick);

  });


function handleEscapeKey(evt) {

  if (evt.key === "Escape") {

    const openedModal =
      document.querySelector(".modal");

    closeModal(openedModal);

  }

}

/* ---------------- PROFILE UPDATE ---------------- */

function handleEditProfileFormSubmit(evt) {

  evt.preventDefault();
  const submitButton = evt.submitter;
  setButtonText(submitButton, true, "Saving...", "Save");

  api
    .editUserInfo({
      name: editProfileNameInput.value,
      about: editProfileDescriptionInput.value,
    })
    .then((updatedUserData) => {

      profileNameEl.textContent = updatedUserData.name;
      profileDescriptionEl.textContent = updatedUserData.about;

      closeModal(editProfileModal);

    })
    .catch(console.error)
    .finally(() => {
        setButtonText(submitButton, false);
      });

   
}

/* ---------------- AVATAR UPDATE ---------------- */

function handleAvatarFormSubmit(evt) {

  evt.preventDefault();
  const submitButton = evt.submitter;
  setButtonText(submitButton, true, "Saving...", "Save");

  api
    .editAvatar({
      avatar: avatarImageInput.value,
    })
    .then((updatedUserData) => {

      profileAvatarEl.src = updatedUserData.avatar;

      closeModal(editAvatarModal);

      avatarForm.reset();

    })
    .catch(console.error)
    .finally(() => {
        setButtonText(submitButton, false);
      });

}

/* ---------------- INITIAL DATA LOAD ---------------- */

api
  .getAppInfo()
  .then(([cards, userData]) => {

    currentUserId = userData._id;

    profileNameEl.textContent = userData.name;
    profileDescriptionEl.textContent = userData.about;
    profileAvatarEl.src = userData.avatar;

    cards.forEach((card) => {
      const cardElement = getCardElement(card);
      cardList.append(cardElement);
    });

  })
  .catch(console.error);

/* ---------------- EVENT LISTENERS ---------------- */

/* Edit profile */

editProfileButton.addEventListener("click", () => {

  editProfileNameInput.value = profileNameEl.textContent;
  editProfileDescriptionInput.value =
    profileDescriptionEl.textContent;

  resetValidation(editProfileForm, validationConfig);

  openModal(editProfileModal);

});

editProfileCloseButton.addEventListener("click", () => {
  closeModal(editProfileModal);
});

editProfileForm.addEventListener(
  "submit",
  handleEditProfileFormSubmit
);

/* Add card */

newPostButton.addEventListener("click", () => {
  openModal(newPostModal);
});

newPostCloseButton.addEventListener("click", () => {
  closeModal(newPostModal);
});

addCardFormElement.addEventListener("submit", (evt) => {

  evt.preventDefault();
  const submitButton = evt.submitter;
  setButtonText(submitButton, true, "Saving...", "Save");

  api
    .addCard({
      name: cardCaptionInput.value,
      link: cardImageInput.value,
    })
    .then((cardData) => {

      const cardElement = getCardElement(cardData);

      cardList.prepend(cardElement);

      closeModal(newPostModal);

      addCardFormElement.reset();

      disableSubmitButton(cardSubmitButton, validationConfig);

    })
    .catch(console.error)
    .finally(() => {
        setButtonText(submitButton, false);
      });

});

/* DELETE CONFIRMATION */

deleteConfirmButton.addEventListener("click", (evt) => {

  evt.preventDefault();

  if (!cardIdToDelete) {
    console.error("No card selected for deletion.");
    return;
  }

  const submitButton = deleteConfirmButton;
  setButtonText(submitButton, true, "Deleting...", "Delete");

  api.deleteCard(cardIdToDelete)
    .then(() => {

      cardToDelete.remove();

      closeModal(deleteModal);

    })
    .catch(console.error)
    .finally(() => {
        setButtonText(submitButton, false);
      });

});

/* CANCEL DELETE */

cancelDeleteButton.addEventListener("click", () => {
  closeModal(deleteModal);
});

/* CLOSE DELETE MODAL */

deleteModalCloseButton.addEventListener("click", () => {
  closeModal(deleteModal);
});

/* Avatar */

avatarEditButton.addEventListener("click", () => {

  resetValidation(avatarForm, validationConfig);

  openModal(editAvatarModal);

});

avatarModalCloseButton.addEventListener("click", () => {
  closeModal(editAvatarModal);
});

avatarForm.addEventListener(
  "submit",
  handleAvatarFormSubmit
);

/* Preview */

previewModalCloseButton.addEventListener("click", () => {
  closeModal(previewModal);
});

/* Validation */

enableValidation(validationConfig);