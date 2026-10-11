import React, { useEffect, useRef, useState } from 'react';
import { Html5QrcodeScanner, Html5Qrcode } from 'html5-qrcode';
import { X, Camera, Upload, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function QRScannerModal({ isOpen, onClose }) {
  const navigate = useNavigate();
  const [scanError, setScanError] = useState('');
  const [activeTab, setActiveTab] = useState('camera'); // 'camera' | 'file'
  const scannerRef = useRef(null);

  useEffect(() => {
    if (!isOpen || activeTab !== 'camera') return;

    // Initialize camera QR scanner
    const scanner = new Html5QrcodeScanner(
      'qr-reader',
      {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1.0,
        showTorchButtonIfSupported: true
      },
      /* verbose= */ false
    );

    scannerRef.current = scanner;

    scanner.render(
      (decodedText) => {
        // Process decoded QR content
        processQRResult(decodedText);
        scanner.clear();
      },
      (error) => {
        // Ignore constant scanning frame errors
      }
    );

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch(() => {});
      }
    };
  }, [isOpen, activeTab]);

  const processQRResult = (text) => {
    let certId = text.trim();
    // If text is a full URL e.g. https://certichain.app/verify/CERT-2026-000001
    if (certId.includes('/verify/')) {
      const parts = certId.split('/verify/');
      certId = parts[parts.length - 1];
    }

    if (certId) {
      onClose();
      navigate(`/verify/${encodeURIComponent(certId)}`);
    } else {
      setScanError('Invalid QR Code. Could not find Certificate ID.');
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setScanError('');
    const html5Qrcode = new Html5Qrcode('qr-reader-file');

    try {
      const decodedText = await html5Qrcode.scanFile(file, true);
      processQRResult(decodedText);
    } catch (err) {
      setScanError('Could not read QR code from image. Please ensure the QR image is clear and try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-blue-400" />
            <h3 className="font-bold text-lg">Scan Certificate QR Code</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-50">
          <button
            onClick={() => { setActiveTab('camera'); setScanError(''); }}
            className={`flex-1 py-3 px-4 text-xs font-semibold flex items-center justify-center gap-2 border-b-2 transition-colors ${
              activeTab === 'camera'
                ? 'border-blue-600 text-blue-600 bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <Camera className="w-4 h-4" />
            Use Device Camera
          </button>
          <button
            onClick={() => { setActiveTab('file'); setScanError(''); }}
            className={`flex-1 py-3 px-4 text-xs font-semibold flex items-center justify-center gap-2 border-b-2 transition-colors ${
              activeTab === 'file'
                ? 'border-blue-600 text-blue-600 bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <Upload className="w-4 h-4" />
            Upload QR Image File
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {scanError && (
            <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-lg flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{scanError}</span>
            </div>
          )}

          {activeTab === 'camera' ? (
            <div className="space-y-3">
              <p className="text-xs text-slate-500 text-center">
                Point your camera at the QR code printed on the CertiChain Digital Certificate.
              </p>
              <div id="qr-reader" className="w-full rounded-xl overflow-hidden border border-slate-200"></div>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-xs text-slate-500 text-center">
                Select an image file containing the certificate QR code from your computer or phone gallery.
              </p>

              <div id="qr-reader-file" className="hidden"></div>

              <label className="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer bg-slate-50 hover:bg-blue-50/50 transition-colors group">
                <Upload className="w-10 h-10 text-slate-400 group-hover:text-blue-600 mb-2 transition-colors" />
                <span className="text-sm font-semibold text-slate-700 group-hover:text-blue-600">
                  Click to choose QR Image
                </span>
                <span className="text-xs text-slate-400 mt-1">
                  Supports PNG, JPG, JPEG, WEBP
                </span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </label>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-semibold rounded-lg transition-colors"
          >
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
}
