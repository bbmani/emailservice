fetch("/api/list")
  .then((response) => response.json())
  .then((data) => {
    const getList = document.getElementById("list");
    data.emaillist.forEach((emailInfo) => {
      const emailDiv = document.createElement("div");
      emailDiv.classList.add("row");
      emailDiv.classList.add("email-card");

      const columnDiv1 = document.createElement("div");
      columnDiv1.classList.add("col-lg-4");
      columnDiv1.classList.add("col-md-4");
      columnDiv1.classList.add("col-sm-12");
      columnDiv1.classList.add("col-xs-12");

      const email = document.createElement("p");
      email.classList.add("email-address");
      email.textContent = emailInfo["email"];

      const columnDiv2 = document.createElement("div");
      columnDiv2.classList.add("col-lg-4");
      columnDiv2.classList.add("col-md-4");
      columnDiv2.classList.add("col-sm-12");
      columnDiv2.classList.add("col-xs-12");

      const name = document.createElement("p");
      name.classList.add("full-name");
      name.textContent = emailInfo["name"];

      const columnDiv3 = document.createElement("div");
      columnDiv3.classList.add("col-lg-4");
      columnDiv3.classList.add("col-md-4");
      columnDiv3.classList.add("col-sm-12");
      columnDiv3.classList.add("col-xs-12");
      columnDiv3.classList.add("delete-button");

      const button = document.createElement("button");
      button.classList.add("btn");
      button.classList.add("btn-lg");
      button.classList.add("btn-danger");
      button.textContent = "Delete";
      button.onclick = () => delete_data(emailInfo["email"]);

      columnDiv1.appendChild(name);
      columnDiv2.appendChild(email);
      columnDiv3.appendChild(button);

      emailDiv.appendChild(columnDiv1);
      emailDiv.appendChild(columnDiv2);
      emailDiv.appendChild(columnDiv3);

      getList.append(emailDiv);
    });
  })
  .catch((error) => console.error("Error : ", error));

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
