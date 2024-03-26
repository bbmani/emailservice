fetch("/api/list")
  .then((response) => response.json())
  .then((data) => {
    const getList = document.getElementById("list");
    data.emaillist.forEach((emailInfo) => {
      const emailDiv = document.createElement("div");

      const name = document.createElement("p");
      name.classList.add("file-header");
      name.textContent = emailInfo["name"];

      const email = document.createElement("p");
      email.classList.add("modified-time-class");
      email.textContent = emailInfo["email"];

      const getFile = document.createElement("button");
      getFile.classList.add("get-button");
      getFile.textContent = `DELETE`;
      getFile.onclick = () => delete_data(emailInfo["email"]);

      const horizontal = document.createElement("hr");

      emailDiv.appendChild(name);
      emailDiv.appendChild(email)
      emailDiv.appendChild(getFile);
      emailDiv.appendChild(horizontal);

      getList.appendChild(emailDiv);
    });
  })
  .catch((error) => console.log(error));

function delete_data(email) {
  fetch("/api/delete", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message === "Done") {
        window.location.reload();
      }
    })
    .catch((error) => {
      console.log("error ", error);
    });
}
