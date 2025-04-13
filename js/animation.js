document.addEventListener("DOMContentLoaded", () => {
  // Form field animations
  const formFields = document.querySelectorAll(".form-control");

  formFields.forEach((field) => {
    // Add focus animation
    field.addEventListener("focus", () => {
      field.classList.add("field-focus");
    });

    // Remove focus animation
    field.addEventListener("blur", () => {
      field.classList.remove("field-focus");

      // Add filled class if the field has a value
      if (field.value.trim() !== "") {
        field.classList.add("field-filled");
      } else {
        field.classList.remove("field-filled");
      }
    });

    // Check initial state
    if (field.value.trim() !== "") {
      field.classList.add("field-filled");
    }
  });

  // Enhanced button animations
  const allButtons = document.querySelectorAll(".btn");
  const projectButtons = document.querySelectorAll(".project-card .btn");
  const contactButton = document.querySelector(".btn-contact");
  const downloadButton = document.querySelector(".download-resume-btn");

  // Add hover effects to all buttons
  allButtons.forEach((button) => {
    button.addEventListener("mouseenter", () => {
      button.classList.add("btn-hover");
    });

    button.addEventListener("mouseleave", () => {
      button.classList.remove("btn-hover");
    });
  });

  // Special animation for project buttons
  projectButtons.forEach((button) => {
    const parent = button.closest(".project-card");

    parent.addEventListener("mouseenter", () => {
      button.classList.add("btn-hover");
    });

    parent.addEventListener("mouseleave", () => {
      button.classList.remove("btn-hover");
    });
  });

  // Special animation for contact button
  if (contactButton) {
    contactButton.addEventListener("mouseenter", () => {
      const icon = contactButton.querySelector("i");
      if (icon) {
        icon.style.transform = "translateX(5px)";
      }
    });

    contactButton.addEventListener("mouseleave", () => {
      const icon = contactButton.querySelector("i");
      if (icon) {
        icon.style.transform = "translateX(0)";
      }
    });
  }

  // Special animation for download button
  if (downloadButton) {
    downloadButton.addEventListener("mouseenter", () => {
      const icon = downloadButton.querySelector("i");
      if (icon) {
        icon.style.animation = "bounce 0.8s ease infinite";
      }
    });

    downloadButton.addEventListener("mouseleave", () => {
      const icon = downloadButton.querySelector("i");
      if (icon) {
        icon.style.animation = "none";
      }
    });
  }
});
