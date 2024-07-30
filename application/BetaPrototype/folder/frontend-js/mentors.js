document.addEventListener("DOMContentLoaded", function () {
    const nameInput = document.querySelector('input[type="text"]');
    const emailInput = document.querySelector('input[type="email"]');
    const selectInput = document.querySelector("select");
    const textareaInput = document.querySelector("textarea");
    const submitButton = document.querySelector("button");

    function validateForm() {
      const isValid =
        nameInput.value.trim() !== "" &&
        emailInput.value.trim() !== "" &&
        selectInput.value !== "" &&
        textareaInput.value.trim() !== "";
      submitButton.disabled = !isValid;
      submitButton.style.cursor = isValid ? "pointer" : "not-allowed";
    }

    nameInput.addEventListener("input", validateForm);
    emailInput.addEventListener("input", validateForm);
    selectInput.addEventListener("change", validateForm);
    textareaInput.addEventListener("input", validateForm);

    submitButton.addEventListener("click", function (event) {
      if (!submitButton.disabled) {
        window.location.href = "/application/BetaProtoType/Folder/frontend-html/mentors/mentors.html";
      }
    });

    validateForm(); // checks if fields are filled
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
            window.location.href = '/application/BetaPrototype/folder/frontend-html/loginorsignup/login.html';
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
function acceptRequest() {
    // Shez backend
    alert('Request Accepted');
  }
  function denyRequest() {
    // Shez backend
    alert('Request Denied');
  }
  function handleAccept() {
    // Shez or William can add backend here
    alert("Application Accepted");
}
function handleDeny() {
    // Shez or William can add backend here
    alert("Application Denied");
}
let selectedMentor = '';

        function selectMentor(name, element) {
            selectedMentor = name;
            document.getElementById('request-button').style.display = 'block';
            const mentorBoxes = document.querySelectorAll('.mentor-box');
            mentorBoxes.forEach(box => box.classList.remove('selected'));
            element.classList.add('selected');
        }