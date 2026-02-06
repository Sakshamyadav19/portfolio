# Developer Portfolio - Saksham Yadav

A modern, responsive portfolio website built with Next.js 14, showcasing professional experience, projects, and skills. This portfolio template is designed to be easily customizable and perfect for developers and software engineers.

![Portfolio Preview](./public/image/screen.png)

## 🚀 Live Demo

Check out the live portfolio: [https://portfolio-gold-zeta-51.vercel.app/](https://portfolio-gold-zeta-51.vercel.app/)

## ✨ Features

- **Modern Design**: Clean, professional, and responsive design
- **Interactive Sections**: Smooth animations and user-friendly interface
- **Contact Form**: Integrated contact form with email functionality
- **Blog Integration**: Built-in blog section for sharing articles
- **SEO Optimized**: Better search engine visibility
- **Performance Optimized**: Fast loading times with Next.js 14
- **Mobile Responsive**: Looks great on all devices

## 📄 Sections

- 🎯 **Hero Section** - Professional introduction with call-to-action
- 👨‍💻 **About Me** - Personal background and professional summary  
- 💼 **Experience** - Work history and professional experience
- 🛠️ **Skills** - Technical skills and competencies
- 📁 **Projects** - Portfolio of completed projects
- 🎓 **Education** - Academic background and certifications
- 📝 **Blog** - Articles and technical posts
- 📧 **Contact** - Get in touch form and contact information

## 🛠️ Built With

- **Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **Icons**: React Icons
- **Animations**: Lottie React
- **Email Service**: EmailJS
- **HTTP Client**: Axios
- **Deployment**: Vercel

## 📋 Prerequisites

Make sure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [Git](https://git-scm.com/)
- npm or yarn package manager

Verify installations:
```bash
node --version
git --version
npm --version
```

## 🚀 Getting Started

### 1. Fork and Clone

Fork this repository and clone it to your local machine:

```bash
git clone https://github.com/<YOUR_USERNAME>/developer-portfolio.git
cd developer-portfolio
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Setup

Copy the example environment file and configure your settings:

```bash
cp .env.example .env.local
```

Fill in your environment variables in `.env.local`

### 4. Customize Your Portfolio

Edit the personal data file to reflect your information:

```javascript
// utils/data/personal-data.js
export const personalData = {
  name: "Your Name",
  designation: "Your Title",
  description: "Your professional summary...",
  email: "your.email@example.com",
  // ... other fields
}
```

### 5. Run Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to see your portfolio.

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code quality

## 🎨 Customization

### Personal Information
Update your details in `utils/data/personal-data.js`

### Styling
Customize colors and styling in `tailwind.config.js` and component files

### Content
- Add your projects in the projects data file
- Update experience in the experience data file
- Modify skills in the skills data file

## 📧 Contact Form Setup

This portfolio uses EmailJS for the contact form. To set it up:

1. Create an account at [EmailJS](https://www.emailjs.com/)
2. Create an email service and template
3. Add your EmailJS credentials to the environment variables

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository to [Vercel](https://vercel.com)
3. Deploy with default settings

### Other Platforms

This Next.js application can be deployed on:
- Netlify
- AWS Amplify  
- Railway
- Render

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/your-username/developer-portfolio/issues).

## 📬 Contact

**Saksham Yadav**
- Email: sakshamyadavpune@gmail.com
- LinkedIn: [Saksham Yadav](https://www.linkedin.com/in/saksham-yadav-133978182/)
- GitHub: [@Sakshamyadav19](https://github.com/Sakshamyadav19)

## ⭐ Show Your Support

If this project helped you, please give it a ⭐ star!

---

**Happy Coding! 🚀**