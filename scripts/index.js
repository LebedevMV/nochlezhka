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
  const page = document.querySelector(".page");
  page.addEventListener("click", e => {
    if(e.target.classList.contains("form__select-option-container")) {
      e.target.classList.remove("form__select-option-container");
    }
  });
  const pseudoOptions = selectOptionContainer.querySelectorAll(".form__select-pseudo-option");
  selectElement.addEventListener("focus", () => {
    selectOptionContainer.classList.add("form__select-option-container_active");
  });
  selectElement.addEventListener("change", () => {
    console.log("changingValue");
    hideErrorForSelect(selectContainer);
    pseudoOptions.forEach(option => {
      option.classList.remove("form__select-pseudo-option_checked");
    });
    console.log(`form__select-pseudo-option[data-value="${selectElement.value}"]`);
    const selectedOption = selectOptionContainer.querySelector(`.form__select-pseudo-option[data-value="${selectElement.value}"]`);
    selectedOption.classList.add("form__select-pseudo-option_checked");
  });
  selectElement.addEventListener("invalid", () => {
    showErrorForSelect(selectContainer);
  });
  selectElement.checkValidity();
}

const selectContainers = document.querySelectorAll(".form__select-container");

selectContainers.forEach(selectContainer => fillSelectContainer(selectContainer));
