import React from "react";
import { useDispatch } from "react-redux";

import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";

import { IoIosAdd } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";

import {
  ExperienceBase,
  ExperienceModel,
  save,
} from "../../../store/cv/experience/experienceSlice";

import "./Experience.scss";

const experienceDetailSchema = Yup.object().shape({
  experiences: Yup.array().of(
    Yup.object().shape({
      title: Yup.string().required("Title is required."),
      description: Yup.string().required("Description is required."),
    })
  ),
});

const initExperienceBase: ExperienceBase = {
  title: "",
  description: "",
}

const initExperienceDetail: ExperienceModel = {
  experiences: [initExperienceBase],
};

const Experience = () => {
  const dispatch = useDispatch();

  const saveExperience = (data: ExperienceBase[]) => {
    const exp: ExperienceModel = {
      experiences: data,
    };

    console.log(exp);

    dispatch(save(exp));
  };

  return (
    <section className="Experience">
      <div
        className="Experience__heading
        border-bottom
        border-dark
        bottom-2
        mb-3
        pb-2"
      >
        <h2 className="h3 m-0">Experience</h2>
      </div>

      <Formik
        initialValues={initExperienceDetail}
        validationSchema={experienceDetailSchema}
        onSubmit={(values, { resetForm }) => {
          if (values.experiences && values.experiences.length) {
            saveExperience(values.experiences);
            // resetForm();
          }
        }}
      >
        {({ values, isValid }) => {
          return (
            <Form className="credential">
              <FieldArray name="experiences">
                {({ insert, remove, push }) => (
                  <div className="row">
                    {values.experiences &&
                      values.experiences.length > 0 &&
                      values.experiences.map((experience, index) => {
                        return (
                          <div className="col-12" key={index}>
                            <div className={`Experience__content mb-3`}>
                              <div className="Experience__subHeading pb-2">
                                <h5 className="h5 color color__primary m-0">{`Experience - ${index + 1}`}</h5>

                                {index > 0 && (
                                  <button
                                    type="button"
                                    className="btn btn__utils red ms-auto"
                                    onClick={() => remove(index)}
                                  >
                                    <IoCloseOutline size={"20px"} />
                                  </button>
                                )}
                              </div>

                              <div className="form-group mb-3">
                                <label htmlFor={`experiences.${index}.title`}>Title</label>
                                <Field
                                  type="text"
                                  name={`experiences.${index}.title`}
                                  value={experience.title}
                                  className={`form-control credential__input`}
                                />

                                <ErrorMessage
                                  name={`experiences.${index}.title`}
                                  component="span"
                                  className="error"
                                />
                              </div>

                              <div className="form-group">
                                <label htmlFor={`experiences.${index}.description`}>
                                  Description
                                </label>
                                <Field
                                  as="textarea"
                                  name={`experiences.${index}.description`}
                                  value={experience.description}
                                  className={`form-control credential__textarea`}
                                />
                                <ErrorMessage
                                  name={`experiences.${index}.description`}
                                  component="span"
                                  className="error"
                                />
                              </div>
                            </div>
                          </div>
                        );
                      })}

                    <div className="Experience__btnGrp">
                      <button
                        type="button"
                        className="btn btn__secondary ms-auto"
                        onClick={() => push(initExperienceBase)}
                      >
                        <IoIosAdd size={"25px"} className="me-1" /> Add
                      </button>
                      <button type="submit" className="btn btn__primary" disabled={!isValid}>
                        Save
                      </button>
                    </div>
                  </div>
                )}
              </FieldArray>
            </Form>
          );
        }}
      </Formik>
    </section>
  );
};

export default Experience;
