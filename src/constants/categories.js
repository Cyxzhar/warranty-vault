export const CATEGORIES = [
  { value: 'electronics', label: 'Electronics' },
  { value: 'appliances', label: 'Appliances' },
  { value: 'furniture', label: 'Furniture' },
  { value: 'automotive', label: 'Automotive' },
  { value: 'clothing', label: 'Clothing' },
  { value: 'tools', label: 'Tools & Hardware' },
  { value: 'other', label: 'Other' },
];

export const getCategoryLabel = (value) => {
  const cat = CATEGORIES.find((c) => c.value === value);
  return cat ? cat.label : 'Other';
};
