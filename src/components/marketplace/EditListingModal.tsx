import React, { useState, useEffect } from 'react';
import { Edit3, Image, Tag, Check, Trash2, AlertCircle } from 'lucide-react';
import { Modal } from '../common/Modal';
import { useAppData } from '../../context/AppDataContext';
import { ClassifiedItem } from '../../types';

interface EditListingModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: ClassifiedItem | null;
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

export const EditListingModal: React.FC<EditListingModalProps> = ({ isOpen, onClose, item }) => {
  const { updateClassified, deleteClassified } = useAppData();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ClassifiedItem['category']>('Electronics');
  const [price, setPrice] = useState('');
  const [condition, setCondition] = useState<ClassifiedItem['condition']>('Like New');
  const [status, setStatus] = useState<'available' | 'sold'>('available');
  const [description, setDescription] = useState('');
  const [selectedImage, setSelectedImage] = useState(sampleImages[0].url);
  const [customImageUrl, setCustomImageUrl] = useState('');
  const [phone, setPhone] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [errors, setErrors] = useState<{ title?: string; price?: string }>({});

  useEffect(() => {
    if (item) {
      setTitle(item.title);
      setCategory(item.category);
      setPrice(item.price.toString());
      setCondition(item.condition);
      setStatus(item.status);
      setDescription(item.description);
      setSelectedImage(item.imageUrl);
      setCustomImageUrl(item.imageUrl);
      setPhone(item.sellerPhone || '+91 98765 43210');
      setIsDeleting(false);
      setErrors({});
    }
  }, [item]);

  if (!item) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {};

    if (!title.trim()) newErrors.title = 'Title is required';
    if (!price || isNaN(Number(price)) || Number(price) <= 0) {
      newErrors.price = 'Please enter a valid price in ₹';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    updateClassified(item.id, {
      title,
      category,
      price: Number(price),
      condition,
      status,
      description,
      imageUrl: customImageUrl.trim() ? customImageUrl : selectedImage,
      sellerPhone: phone,
    });

    onClose();
  };

  const handleDelete = () => {
    deleteClassified(item.id);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Product Listing"
      description="Update pricing, condition, description, or mark this product as sold."
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
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4F46F5]"
          />
          {errors.title && <p className="text-xs text-rose-500 mt-1">{errors.title}</p>}
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
              value={price}
              onChange={e => setPrice(e.target.value)}
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4F46F5]"
            />
            {errors.price && <p className="text-xs text-rose-500 mt-1">{errors.price}</p>}
          </div>
        </div>

        {/* Status & Condition */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Availability Status
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              {(['available', 'sold'] as const).map(st => (
                <button
                  key={st}
                  type="button"
                  onClick={() => setStatus(st)}
                  className={`py-1.5 px-2 rounded-xl text-xs font-bold border capitalize transition-all ${
                    status === st
                      ? st === 'available'
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                        : 'bg-rose-600 text-white border-rose-600 shadow-sm'
                      : 'bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800'
                  }`}
                >
                  {st === 'available' ? 'Active' : 'Sold'}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Condition
            </label>
            <select
              value={condition}
              onChange={e => setCondition(e.target.value as any)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
            >
              <option value="Like New">Like New</option>
              <option value="Gently Used">Gently Used</option>
              <option value="Well Used">Well Used</option>
            </select>
          </div>
        </div>

        {/* Contact Phone */}
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
            WhatsApp / Phone Number
          </label>
          <input
            type="text"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            placeholder="+91 98765 43210"
            className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4F46F5]"
          />
        </div>

        {/* Photos */}
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center justify-between">
            <span>Select Product Image</span>
            <span className="text-[11px] text-slate-400 font-normal">Pick preset or paste URL below</span>
          </label>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {sampleImages.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setSelectedImage(img.url);
                  setCustomImageUrl(img.url);
                }}
                className={`relative w-14 h-14 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                  (customImageUrl === img.url || selectedImage === img.url)
                    ? 'border-[#4F46F5] ring-2 ring-indigo-500/30 scale-105'
                    : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img.url} alt={img.label} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
          <input
            type="url"
            value={customImageUrl}
            onChange={e => setCustomImageUrl(e.target.value)}
            placeholder="Or enter custom image URL (https://...)"
            className="w-full mt-2 px-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4F46F5]"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
            Description
          </label>
          <textarea
            rows={3}
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4F46F5]"
          />
        </div>

        {/* Delete confirmation toggle */}
        {isDeleting ? (
          <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-rose-700 dark:text-rose-300">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>Are you sure you want to permanently delete this listing?</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsDeleting(false)}
                className="px-2.5 py-1 text-xs font-semibold text-slate-600 hover:text-slate-800"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="px-3 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-bold shadow-sm"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setIsDeleting(true)}
              className="text-xs font-bold text-rose-500 hover:text-rose-600 flex items-center gap-1.5 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete Listing</span>
            </button>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-[#4F46F5] hover:bg-indigo-600 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-500/20"
              >
                Save Changes
              </button>
            </div>
          </div>
        )}
      </form>
    </Modal>
  );
};
