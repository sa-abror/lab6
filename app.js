// Enrolment number: A85204925029 — started 20 November 2026

const PASSWORD_MIN_LENGTH = 7;
const NAME_MAX_LENGTH = 25;
const PASS_MARK = 49;

const registrationForm = document.querySelector("#registration-form");
const studentsBody = document.querySelector("#students-body");

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateField(field) {
  const value = field.value.trim();
  let valid = value !== "";

  if (field.id === "full-name") {
    valid = valid && value.length <= NAME_MAX_LENGTH;
  } else if (field.id === "email") {
    valid = valid && isValidEmail(value);
  } else if (field.id === "phone") {
    valid = valid && /^\d{9}$/.test(value);
  } else if (field.id === "password") {
    valid = valid && field.value.length >= PASSWORD_MIN_LENGTH;
  } else if (field.id === "confirm-password") {
    const password = document.querySelector("#password");
    valid = valid && field.value === password.value;
  }

  field.classList.toggle("invalid", !valid);
  field.setAttribute("aria-invalid", String(!valid));
  return valid;
}

function validateRegistration() {
  const fullName = document.querySelector("#full-name");
  const email = document.querySelector("#email");
  const phone = document.querySelector("#phone");
  const password = document.querySelector("#password");
  const confirmPassword = document.querySelector("#confirm-password");
  const city = document.querySelector("#city");
  const errors = [];

  if (fullName.value.trim() === "") {
    errors.push("Full name is required.");
  } else if (fullName.value.trim().length > NAME_MAX_LENGTH) {
    errors.push(`Full name must be ${NAME_MAX_LENGTH} characters or fewer.`);
  }

  if (email.value.trim() === "") {
    errors.push("Email is required.");
  } else if (!isValidEmail(email.value.trim())) {
    errors.push("Enter a valid email address.");
  }

  if (phone.value.trim() === "") {
    errors.push("Phone is required.");
  } else if (!/^\d{9}$/.test(phone.value.trim())) {
    errors.push("Phone must contain exactly 9 digits.");
  }

  if (password.value === "") {
    errors.push("Password is required.");
  } else if (password.value.length < PASSWORD_MIN_LENGTH) {
    errors.push(`Password must contain at least ${PASSWORD_MIN_LENGTH} characters.`);
  }

  if (confirmPassword.value === "") {
    errors.push("Password confirmation is required.");
  } else if (confirmPassword.value !== password.value) {
    errors.push("Passwords must match.");
  }

  if (city.value === "") {
    errors.push("City is required.");
  }

  [fullName, email, phone, password, confirmPassword, city].forEach(validateField);
  return errors;
}

function showErrors(errors) {
  const errorBox = document.querySelector("#error-box");
  const errorList = document.querySelector("#error-list");
  errorList.replaceChildren();

  errors.forEach((error) => {
    const item = document.createElement("li");
    item.textContent = error;
    errorList.appendChild(item);
  });

  errorBox.hidden = errors.length === 0;
}

function setUpRegistration() {
  const fullName = document.querySelector("#full-name");
  const city = document.querySelector("#city");
  const nameCounter = document.querySelector("#name-counter");
  const cityChoice = document.querySelector("#city-choice");
  const fields = registrationForm.querySelectorAll("input, select");

  fields.forEach((field) => {
    field.addEventListener("blur", () => {
      validateField(field);
    });
  });

  fullName.addEventListener("keyup", () => {
    const charactersLeft = NAME_MAX_LENGTH - fullName.value.length;
    nameCounter.textContent = `${charactersLeft} characters left`;
  });

  city.addEventListener("change", () => {
    cityChoice.textContent = city.value === "" ? "Choose your city." : `You chose ${city.value}.`;
    validateField(city);
  });

  registrationForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const errors = validateRegistration();
    showErrors(errors);

    if (errors.length > 0) {
      return;
    }

    const name = fullName.value.trim();
    if (confirm(`Register ${name}?`)) {
      location.href = `board.html?name=${encodeURIComponent(name)}`;
    }
  });
}

function grade(marks) {
  if (marks < PASS_MARK) {
    return "Fail";
  }

  if (marks < 75) {
    return "Pass";
  }

  return "Distinction";
}

function renderStudents(students) {
  studentsBody.replaceChildren();

  students.forEach((student) => {
    const row = document.createElement("tr");
    const values = [student.name, student.marks, student.city, grade(student.marks)];

    values.forEach((value) => {
      const cell = document.createElement("td");
      cell.textContent = String(value);
      row.appendChild(cell);
    });

    studentsBody.appendChild(row);
  });
}

async function loadStudents() {
  const message = document.querySelector("#board-message");

  try {
    const response = await fetch("students.json");
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const students = await response.json();
    renderStudents(students);

    const sortStudents = document.querySelector("#sort-students");
    sortStudents.addEventListener("change", () => {
      const sortedStudents = [...students];

      if (sortStudents.value === "marks") {
        sortedStudents.sort((first, second) => second.marks - first.marks);
      } else {
        sortedStudents.sort((first, second) => first.name.localeCompare(second.name));
      }

      renderStudents(sortedStudents);
    });
  } catch (error) {
    message.textContent = "The student marks could not be loaded. Please check the server and try again.";
    message.hidden = false;
  }
}

function setUpBoard() {
  const name = new URLSearchParams(location.search).get("name");
  const welcome = document.querySelector("#welcome");
  const loadTime = document.querySelector("#load-time");
  const backButton = document.querySelector("#back-button");

  welcome.textContent = name === null || name.trim() === "" ? "Welcome, student" : `Welcome, ${name}`;
  loadTime.textContent = `Loaded at ${new Date().toLocaleString()}`;
  backButton.addEventListener("click", () => {
    history.back();
  });

  loadStudents();
}

if (registrationForm !== null) {
  setUpRegistration();
}

if (studentsBody !== null) {
  setUpBoard();
}

console.log("A85204925029");
