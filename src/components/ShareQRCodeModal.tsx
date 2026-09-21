'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, QrCode, Copy, Check, X, Download, MessageCircle, Facebook, Mail } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

interface ShareQRCodeModalProps {
  weddingUrl: string;
  coupleNames: string;
}

export const ShareQRCodeModal: React.FC<ShareQRCodeModalProps> = ({ weddingUrl, coupleNames }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(weddingUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Wedding Invitation - ${coupleNames}`,
          text: `You're invited to celebrate the wedding of ${coupleNames}! 💍❤️`,
          url: weddingUrl,
        });
      } catch (e) {
        console.log('Share canceled', e);
      }
    } else {
      handleCopyLink();
    }
  };

  const downloadQR = () => {
    const svgElement = document.getElementById('wedding-qr-code') as unknown as SVGElement;
    if (!svgElement) return;

    const svgData = new XMLSerializer().serializeToString(svgElement);
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const URL = window.URL || window.webkitURL;
    const blobURL = URL.createObjectURL(svgBlob);

    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 400;
      canvas.height = 400;
      const context = canvas.getContext('2d');
      if (context) {
        context.fillStyle = '#FFFFFF';
        context.fillRect(0, 0, 400, 400);
        context.drawImage(image, 20, 20, 360, 360);
        const png = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.href = png;
        downloadLink.download = `wedding-qr-${coupleNames.toLowerCase().replace(/\s+/g, '-')}.png`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      }
    };
    image.src = blobURL;
  };

  const shareLinks = [
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      color: 'bg-emerald-600',
      url: `https://api.whatsapp.com/send?text=${encodeURIComponent(`You're invited to the wedding of ${coupleNames}! 💍❤️\n${weddingUrl}`)}`,
    },
    {
      name: 'Facebook',
      icon: Facebook,
      color: 'bg-blue-600',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(weddingUrl)}`,
    },
    {
      name: 'Email',
      icon: Mail,
      color: 'bg-rose-600',
      url: `mailto:?subject=${encodeURIComponent(`Wedding Invitation - ${coupleNames}`)}&body=${encodeURIComponent(`Please join us in celebrating the wedding of ${coupleNames}.\n\nInvitation Link: ${weddingUrl}`)}`,
    },
  ];

  return (
    <>
      {/* Floating trigger button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-40 p-3.5 rounded-full bg-stone-900/90 text-amber-300 border border-amber-400/40 shadow-2xl backdrop-blur-xl hover:scale-105 transition-transform flex items-center gap-2 group"
      >
        <Share2 className="w-5 h-5 text-amber-400 group-hover:rotate-12 transition-transform" />
        <span className="hidden sm:inline text-xs font-bold text-amber-100 pr-1">Share Invitation</span>
      </button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              className="relative w-full max-w-md bg-stone-900 rounded-3xl border border-amber-400/40 p-6 md:p-8 text-center text-amber-100 shadow-2xl"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-stone-800 text-stone-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-12 h-12 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40 flex items-center justify-center mx-auto mb-3">
                <QrCode className="w-6 h-6" />
              </div>

              <h3 className="text-xl font-bold font-serif text-white mb-1">Share Invitation & QR Code</h3>
              <p className="text-xs text-stone-400 mb-6">Print QR code on physical cards or share digital link</p>

              {/* QR Code Container */}
              <div className="p-4 rounded-2xl bg-white w-fit mx-auto shadow-xl mb-6 border border-amber-200">
                <QRCodeSVG
                  id="wedding-qr-code"
                  value={weddingUrl}
                  size={180}
                  level="H"
                  includeMargin={false}
                />
              </div>

              {/* Download QR Button */}
              <button
                onClick={downloadQR}
                className="w-full py-2.5 mb-6 rounded-full bg-stone-800 hover:bg-stone-700 text-amber-200 text-xs font-semibold border border-amber-400/30 flex items-center justify-center gap-2 transition-colors"
              >
                <Download className="w-4 h-4 text-amber-400" />
                <span>Download Printable QR Code (PNG)</span>
              </button>

              {/* Social Buttons */}
              <div className="flex items-center justify-center gap-3 mb-6">
                {shareLinks.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.name}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-3 rounded-xl ${item.color} text-white shadow-lg hover:scale-110 transition-transform`}
                      title={`Share on ${item.name}`}
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>

              {/* Copy Link Button */}
              <div className="flex items-center gap-2 p-2 rounded-xl bg-stone-950 border border-amber-400/30 text-xs">
                <input
                  type="text"
                  readOnly
                  value={weddingUrl}
                  className="bg-transparent text-stone-300 w-full px-2 focus:outline-none truncate"
                />
                <button
                  onClick={handleCopyLink}
                  className="px-4 py-2 rounded-lg bg-amber-400 text-stone-950 font-bold flex items-center gap-1.5 shrink-0 hover:bg-amber-300 transition-colors"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
