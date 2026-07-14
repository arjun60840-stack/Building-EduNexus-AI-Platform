"use client";

import { GraduationCap, Globe, Mail, MessageSquare, Phone } from "lucide-react";
import { APP_NAME, APP_DESCRIPTION } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-border" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary-600 to-accent-500 shadow-md">
                <GraduationCap className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-text-primary">
                {APP_NAME}
              </span>
            </div>
            <p className="text-sm leading-6 text-text-secondary max-w-xs">
              {APP_DESCRIPTION}
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-text-muted hover:text-text-primary transition-colors">
                <span className="sr-only">Website</span>
                <Globe className="h-6 w-6" aria-hidden="true" />
              </a>
              <a href="#" className="text-text-muted hover:text-text-primary transition-colors">
                <span className="sr-only">Email</span>
                <Mail className="h-6 w-6" aria-hidden="true" />
              </a>
              <a href="#" className="text-text-muted hover:text-text-primary transition-colors">
                <span className="sr-only">Chat</span>
                <MessageSquare className="h-6 w-6" aria-hidden="true" />
              </a>
              <a href="#" className="text-text-muted hover:text-text-primary transition-colors">
                <span className="sr-only">Phone</span>
                <Phone className="h-6 w-6" aria-hidden="true" />
              </a>
            </div>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-text-primary">Product</h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li>
                    <a href="#" className="text-sm leading-6 text-text-secondary hover:text-text-primary transition-colors">
                      Features
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-sm leading-6 text-text-secondary hover:text-text-primary transition-colors">
                      AI Assistant
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-sm leading-6 text-text-secondary hover:text-text-primary transition-colors">
                      Pricing
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-sm leading-6 text-text-secondary hover:text-text-primary transition-colors">
                      Security
                    </a>
                  </li>
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-text-primary">Support</h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li>
                    <a href="#" className="text-sm leading-6 text-text-secondary hover:text-text-primary transition-colors">
                      Documentation
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-sm leading-6 text-text-secondary hover:text-text-primary transition-colors">
                      Guides
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-sm leading-6 text-text-secondary hover:text-text-primary transition-colors">
                      Help Center
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-sm leading-6 text-text-secondary hover:text-text-primary transition-colors">
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-text-primary">Company</h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li>
                    <a href="#" className="text-sm leading-6 text-text-secondary hover:text-text-primary transition-colors">
                      About
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-sm leading-6 text-text-secondary hover:text-text-primary transition-colors">
                      Blog
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-sm leading-6 text-text-secondary hover:text-text-primary transition-colors">
                      Careers
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-sm leading-6 text-text-secondary hover:text-text-primary transition-colors">
                      Partners
                    </a>
                  </li>
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-text-primary">Legal</h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li>
                    <a href="#" className="text-sm leading-6 text-text-secondary hover:text-text-primary transition-colors">
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-sm leading-6 text-text-secondary hover:text-text-primary transition-colors">
                      Terms of Service
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-sm leading-6 text-text-secondary hover:text-text-primary transition-colors">
                      Cookie Policy
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 border-t border-border pt-8 sm:mt-20 lg:mt-24">
          <p className="text-xs leading-5 text-text-muted">
            &copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
