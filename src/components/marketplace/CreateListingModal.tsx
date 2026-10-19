import React, { useState } from 'react';
import { PlusCircle, Image, Tag, DollarSign, Sparkles, Phone, Link } from 'lucide-react';
import { Modal } from '../common/Modal';
import { useAppData } from '../../context/AppDataContext';
import { ClassifiedItem } from '../../types';

interface CreateListingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const sampleImages = [
  { label: 'Scientific Calculator', url: 'https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?w=600&auto=format&fit=crop&q=80' },
  { label: 'Campus Bicycle', url: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=600&auto=format&fit=crop&q=80' },
  { label: 'Induction / Kitchen', url: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=600&auto=format&fit=crop&q=80' },
  { label: 'Textbooks / Notes', url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80' },
  { label: 'Bluetooth Speaker', url: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600&auto=format&fit=crop&q=80' },
  { label: 'Sports / Racquet', url: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=600&auto=format&fit=crop&q=80' },
  { label: 'Study Chair', url: 'https://images.unsplash.com/photo-1580481077195-c3a82da91699?w=600&auto=format&fit=crop&q=80' },
  { label: 'Study Lamp / Tech', url: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&auto=format&fit=crop&q=80' },
];

export const CreateListingModal: React.FC<CreateListingModalProps> = ({ isOpen, onClose }) => {
  const { addClassified, profile } = useAppData();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ClassifiedItem['category']>('Electronics');
  const [price, setPrice] = useState('');
  const [condition, setCondition] = useState<ClassifiedItem['condition']>('Like New');
  const [description, setDescription] = useState('');
  const [selectedImage, setSelectedImage] = useState(sampleImages[0].url);
  const [customImageUrl, setCustomImageUrl] = useState('');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [errors, setErrors] = useState<{ title?: string; price?: string; description?: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {};

    if (!title.trim()) newErrors.title = 'Title is required';
    if (!price || isNaN(Number(price)) || Number(price) <= 0) {
      newErrors.price = 'Please enter a valid price in ₹';
    }
    if (!description.trim()) newErrors.description = 'Description is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    addClassified({
      title,
      category,
      price: Number(price),
      condition,
      description,
      imageUrl: customImageUrl.trim() ? customImageUrl.trim() : selectedImage,
      sellerName: profile.name,
      sellerRoom: `${profile.hostelBlock}, ${profile.roomNumber}`,
      sellerPhone: phone.trim() || '+91 98765 43210',
      isMyListing: true,
    });

    // Reset and close
    setTitle('');
    setPrice('');
    setDescription('');
    setCustomImageUrl('');
    setErrors({});
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Sell an Item on Campus"
      description="List unused dorm equipment, textbooks, bicycles, or electronics safely for fellow students."
      maxWidth="max-w-lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
            Item Title *
          </label>
          <input
            type="text"
            placeholder="e.g. Casio fx-991EX Scientific Calculator"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4F46F5]"
          />
          {errors.title && (
            <p className="text-xs text-rose-500 mt-1">{errors.title}</p>
          )}
        </div>

        {/* Category & Price */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Category
            </label>
            <select
              value={category}
              onChange={e => setCategory(e.target.value as any)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
            >
              <option value="Electronics">Electronics</option>
              <option value="Books">Books</option>
              <option value="Sports">Sports</option>
              <option value="Handmade Products">Handmade Products</option>
              <option value="Skin Care">Skin Care</option>
              <option value="Snacks">Snacks</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Price (₹ INR) *
            </label>
            <input
              type="number"
              placeholder="e.g. 850"
              value={price}
              onChange={e => setPrice(e.target.value)}
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4F46F5]"
            />
            {errors.price && (
              <p className="text-xs text-rose-500 mt-1">{errors.price}</p>
            )}
          </div>
        </div>

        {/* Condition */}
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
            Condition
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(['Like New', 'Gently Used', 'Well Used'] as const).map(cond => (
              <button
                key={cond}
                type="button"
                onClick={() => setCondition(cond)}
                className={`py-2 px-2 rounded-xl text-xs font-bold border transition-all ${
                  condition === cond
                    ? 'bg-[#4F46F5] text-white border-[#4F46F5] shadow-sm'
                    : 'bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800'
                }`}
              >
                {cond}
              </button>
            ))}
          </div>
        </div>

        {/* Contact Phone */}
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-indigo-500" />
            <span>WhatsApp / Contact Number</span>
          </label>
          <input
            type="text"
            placeholder="+91 98765 43210"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4F46F5]"
          />
        </div>

        {/* Photo Selection */}
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center justify-between">
            <span>Item Photo</span>
            <span className="text-[11px] text-slate-400 font-normal">Choose preset or enter link below</span>
          </label>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {sampleImages.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setSelectedImage(img.url);
                  setCustomImageUrl('');
                }}
                className={`relative w-14 h-14 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                  selectedImage === img.url && !customImageUrl
                    ? 'border-[#4F46F5] ring-2 ring-indigo-500/30 scale-105'
                    : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img.url} alt={img.label} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
          <div className="relative mt-2">
            <Link className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="url"
              placeholder="Or paste external image URL (https://...)"
              value={customImageUrl}
              onChange={e => setCustomImageUrl(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4F46F5]"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
            Description & Hostel Inspection Details *
          </label>
          <textarea
            rows={3}
            placeholder="Describe condition, reason for selling, and when prospective buyers can inspect it in your dorm..."
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4F46F5]"
          />
          {errors.description && (
            <p className="text-xs text-rose-500 mt-1">{errors.description}</p>
          )}
        </div>

        {/* Reward badge */}
        <div className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 text-xs">
          <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Listing an item earns you <strong>+25 Savio Points</strong>.</span>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-700 dark:text-slate-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 bg-[#4F46F5] hover:bg-indigo-600 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-500/20 transition-all flex items-center gap-1.5"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Publish Listing</span>
          </button>
        </div>
      </form>
    </Modal>
  );
};
