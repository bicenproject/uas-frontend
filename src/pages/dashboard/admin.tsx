 import { useAuth } from '@/utils/lib/AuthContext';  
import Link from 'next/link';  
import { useState } from 'react';  

 const catalogItems = [  
  {  
    id: 1,  
    title: 'Product Management',  
    description: 'Manage your products inventory and categories',  
    icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4',  
    bgColor: 'bg-gradient-to-br from-purple-400 to-purple-600',  
    count: '2,543 Products',  
    trend: '+12% from last month'  
  },  
  {  
    id: 2,  
    title: 'Order Report',  
    description: 'Handle customer orders and delivery tracking',  
    icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',  
    bgColor: 'bg-gradient-to-br from-blue-400 to-blue-600',  
    count: '156 Active Orders',  
    trend: '+5% this week'  
  },  
  {  
    id: 3,  
    title: 'Customer Management',  
    description: 'Manage customer data and support tickets',  
    icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',  
    bgColor: 'bg-gradient-to-br from-green-400 to-green-600',  
    count: '1,234 Customers',  
    trend: '+8% this month'  
  },  
  {  
    id: 4,  
    title: 'Supplier Management',  
    description: 'Business insights and performance metrics',  
    icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',  
    bgColor: 'bg-gradient-to-br from-yellow-400 to-yellow-600',  
    count: '45 Reports',  
    trend: 'Updated daily'  
  },  
  {  
    id: 5,  
    title: 'Financial Management',  
    description: 'Track revenue, expenses and transactions',  
    icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',  
    bgColor: 'bg-gradient-to-br from-pink-400 to-pink-600',  
    count: '\$45,231 Revenue',  
    trend: '+15% vs last month'  
  },  
  {  
    id: 6,  
    title: 'Inventory Control',  
    description: 'Stock management and warehouse operations',  
    icon: 'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4',  
    bgColor: 'bg-gradient-to-br from-indigo-400 to-indigo-600',  
    count: '1,890 Items',  
    trend: '85% in stock'  
  }  
];  

const recentActivities = [  
  { id: 1, action: 'New order received', time: '2 minutes ago', status: 'success' },  
  { id: 2, action: 'Product stock updated', time: '5 minutes ago', status: 'info' },  
  { id: 3, action: 'Customer complaint resolved', time: '10 minutes ago', status: 'success' },  
  { id: 4, action: 'New user registered', time: '15 minutes ago', status: 'info' },  
  { id: 5, action: 'Payment processed', time: '20 minutes ago', status: 'success' }  
];  

export default function Dashboard() {  
  const { user } = useAuth();  
  const [selectedPeriod, setSelectedPeriod] = useState('today');  

  return (
    <div className="min-h-screen bg-gray-50">  
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">  
        <div className="mb-8">  
          <div className="flex items-center justify-between">  
            <div>  
              <h1 className="text-3xl font-bold text-gray-900">  
                Welcome back, {user?.name || 'Admin'} 👋  
              </h1>  
              <p className="mt-1 text-sm text-gray-500">  
                Here's what's happening with your business today  
              </p>  
            </div>  
            <div className="flex items-center space-x-3">  
              <select  
                value={selectedPeriod}  
                onChange={(e) => setSelectedPeriod(e.target.value)}  
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"  
              >  
                <option value="today">Today</option>  
                <option value="week">This Week</option>  
                <option value="month">This Month</option>  
                <option value="year">This Year</option>  
              </select>  
            </div>  
          </div>  
        </div>  

        {/* Quick Stats */}  
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">  
          {[  
            {  
              title: 'Total Revenue',  
              value: '\$45,231',  
              trend: '+20.1%',  
              trendDir: 'up',  
              icon: 'M20 12a8 8 0 01-8 8v-1a7 7 0 007-7h1zm-1-4a3 3 0 100-6 3 3 0 000 6z'  
            },  
            {  
              title: 'Active Users',  
              value: '2,234',  
              trend: '+15.2%',  
              trendDir: 'up',  
              icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'  
            },  
            {  
              title: 'Conversion Rate',  
              value: '4.3%',  
              trend: '-1.2%',  
              trendDir: 'down',  
              icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6'  
            },  
            {  
              title: 'Avg. Order Value',  
              value: '\$89.54',  
              trend: '+10.5%',  
              trendDir: 'up',  
              icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z'  
            }  
          ].map((stat, index) => (  
            <div  
              key={index}  
              className="bg-white overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"  
            >  
              <div className="p-5">  
                <div className="flex items-center">  
                  <div className="flex-shrink-0">  
                    <div className={`p-3 rounded-md ${  
                      index === 0 ? 'bg-blue-500' :  
                      index === 1 ? 'bg-green-500' :  
                      index === 2 ? 'bg-yellow-500' :  
                      'bg-purple-500'  
                    } bg-opacity-10`}>  
                      <svg  
                        className={`h-6 w-6 ${  
                          index === 0 ? 'text-blue-500' :  
                          index === 1 ? 'text-green-500' :  
                          index === 2 ? 'text-yellow-500' :  
                          'text-purple-500'  
                        }`}  
                        xmlns="http://www.w3.org/2000/svg"  
                        fill="none"  
                        viewBox="0 0 24 24"  
                        stroke="currentColor"  
                      >  
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stat.icon} />  
                      </svg>  
                    </div>  
                  </div>  
                  <div className="ml-5 w-0 flex-1">  
                    <dl>  
                      <dt className="text-sm font-medium text-gray-500 truncate">  
                        {stat.title}  
                      </dt>  
                      <dd className="flex items-baseline">  
                        <div className="text-2xl font-semibold text-gray-900">  
                          {stat.value}  
                        </div>  
                        <div className={`ml-2 flex items-baseline text-sm font-semibold ${  
                          stat.trendDir === 'up' ? 'text-green-600' : 'text-red-600'  
                        }`}>  
                          {stat.trendDir === 'up' ? (  
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 12 12">  
                              <path d="M3.707 5.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l4-4a1 1 0 00-1.414-1.414L7 8.586V1a1 1 0 10-2 0v7.586l-1.293-1.293z" />  
                            </svg>  
                          ) : (  
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 12 12">  
                              <path d="M3.707 6.707a1 1 0 001.414-1.414L2.414 2.586a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l4-4a1 1 0 00-1.414-1.414L7 5.586V13a1 1 0 102 0V5.586l1.293 1.293a1 1 0 001.414-1.414l-4-4a1 1 0 00-1.414 0l-4 4z" />  
                            </svg>  
                          )}  
                          <span className="sr-only">  
                            {stat.trendDir === 'up' ? 'Increased by' : 'Decreased by'}  
                          </span>  
                          {stat.trend}  
                        </div>  
                      </dd>  
                    </dl>  
                  </div>  
                </div>  
              </div>  
            </div>  
          ))}  
        </div>  

         <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 mb-8">  
           <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">  
            {catalogItems.slice(0, 4).map((item) => (  
              <Link  
                key={item.id}  
                href={`/dashboard/${item.title.toLowerCase().replace(' ', '-')}`}  
                className="relative group bg-white p-6 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"  
              >  
                <div>  
                  <span className={`inline-flex items-center justify-center p-3 rounded-lg ${item.bgColor}`}>  
                    <svg  
                      className="h-6 w-6 text-white"  
                      xmlns="http://www.w3.org/2000/svg"  
                      fill="none"  
                      viewBox="0 0 24 24"  
                      stroke="currentColor"  
                    >  
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />  
                    </svg>  
                  </span>  
                  <h3 className="mt-4 text-lg font-semibold text-gray-900 group-hover:text-blue-600">  
                    {item.title}  
                  </h3>  
                  <p className="mt-1 text-sm text-gray-500">  
                    {item.description}  
                  </p>  
                  <div className="mt-4">  
                    <span className="text-sm font-medium text-gray-900">  
                      {item.count}  
                    </span>  
                    <span className="ml-2 text-xs text-gray-500">  
                      {item.trend}  
                    </span>  
                  </div>  
                </div>  
              </Link>  
            ))}  
          </div>  

          {/* Recent Activity */}  
          <div className="bg-white rounded-lg shadow-sm p-6">  
            <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>  
            <div className="flow-root">  
              <ul className="-mb-8">  
              {recentActivities.map((activity, activityIdx) => (  
                  <li key={activity.id}>  
                    <div className="relative pb-8">  
                      {activityIdx !== recentActivities.length - 1 ? (  
                        <span  
                          className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"  
                          aria-hidden="true"  
                        />  
                      ) : null}  
                      <div className="relative flex space-x-3">  
                        <div>  
                          <span  
                            className={`${  
                              activity.status === 'success' ? 'bg-green-400' : 'bg-blue-400'  
                            } h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white`}  
                          >  
                            {activity.status === 'success' ? (  
                              <svg className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">  
                                <path  
                                  fillRule="evenodd"  
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"  
                                  clipRule="evenodd"  
                                />  
                              </svg>  
                            ) : (  
                              <svg className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">  
                                <path  
                                  fillRule="evenodd"  
                                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"  
                                  clipRule="evenodd"  
                                />  
                              </svg>  
                            )}  
                          </span>  
                        </div>  
                        <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">  
                          <div>  
                            <p className="text-sm text-gray-500">  
                              {activity.action}  
                            </p>  
                          </div>  
                          <div className="text-right text-sm whitespace-nowrap text-gray-500">  
                            {activity.time}  
                          </div>  
                        </div>  
                      </div>  
                    </div>  
                  </li>  
                ))}  
              </ul>  
            </div>  
          </div>  
        </div>  

        {/* Performance Cards */}  
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">  
          {[  
            {  
              title: 'Sales Performance',  
              value: '89%',  
              change: '+2.5%',  
              chart: [65, 75, 70, 85, 80, 89],  
              color: 'from-pink-500 to-rose-500'  
            },  
            {  
              title: 'Customer Satisfaction',  
              value: '95%',  
              change: '+1.2%',  
              chart: [85, 90, 88, 92, 93, 95],  
              color: 'from-purple-500 to-indigo-500'  
            },  
            {  
              title: 'Inventory Status',  
              value: '78%',  
              change: '-0.5%',  
              chart: [80, 82, 79, 75, 76, 78],  
              color: 'from-cyan-500 to-blue-500'  
            }  
          ].map((card, index) => (  
            <div  
              key={index}  
              className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow duration-300"  
            >  
              <div className="flex items-center justify-between mb-4">  
                <h3 className="text-lg font-medium text-gray-900">{card.title}</h3>  
                <span className={`px-2.5 py-0.5 rounded-full text-sm font-medium ${  
                  card.change.startsWith('+') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'  
                }`}>  
                  {card.change}  
                </span>  
              </div>  
              <div className="flex items-end space-x-2">  
                <div className="text-3xl font-bold text-gray-900">{card.value}</div>  
                <div className="flex-grow flex space-x-1 h-16">  
                  {card.chart.map((value, i) => (  
                    <div  
                      key={i}  
                      className="w-full bg-gray-50 rounded-t"  
                      style={{  
                        height: `${value}%`,  
                      }}  
                    >  
                      <div  
                        className={`w-full h-full rounded-t bg-gradient-to-r ${card.color} transition-all duration-500 ease-in-out hover:opacity-75`}  
                      />  
                    </div>  
                  ))}  
                </div>  
              </div>  
            </div>  
          ))}  
        </div>  

        {/* Action Cards */}  
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">  
          {[  
            {  
              title: 'Quick Actions',  
              items: ['Add Product', 'New Order', 'Create Invoice', 'Add Customer'],  
              icon: 'M12 6v6m0 0v6m0-6h6m-6 0H6',  
              gradient: 'from-emerald-400 to-cyan-400'  
            },  
            {  
              title: 'Recent Orders',  
              items: ['#ORD-2234', '#ORD-2235', '#ORD-2236', '#ORD-2237'],  
              icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z',  
              gradient: 'from-violet-400 to-purple-400'  
            },  
            {  
              title: 'Top Products',  
              items: ['Product A', 'Product B', 'Product C', 'Product D'],  
              icon: 'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4',  
              gradient: 'from-orange-400 to-pink-400'  
            },  
            {  
              title: 'Tasks',  
              items: ['Review Orders', 'Update Stock', 'Contact Suppliers', 'Check Reports'],  
              icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',  
              gradient: 'from-blue-400 to-indigo-400'  
            }  
          ].map((card, index) => (  
            <div  
              key={index}  
              className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"  
            >  
              <div className={`bg-gradient-to-r ${card.gradient} p-4`}>  
                <div className="flex items-center">  
                  <svg  
                    className="h-6 w-6 text-white"  
                    xmlns="http://www.w3.org/2000/svg"  
                    fill="none"  
                    viewBox="0 0 24 24"  
                    stroke="currentColor"  
                  >  
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={card.icon} />  
                  </svg>  
                  <h3 className="ml-2 text-lg font-medium text-white">{card.title}</h3>  
                </div>  
              </div>  
              <div className="p-4">  
                <ul className="space-y-2">  
                  {card.items.map((item, i) => (  
                    <li  
                      key={i}  
                      className="flex items-center text-sm text-gray-600 hover:text-gray-900 cursor-pointer"  
                    >  
                      <span className="h-1.5 w-1.5 rounded-full bg-gray-400 mr-2" />  
                      {item}  
                    </li>  
                  ))}  
                </ul>  
              </div>  
            </div>  
          ))}  
        </div>  
      </main>  
    </div>  
  );  
}