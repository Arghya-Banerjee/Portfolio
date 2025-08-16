import type { Metadata } from "next";
import "@/styles/globals.css";
import { cn } from "@/lib/utils";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList, NavigationMenuLink } from "@/components/ui/navigation-menu";

export const metadata: Metadata = {
  title: "Arghya Banerjee — Portfolio",
  description: "Photography & projects"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background text-foreground antialiased")}>
        <header className="border-b">
          <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
            <div className="text-lg font-semibold">Arghya</div>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink href="/" className="px-4 py-2">Home</NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink href="/gallery" className="px-4 py-2">Gallery</NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink href="/contact" className="px-4 py-2">Contact</NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </nav>
        </header>
        <main>{children}</main>
        <footer className="border-t mt-10">
          <div className="mx-auto max-w-5xl px-6 py-6 text-sm text-muted-foreground">
            © {new Date().getFullYear()} Arghya Banerjee. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}
