      //added script that doesnt allow users to click submit unless all fields are filled out

      document.addEventListener("DOMContentLoaded", function () {
        const nameInput = document.getElementById("name-on-card");
        const cardNumberInput = document.getElementById("card-number");
        const expiryDateInput = document.getElementById("expiry-date");
        const cvvInput = document.getElementById("cvv");
        const submitButton = document.getElementById("submit-button");

        function validateForm() {
          const isValid =
            nameInput.value.trim() !== "" &&
            cardNumberInput.value.trim() !== "" &&
            expiryDateInput.value.trim() !== "" &&
            cvvInput.value.trim() !== "";
          submitButton.disabled = !isValid;
          submitButton.style.cursor = isValid ? "pointer" : "not-allowed";
        }

        nameInput.addEventListener("input", validateForm);
        cardNumberInput.addEventListener("input", validateForm);
        expiryDateInput.addEventListener("input", validateForm);
        cvvInput.addEventListener("input", validateForm);

            validateForm(); // Initial checking if fields are filled
        });
        async function logoutUser() {
            try {
                const response = await fetch('/api/auth/logout', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    // Redirect to the login page or home page after logout
                    window.location.href = 'login.html';
                } else {
                    const result = await response.json();
                    alert(`Logout failed: ${result.message}`);
                }
            } catch (error) {
                console.error('Error during logout:', error);
                alert('Logout failed. Please try again.');
            }
        }
        function openSidebar() {
            document.getElementById("mySidebar").style.width = "250px";
          }
      
          function closeSidebar() {
            document.getElementById("mySidebar").style.width = "0";
          }