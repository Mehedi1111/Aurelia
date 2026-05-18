import Image from 'next/image'

export default function SidebarAd() {
  return (
    <a
      href="https://www.bluenile.com/clear-the-vault?a_aid=66fc3592af524&a_cid=55e51e63&chan=168657"
      target="_blank"
      rel="nofollow sponsored noopener noreferrer"
      className="block rounded-lg overflow-hidden border border-border hover:border-accent transition-colors duration-200 group"
      aria-label="Blue Nile Clear the Vault sale — sponsored"
    >
      <div className="relative w-full aspect-square">
        <Image
          src="https://moissanitebyaurelia.com/wp-content/uploads/2026/02/827x827.jpg.webp"
          alt="Blue Nile jewelry sale — up to 50% off"
          fill
          className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
          sizes="300px"
          unoptimized
        />
      </div>
      <div className="bg-dark text-center py-2 px-3">
        <p className="text-white text-xs font-sans font-medium tracking-wide">
          Shop Blue Nile →
        </p>
      </div>
    </a>
  )
}
