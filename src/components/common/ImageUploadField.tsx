import React, { useState, useRef } from 'react';
import { Upload, Link2, Trash2, RefreshCw, Eye, CheckCircle2, AlertCircle } from 'lucide-react';

interface ImageUploadFieldProps {
  label: string;
  value: string;
  onChange: (newValue: string) => void;
  helperText?: string;
  aspectRatio?: 'square' | 'video' | 'banner' | 'auto';
  maxSizeMB?: number;
}

export const ImageUploadField: React.FC<ImageUploadFieldProps> = ({
  label,
  value,
  onChange,
  helperText = 'Upload an image file (PNG, JPG, WEBP, SVG max 5MB) or specify an image URL.',
  aspectRatio = 'auto',
  maxSizeMB = 5
}) => {
  const [activeMode, setActiveMode] = useState<'upload' | 'url'>('upload');
  const [urlInput, setUrlInput] = useState(value);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [previewLoaded, setPreviewLoaded] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml', 'image/gif'];

  const handleFile = (file: File) => {
    setErrorMessage(null);

    // Type validation
    if (!allowedTypes.includes(file.type)) {
      setErrorMessage('Invalid file format. Please upload JPG, PNG, WEBP, or SVG.');
      return;
    }

    // Size validation
    const maxBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxBytes) {
      setErrorMessage(`File is too large (${(file.size / (1024 * 1024)).toFixed(1)}MB). Maximum allowed size is ${maxSizeMB}MB.`);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        onChange(result);
        setUrlInput(result);
        setPreviewLoaded(true);
      }
    };
    reader.onerror = () => {
      setErrorMessage('Failed to read file from local disk.');
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleUrlApply = () => {
    setErrorMessage(null);
    if (!urlInput.trim()) {
      setErrorMessage('Please enter an image URL.');
      return;
    }
    onChange(urlInput.trim());
  };

  const handleClear = () => {
    onChange('');
    setUrlInput('');
    setErrorMessage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2 text-xs">
      <div className="flex items-center justify-between">
        <label className="font-semibold uppercase tracking-wider text-[#B5B5B5]">
          {label}
        </label>
        <div className="flex items-center gap-1 bg-[#111111] p-0.5 rounded border border-[#292929]">
          <button
            type="button"
            onClick={() => setActiveMode('upload')}
            className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-colors ${
              activeMode === 'upload' ? 'bg-[#C1121F] text-white' : 'text-[#858585] hover:text-white'
            }`}
          >
            Upload File
          </button>
          <button
            type="button"
            onClick={() => setActiveMode('url')}
            className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-colors ${
              activeMode === 'url' ? 'bg-[#C1121F] text-white' : 'text-[#858585] hover:text-white'
            }`}
          >
            Image URL
          </button>
        </div>
      </div>

      {errorMessage && (
        <div className="p-2 rounded bg-red-950/40 border border-red-800 text-red-300 text-[11px] flex items-center gap-1.5">
          <AlertCircle className="w-3.5 h-3.5 shrink-0 text-[#C1121F]" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Mode 1: File Upload */}
      {activeMode === 'upload' ? (
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          className="border-2 border-dashed border-[#292929] hover:border-[#C1121F]/60 rounded-xl p-4 text-center bg-[#0D0D0D] transition-colors cursor-pointer relative"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp,image/svg+xml,image/gif"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleFile(e.target.files[0]);
              }
            }}
            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
          />
          <Upload className="w-6 h-6 text-[#C1121F] mx-auto mb-2" />
          <div className="text-white font-medium">Click or drag & drop image here</div>
          <div className="text-[10px] text-[#858585] mt-1">PNG, JPG, WEBP, SVG up to {maxSizeMB}MB</div>
        </div>
      ) : (
        /* Mode 2: Direct URL Input */
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Link2 className="w-3.5 h-3.5 text-[#858585] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="https://example.com/asset.png"
              className="w-full bg-[#111111] border border-[#292929] rounded-lg pl-8 pr-3 py-2 text-xs text-white placeholder-[#858585] outline-none focus:border-[#C1121F]"
            />
          </div>
          <button
            type="button"
            onClick={handleUrlApply}
            className="px-3 py-2 bg-[#171717] hover:bg-[#222222] border border-[#292929] text-white rounded-lg font-semibold text-xs transition-colors shrink-0"
          >
            Apply
          </button>
        </div>
      )}

      {/* Live Preview Box */}
      {value && (
        <div className="mt-2 p-2.5 rounded-lg bg-[#111111] border border-[#292929] flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-14 h-14 rounded bg-[#050505] border border-[#292929] overflow-hidden shrink-0 flex items-center justify-center">
              <img
                src={value}
                alt="Uploaded Preview"
                onLoad={() => setPreviewLoaded(true)}
                onError={() => {
                  setPreviewLoaded(false);
                  setErrorMessage('Could not render image. Verify the URL or file.');
                }}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Image Loaded & Verified</span>
              </div>
              <div className="text-[10px] text-[#858585] font-mono truncate max-w-xs mt-0.5">
                {value.startsWith('data:') ? 'Embedded DataURL / Local Storage' : value}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-1.5 rounded bg-[#171717] hover:bg-[#252525] text-zinc-300 text-xs"
              title="Replace Image"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="p-1.5 rounded bg-[#171717] hover:bg-red-950 text-red-400 text-xs"
              title="Remove Image"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {helperText && <p className="text-[10px] text-[#858585]">{helperText}</p>}
    </div>
  );
};
