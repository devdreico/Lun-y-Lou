import { MessageCircle } from 'lucide-react'
import { WHATSAPP_URL, SITE } from '../../lib/constants'

export function WhatsAppFab() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noreferrer"
      aria-label={`Escríbenos por WhatsApp ${SITE.phoneDisplay}`}
      className="group fixed bottom-5 right-4 z-[60] flex items-center gap-2 rounded-full bg-[#25D366] p-3.5 text-white shadow-[0_10px_30px_rgba(37,211,102,0.4)] transition-all duration-300 hover:scale-105 hover:bg-[#1EBE5A] active:scale-95 sm:bottom-6 sm:right-6 sm:p-4"
    >
      <MessageCircle className="size-6 sm:size-7" />
      <span className="hidden pr-1 text-sm font-semibold sm:inline">
        {SITE.phoneDisplay}
      </span>
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366]/40" />
    </a>
  )
}
