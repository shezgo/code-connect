function showDevelopmentAlert() {
    alert("Still in development");
}

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
document.addEventListener("DOMContentLoaded",  () => {
    const searchBar = document.getElementById("search-bar");
    const suggestions = document.getElementById("suggestions");

    const pages = [
      { name: "Home", url: "homepage.html" },
      { name: "About", url: "about.html" },
      { name: "Inbox", url: "inbox.html" },
      { name: "Mentors", url: "mentors.html" },
      { name: "Premium", url: "premium.html" },
      { name: "Store", url: "store.html" },
      { name: "Challenges", url: "challenges.html" },
      { name: "Forum", url: "forum.html" },
      { name: "Profile", url: "profile.html" },
    ];

    searchBar.addEventListener("input",  async () => {
      const input = searchBar.value.toLowerCase();
      suggestions.innerHTML = "";

      if (input) {
        const requestOptions = {method: "GET"};
        
        const filteredPages = pages.filter((page) =>
          page.name.toLowerCase().includes(input)
        );
        const response = await fetch(`/api/search/${input}` , requestOptions);
        const response_json = await response.json();
        const filteredRecords = response_json.records.map((record)=>
            {
              // url:`/${record.entityType}/${record.entityId}` Once pages for resources are implemented
              return {name:record.title, url:'/explore.html'}
            }
          );
          filteredPages.concat(filteredRecords).forEach((page) => {
              const suggestionItem = document.createElement("a");
              suggestionItem.href = page.url;
              suggestionItem.textContent = page.name;
              suggestions.appendChild(suggestionItem);
        });
        suggestions.style.display = "block";
        
      } else {
        suggestions.style.display = "none";
      }
    });

    document.addEventListener("click", (event) => {
      if (!event.target.closest(".search-container")) {
        suggestions.style.display = "none";
      }
    });
  });
  function openSidebar() {
    document.getElementById("mySidebar").style.width = "250px";
  }

  function closeSidebar() {
    document.getElementById("mySidebar").style.width = "0";
  }
  function previewProfilePic(event) {
    const reader = new FileReader();
    reader.onload = function() {
      const output = document.getElementById('profile-pic-preview');
      output.src = reader.result;
    };
    reader.readAsDataURL(event.target.files[0]);
  }

  function saveChanges() {
    const name = document.getElementById('nickname').value;
    const bio = document.getElementById('bio').value;
    const about = document.getElementById('about').value;

    document.getElementById('display-name').innerText = name;
    document.getElementById('display-bio').innerText = bio || "No bio available.";
    document.getElementById('display-about').innerText = about || "No information available.";

    alert('Changes saved successfully!');
  }
