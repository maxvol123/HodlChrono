"use client"
import { layoutconfig } from "@/app/config/layoutconfig";
import { siteconfig } from "@/app/config/site.config";
import { Image, Link } from "@heroui/react";

const Footer = () => {
    const { footer } = siteconfig;
    
    return <footer 
        className="bg-gray-900 pt-7">
      <div className="max-w-6xl mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold text-green-400 mb-4 uppercase">{siteconfig.title}</h3>
            <p className="text-gray-300 mb-4">
              {siteconfig.description}
            </p>
            <div className="flex space-x-4">
              <Link href={footer.brand.social.telegram.link}>
                <Image src={footer.brand.social.telegram.image} width={20} height={20}/>
              </Link>
              <Link href={footer.brand.social.instagram.link}>
                <Image src={footer.brand.social.instagram.image} width={20} height={20}/>
              </Link>
              <Link href={footer.brand.social.linkedin.link}>
                <Image src={footer.brand.social.linkedin.image} width={20} height={20}/>
              </Link>
            </div>
          </div>

          {/* Product Column */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-green-300">{footer.product.title}</h4>
            <ul className="space-y-2">
              {footer.product.links.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-gray-300 hover:text-white transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-green-300">{footer.company.title}</h4>
            <ul className="space-y-2">
              {footer.company.links.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-gray-300 hover:text-white transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              {footer.legal.copyright}
            </div>
            <div className="flex flex-wrap gap-6 text-sm">
              {footer.legal.links.map((link, index) => (
                <a 
                  key={index}
                  href={link.href} 
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>;
}
 
export default Footer;