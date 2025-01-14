export default `
  <table style="max-width: 600px; margin: auto; background-color: #ffffff; border: 1px solid #dddddd; padding: 20px;width: 100%;">
  <tr>
    <td style="text-align: center;">
      <h1 style="color: #333333;">Password Reset</h1>
    </td>
  </tr>
  <tr>
    <td>
      <p style="color: #666666;">Hi [name],</p>
      <p style="color: #666666;">We received a request to reset your password for your Wellness with Jana account. If you didn’t request this, you can safely ignore this email. To reset your password, click the button below:</p>
      <p style="text-align: center;">
        <a
          href="[verificationUrl]"
          style="display: inline-block; padding: 10px 20px; color: #ffffff; background-color: #007bff; text-decoration: none; border-radius: 5px;">
          Reset Password
        </a>
      </p>
      <p style="color: #666666;">If the button doesn't work, you can copy and paste this link into your browser:</p>
      <p style="color: #007bff; word-break: break-all;">[verificationUrl]</p>
      <p style="color: #666666;">If you need further assistance, feel free to contact our support team at <a href="mailto:[contactEmail]">[contactEmail]</a>.</p>
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
