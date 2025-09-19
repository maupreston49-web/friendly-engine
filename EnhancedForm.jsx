import React, { useState, useEffect } from 'react';
import { validateForm, getFieldError, formatPhoneNumber, debounce } from '../utils/formValidation';

const EnhancedForm = ({ formName, formTitle, fields, onSubmit, submitText = "Submit" }) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Debounced validation
  const debouncedValidate = debounce((fieldName, value) => {
    const error = getFieldError(fieldName, value, fields.find(f => f.name === fieldName)?.required);
    setErrors(prev => ({
      ...prev,
      [fieldName]: error
    }));
  }, 300);

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    let processedValue = value;
    
    // Format phone numbers
    if (type === 'tel') {
      processedValue = formatPhoneNumber(value);
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: processedValue
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
    
    // Debounced validation
    debouncedValidate(name, processedValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    // Validate all required fields
    const requiredFields = fields.filter(f => f.required).map(f => f.name);
    const { errors: validationErrors, isValid } = validateForm(formData, requiredFields);
    
    if (!isValid) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }
    
    try {
      await onSubmit(formData);
      setSubmitStatus('success');
      setFormData({});
      setErrors({});
    } catch (error) {
      setSubmitStatus('error');
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderField = (field) => {
    const { name, type, placeholder, required, options } = field;
    const value = formData[name] || '';
    const error = errors[name];
    
    const baseInputProps = {
      name,
      value,
      onChange: handleInputChange,
      placeholder: placeholder + (required ? ' *' : ''),
      required,
      className: `form-input ${error ? 'error' : ''}`,
      'aria-invalid': !!error,
      'aria-describedby': error ? `${name}-error` : undefined
    };

    switch (type) {
      case 'textarea':
        return (
          <div key={name} className="form-field">
            <textarea
              {...baseInputProps}
              rows="4"
              minLength={field.minLength || 10}
            />
            {error && <div id={`${name}-error`} className="error-message">{error}</div>}
          </div>
        );
      
      case 'select':
        return (
          <div key={name} className="form-field">
            <select {...baseInputProps}>
              <option value="">{placeholder + (required ? ' *' : '')}</option>
              {options?.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {error && <div id={`${name}-error`} className="error-message">{error}</div>}
          </div>
        );
      
      default:
        return (
          <div key={name} className="form-field">
            <input
              {...baseInputProps}
              type={type}
              minLength={field.minLength}
              maxLength={field.maxLength}
            />
            {error && <div id={`${name}-error`} className="error-message">{error}</div>}
          </div>
        );
    }
  };

  return (
    <div className="enhanced-form-container">
      <h3 className="form-title">{formTitle}</h3>
      
      {submitStatus === 'success' && (
        <div className="success-message">
          <span className="success-icon">✅</span>
          Thank you! Your message has been sent successfully. We'll get back to you soon.
        </div>
      )}
      
      {submitStatus === 'error' && (
        <div className="error-message">
          <span className="error-icon">❌</span>
          Sorry, there was an error sending your message. Please try again or call us directly.
        </div>
      )}
      
      <form name={formName} method="POST" data-netlify="true" data-netlify-honeypot="bot-field" onSubmit={handleSubmit}>
        <input type="hidden" name="form-name" value={formName} />
        <div style={{display: 'none'}}>
          <label>Don't fill this out if you're human: <input name="bot-field" /></label>
        </div>
        
        <div className="form-grid">
          {fields.map(field => renderField(field))}
        </div>
        
        <div className="form-actions">
          <button 
            type="submit" 
            className={`btn btn-primary ${isSubmitting ? 'loading' : ''}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="spinner"></span>
                Sending...
              </>
            ) : (
              submitText
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EnhancedForm;
