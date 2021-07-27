import { Icon } from '@iconify/react';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import peopleFill from '@iconify/icons-eva/people-fill';
import pantoneOutline from '@iconify/icons-eva/pantone-outline';
import bookFill from '@iconify/icons-eva/book-fill';
import shoppingBagFill from '@iconify/icons-eva/shopping-bag-fill';
import fileTextFill from '@iconify/icons-eva/file-text-fill';
// import lockFill from '@iconify/icons-eva/lock-fill';
// import personAddFill from '@iconify/icons-eva/person-add-fill';
// import alertTriangleFill from '@iconify/icons-eva/alert-triangle-fill';

// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon(pieChart2Fill)
  },
  {
    title: 'product',
    path: '/dashboard/products',
    icon: getIcon(shoppingBagFill)
  },
  {
    title: 'blog',
    path: '/dashboard/blog',
    icon: getIcon(fileTextFill)
  }
  // {
  //   title: 'user',
  //   path: '/dashboard/user',
  //   icon: getIcon(peopleFill)
  // }
  // {
  //   title: 'login',
  //   path: '/login',
  //   icon: getIcon(lockFill)
  // },
  // {
  //   title: 'register',
  //   path: '/register',
  //   icon: getIcon(personAddFill)
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: getIcon(alertTriangleFill)
  // }
];

const siderAdmin = [
  {
    title: 'user',
    path: '/dashboard/user',
    icon: getIcon(peopleFill)
  },
  {
    title: 'category',
    path: '/dashboard/category',
    icon: getIcon(pantoneOutline)
  },
  {
    title: 'book',
    path: '/dashboard/book',
    icon: getIcon(bookFill)
  }
];

const getSidebarConfig = (role) => {
  if (role === 'admin') {
    return [...sidebarConfig, ...siderAdmin];
  }

  return sidebarConfig;
};

export { getSidebarConfig };
