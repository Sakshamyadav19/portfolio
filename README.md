# Saksham Yadav - Portfolio Website

A modern, responsive portfolio website built with Next.js, showcasing the professional profile, projects, and skills of Saksham Yadav, a Software Developer based in Santa Clara, California.

## 🚀 Live Demo

Visit the live portfolio: [https://portfolio-gold-zeta-51.vercel.app/](https://portfolio-gold-zeta-51.vercel.app/)

## 📸 Preview

![Portfolio Preview](./public/image/screen.png)

## ✨ Features

- **Responsive Design** - Optimized for all devices (desktop, tablet, mobile)
- **Modern UI/UX** - Clean and professional design with smooth animations
- **Dynamic Sections**:
  - Hero section with personal introduction
  - About me with detailed background
  - Professional experience timeline
  - Skills showcase with visual indicators
  - Projects portfolio with live demos
  - Education background
  - Blog integration
  - Contact form with email integration
- **Performance Optimized** - Built with Next.js for fast loading
- **SEO Friendly** - Optimized meta tags and structure
- **Easy Customization** - Modular code structure for easy updates

## 🛠️ Built With

- **Framework**: [Next.js 14](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Language**: JavaScript (React)
- **Animations**: [Lottie React](https://www.npmjs.com/package/lottie-react)
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/)
- **Email Service**: [EmailJS](https://www.emailjs.com/)
- **Deployment**: [Vercel](https://vercel.com/)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (version 16 or higher)
- [Git](https://git-scm.com/)
- npm or yarn package manager

## ⚡ Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/Sakshamyadav19/developer-portfolio.git
cd developer-portfolio
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Set up environment variables

Copy the example environment file and configure your settings:

```bash
cp .env.example .env.local
```

### 4. Run the development server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the portfolio.

## 🔧 Configuration

### Personal Information

Edit the personal data in `utils/data/personal-data.js`:

```javascript
export const personalData = {
  name: "Your Name",
  designation: "Your Title",
  description: "Your description...",
  email: "your-email@example.com",
  // ... other fields
}
```

### Project Data

Update your projects in `utils/data/projects-data.js` to showcase your work.

### Skills & Experience

Modify `utils/data/skills.js` and `utils/data/experience.js` to reflect your expertise.

## 📦 Available Scripts

- `npm run dev` - Run development server
- `npm run build` - Create production build
- `npm start` - Start production server
- `npm run lint` - Run ESLint for code quality

## 🎨 Customization

The portfolio is designed to be easily customizable:

1. **Colors & Theme**: Modify Tailwind configuration in `tailwind.config.js`
2. **Components**: Update React components in the `app/components/` directory
3. **Styling**: Customize CSS in `app/css/` directory
4. **Data**: Update all personal information in `utils/data/` files

## 📱 Sections Overview

- **Hero**: Introduction and call-to-action
- **About**: Detailed personal and professional background
- **Experience**: Career timeline and achievements
- **Skills**: Technical skills with proficiency indicators
- **Projects**: Portfolio of completed projects
- **Education**: Academic background
- **Blog**: Latest articles and thoughts
- **Contact**: Get in touch form and information

## 🚀 Deployment

This portfolio is optimized for deployment on Vercel:

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com/)
3. Deploy with zero configuration

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/Sakshamyadav19/developer-portfolio/issues).

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Developer

**Saksham Yadav**
- Portfolio: [https://portfolio-gold-zeta-51.vercel.app/](https://portfolio-gold-zeta-51.vercel.app/)
- LinkedIn: [https://www.linkedin.com/in/saksham-yadav-133978182/](https://www.linkedin.com/in/saksham-yadav-133978182/)
- GitHub: [https://github.com/Sakshamyadav19](https://github.com/Sakshamyadav19)
- Email: sakshamyadavpune@gmail.com

---

⭐ **If you found this portfolio template helpful, please give it a star!**