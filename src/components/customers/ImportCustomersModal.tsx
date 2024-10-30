import React, { useState } from 'react';
import { X, Upload, FileText, AlertCircle } from 'lucide-react';

interface ImportCustomersModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (file: File) => void;
}

export function ImportCustomersModal({ isOpen, onClose, onImport }: ImportCustomersModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string>('');

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type !== 'text/csv') {
        setError('Please upload a CSV file');
        return;
      }
      setFile(selectedFile);
      setError('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file');
      return;
    }
    onImport(file);
  };

  const handleDownloadTemplate = () => {
    const template = 'Name,Email,Company,Phone,Industry,Size,Website,Address\n';
    const blob = new Blob([template], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'customer_import_template.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

        <div className="inline-block w-full max-w-md transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left align-bottom shadow-xl transition-all sm:my-8 sm:p-6 sm:align-middle">
          <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
            <button
              onClick={onClose}
              className="rounded-md bg-white text-gray-400 hover:text-gray-500"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="sm:flex sm:items-start">
            <div className="mt-3 w-full text-center sm:ml-4 sm:mt-0 sm:text-left">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Import Customers
              </h3>
              
              <div className="mt-4">
                <button
                  onClick={handleDownloadTemplate}
                  className="inline-flex items-center text-sm text-blue-600 hover:text-blue-500"
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Download CSV Template
                </button>
              </div>

              <form onSubmit={handleSubmit} className="mt-6">
                <div className="rounded-lg border-2 border-dashed border-gray-300 p-6">
                  <div className="flex flex-col items-center">
                    <Upload className="h-8 w-8 text-gray-400" />
                    <div className="mt-2 text-center">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500"
                      >
                        <span>Upload a CSV file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          accept=".csv"
                          className="sr-only"
                          onChange={handleFileChange}
                        />
                      </label>
                      <p className="text-xs text-gray-500">
                        or drag and drop
                      </p>
                    </div>
                    {file && (
                      <div className="mt-4 text-sm text-gray-900">
                        Selected file: {file.name}
                      </div>
                    )}
                  </div>
                </div>

                {error && (
                  <div className="mt-4 flex items-center text-sm text-red-600">
                    <AlertCircle className="mr-2 h-4 w-4" />
                    {error}
                  </div>
                )}

                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
                  >
                    Import Customers
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}