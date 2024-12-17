(function () {
  "use strict";
  const codeInputs = document.querySelectorAll(".code-input");

  function setupCodeInputs() {
    codeInputs.forEach((input, index) => {
      input.addEventListener("input", (e) => {
        if (e.target.value && index < codeInputs.length - 1) {
          codeInputs[index + 1].focus();
        }
      });

      input.addEventListener("keydown", (e) => {
        if (e.key === "Backspace" && !e.target.value && index > 0) {
          codeInputs[index - 1].focus();
        }
      });
    });
  }

  function setupFormValidation() {
    var forms = document.querySelectorAll(".needs-validation");

    Array.prototype.slice.call(forms).forEach(function (form) {
      form.addEventListener(
        "submit",
        function (event) {
          if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
          }
          let isComplete = true;
          codeInputs.forEach((input) => {
            if (!input.value) {
              isComplete = false;
              input.classList.add("is-invalid");
            } else {
              input.classList.remove("is-invalid");
            }
          });

          if (!isComplete) {
            event.preventDefault();
            form.querySelector(".invalid-feedback").style.display = "block";
          } else {
            form.querySelector(".invalid-feedback").style.display = "none";
          }

          form.classList.add("was-validated");
        },
        false
      );
    });
  }
  function init() {
    setupCodeInputs();
    setupFormValidation();
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
