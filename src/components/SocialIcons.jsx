import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";

export default function SocialIcons() {
  const socials = [
    {
      name: "GitHub",
      icon: <FaGithub />,
      link: "https://github.com/the2rivage",
    },
    {
      name: "LinkedIn",
      icon: <FaLinkedin />,
      link: "https://linkedin.com/in/sahil-bainya-097575327",
    },
    {
      name: "Instagram",
      icon: <FaInstagram />,
      link: "https://instagram.com/_sahil_artist_?igsh=MXFyZWl4bWV0N2gyZw==",
    },
  ];

  return (
    <div className="flex gap-5">
      {socials.map((social, index) => (
        <a
          key={index}
          href={social.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 hover:text-indigo-600 text-xl transition duration-300"
          aria-label={social.name}
        >
          {social.icon}
        </a>
      ))}
    </div>
  );
}