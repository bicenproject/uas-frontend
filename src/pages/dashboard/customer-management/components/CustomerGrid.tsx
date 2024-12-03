import { UserCircle, MapPin, Phone, PencilSimple, Trash } from '@phosphor-icons/react';  
import { Customer } from '@/models/customerModel';  
import EmptyState from '@/utils/common/EmptyState';
 
interface CustomerGridProps {  
  customers: Customer[];  
  isSupervisor: boolean;  
  onEdit: (customer: Customer) => void;  
  onDelete: (customer: Customer) => void;  
}  

export default function CustomerGrid({  
  customers,  
  isSupervisor,  
  onEdit,  
  onDelete  
}: CustomerGridProps) {  
  if (customers.length === 0) {  
    return <EmptyState />;  
  }  

  return (  
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">  
      {customers.map((customer) => (  
        <CustomerCard  
          key={customer.id}  
          customer={customer}  
          isSupervisor={isSupervisor}  
          onEdit={onEdit}  
          onDelete={onDelete}  
        />  
      ))}  
    </div>  
  );  
}  

function CustomerCard({  
  customer,  
  isSupervisor,  
  onEdit,  
  onDelete  
}: {  
  customer: Customer;  
  isSupervisor: boolean;  
  onEdit: (customer: Customer) => void;  
  onDelete: (customer: Customer) => void;  
}) {  
  return (  
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 p-6 border border-gray-100">  
      <div className="flex items-start justify-between">  
        <div className="flex items-center gap-3">  
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">  
            <UserCircle weight="bold" className="w-6 h-6" />  
          </div>  
          <div>  
            <h3 className="text-lg font-semibold text-gray-800">  
              {customer.customer_name}  
            </h3>  
          </div>  
        </div>  
        {!isSupervisor && (  
          <div className="flex gap-2">  
            <button  
              onClick={() => onEdit(customer)}  
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"  
              title="Edit Customer"  
            >  
              <PencilSimple className="w-5 h-5" />  
            </button>  
            <button  
              onClick={() => onDelete(customer)}  
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"  
              title="Hapus Customer"  
            >  
              <Trash className="w-5 h-5" />  
            </button>  
          </div>  
        )}  
      </div>  

      <div className="mt-4 space-y-3">  
        <div className="flex items-start gap-2 text-gray-600">  
          <MapPin className="w-5 h-5 mt-0.5" />  
          <p className="text-sm">{customer.alamat}</p>  
        </div>  
        <div className="flex items-center gap-2 text-gray-600">  
          <Phone className="w-5 h-5" />  
          <p className="text-sm">{customer.phone}</p>  
        </div>  
      </div>  
    </div>  
  );  
}