import React, { useState, useRef, useEffect } from 'react';
import { Camera, Sparkles, CheckCircle2, QrCode, AlertCircle, RefreshCw } from 'lucide-react';
import { Modal } from './Modal';
import { useAppData } from '../../context/AppDataContext';

interface QRScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QRScannerModal: React.FC<QRScannerModalProps> = ({ isOpen, onClose }) => {
  const { verifyLaundryQrDemo, machines } = useAppData();
  const [manualCode, setManualCode] = useState('');
  const [scanResult, setScanResult] = useState<{ success: boolean; message: string } | null>(null);
  const [hasCamera, setHasCamera] = useState<boolean>(false);
  const [isScanning, setIsScanning] = useState<boolean>(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    if (isOpen) {
      setScanResult(null);
      setManualCode('');
      setIsScanning(true);

      // Attempt real camera stream if available in browser
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices
          .getUserMedia({ video: { facingMode: 'environment' } })
          .then(stream => {
            streamRef.current = stream;
            setHasCamera(true);
            if (videoRef.current) {
              videoRef.current.srcObject = stream;
            }
          })
          .catch(() => {
            // Camera not available / permission denied; use simulated visual viewfinder
            setHasCamera(false);
          });
      }
    } else {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
    }

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [isOpen]);

  const handleTestScan = (machineId: string) => {
    setIsScanning(false);
    const result = verifyLaundryQrDemo(machineId);
    setScanResult(result);
    if (result.success) {
      setTimeout(() => {
        onClose();
      }, 1800);
    }
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualCode.trim()) return;
    const result = verifyLaundryQrDemo(manualCode);
    setScanResult(result);
    if (result.success) {
      setTimeout(() => {
        onClose();
      }, 1800);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Scan Machine QR Code"
      description="Point your device camera at the QR code affixed to any Savio laundry washer or dryer."
      maxWidth="max-w-md"
    >
      <div className="space-y-4">
        {/* Scanner Viewfinder Box */}
        <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-slate-900 border-2 border-indigo-500/50 flex flex-col items-center justify-center shadow-inner">
          {hasCamera ? (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 p-6 text-center">
              <div className="w-16 h-16 rounded-2xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center mb-3">
                <Camera className="w-8 h-8 text-indigo-400" />
              </div>
              <p className="text-sm font-medium text-slate-300">
                Simulated Optical Viewfinder
              </p>
              <p className="text-xs text-slate-500 mt-1 max-w-xs">
                Real camera stream or 1-tap machine simulation active below.
              </p>
            </div>
          )}

          {/* Scanner Overlay UI */}
          <div className="relative z-10 w-56 h-56 border-2 border-dashed border-indigo-400/80 rounded-2xl flex flex-col items-center justify-center p-4 backdrop-blur-[2px]">
            {/* Animated Laser Scanning Line */}
            {isScanning && (
              <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_12px_#34d399] animate-pulse-ring top-1/2 -translate-y-1/2 w-full" />
            )}

            <QrCode className="w-12 h-12 text-white/40" />
            <span className="text-[11px] font-semibold text-white/90 bg-black/60 px-2.5 py-1 rounded-full mt-3">
              Align QR inside frame
            </span>
          </div>

          {/* Scan result alert banner */}
          {scanResult && (
            <div
              className={`absolute bottom-3 left-3 right-3 p-3 rounded-xl z-20 flex items-center gap-2.5 text-xs font-semibold ${
                scanResult.success
                  ? 'bg-emerald-500 text-white'
                  : 'bg-rose-500 text-white'
              }`}
            >
              {scanResult.success ? (
                <CheckCircle2 className="w-4 h-4 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 shrink-0" />
              )}
              <span>{scanResult.message}</span>
            </div>
          )}
        </div>

        {/* 1-Tap Quick Demo Scanners */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-500" /> Demo Quick Scan
            </span>
            <span className="text-[11px] text-slate-400">Click to simulate test</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {machines.slice(0, 3).map(m => (
              <button
                key={m.id}
                type="button"
                onClick={() => handleTestScan(m.id)}
                className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 hover:bg-indigo-50 dark:bg-slate-900 dark:hover:bg-indigo-950/40 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all text-left"
              >
                <div className="text-xs font-bold text-slate-900 dark:text-white">
                  {m.id}
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                  {m.type === 'washer' ? 'Washer' : 'Dryer'}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Manual Code Fallback */}
        <form onSubmit={handleManualSubmit} className="pt-2 border-t border-slate-100 dark:border-slate-800/80">
          <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5">
            Or Enter Machine Code Manually:
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="e.g. WM-01, WM-04, DRY-01"
              value={manualCode}
              onChange={e => setManualCode(e.target.value)}
              className="flex-1 px-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold transition-colors"
            >
              Verify
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
