from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi


def Connection():
    uri = "mongodb+srv://mwilliams:monalisawilliams1234@geographicalsciences.n7nb2bf.mongodb.net/?retryWrites=true&w=majority"

    client = MongoClient(uri, server_api=ServerApi("1"))
    # Send a ping to confirm a successful connection

    database = client.BudgetForecast
    loginCollection = database.LoginList
    emailCollection = database.EmailList

    return client, loginCollection, emailCollection
