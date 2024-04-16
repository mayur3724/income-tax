document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("taxForm");
    const modal = document.getElementById("modal");
    const closeBtn = document.getElementsByClassName("close")[0];
  
    form.addEventListener("submit", function(event) {
      event.preventDefault();
      hideErrorIcons();
  
      const age = document.getElementById("age").value;
      const income = parseFloat(document.getElementById("income").value);
      const extraIncome = parseFloat(document.getElementById("extraIncome").value);
      const deductions = parseFloat(document.getElementById("deductions").value);
  
      if (!age || !income || !extraIncome || !deductions) {
        displayError("Please fill out all fields.");
        return;
      }
  
      let tax = 0;
      const taxableIncome = (income + extraIncome - deductions) - 8;
      if (taxableIncome > 0) {
        if (age === "<40") {
          tax = 0.3 * taxableIncome;
        } else if (age === "≥40&<60") {
          tax = 0.4 * taxableIncome;
        } else if (age === "≥60") {
          tax = 0.1 * taxableIncome;
        }
      }
  
      showModal(tax);
    });
  
    closeBtn.addEventListener("click", function() {
      closeModal();
    });
  
    window.addEventListener("click", function(event) {
      if (event.target === modal) {
        closeModal();
      }
    });
  
    function displayError(message) {
      alert(message); // You can replace this with more visually appealing error display
    }
  
    function hideErrorIcons() {
      const errorIcons = document.querySelectorAll(".error-icon");
      errorIcons.forEach(function(icon) {
        icon.style.display = "none";
      });
    }
  
    function showModal(tax) {
      const result = document.getElementById("result");
      result.innerHTML = "Tax to be paid: " + tax.toFixed(2) + " Lakhs";
      modal.style.display = "block";
    }
  
    function closeModal() {
      modal.style.display = "none";
    }
  });