import { FaTwitter, FaGithub } from 'react-icons/fa'

const Header = () => (
  <header className="gap-2 flex items-center">
    <h1 className="text-3xl font-bold mr-auto">SideM歌本</h1>
    <a
      href="https://twitter.com/share?text={title}&url={url}&hashtags={title}"
      className="flex gap-2 items-center py-1 px-3 text-white text-sm font-bold bg-twitter rounded-full"
      target="_blank"
      rel="noopener noreferrer">
      <FaTwitter className="w-3 h-3" />
      Tweet
    </a>
    <a
      href="https://github.com/monsier-oui/utabon"
      className="hidden sm:block"
      target="_blank"
      rel="noopener noreferrer">
      <FaGithub className="w-6 h-6 fill-black" />
    </a>
  </header>
)

export default Header
