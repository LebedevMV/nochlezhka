const createCustomOptionElement = (optionElement) => {
  const customOptionElement = document.querySelector(".select-option-template").content.firstElementChild.cloneNode(true);
  customOptionElement.dataset.value = optionElement.value;
  customOptionElement.textContent = optionElement.text;
  return customOptionElement;
}

const showErrorForSelect = (selectContainer) => {
  const errorLabel = selectContainer.nextElementSibling;
  errorLabel.style.display = "flex";
}

const hideErrorForSelect = (selectContainer) => {
  const errorLabel = selectContainer.nextElementSibling;
  errorLabel.style.display = "none";
}

const changeSections = (section1, section2) => {
  section1.classList.add("section_hidden");
  section2.classList.remove("section_hidden");
}

const fillSelectContainer = (selectContainer) => {
  const selectElement = selectContainer.querySelector(".form__input_type_select");
  const options = selectElement.querySelectorAll(".form__select-option");
  const selectOptionContainer = selectContainer.querySelector(".form__select-option-container");
  options.forEach(option => {
    const customOptionElement = createCustomOptionElement(option);
    customOptionElement.addEventListener("click", () => {
      selectElement.value = customOptionElement.dataset.value;
      selectOptionContainer.classList.remove("form__select-option-container_active");
      selectElement.dispatchEvent(new Event("change"));
    });
    selectOptionContainer.append(customOptionElement);
  });
  const pseudoOptions = selectOptionContainer.querySelectorAll(".form__select-pseudo-option");
  selectElement.addEventListener("focus", () => {
    selectOptionContainer.classList.add("form__select-option-container_active");
  });
  selectElement.addEventListener("change", () => {
    hideErrorForSelect(selectContainer);
    pseudoOptions.forEach(option => {
      option.classList.remove("form__select-pseudo-option_checked");
    });
    const selectedOption = selectOptionContainer.querySelector(`.form__select-pseudo-option[data-value="${selectElement.value}"]`);
    selectedOption.classList.add("form__select-pseudo-option_checked");
  });
  selectElement.addEventListener("invalid", () => {
    showErrorForSelect(selectContainer);
  });
  selectElement.checkValidity();
}

const validateForm = form => {
  let isValid = true;
  Array.from(form.elements).forEach(elem => {
    if(elem.willValidate && elem.required) {
      isValid = elem.checkValidity();
    }
  });
  return isValid;
}

const page = document.querySelector(".page");
const openFormButton = page.querySelector(".section__buttons button");
const selectContainers = page.querySelectorAll(".form__select-container");
const firstSection = page.querySelector(".section_type_participants");
const formStepOneSection = document.forms["form-1"].parentNode;
const heading = page.querySelector(".heading");
selectContainers.forEach(selectContainer => fillSelectContainer(selectContainer));
const typeButtons = document.forms["form-1"].querySelectorAll(".form__input_type_button-select");
const form1SubmitButton = document.forms["form-1"].querySelector(".button[type='submit']");

openFormButton.addEventListener("click", () => {
  changeSections(firstSection, formStepOneSection);
  heading.classList.remove("heading_visible");
});

// Реализация переходов между шагами формы
Array.from(document.forms).forEach(form => {
  const formName = form.getAttribute("name");
  switch(formName) {
    case "form-1":
      form.cancel.addEventListener("click", () => {
        changeSections(form.parentNode, firstSection);
        heading.classList.add("heading_visible");
      });
      break;
    case "form-2-cafe":
      form.back.addEventListener("click", () => changeSections(form.parentNode, formStepOneSection));
      break;
    case "form-2-lecture":
      form.back.addEventListener("click", () => changeSections(form.parentNode, formStepOneSection));
      break;
    case "form-2-party":
      form.back.addEventListener("click", () => changeSections(form.parentNode, formStepOneSection));
      break;
    case "form-2-other":
      form.back.addEventListener("click", () => changeSections(form.parentNode, formStepOneSection));
      break;
    case "form-3-cafe":
      form.back.addEventListener("click", () => changeSections(form.parentNode, document.forms["form-2-cafe"].parentNode));
      break;
    case "form-3-lecture":
      form.back.addEventListener("click", () => changeSections(form.parentNode, document.forms["form-2-lecture"].parentNode));
      break;
    case "form-3-party":
      form.back.addEventListener("click", () => changeSections(form.parentNode, document.forms["form-2-party"].parentNode));
      break;
    case "form-3-other":
      form.back.addEventListener("click", () => changeSections(form.parentNode, formStepOneSection));
      form.back.addEventListener("click", () => changeSections(form.parentNode, document.forms["form-2-other"].parentNode));
      break;
  }
  form.addEventListener("submit", e => {
    e.preventDefault();
    const isValidForm = validateForm(form);
    if(!isValidForm) return; // Если форма не валидна то никакие переходы не выполняются
    switch(formName) {
      case "form-1":
        switch(form.type.value) {
          case "cafe":
            changeSections(form.parentNode, document.forms["form-2-cafe"].parentNode);
            break;
          case "lecture":
            changeSections(form.parentNode, document.forms["form-2-lecture"].parentNode);
            break;
          case "party":
            changeSections(form.parentNode, document.forms["form-2-party"].parentNode);
            break;
          case "other":
            changeSections(form.parentNode, document.forms["form-2-other"].parentNode);
            break;
        }
        break;
      case "form-2-cafe":
        changeSections(form.parentNode, document.forms["form-3-cafe"].parentNode);
        break;
      case "form-2-lecture":
        changeSections(form.parentNode, document.forms["form-3-lecture"].parentNode);
        break;
      case "form-2-party":
        changeSections(form.parentNode, document.forms["form-3-party"].parentNode);
        break;
      case "form-2-other":
        changeSections(form.parentNode, document.forms["form-3-lecture"].parentNode);
        break;
    }
  });
});

typeButtons.forEach(button => {
  button.addEventListener("click", () => {
    form1SubmitButton.disabled = false;
  });
})

page.addEventListener("click", e => {
  if(!(e.target.classList.contains("form__select-option-container_active") || e.target.classList.contains("form__input_type_select"))) {
    const activeOptionContainer = document.querySelector(".form__select-option-container_active");
    if(activeOptionContainer) activeOptionContainer.classList.remove("form__select-option-container_active");
  }
});

window.addEventListener ('resize', function mobileTextButton () {
  if (window.innerWidth <= 426 ) {
    document.querySelector('#next').textContent = "Продолжить"
   } else {
    document.querySelector('#next').textContent = "Далее"
   }
});

