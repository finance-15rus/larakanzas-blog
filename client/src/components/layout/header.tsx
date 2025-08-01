import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Search, Menu, Settings } from "lucide-react";

export default function Header() {
  const [location] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Implement search functionality
      console.log("Search for:", searchQuery);
    }
  };

  const navItems = [
    { href: "/", label: "Главная" },
    { href: "/about", label: "Об авторе" },
  ];

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/">
              <a className="flex items-center">
                <h1 className="text-2xl font-bold text-primary">Лариса Засеева</h1>
                <span className="ml-3 text-sm text-secondary hidden sm:block">Журналист</span>
              </a>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <a
                  className={`text-secondary hover:text-primary transition-colors ${
                    location === item.href ? "text-primary font-medium" : ""
                  }`}
                >
                  {item.label}
                </a>
              </Link>
            ))}
            
            {/* Search */}
            <form onSubmit={handleSearch} className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="search"
                  placeholder="Поиск статей..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
            </form>

            {/* Admin Link */}
            <Link href="/admin">
              <button className="bg-accent text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors inline-flex items-center">
                <Settings className="h-4 w-4 mr-2" />
                Админ
              </button>
            </Link>
          </nav>

          {/* Mobile menu button */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col space-y-4 mt-6">
                {navItems.map((item) => (
                  <Link key={item.href} href={item.href}>
                    <a
                      className={`text-lg ${
                        location === item.href ? "text-primary font-medium" : "text-secondary"
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </a>
                  </Link>
                ))}
                
                <form onSubmit={handleSearch} className="pt-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      type="search"
                      placeholder="Поиск статей..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 w-full"
                    />
                  </div>
                </form>

                <Link href="/admin">
                  <button
                    className="bg-accent text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors inline-flex items-center justify-center mt-4 w-full"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Админ
                  </button>
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
