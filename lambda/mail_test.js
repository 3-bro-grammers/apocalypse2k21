const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'apocalypse2k21@gmail.com',
        pass: process.env.GOOGLE_APP_PASS
    }
});

var mailOptions = {
    from: 'apocalypse2k21@gmail.com',
    to: "krishnakumarr017@gmail.com",
    subject: 'Apocalypse Event Registration Successful',
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
                  <p style="margin:0 0 12px 0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;">You have successfully registered for <b>EVENT NAME</b> at <b>APOCALYPSE '21</b><br> 
                  Your registration info </p>
                  <table border = "1" style="border-collapse: collapse; margin: auto;">
                      <tr>
                          <td style="padding: 1rem;">MEMBER1</td>
                          <td style="padding: 1rem;">2018504665</td>
                      </tr>
                      <tr>
                          <td style="padding: 1rem;">MEMBER2</td>
                          <td style="padding: 1rem;">2018212665</td>
                      </tr>
                      <tr>
                          <td colspan="2" style="padding: 1rem;">AUTOMOBILE Department</td>
                      </tr>
                  </table>
                  
                </td>
              </tr>
              <tr>
                <td style="padding:0;">
                  <img src="https://apocalypse-2k21.web.app/images/events/event.jpg" alt="" width="300" style="height:auto;display:block; margin: auto;" />
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

transporter.sendMail(mailOptions);

