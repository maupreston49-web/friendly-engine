// Form validation utilities
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone) => {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
  return phoneRegex.test(cleanPhone);
};

export const validateName = (name) => {
  return name.trim().length >= 2 && /^[a-zA-Z\s]+$/.test(name);
};

export const validateRequired = (value) => {
  return value.trim().length > 0;
};

export const validateMessage = (message) => {
  return message.trim().length >= 10;
};

export const validateVesselLength = (length) => {
  if (!length) return true; // Optional field
  const numLength = parseFloat(length);
  return !isNaN(numLength) && numLength > 0 && numLength < 1000;
};

export const getFieldError = (fieldName, value, isRequired = true) => {
  if (isRequired && !validateRequired(value)) {
    return `${fieldName} is required`;
  }
  
  if (!isRequired && !value) {
    return null; // Optional field is empty, no error
  }
  
  switch (fieldName.toLowerCase()) {
    case 'email':
      return !validateEmail(value) ? 'Please enter a valid email address' : null;
    case 'phone':
      return !validatePhone(value) ? 'Please enter a valid phone number' : null;
    case 'first name':
    case 'last name':
      return !validateName(value) ? 'Please enter a valid name (letters only)' : null;
    case 'message':
      return !validateMessage(value) ? 'Message must be at least 10 characters long' : null;
    case 'vessel length':
      return !validateVesselLength(value) ? 'Please enter a valid vessel length' : null;
    default:
      return null;
  }
};

export const validateForm = (formData, requiredFields = []) => {
  const errors = {};
  let isValid = true;
  
  requiredFields.forEach(field => {
    const error = getFieldError(field, formData[field], true);
    if (error) {
      errors[field] = error;
      isValid = false;
    }
  });
  
  // Validate optional fields that have values
  Object.keys(formData).forEach(field => {
    if (!requiredFields.includes(field) && formData[field]) {
      const error = getFieldError(field, formData[field], false);
      if (error) {
        errors[field] = error;
        isValid = false;
      }
    }
  });
  
  return { errors, isValid };
};

export const formatPhoneNumber = (value) => {
  const phoneNumber = value.replace(/\D/g, '');
  const phoneNumberLength = phoneNumber.length;
  
  if (phoneNumberLength < 4) return phoneNumber;
  if (phoneNumberLength < 7) {
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
  }
  return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
};

export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};
