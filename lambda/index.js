const nodemailer = require('nodemailer');

var admin = require("firebase-admin");


var serviceAccount = {
    "type": "service_account",
    "project_id": "apocalypse-2k21",
    "private_key_id": "b9cd3089fdc13963b37046d1cc659b140a760a55",
    "client_email": "firebase-adminsdk-s76yo@apocalypse-2k21.iam.gserviceaccount.com",
    "client_id": "115235495847603928445",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-s76yo%40apocalypse-2k21.iam.gserviceaccount.com"
}

serviceAccount["private_key"] = process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n');


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://apocalypse-2k21-default-rtdb.firebaseio.com"
});


var db = admin.database();

exports.handler = async (event) => {

    /*

        event_categ: "tech", "non-tech", "work",
        event_name : "adscsd",
        team : [["name1","27018501456"],["name2","2019632564"],[]],
        dept:"Electronics",
        phone: "454334545",
        email: "asdfsdf@gmail.com"

    */
    var data = JSON.parse(event.body);
    await db.ref(`registerations/${data["event_categ"]}/${data["event_name"]}`).push({
        team: data["team"],
        dept: data["dept"],
        phone: data["phone"],
        email: data["email"]
    })


    return ({
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        statusCode: 200,
        body: "DONE",
    })


}