# Wellness with Jana

**Wellness with Jana** is a holistic health coaching website that provides blog content, appointment booking, and
marketing features. The website includes an admin panel for full customization, allowing Jana to manage images, text,
appointments and blog posts.

## Demo

[https://wellnesswithjana.com](https://wellnesswithjana.com)

## Features

### User Features

- **Blog**: Read and explore holistic health articles.
- **Appointment Booking**: Schedule health coaching sessions.
- **Responsive Design**: Optimized for desktop and mobile.

### Admin Features

- **Content Management**: Update website images and text dynamically.
- **Appointment Management**: View and manage booked appointments.
- **Blog Management**: Create, edit, and delete blog posts.
- **SEO Optimization**: Manage meta descriptions and keywords.

## Tech Stack

- **Frontend**: Angular with SSR (coming soon)
- **Backend**: Node.js (Express.js API)
- **Database**: MongoDB
- **Hosting**: DigitalOcean (API and Frontend)
- **Authentication**: Email/Password and Google OAuth (coming soon)

## Installation

### Prerequisites

- Node.js (>= 18.0.1)
- MongoDB
- Angular CLI
- DigitalOcean Spaces (for media storage)

### Setup

#### Clone the repository

```sh
 git clone https://github.com/m3allimm4a4/wellness-with-jana.git
 cd wellness-with-jana
```

#### Install dependencies

```npm
npm install
```

#### Environment Variables

Add the following variables the .env file in the back directory to configure the following:

```
DO_BUCKET_CLIENT_ID=client_id
DO_BUCKET_CLIENT_SECRET=secret
DATABASE_URL=mongo_url
SENDER_EMAIL=sender_email
BREVO_KEY=key
JWT_EXPIRY=expiry
JWT_REFRESH_EXPIRY=expiry
JWT_SECRET=secret
JWT_REFRESH_SECRET=secret
BCRYPT_SALT_ROUNDS=number
```

#### Start the Front

```npm
npm run start:front
```

#### Start the Backend

```npm
npm run start:back
```

## Deployment

### Front

Currently deployed on digital ocean spaces. Manually trigger deployment from digital ocean to build and deployF

### Back

#### Build

Manually trigger GitHub action to trigger docker build and publish

#### Deploy

Restart the pod on Digital Ocean to fetch the latest docker image

## Contribution

Feel free to submit issues and pull requests.

## License

This project is licensed under the MIT License.

## Contact

For inquiries, contact me on  [rammouzbechara@gmail.com](mailto:rammouzbechara@gmail.com)
