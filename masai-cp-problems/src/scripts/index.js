document.addEventListener("DOMContentLoaded", function () {
    const addStudentButton = document.getElementById("add_student");

    // Function to handle adding a student
    addStudentButton.addEventListener("click", function () {
        // Retrieve student details from the input fields
        const name = document.getElementById("name").value;
        const batch = document.getElementById("batch").value;
        const section = document.getElementById("section").value;
        const evalScore = document.getElementById("eval_score").value;
        const image = document.getElementById("image").value;

        // Create a student object with the input values
        const studentData = {
            name,
            batch,
            section,
            eval_score: evalScore, // Note: Ensure that the server expects the key "eval_score"
            image,
        };

        // Send a POST request to add the student
        fetch("http://localhost:3000/masai", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(studentData),
        })
            .then((response) => response.json())
            .then((data) => {
                // After a successful POST request, make a GET request to update the DOM
                console.log(data);
                if (data) {
                    fetchDataAndUpdateDOM();
                }
            })
            .catch((error) => {
                console.error(error);
            });
    });

    // Function to fetch data and update the DOM
    function fetchDataAndUpdateDOM() {
        // Send a GET request to retrieve updated data
        fetch("http://localhost:3000/masai")
            .then((response) => response.json())
            .then((data) => {
                // Handle the received data and update the DOM
                console.log("data",data)
                updateDOMWithData(data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }

    // Function to update the DOM with the received data
    function updateDOMWithData(data) {
        // Clear the existing student cards in the DOM
        const container = document.getElementById("container");
        container.innerHTML = "";

        // Loop through the data and create/update student cards
        data.forEach((student) => {
            const studentCard = createStudentCard(student);
            container.appendChild(studentCard);
        });
        
    }

    // Function to create a student card based on the data
    function createStudentCard(student) {
        // Create and style the student 
        
        const studentCard = document.createElement("div");
        studentCard.classList.add("student");

        // Populate the student card with data
        const nameElement = document.createElement("h3");
        nameElement.textContent = student.name;

        const scoreElement = document.createElement("p");
        scoreElement.classList.add("student_score");
        scoreElement.textContent = student.score;

        const batchElement = document.createElement("p");
        batchElement.textContent = `Batch: ${student.batch}`;

        const sectionElement = document.createElement("p");
        sectionElement.textContent = student.section;

        const removeButton = document.createElement("button");
        removeButton.classList.add("remove_student");
        removeButton.textContent = "Remove";

        const updateButton = document.createElement("button");
        updateButton.classList.add("update_score");
        updateButton.textContent = "Update Score";

        // Append elements to the student card
        studentCard.appendChild(nameElement);
        studentCard.appendChild(scoreElement);
        studentCard.appendChild(batchElement);
        studentCard.appendChild(sectionElement);
        studentCard.appendChild(removeButton);
        studentCard.appendChild(updateButton);

        return studentCard;
    }

    // Initial data load when the page is loaded
    fetchDataAndUpdateDOM();
});
