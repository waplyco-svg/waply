const STORAGE_KEY = "waply-estimate-request";

function setStatus(message) {
  const status = document.getElementById("form-status");
  if (status) {
    status.textContent = message;
  }
}

function normalizeRequest(form) {
  const data = new FormData(form);
  return {
    nameCompany: data.get("name_company")?.toString().trim() || "",
    email: data.get("email")?.toString().trim() || "",
    phone: data.get("phone")?.toString().trim() || "",
    propertyType: data.get("property_type")?.toString().trim() || "",
    location: data.get("location")?.toString().trim() || "",
    squareFootage: data.get("square_footage")?.toString().trim() || "",
    floors: data.get("floors")?.toString().trim() || "",
    serviceType: data.get("service_type")?.toString().trim() || "",
    problem: data.get("problem")?.toString().trim() || ""
  };
}

function validateRequest(request) {
  if (!request.email && !request.phone) {
    return "Add at least one contact method: email or phone number.";
  }

  return "";
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("estimate-form");
  if (!form) {
    return;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    setStatus("");

    if (!form.reportValidity()) {
      setStatus("Fill in the required fields before continuing.");
      return;
    }

    const request = normalizeRequest(form);
    const validationMessage = validateRequest(request);

    if (validationMessage) {
      setStatus(validationMessage);
      return;
    }

    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(request));
    window.location.href = "estimate-success.html";
  });
});
