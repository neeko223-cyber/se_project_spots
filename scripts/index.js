const initialCards = [
    {
        name:"Golden Gate Bridge",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg"
    },
    {
        name: "Val Thorens",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg"
    },
    {
        name: "Resturant terrace",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg"
    },
    {
        name: "An outdoor cafe",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg"
    },
    {
        name: "A very long bridge, over the forest and through the trees",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg"
    },
    {
        name: "Tunnel with morning light",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg"
    },
    {
        name: "Mountain house",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg"
    },
];

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

const previewModal = document.querySelector("#preview-modal");
const previewModalCloseButton = previewModal.querySelector(".modal__close-button");
const previewImageEl = previewModal.querySelector(".modal__image-preview");
const previewCaptionEl = previewModal.querySelector(".modal__caption");

const profileNameEl = document.querySelector(".profile__name");
const profileDescriptionEl = document.querySelector(".profile__description");

const cardTemplate = document.querySelector("#card-template");
const cardList = document.querySelector(".cards__list");
   
function getCardElement(data) {
    const cardElement = cardTemplate.content.querySelector(".card").cloneNode(true);
    const cardImageEl = cardElement.querySelector(".card__image");
    const cardTitleEl = cardElement.querySelector(".card__title");
    
    cardImageEl.src = data.link;
    cardImageEl.alt = data.name;
    cardTitleEl.textContent = data.name;

    const cardLikeButtonEl = cardElement.querySelector(".card__like-button");
    cardLikeButtonEl.addEventListener("click", () => {
        cardLikeButtonEl.classList.toggle("card__like-button_active");
    });

    const cardDeleteButtonEl = cardElement.querySelector(".card__delete-button");
    cardDeleteButtonEl.addEventListener("click", () => {
        cardElement.remove();
    });

    cardImageEl.addEventListener("click", () => {
        previewImageEl.src = data.link;
        previewImageEl.alt = data.name;
        previewCaptionEl.textContent = data.name;
        openModal(previewModal);
    });

    



    return cardElement;

}

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

previewModalCloseButton.addEventListener("click", () => {
  closeModal(previewModal);
});

addCardFormElement.addEventListener("submit", function (evt) {
    evt.preventDefault();

    const inputValues = {
        name: cardCaptionInput.value,
        link: cardImageInput.value,
    };
    console.log(inputValues);

    const newCardData = getCardElement({
        name: cardCaptionInput.value,
        link: cardImageInput.value,
    });
    cardlist.prepend(newCardData);

    newPostModal.classList.remove("modal_is-opened");
    addCardFormElement.reset();
});

editProfileForm.addEventListener("submit", handleEditProfileFormSubmit);

initialCards.forEach(function (item) {
    const cardElement = getCardElement(item);
    cardlist.append(cardElement);
});
