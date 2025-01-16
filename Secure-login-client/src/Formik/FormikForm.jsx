import React from 'react'
import '../App.css'
import { useFormik } from 'formik'
import { FormValidation } from './Validation'


const FormikForm = () => {
    const initialValues={
        name:'',
        email:'',
        password:'',
        confirmPassword:'',
        address:'',
        image:null
    }
    const {values, setFieldValue, errors,touched,handleBlur,handleChange,handleSubmit}=useFormik({
        initialValues:initialValues,
        validationSchema:FormValidation,
        onSubmit:(values,action)=>{
            console.log(values)
            console.log(values.image.name)
            action.resetForm();
            // Send data to server here
        }
        
    }) 

  return (
    <>
    <div class="form-container">
        <h2>Registration Form</h2>
        <form action="#" onSubmit={handleSubmit}>
            <div class="form-group">
                <label for="name">Name:</label>
                <input type="text" id="name" name="name" onChange={handleChange} value={values.name} />
                {
                    errors.name && touched.name && <span>{errors.name}</span>
                }
            </div>

            <div class="form-group">
                <label for="email">Email:</label>
                <input type="text" id="email" name="email" value={values.email} onChange={handleChange} />
                {
                    errors.email && touched.email && <span>{errors.email}</span>
                }
            </div>

            <div class="form-group">
                <label for="password">Password:</label>
                <input type="password" id="password" name="password" value={values.password} onChange={handleChange} />
                {
                    errors.password && touched.password && <span>{errors.password}</span>
                }
            </div>

            <div class="form-group">
                <label for="confirm-password">Confirm Password:</label>
                <input type="password" id="confirm-password" name="confirmPassword" onChange={handleChange} value={values.confirmPassword} />
                {
                    errors.confirmPassword && touched.confirmPassword && <span>{errors.confirmPassword}</span>
                }
            </div>  

            <div class="form-group">
                <label for="address">Address:</label>
                <textarea id="address" name="address" value={values.address} onChange={handleChange} rows="4" ></textarea>
                {
                    errors.address && touched.address && <span>{errors.address}</span>
                }
            </div>
            <div class="form-group">
                <label for="image">Logo:</label>
                <input type='file' id="image" name="image"   onChange={(e)=>setFieldValue('image',e.target.files[0])}  />
                {
                    errors.image && touched.image && <span>{errors.image}</span>
                }
            </div>

            <button type="submit" class="submit-btn">Register</button>
        </form>
    </div>
    </>
  )
}

export default FormikForm
