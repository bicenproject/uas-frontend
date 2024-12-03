import React from 'react';
import { Trash } from '@phosphor-icons/react';
import { Supplier } from '@/models/supplierModel';

interface SupplierDeleteModalProps {
  isOpen: boolean;
  supplier: Supplier | null;
  onClose: () => void;
  onConfirm: () => void;
}

const SupplierDeleteModal: React.FC<SupplierDeleteModalProps> = ({
  isOpen,
  supplier,
  onClose,
  onConfirm
}) => {
  if (!isOpen || !supplier) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-lg max-w-md w-full">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600">
              <Trash weight="bold" className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                Konfirmasi Hapus
              </h3>
              <p className="text-sm text-gray-600">
                Apakah Anda yakin ingin menghapus supplier ini?
              </p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="space-y-2">
              <p className="text-sm">
                <span className="font-medium text-gray-700">Nama:</span>{' '}
                <span className="text-gray-900">{supplier.name}</span>
              </p>
              <p className="text-sm">
                <span className="font-medium text-gray-700">Telepon:</span>{' '}
                <span className="text-gray-900">{supplier.phone || '-'}</span>
              </p>
              <p className="text-sm">
                <span className="font-medium text-gray-700">No. Izin:</span>{' '}
                <span className="text-gray-900">
                  {supplier.business_license || '-'}
                </span>
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Batal
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
            >
              <Trash className="w-4 h-4" />
              Hapus
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierDeleteModal;