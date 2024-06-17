import { EmailConfirmRegister } from '@/components/email/email-confirm-register';
import { getUserByEmail } from '@/data/user';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Send verification email to user's email.
 * User will click 'confirm' to confirm login
 * @param email
 * @param token
 */
export const sendVrificationEmail = async (email: string, token: string) => {
    const confirmLink: string = `http://localhost:3000/auth/new-verification?token=${token}`;
    const existingUser = await getUserByEmail(email);

    await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: 'Confirm your email to reset passoword',
        html: `
    <!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Baloo+Bhaina+2:wght@400..800&display=swap"
  rel="stylesheet"
/>
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
  integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A=="
  crossorigin="anonymous"
  referrerpolicy="no-referrer"
/>
<title>Confirm email</title>
<style>
  @font-face {
    font-family: "Baloo Bhaina 2";
    font-style: normal;
    font-weight: 400;
    src: url("https://fonts.gstatic.com/s/baloobhaina2/v14/wXK1E3kTposypRydzUxCSsL1BBJ7_PxO.woff2")
      format("woff2");
  }
</style>
</head>
<body style="background-color: rgb(235, 232, 232); text-align: center;padding:5px;">
<div style="display: inline-block">
  <div
    style="
      width: 460px;
      text-align: justify;
      background-color: white;
      border-radius: 5px;
      padding: 10px 40px 10px;
      font-size: 16px;
      font-family: -apple-system, system-ui, BlinkMacSystemFont, 'Segoe UI',
        Roboto, Arial, sans-serif;
    "
  >
    <div style="padding: 0px 20px">
      <header
        style="
          font-family: 'Baloo Bhaina 2', Arial, sans-serif;
          font-size: 46px;
          height: 60px;
          font-weight: 800;
        "
      >
        <span style="color: #002060">Net</span
        ><span style="color: #58a44c">Auth</span>
      </header>
      <div
        style="
          background-color: rgb(219, 223, 226);
          height: 1px;
          margin: 10px 0px;
        "
      ></div>
      <div class="content">
        <div class="details">
          <p style="margin-top: 10px; margin-bottom: 10px">
            Dear <strong>${existingUser?.name}</strong>
          </p>
          <p>
            We have received a request to reset your password for email
            ${email}. To ensure the security of
            your account, please follow the instructions below to reset your
            password:
          </p>
          <div
            style="
              padding: 0px 0px 0px 30px;
              /* display: flex;
            flex-direction: column; */
            "
          >
            <div style="margin-bottom: 10px">
              1. Click the following confirm button bellow.
            </div>
            <div>
              2. Once you have accessed the confirm register page, you will be
              able to login with your email and password you have just register.
            </div>
          </div>
          <div
            style="margin-top: 15px; margin-bottom: 5px; text-align: center"
          >
            <a
              href=${confirmLink}
              style="
                text-decoration: none;
                display: inline-block;
                width: 66.5%;
              "
            >
              <button
                style="
                  background-color: #ff6229;
                  border-radius: 10px;
                  color: white;
                  padding: 10px;
                  font-weight: 600;
                  font-size: 18px;
                  border: 0px;
                  width: 100%;
                "
              >
                Confirm Email
              </button>
            </a>
          </div>

          <div>
            <p style="margin-top: 10px; margin-bottom: 10px">
              If you did not initiate this password reset request, please
              disregard this email. Your account security is important to us
              and we recommend reviewing your account activity for any
              suspicious behavior.
            </p>
            <p style="margin-top: 10px; margin-bottom: 10px">
              Thank you for your attention to this matter.
            </p>
            <div>
              Best regards,<br />
              Petcare System.
            </div>
          </div>
        </div>
      </div>
      <div
        style="
          background-color: rgb(219, 223, 226);
          height: 1px;
          margin: 10px 0px;
        "
      ></div>
      <footer style="height: 60px; width: 100%">
        <div style="width: 48%; float: left">
          🗺Petcare, District 12, HCM.
        </div>
        <div style="width: 48%; float: right; text-align: end">
          📞(+84) 900-123-456
        </div>
      </footer>
    </div>
  </div>
</div>
</body>
</html>`,
    });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
    const resetLink = `http://localhost:3000/auth/new-password?token=${token}`;
    await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: 'Confirm your email to reset passoword',
        html: `
      <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Baloo+Bhaina+2:wght@400..800&display=swap"
    rel="stylesheet"
  />
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
    integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A=="
    crossorigin="anonymous"
    referrerpolicy="no-referrer"
  />
  <title>Confirm email</title>
  <style>
    @font-face {
      font-family: "Baloo Bhaina 2";
      font-style: normal;
      font-weight: 400;
      src: url("https://fonts.gstatic.com/s/baloobhaina2/v14/wXK1E3kTposypRydzUxCSsL1BBJ7_PxO.woff2")
        format("woff2");
    }
  </style>
</head>
<body style="background-color: rgb(235, 232, 232); text-align: center">
  <div style="display: inline-block">
    <div
      style="
        width: 460px;
        text-align: justify;
        background-color: white;
        border-radius: 5px;
        padding: 10px 40px 10px;
        font-size: 16px;
        font-family: -apple-system, system-ui, BlinkMacSystemFont, 'Segoe UI',
          Roboto, Arial, sans-serif;
      "
    >
      <div style="padding: 0px 20px">
        <header
          style="
            font-family: 'Baloo Bhaina 2', Arial, sans-serif;
            font-size: 46px;
            height: 60px;
            font-weight: 800;
          "
        >
          <span style="color: #002060">Pet</span
          ><span style="color: #58a44c">Care</span>
        </header>
        <div
          style="
            background-color: rgb(219, 223, 226);
            height: 1px;
            margin: 10px 0px;
          "
        ></div>
        <div class="content">
          <div class="details">
            <p style="margin-top: 10px; margin-bottom: 10px">
              Dear <strong>[Client_FirstName]</strong>
              <strong>[Client_LastName],</strong>
            </p>
            <p>
              We have received a request to reset your password for
              <strong>[Client_FirstName]</strong>
              <strong>[Client_LastName]</strong>. To ensure the security of
              your account, please follow the instructions below to reset your
              password:
            </p>
            <div
              style="
                padding: 0px 0px 0px 30px;
                /* display: flex;
              flex-direction: column; */
              "
            >
              <div style="margin-bottom: 10px">
                1. Click the following Reset password button to reset your
                password.
              </div>
              <div>
                2. Once you have accessed the password reset page, you will be
                prompted to enter a new password for your account.
              </div>
            </div>
            <div
              style="margin-top: 15px; margin-bottom: 5px; text-align: center"
            >
              <a
                href=${resetLink}
                style="
                  text-decoration: none;
                  display: inline-block;
                  width: 66.5%;
                "
              >
                <button
                  style="
                    background-color: #ff6229;
                    border-radius: 10px;
                    color: white;
                    padding: 10px;
                    font-weight: 600;
                    font-size: 18px;
                    border: 0px;
                    width: 100%;
                  "
                >
                  Confirm change
                </button>
              </a>
            </div>

            <div>
              <p style="margin-top: 10px; margin-bottom: 10px">
                If you did not initiate this password reset request, please
                disregard this email. Your account security is important to us
                and we recommend reviewing your account activity for any
                suspicious behavior.
              </p>
              <p style="margin-top: 10px; margin-bottom: 10px">
                Thank you for your attention to this matter.
              </p>
              <div>
                Best regards,<br />
                Petcare System.
              </div>
            </div>
          </div>
        </div>
        <div
          style="
            background-color: rgb(219, 223, 226);
            height: 1px;
            margin: 10px 0px;
          "
        ></div>
        <footer style="height: 60px; width: 100%">
          <div style="width: 48%; float: left">
            Petcare, District 12, HCM.
          </div>
          <div style="width: 48%; float: right; text-align: end">
            (+84) 900-123-456
          </div>
        </footer>
      </div>
    </div>
  </div>
</body>
</html>`,
    });
};
