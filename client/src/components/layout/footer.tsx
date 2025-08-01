import { Mail, Facebook, Twitter, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-secondary mb-4">© 2024 Лариса Засеева. Все права защищены.</p>
        <div className="flex justify-center space-x-6">
          <a href="#" className="text-secondary hover:text-primary transition-colors">
            <Facebook className="h-5 w-5" />
          </a>
          <a href="#" className="text-secondary hover:text-primary transition-colors">
            <Twitter className="h-5 w-5" />
          </a>
          <a href="#" className="text-secondary hover:text-primary transition-colors">
            <Instagram className="h-5 w-5" />
          </a>
          <a href="mailto:larakanzas@yahoo.com" className="text-secondary hover:text-primary transition-colors">
            <Mail className="h-5 w-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
