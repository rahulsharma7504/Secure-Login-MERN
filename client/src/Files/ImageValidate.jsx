import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const ImageUploadForm = () => {
  const [imagePreview, setImagePreview] = useState(null);

  // Validation schema for the form
  const validationSchema = Yup.object().shape({
    image: Yup.mixed()
      .required('An image is required')
      .test('fileType', 'Only JPEG and PNG images are allowed', (value) => {
        if (!value) return true; // Skip validation if no file is uploaded
        const allowedTypes = ['image/jpeg', 'image/png'];
        return allowedTypes.includes(value.type);
      })
      .test('fileSize', 'File size too large, must be under 2MB', (value) => {
        if (!value) return true; // Skip validation if no file is uploaded
        return value.size <= 2 * 1024 * 1024; // 2MB
      }),
  });

  // Function to handle file selection and preview
  const handleFileChange = (event, setFieldValue) => {
    const file = event.currentTarget.files[0];
    if (file) {
      setFieldValue('image', file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Formik
      initialValues={{ image: null }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log('Form submitted with values:', values);
      }}
    >
      {({ setFieldValue, values }) => (
        <Form>
          <div>
            <label htmlFor="image">Upload Image</label>
            <input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              onChange={(event) => handleFileChange(event, setFieldValue)}
            />
            {values.image && <p>Selected file: {values.image.name}</p>}
            {imagePreview && <img src={imagePreview} alt="Preview" style={{ maxWidth: '200px', marginTop: '10px' }} />}
          </div>

          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
};

export default ImageUploadForm;
