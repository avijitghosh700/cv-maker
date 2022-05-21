import React from "react";
import { useDispatch } from "react-redux";

import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FormikValues,
} from "formik";
import * as Yup from "yup";

import { PersonalModel, save } from "../../../store/cv/personal/personalSlice";

import "./Personal.scss";

const personalDetailSchema = Yup.object().shape({
  firstname: Yup.string().required("Firstname is requred."),
  lastname: Yup.string().required("Lastname is requred."),
  position: Yup.string().required('Position is required.'),
  email: Yup.string().email().required("Email is required."),
  phone: Yup.string().min(8, "Minimum 8 digit.").required("Phone is required."),
  dob: Yup.date().required("Date of Birth is required."),
  linkedin: Yup.string(),
  github: Yup.string(),
  summary: Yup.string().required("Summary is required."),
});

const initPersonalDetail: FormikValues = {
  firstname: "",
  lastname: "",
  position: '',
  email: "",
  phone: "",
  dob: "",
  linkedin: "",
  github: "",
  summary: "",
};

const Personal = () => {
  const dispatch = useDispatch();

  const savePersonal = (data: any) => {
    const personal: PersonalModel = {
      name: `${data.firstname} ${data.lastname}`,
      email: data.email,
      phone: data.phone,
      dob: data.dob,
      position: data.position,
      summary: data.summary,
      linkedin: data.linkedin,
      github: data.github,
    }

    dispatch(save(personal));
  }

  return (
    <section className="Personal mb-3">
      <div
        className="Personl__heading
        border-bottom
        border-dark
        bottom-2
        mb-3"
      >
        <h2 className="h3">Personal Details</h2>
      </div>

      <Formik
        initialValues={initPersonalDetail}
        validationSchema={personalDetailSchema}
        onSubmit={(values, { resetForm }) => {
          savePersonal(values);
          resetForm();
        }}
      >
        {(formik) => {
          const { errors, touched, isValid, dirty } = formik;

          return (
            <Form className="credential">
              <div className="row g-3 gx-4">
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="">Firstname</label>
                    <Field
                      type="text"
                      name="firstname"
                      className={`form-control credential__input ${
                        errors.firstname && touched.firstname
                          ? "is-invalid"
                          : null
                      }`}
                    />
                    <ErrorMessage
                      name="firstname"
                      component="span"
                      className="error"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="">Lastname</label>
                    <Field
                      type="text"
                      name="lastname"
                      className={`form-control credential__input ${
                        errors.lastname && touched.lastname
                          ? "is-invalid"
                          : null
                      }`}
                    />
                    <ErrorMessage
                      name="lastname"
                      component="span"
                      className="error"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="">Position</label>
                    <Field
                      type="text"
                      name="position"
                      className={`form-control credential__input ${
                        errors.position && touched.position
                          ? "is-invalid"
                          : null
                      }`}
                    />
                    <ErrorMessage
                      name="position"
                      component="span"
                      className="error"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="">Email</label>
                    <Field
                      type="email"
                      name="email"
                      className={`form-control credential__input ${
                        errors.email && touched.email ? "is-invalid" : null
                      }`}
                    />
                    <ErrorMessage
                      name="email"
                      component="span"
                      className="error"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="">Phone</label>
                    <Field
                      type="tel"
                      name="phone"
                      className={`form-control credential__input ${
                        errors.phone && touched.phone ? "is-invalid" : null
                      }`}
                    />
                    <ErrorMessage
                      name="phone"
                      component="span"
                      className="error"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="">Date of Birth</label>
                    <Field
                      type="date"
                      name="dob"
                      className={`form-control credential__input ${
                        errors.dob && touched.dob ? "is-invalid" : null
                      }`}
                    />
                    <ErrorMessage
                      name="dob"
                      component="span"
                      className="error"
                    />
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-group">
                    <label htmlFor="">Linked In</label>
                    <Field
                      type="url"
                      name="linkedin"
                      className={`form-control credential__input ${
                        errors.linkedin && touched.linkedin
                          ? "is-invalid"
                          : null
                      }`}
                    />
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-group">
                    <label htmlFor="">Github</label>
                    <Field
                      type="url"
                      name="github"
                      className={`form-control credential__input ${
                        errors.github && touched.github ? "is-invalid" : null
                      }`}
                    />
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-group">
                    <label htmlFor="">Summary</label>
                    <Field
                      as="textarea"
                      name="summary"
                      className={`form-control credential__textarea ${
                        errors.summary && touched.summary ? "is-invalid" : null
                      }`}
                    />
                    <ErrorMessage
                      name="summary"
                      component="span"
                      className="error"
                    />
                  </div>
                </div>

                <div className="col-12">
                  <div className="Personal__btnGrp ms-auto">
                    <button
                      type="submit"
                      className="btn btn__primary w-100"
                      disabled={!isValid}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </section>
  );
};

export default Personal;
