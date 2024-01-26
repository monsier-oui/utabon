import { FaTwitter, FaMastodon, FaGithub } from 'react-icons/fa'
import { SiMisskey } from 'react-icons/si'

const Header = () => (
  <header className="flex flex-col items-end gap-2 sm:flex-row sm:items-center">
    <h1 className="mr-auto text-3xl font-bold">SideM歌本</h1>
    <ul className="flex gap-2">
      {[
        {
          href: 'https://twitter.com/share?text=SideM歌本&url=https://monsier-oui.github.io/utabon/',
          Icon: FaTwitter,
          className: 'bg-brand-twitter',
          text: 'Tweet',
        },
        {
          href: 'https://donshare.net/share.html?text=SideM歌本&url=https://monsier-oui.github.io/utabon/',
          Icon: FaMastodon,
          className: 'bg-brand-mastodon',
          text: 'Toot',
        },
        {
          href: 'https://misskeyshare.link/share.html?text=SideM歌本&url=https://monsier-oui.github.io/utabon/',
          Icon: SiMisskey,
          className: 'bg-brand-misskey',
          text: 'Note',
        },
      ].map(({ href, Icon, className, text }, i) => (
        <li key={i}>
          <a
            href={href}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-center text-xs font-medium text-white shadow-sm ${className}`}
            target="_blank"
            rel="noopener noreferrer">
            <Icon className="size-4" />
            {text}
          </a>
        </li>
      ))}
    </ul>
    <a
      href="https://github.com/monsier-oui/utabon"
      className="hidden sm:block"
      target="_blank"
      rel="noopener noreferrer">
      <FaGithub className="size-6 fill-black" />
    </a>
  </header>
)

export default Header
