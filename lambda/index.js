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

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'apocalypse2k21@gmail.com',
        pass: process.env.GOOGLE_APP_PASS
    }
});

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

    var mailOptions = {
        from: 'apocalypse2k21@gmail.com',
        to: data["email"],
        subject: 'Apocalypse Event Registration',
        html: `
        <table style="width:100%;border-collapse:collapse;border:0;border-spacing:0;background:#ffffff;">
        <tr>
          <td align="center" style="padding:0;">
            <table style="width:602px;border-collapse:collapse;border:1px solid #cccccc;border-spacing:0;text-align:left;">
              <tr>
                <td align="center" style="padding:40px 0 30px 0;">
                  <img src="https://apocalypse-2k21.web.app/images/logo-small.png" alt="" width="300" style="height:auto;display:block;" />
                </td>
              </tr>
              <tr>
                <td style="padding:36px 30px 42px 30px;">
                  <table style="width:100%;border-collapse:collapse;border:0;border-spacing:0;">
                    <tr>
                      <td style="padding:0 0 36px 0;color:#153643;">
                        <h1 style="font-size:24px;margin:0 0 20px 0;font-family:Arial,sans-serif;">Registration Successful !</h1>
                        <p style="margin:0 0 12px 0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;">You have successfully registered for <b>${data["event_name"]}</b> at <b>APOCALYPSE '21</b><br> 
                        Your registration info </p>
                        <table border = "1" style="border-collapse: collapse; margin: auto;">
                            <tr>
                                <td style="padding: 1rem;">${data["team"][0][0]}</td>
                                <td style="padding: 1rem;">${data["team"][0][1]}</td>
                            </tr>

    `+data["team"][1]?`
                            <tr>
                                <td style="padding: 1rem;">${data["team"][1][0]}</td>
                                <td style="padding: 1rem;">${data["team"][1][1]}</td>
                            </tr>
    `:''
    +data["team"][2]?`
                            <tr>
                                <td style="padding: 1rem;">${data["team"][2][0]}</td>
                                <td style="padding: 1rem;">${data["team"][2][1]}</td>
                            </tr>
    `:''
    +`

                            <tr>
                                <td colspan="2" style="padding: 1rem;">${data["dept"]}</td>
                            </tr>

                        </table>
                        
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:0;">
                        <img src="https://apocalypse-2k21.web.app/images/events/${data["img"]}.jpg" alt="" width="300" style="height:auto;display:block; margin: auto;" />
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td style="padding:30px;background:#ee4c50;">
                  <table style="width:100%;border-collapse:collapse;border:0;border-spacing:0;font-size:9px;font-family:Arial,sans-serif;">
                    <tr>
                      <td style="padding:0;width:50%;" align="left">
                        <p style="margin:0;font-size:14px;line-height:16px;font-family:Arial,sans-serif;color:#ffffff;">
                          &copy; Apocalypse 2021<br/><a href="https://apocalypse-2k21.web.app/" style="color:#ffffff;text-decoration:underline;">apocalypse-2k21.web.app</a>
                        </p>
                      </td>
                      <td style="padding:0;width:50%; font-size: 20px; font-weight: bold; color: #fff;" align="right">
                        ALL THE BEST !!
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
        `
    };
    
    await transporter.sendMail(mailOptions);


    return ({
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        statusCode: 200,
        body: "DONE",
    })


}