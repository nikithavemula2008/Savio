import React, { useState } from 'react';
import { MessageSquare, Phone, Send, CheckCircle2, ShieldCheck, MapPin, Tag } from 'lucide-react';
import { Modal } from '../common/Modal';
import { ClassifiedItem } from '../../types';
import { useToast } from '../../context/ToastContext';

interface ContactSellerModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: ClassifiedItem | null;
}

const quickMessages = [
  'Hi, is this still available?',
  'Can I come inspect it at your dorm today?',
  'Would you consider a small discount?',
  'Can you hold this for me until evening?',
];

export const ContactSellerModal: React.FC<ContactSellerModalProps> = ({
  isOpen,
  onClose,
  item,
}) => {
  const { showToast } = useToast();
  const [message, setMessage] = useState('Hi, is this still available?');
  const [offerPrice, setOfferPrice] = useState('');
  const [isSent, setIsSent] = useState(false);

  if (!item) return null;

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsSent(true);
    showToast(`Message sent to ${item.sellerName}! They usually reply within 1 hour.`, 'success');

    setTimeout(() => {
      setIsSent(false);
      onClose();
    }, 1500);
  };

  const handleWhatsAppRedirect = () => {
    const rawNumber = (item.sellerPhone || '+91 98765 43210').replace(/[^0-9]/g, '');
    const encodedText = encodeURIComponent(
      `Hello ${item.sellerName}, I saw your "${item.title}" on Savio Campus Marketplace for ₹${item.price}. ${message}`
    );
    window.open(`https://wa.me/${rawNumber}?text=${encodedText}`, '_blank');
    showToast(`Connecting with ${item.sellerName} on WhatsApp...`, 'info');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Contact Seller"
      description="Connect directly with verified campus students to arrange inspection or purchase."
      maxWidth="max-w-lg"
    >
      <div className="space-y-4">
        {/* Product Preview Header */}
        <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-16 h-16 rounded-xl object-cover shrink-0 border border-slate-200 dark:border-slate-700"
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-[#4F46F5]">
                {item.category}
              </span>
              <span className="text-base font-extrabold text-slate-900 dark:text-white">
                ₹{item.price.toLocaleString()}
              </span>
            </div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate mt-1">
              {item.title}
            </h4>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 flex items-center gap-1.5">
              <span>{item.condition}</span>
              <span>•</span>
              <span className="flex items-center gap-0.5">
                <MapPin className="w-3 h-3 text-slate-400" />
                {item.sellerRoom}
              </span>
            </div>
          </div>
        </div>

        {/* Seller Info Card */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-purple-50/60 dark:bg-purple-950/30 border border-purple-200/50 dark:border-purple-800/40">
          <div className="flex items-center gap-3">
            <img
              src={item.sellerAvatar}
              alt={item.sellerName}
              className="w-10 h-10 rounded-full object-cover ring-2 ring-purple-500/20"
            />
            <div>
              <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <span>{item.sellerName}</span>
                <span className="flex items-center gap-0.5 text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-50 dark:bg-emerald-950/50 px-1.5 py-0.2 rounded">
                  <ShieldCheck className="w-3 h-3" /> Verified Student
                </span>
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                {item.sellerRoom} • {item.sellerPhone || '+91 98765 43210'}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleWhatsAppRedirect}
            className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all flex items-center gap-1 shadow-sm shrink-0"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSendMessage} className="space-y-3.5">
          {/* Quick Prompt Chips */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Quick Suggestions
            </label>
            <div className="flex flex-wrap gap-1.5">
              {quickMessages.map((prompt, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setMessage(prompt)}
                  className={`text-[11px] px-2.5 py-1 rounded-lg border transition-all text-left ${
                    message === prompt
                      ? 'bg-indigo-50 dark:bg-indigo-950/70 text-[#4F46F5] border-indigo-300 dark:border-indigo-700 font-bold'
                      : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                  }`}
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* Message Textarea */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Your Message *
            </label>
            <textarea
              rows={3}
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="Write a clear note about your availability or questions..."
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4F46F5]"
            />
          </div>

          {/* Optional Counter-Offer */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Make an Offer (Optional)
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                ₹
              </span>
              <input
                type="number"
                value={offerPrice}
                onChange={e => setOfferPrice(e.target.value)}
                placeholder={`Listed price is ₹${item.price}...`}
                className="w-full pl-8 pr-4 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4F46F5]"
              />
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-700 dark:text-slate-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSent || !message.trim()}
              className="px-5 py-2.5 bg-[#4F46F5] hover:bg-indigo-600 disabled:opacity-50 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-500/20 transition-all flex items-center gap-1.5"
            >
              {isSent ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                  <span>Sent Successfully</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Message</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
