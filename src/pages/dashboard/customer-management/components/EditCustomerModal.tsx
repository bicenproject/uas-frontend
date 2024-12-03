import { useState } from 'react';
import { X, PencilSimple } from '@phosphor-icons/react';
import { Customer, CustomerFormData } from '@/models/customerModel';

interface EditCustomerModalProps {
    customer: Customer | null;
    initialData: CustomerFormData;
    onClose: () => void;
    onSubmit: (data: CustomerFormData) => Promise<void>;
}

export default function EditCustomerModal({
    customer,
    initialData,
    onClose,
    onSubmit
}: EditCustomerModalProps) {
    const [form, setForm] = useState<CustomerFormData>(initialData);
    const [errors, setErrors] = useState<Record<keyof CustomerFormData, string>>({
        customer_name: '',
        alamat: '',
        phone: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value
        }));
        setErrors(prev => ({
            ...prev,
            [name]: ''
        }));
    };

    const validateForm = () => {
        const newErrors: Record<keyof CustomerFormData, string> = {
            customer_name: '',
            alamat: '',
            phone: '',
        };
        let isValid = true;

        if (!form.customer_name.trim()) {
            newErrors.customer_name = 'Nama customer harus diisi';
            isValid = false;
        }

        if (!form.alamat.trim()) {
            newErrors.alamat = 'Alamat harus diisi';
            isValid = false;
        }

        if (!form.phone.trim()) {
            newErrors.phone = 'Nomor telepon harus diisi';
            isValid = false;
        } else if (!/^[0-9]{10,13}$/.test(form.phone)) {
            newErrors.phone = 'Nomor telepon harus 10-13 digit';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;
        await onSubmit(form);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
            <div className="bg-white rounded-xl shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                            <PencilSimple className="w-6 h-6" />
                            Edit Customer
                        </h3>
                        <button
                            onClick={onClose}
                            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Nama Customer <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="customer_name"
                                value={form.customer_name}
                                onChange={handleChange}
                                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.customer_name ? 'border-red-500' : 'border-gray-300'
                                    }`}
                            />
                            {errors.customer_name && (
                                <p className="mt-1 text-sm text-red-500">{errors.customer_name}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Alamat <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                name="alamat"
                                value={form.alamat}
                                onChange={handleChange}
                                rows={3}
                                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.alamat ? 'border-red-500' : 'border-gray-300'
                                    }`}
                            />
                            {errors.alamat && (
                                <p className="mt-1 text-sm text-red-500">{errors.alamat}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                No. Telepon <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.phone ? 'border-red-500' : 'border-gray-300'
                                    }`}
                            />
                            {errors.phone && (
                                <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                            )}
                        </div>

                        <div className="flex justify-end gap-3 pt-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                            >
                                Batal
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                            >
                                <PencilSimple className="w-4 h-4" />
                                Update
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}