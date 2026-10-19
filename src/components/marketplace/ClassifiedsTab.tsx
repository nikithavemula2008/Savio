import React, { useState, useMemo } from 'react';
import {
  PlusCircle,
  Search,
  Filter,
  Tag,
  MessageSquare,
  MapPin,
  Sparkles,
  ShoppingBag,
  ArrowUpDown,
  SlidersHorizontal,
  Edit3,
  CheckCircle2,
  XCircle,
  UserCheck,
  RotateCcw,
} from 'lucide-react';
import { useAppData } from '../../context/AppDataContext';
import { CreateListingModal } from './CreateListingModal';
import { EditListingModal } from './EditListingModal';
import { ContactSellerModal } from './ContactSellerModal';
import { ClassifiedItem } from '../../types';

type SortOption = 'newest' | 'price_asc' | 'price_desc' | 'title_asc';
type PricePreset = 'all' | 'under_500' | '500_1500' | '1500_3000' | 'above_3000' | 'custom';

export const ClassifiedsTab: React.FC = () => {
  const { classifieds, toggleClassifiedStatus } = useAppData();
  
  // UI State
  const [viewScope, setViewScope] = useState<'all' | 'my_listings'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [pricePreset, setPricePreset] = useState<PricePreset>('all');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  // Modals
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ClassifiedItem | null>(null);
  const [contactItem, setContactItem] = useState<ClassifiedItem | null>(null);

  const categories = ['All', 'Electronics', 'Books', 'Sports', 'Handmade Products', 'Skin Care', 'Snacks', 'Other'];

  const myListingsCount = useMemo(() => {
    return classifieds.filter(item => item.isMyListing).length;
  }, [classifieds]);

  // Filtered & Sorted items
  const filteredClassifieds = useMemo(() => {
    let result = classifieds.filter(item => {
      // 1. My Listings vs All
      if (viewScope === 'my_listings' && !item.isMyListing) {
        return false;
      }

      // 2. Search
      const q = searchQuery.toLowerCase().trim();
      if (q) {
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        const matchesSeller = item.sellerName.toLowerCase().includes(q);
        const matchesRoom = item.sellerRoom.toLowerCase().includes(q);
        if (!matchesTitle && !matchesDesc && !matchesSeller && !matchesRoom) {
          return false;
        }
      }

      // 3. Category
      if (selectedCategory !== 'All' && item.category !== selectedCategory) {
        return false;
      }

      // 4. Price filter
      if (pricePreset === 'under_500' && item.price >= 500) return false;
      if (pricePreset === '500_1500' && (item.price < 500 || item.price > 1500)) return false;
      if (pricePreset === '1500_3000' && (item.price < 1500 || item.price > 3000)) return false;
      if (pricePreset === 'above_3000' && item.price <= 3000) return false;
      if (pricePreset === 'custom') {
        const min = minPrice ? Number(minPrice) : 0;
        const max = maxPrice ? Number(maxPrice) : Infinity;
        if (item.price < min || item.price > max) return false;
      }

      return true;
    });

    // Sort
    result.sort((a, b) => {
      if (sortBy === 'price_asc') return a.price - b.price;
      if (sortBy === 'price_desc') return b.price - a.price;
      if (sortBy === 'title_asc') return a.title.localeCompare(b.title);
      // 'newest' default
      return 0;
    });

    return result;
  }, [classifieds, viewScope, searchQuery, selectedCategory, pricePreset, minPrice, maxPrice, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setPricePreset('all');
    setMinPrice('');
    setMaxPrice('');
    setSortBy('newest');
  };

  return (
    <div className="space-y-6">
      {/* Scope Bar: All Items vs My Listed Products */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-2 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setViewScope('all')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              viewScope === 'all'
                ? 'bg-white dark:bg-[#111827] text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <ShoppingBag className="w-4 h-4 text-[#4F46F5]" />
            <span>All Campus Items ({classifieds.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setViewScope('my_listings')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              viewScope === 'my_listings'
                ? 'bg-white dark:bg-[#111827] text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <UserCheck className="w-4 h-4 text-emerald-500" />
            <span>My Listed Products</span>
            {myListingsCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-emerald-500 text-white text-[10px] font-extrabold flex items-center justify-center">
                {myListingsCount}
              </span>
            )}
          </button>
        </div>

        {/* Sell Button */}
        <button
          type="button"
          onClick={() => setIsCreateOpen(true)}
          className="flex items-center justify-center gap-2 px-5 py-2.5 bg-[#4F46F5] hover:bg-indigo-600 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-indigo-500/20 shrink-0 self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Sell an Item (+25 pts)</span>
        </button>
      </div>

      {/* Main Filter & Sort Controls Box */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-4">
        {/* Row 1: Search & Sort Dropdown */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by product name, description, hostel block..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4F46F5]"
            />
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <ArrowUpDown className="w-3.5 h-3.5" /> Sort:
            </span>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as SortOption)}
              className="px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#4F46F5]"
            >
              <option value="newest">Newest First</option>
              <option value="price_asc">Price: Low to High (₹ → ₹₹₹)</option>
              <option value="price_desc">Price: High to Low (₹₹₹ → ₹)</option>
              <option value="title_asc">Title (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Row 2: Price Range Filter */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 shrink-0 flex items-center gap-1 mr-1">
              <SlidersHorizontal className="w-3.5 h-3.5 text-indigo-500" /> Price:
            </span>

            {[
              { id: 'all', label: 'All Prices' },
              { id: 'under_500', label: 'Under ₹500' },
              { id: '500_1500', label: '₹500 - ₹1,500' },
              { id: '1500_3000', label: '₹1,500 - ₹3,000' },
              { id: 'above_3000', label: '₹3,000+' },
              { id: 'custom', label: 'Custom Range' },
            ].map(p => (
              <button
                key={p.id}
                type="button"
                onClick={() => setPricePreset(p.id as PricePreset)}
                className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
                  pricePreset === p.id
                    ? 'bg-[#4F46F5] text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200/70 dark:hover:bg-slate-700'
                }`}
              >
                {p.label}
              </button>
            ))}

            {/* Custom Min / Max inputs when selected */}
            {pricePreset === 'custom' && (
              <div className="flex items-center gap-1.5 ml-1 animate-in fade-in duration-200">
                <input
                  type="number"
                  placeholder="Min ₹"
                  value={minPrice}
                  onChange={e => setMinPrice(e.target.value)}
                  className="w-20 px-2.5 py-1 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                />
                <span className="text-xs text-slate-400">-</span>
                <input
                  type="number"
                  placeholder="Max ₹"
                  value={maxPrice}
                  onChange={e => setMaxPrice(e.target.value)}
                  className="w-20 px-2.5 py-1 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                />
              </div>
            )}
          </div>
        </div>

        {/* Row 3: Category Chips */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            <span className="text-xs font-bold text-slate-400 mr-1 shrink-0 flex items-center gap-1">
              <Tag className="w-3.5 h-3.5" /> Category:
            </span>
            {categories.map(cat => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {(searchQuery || selectedCategory !== 'All' || pricePreset !== 'all' || sortBy !== 'newest') && (
            <button
              type="button"
              onClick={handleResetFilters}
              className="text-xs font-semibold text-slate-400 hover:text-indigo-600 flex items-center gap-1 shrink-0 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Classifieds Grid */}
      {filteredClassifieds.length === 0 ? (
        <div className="text-center py-14 px-4 rounded-3xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800">
          <div className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 mx-auto flex items-center justify-center mb-3">
            <ShoppingBag className="w-7 h-7" />
          </div>
          <h4 className="text-base font-bold text-slate-900 dark:text-white">
            {viewScope === 'my_listings'
              ? 'You have not listed any items yet'
              : 'No campus items match your filters'}
          </h4>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            {viewScope === 'my_listings'
              ? 'Turn unused electronics, books, or dorm essentials into cash by listing them for fellow campus students.'
              : 'Try broadening your search term or clearing the active price filters.'}
          </p>
          <div className="mt-4 flex items-center justify-center gap-3">
            {viewScope === 'my_listings' ? (
              <button
                type="button"
                onClick={() => setIsCreateOpen(true)}
                className="px-5 py-2.5 bg-[#4F46F5] text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-500/20"
              >
                Sell Your First Item
              </button>
            ) : (
              <button
                type="button"
                onClick={handleResetFilters}
                className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-bold"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredClassifieds.map(item => {
            const isSold = item.status === 'sold';
            const isMine = !!item.isMyListing;

            return (
              <div
                key={item.id}
                className={`rounded-2xl bg-white dark:bg-[#111827] border transition-all overflow-hidden flex flex-col justify-between group shadow-sm hover:shadow-md ${
                  isMine
                    ? 'border-indigo-300 dark:border-indigo-800/80 ring-1 ring-indigo-500/20'
                    : 'border-slate-200/90 dark:border-slate-800'
                }`}
              >
                <div>
                  {/* Image Box */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-800">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ${
                        isSold ? 'grayscale opacity-60' : ''
                      }`}
                    />

                    {/* Top Left: Category Pill */}
                    <span className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-lg text-[10px] font-bold bg-black/75 backdrop-blur-md text-white">
                      {item.category}
                    </span>

                    {/* Top Right: Status / Condition Badge */}
                    <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5">
                      {isSold ? (
                        <span className="px-2.5 py-0.5 rounded-md text-[10px] font-extrabold bg-rose-600 text-white shadow-sm">
                          SOLD
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-white/90 dark:bg-slate-900/90 text-slate-900 dark:text-white backdrop-blur-sm shadow-sm">
                          {item.condition}
                        </span>
                      )}
                    </div>

                    {/* Mine Flag Overlay */}
                    {isMine && (
                      <span className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded-md text-[10px] font-black bg-indigo-600 text-white shadow-md flex items-center gap-1">
                        <UserCheck className="w-3 h-3" />
                        <span>Your Product</span>
                      </span>
                    )}
                  </div>

                  {/* Details */}
                  <div className="p-4">
                    {/* Price and Date */}
                    <div className="flex items-baseline justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
                          ₹{item.price.toLocaleString()}
                        </span>
                        {isSold && (
                          <span className="text-xs font-semibold text-rose-500">
                            (Sold Out)
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-slate-400">
                        {item.datePosted}
                      </span>
                    </div>

                    {/* Title */}
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1 mb-1.5">
                      {item.title}
                    </h4>

                    {/* Description */}
                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 mb-3 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Seller Info */}
                    <div className="flex items-center gap-2.5 pt-2.5 border-t border-slate-100 dark:border-slate-800/80 text-xs text-slate-500">
                      <img
                        src={item.sellerAvatar}
                        alt={item.sellerName}
                        className="w-6 h-6 rounded-full object-cover shrink-0"
                      />
                      <div className="truncate flex-1">
                        <span className="font-semibold text-slate-800 dark:text-slate-200">
                          {item.sellerName}
                        </span>
                        <span className="text-slate-400"> • {item.sellerRoom}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="p-4 pt-0">
                  {isMine ? (
                    /* My Item Action Buttons */
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => toggleClassifiedStatus(item.id)}
                        className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 border ${
                          isSold
                            ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border-emerald-200 hover:bg-emerald-100'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {isSold ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Mark Active</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3.5 h-3.5 text-rose-500" />
                            <span>Mark Sold</span>
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => setEditingItem(item)}
                        className="py-2 px-3 bg-[#4F46F5] hover:bg-indigo-600 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm shadow-indigo-500/20"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit Product</span>
                      </button>
                    </div>
                  ) : (
                    /* Other Student Item Action Button */
                    <button
                      type="button"
                      disabled={isSold}
                      onClick={() => setContactItem(item)}
                      className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                        isSold
                          ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                          : 'bg-slate-100 hover:bg-[#4F46F5] hover:text-white dark:bg-slate-800 dark:hover:bg-[#4F46F5] text-slate-800 dark:text-slate-200 shadow-sm'
                      }`}
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>{isSold ? 'Item Sold Out' : 'Contact Seller'}</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal: Post New Listing */}
      <CreateListingModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
      />

      {/* Modal: Edit Existing Listing */}
      <EditListingModal
        isOpen={!!editingItem}
        onClose={() => setEditingItem(null)}
        item={editingItem}
      />

      {/* Modal: Contact Seller */}
      <ContactSellerModal
        isOpen={!!contactItem}
        onClose={() => setContactItem(null)}
        item={contactItem}
      />
    </div>
  );
};
