(function () {
  // Initialize EmailJS with your user ID
  emailjs.init("_w5DoV76-WBkwhuXB");
})();

/**
 * Sends an email using EmailJS
 * @param {Object} formData - The form data to send
 * @returns {Promise} - A promise that resolves when the email is sent
 */
async function sendEmail(formData) {
  try {
    // Create template parameters object
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      subject: formData.subject,
      message: formData.message,
    };

    // Use the send method with templateParams
    const response = await emailjs.send(
      "service_kxw2grd", // Your EmailJS service ID
      "template_fpjamvg", // Your updated EmailJS template ID
      templateParams
    );

    return response;
  } catch (error) {
    // Keep this console.error for debugging purposes
    console.error("Error sending email:", error);
    throw error;
  }
}

window.emailService = {
  sendEmail,
};
