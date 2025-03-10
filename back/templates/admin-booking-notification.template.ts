export default `
  <table style="max-width: 600px; margin: auto; background-color: #ffffff; border: 1px solid #dddddd; padding: 20px;width: 100%;">
    <tr>
      <th>Name:</th>
      <td>[name]</td>
    </tr>
    <tr>
      <th>Day:</th>
      <td>[day]</td>
    </tr>
    <tr>
      <th>Time:</th>
      <td>[startTime] - [endTime]</td>
    </tr>
    <tr>
      <th>Session Type:</th>
      <td>[service]</td>
    </tr>
    <tr>
      <td colspan="2">
        <a
            href="[confirmationUrl]"
            style="display: inline-block; padding: 10px 20px; color: #ffffff; background-color: #007bff; text-decoration: none; border-radius: 5px;">
            Confirm Appointment
          </a>
      </td>
    </tr>
  </table>
`
