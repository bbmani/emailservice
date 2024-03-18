from flask import Flask, render_template, jsonify, request, redirect, url_for
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import certifi

ca = certifi.where()


def Connection():
    uri = "mongodb://localhost:27017"

    client = MongoClient(uri)
    # Send a ping to confirm a successful connection

    database = client.BudgetForecast
    emailCollection = database.EmailList

    return client, emailCollection


app = Flask(__name__)
app.secret_key = "eLPbL-J-5QAJlnLbgv@PYsVU"
client, emailCollection = Connection()


@app.route("/api/list", methods=["GET"])
def get_email():
    email_info = []
    email_data = emailCollection.find()
    if email_data is not None:
        for value in email_data:
            email_info.append({"email": value["email"], "name": value["name"]})
    return jsonify({"emaillist": email_info})


@app.route("/api/delete", methods=["DELETE"])
def delete_email():
    email = request.json.get("email", None)
    if email:
        result = emailCollection.delete_one({"email": email})
        if result.deleted_count == 1:
            response = {"message": "Done"}
        else:
            response = {"message": "NotDone"}
    return jsonify(response)


@app.route("/api/add", methods=["POST"])
def add_email():
    if request.method == "POST":
        form_data = request.form
        name = form_data.get("input-fullname")
        email = form_data.get("input-email")
        value = {"name": name, "email": email}
        result = emailCollection.insert_one(value)
        if result.inserted_id:
            print("Done")

    return redirect(url_for("access"))


@app.route("/")
def access():
    return render_template("access.html")


if __name__ == "__main__":
    app.run(port=7777)
    # client, emailCollection = Connection()
    # value = {"name": "Balaji Bharatwaj Manikandan", "email": "mbalaji.manikandan"}
    # emailCollection.insert_one(value)
