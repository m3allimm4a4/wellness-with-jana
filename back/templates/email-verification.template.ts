export default `
<table style="max-width: 600px; margin: auto; background-color: #ffffff; border: 1px solid #dddddd; padding: 20px;width: 100%;">
  <tr>
    <td style="text-align: center;">
      <h1 style="color: #333333;">Welcome to Wellness With Jana!</h1>
    </td>
  </tr>
  <tr>
    <td>
      <p style="color: #666666;">Hi [name],</p>
      <p style="color: #666666;">To complete your registration and gain access to personalized health coaching sessions, please verify your email address by clicking the button below:</p>
      <p style="text-align: center;">
        <a
          href="[verificationUrl]"
          style="display: inline-block; padding: 10px 20px; color: #ffffff; background-color: #007bff; text-decoration: none; border-radius: 5px;">
          Verify Email Address
        </a>
      </p>
      <p style="color: #666666;">If the button doesn't work, you can copy and paste this link into your browser:</p>
      <p style="color: #007bff; word-break: break-all;">[verificationUrl]</p>
      <p style="color: #666666;">
        Why verify your email?<br/>
        ✅ Secure your account<br/>
        ✅ Access booking features for your sessions<br/>
        ✅ Receive important updates and wellness tips
      </p>
      <p style="color: #666666;">If you didn’t create an account with us, you can safely ignore this email.</p>
      <p style="color: #666666;">Wishing you health and harmony,<br />Wellness With Jana</p>
    </td>
  </tr>
  <tr>
    <td style="text-align: center; padding-top: 20px;">
      <p style="color: #999999; font-size: 12px;"><a href="mailto:[contactEmail]">[contactEmail]</a></p>
      <p style="color: #999999; font-size: 12px;"><a href="[contactInsta]">Instagram</a></p>
    </td>
  </tr>
</table>
`
