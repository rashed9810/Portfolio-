document.addEventListener("DOMContentLoaded", function () {
  // Improved Mobile Menu Toggle
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");
  const closeBtn = document.getElementById("closeBtn");
  const mobileLinks = document.querySelectorAll(".mobile-link");

  function toggleMenu() {
    mobileMenu.classList.toggle("active");
    document.body.style.overflow = mobileMenu.classList.contains("active")
      ? "hidden"
      : "";
  }

  hamburger.addEventListener("click", toggleMenu);
  closeBtn.addEventListener("click", toggleMenu);

  // Close mobile menu when clicking outside
  document.addEventListener("click", function (e) {
    if (
      mobileMenu.classList.contains("active") &&
      !mobileMenu.contains(e.target) &&
      e.target !== hamburger &&
      !hamburger.contains(e.target)
    ) {
      mobileMenu.classList.remove("active");
      document.body.style.overflow = "";
    }
  });

  // Close mobile menu when a link is clicked (for better UX)
  mobileLinks.forEach((link) => {
    link.addEventListener("click", function () {
      mobileMenu.classList.remove("active");
      document.body.style.overflow = "";
    });
  });

  // Improved Scroll effect for navbar
  window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Improved Animation on scroll
  const fadeElements = document.querySelectorAll(".fade-in");

  function checkInView() {
    fadeElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;

      if (elementTop < window.innerHeight - elementVisible) {
        element.classList.add("active");
      }
    });
  }

  let isScrolling;
  window.addEventListener(
    "scroll",
    function () {
      window.clearTimeout(isScrolling);
      isScrolling = setTimeout(checkInView, 66);
    },
    false
  );

  // Initial check
  checkInView();

  // Improved Smooth scrolling for all anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      // Check if the href is just "#" (prevent default behavior for # only)
      if (this.getAttribute("href") === "#") {
        e.preventDefault();
        return;
      }

      // For all other anchor links
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });

  // Enhanced Contact Form Handling with Inline Validation
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    // Create a container for the form status message
    const formStatusContainer = document.createElement("div");
    formStatusContainer.className = "form-status-container";
    contactForm.appendChild(formStatusContainer);

    // Function to show error for a specific input
    const showError = (inputElement, message) => {
      // Check if input element exists
      if (!inputElement) {
        console.error("Cannot show error: Input element is null", message);
        return;
      }

      // Remove any existing error for this input
      removeError(inputElement);

      // Create error element
      const errorElement = document.createElement("div");
      errorElement.className = "form-error";
      errorElement.textContent = message;

      // Insert error after the input
      if (inputElement.parentNode) {
        inputElement.parentNode.insertBefore(
          errorElement,
          inputElement.nextSibling
        );
      } else {
        console.error(
          "Cannot show error: Input element has no parent",
          inputElement
        );
        return;
      }

      // Add error class to input
      inputElement.classList.add("input-error");

      // Add shake animation
      inputElement.classList.add("shake");
      setTimeout(() => {
        if (inputElement) {
          inputElement.classList.remove("shake");
        }
      }, 500);
    };

    // Function to remove error for a specific input
    const removeError = (inputElement) => {
      // Check if input element exists
      if (!inputElement) {
        console.error("Cannot remove error: Input element is null");
        return;
      }

      // Check if parent node exists
      if (!inputElement.parentNode) {
        console.error("Cannot remove error: Input element has no parent");
        return;
      }

      // Remove error message if it exists
      const errorElement = inputElement.parentNode.querySelector(".form-error");
      if (errorElement) {
        errorElement.remove();
      }

      // Remove error class from input
      inputElement.classList.remove("input-error");
    };

    // Function to validate an email address
    const isValidEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    // Function to show form status message with modern notification
    const showFormStatus = (message, isSuccess) => {
      // Remove any existing notifications
      const existingNotification = document.querySelector(".notification");
      if (existingNotification) {
        existingNotification.remove();
      }

      // Create notification element
      const notification = document.createElement("div");
      notification.className = `notification ${
        isSuccess ? "notification-success" : "notification-error"
      }`;

      // For error messages, adjust the animation duration based on message length
      const animationDuration = isSuccess
        ? 5
        : Math.max(5, Math.min(15, message.length * 0.05));

      // Create notification content
      notification.innerHTML = `
        <div class="notification-icon">
          <i class="${
            isSuccess ? "fas fa-check-circle" : "fas fa-exclamation-circle"
          }"></i>
        </div>
        <div class="notification-content">
          <h3 class="notification-title">${
            isSuccess ? "Success!" : "Error!"
          }</h3>
          <p class="notification-message">${message}</p>
        </div>
        <button class="notification-close">
          <i class="fas fa-times"></i>
        </button>
        <div class="notification-progress">
          <div class="notification-progress-bar"></div>
        </div>
      `;

      // Add to body
      document.body.appendChild(notification);

      // Set the animation duration based on message length
      const progressBar = notification.querySelector(
        ".notification-progress-bar"
      );
      progressBar.style.animationDuration = `${animationDuration}s`;

      // Show notification with animation
      setTimeout(() => {
        notification.classList.add("show");
        progressBar.classList.add("animate");
      }, 10);

      // Add event listener to close button
      const closeBtn = notification.querySelector(".notification-close");
      closeBtn.addEventListener("click", () => {
        notification.classList.remove("show");
        setTimeout(() => {
          notification.remove();
        }, 500);
      });

      // Auto-remove after animation completes
      setTimeout(() => {
        notification.classList.remove("show");
        setTimeout(() => {
          notification.remove();
        }, 500);
      }, animationDuration * 1000); // Convert seconds to milliseconds

      // Also add a simple message to the form container for accessibility
      formStatusContainer.innerHTML = "";
      const statusElement = document.createElement("div");
      statusElement.className = isSuccess ? "form-success" : "form-error";
      statusElement.textContent = message;
      statusElement.style.display = "none"; // Hide visually but keep for screen readers
      formStatusContainer.appendChild(statusElement);
    };

    // Add input event listeners for real-time validation
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const subjectInput = document.getElementById("subject");
    const messageInput = document.getElementById("message");

    // Validate name on blur
    nameInput.addEventListener("blur", () => {
      if (!nameInput.value.trim()) {
        showError(nameInput, "Please enter your name");
      } else {
        removeError(nameInput);
      }
    });

    // Validate email on blur
    emailInput.addEventListener("blur", () => {
      if (!emailInput.value.trim()) {
        showError(emailInput, "Please enter your email");
      } else if (!isValidEmail(emailInput.value.trim())) {
        showError(emailInput, "Please enter a valid email address");
      } else {
        removeError(emailInput);
      }
    });

    // Validate subject on blur
    subjectInput.addEventListener("blur", () => {
      if (!subjectInput.value.trim()) {
        showError(subjectInput, "Please enter a subject");
      } else {
        removeError(subjectInput);
      }
    });

    // Validate message on blur
    messageInput.addEventListener("blur", () => {
      if (!messageInput.value.trim()) {
        showError(messageInput, "Please enter your message");
      } else {
        removeError(messageInput);
      }
    });

    // Clear errors when user starts typing
    const inputs = [nameInput, emailInput, subjectInput, messageInput];
    inputs.forEach((input) => {
      input.addEventListener("input", () => {
        removeError(input);
      });
    });

    // Form submission handler
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Check if form elements exist
      if (!nameInput || !emailInput || !subjectInput || !messageInput) {
        console.error("Form elements not found");
        showFormStatus(
          "Form elements not found. Please refresh the page and try again.",
          false
        );
        return;
      }

      // Get form values
      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const subject = subjectInput.value.trim();
      const message = messageInput.value.trim();

      console.log("Form values:", { name, email, subject, message });

      // Clear all previous errors
      inputs.forEach((input) => {
        if (input) removeError(input);
      });

      // Validate all fields
      let hasErrors = false;

      if (!name) {
        showError(nameInput, "Please enter your name");
        hasErrors = true;
      }

      if (!email) {
        showError(emailInput, "Please enter your email");
        hasErrors = true;
      } else if (!isValidEmail(email)) {
        showError(emailInput, "Please enter a valid email address");
        hasErrors = true;
      }

      if (!subject) {
        showError(subjectInput, "Please enter a subject");
        hasErrors = true;
      }

      if (!message) {
        showError(messageInput, "Please enter your message");
        hasErrors = true;
      }

      // If there are errors, stop form submission
      if (hasErrors) {
        return;
      }

      // Create a form data object
      const formData = {
        name,
        email,
        subject,
        message,
        timestamp: new Date().toISOString(),
      };

      // Show loading state
      const submitButton = contactForm.querySelector("button[type='submit']");
      const originalButtonText = submitButton.textContent;
      submitButton.disabled = true;
      submitButton.textContent = "Sending...";

      // Send the email using EmailJS
      window.emailService
        .sendEmail(formData)
        .then(() => {
          // Show success message
          showFormStatus(
            "Thank you for your message! I will get back to you soon.",
            true
          );

          // Reset form
          contactForm.reset();
        })
        .catch((error) => {
          console.error("EmailJS error:", error);
          // Show error message with more details
          let errorMessage = "Oops! Something went wrong. ";

          if (error) {
            if (error.status === 405) {
              errorMessage +=
                "The email service is currently unavailable (405 Method Not Allowed). ";
            } else if (error.text) {
              // Add specific error information if available
              errorMessage += error.text;
            }
          }

          errorMessage +=
            "\n\nPlease try again or contact me directly at rashed.bcse.edu@gmail.com";

          showFormStatus(errorMessage, false);
        })
        .finally(() => {
          // Reset button
          submitButton.disabled = false;
          submitButton.textContent = originalButtonText;
        });
    });
  }

  // All project links are now properly configured with their respective URLs
});
