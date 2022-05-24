import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";

import { IoIosAdd } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";

import { RootState } from "../../../store/store";
import {
  ExperienceBase,
  ExperienceModel,
  remove,
  save,
} from "../../../store/cv/experience/experienceSlice";

import "./Experience.scss";

const experienceDetailSchema = Yup.object().shape({
  experiences: Yup.array().of(
    Yup.object().shape({
      companyName: Yup.string().required("Company name is required."),
      position: Yup.string().required("Title is required."),
      responsibilities: Yup.string().required("Responsibilities is required."),
    })
  ),
});

const initExperienceBase: ExperienceBase = {
  companyName: "",
  position: "",
  responsibilities: "",
};

const initExperienceDetail: ExperienceModel = {
  experiences: [initExperienceBase],
};

const Experience = () => {
  const dispatch = useDispatch();
  
  const getExperiences = useSelector((state: RootState) => state.experience.experiences);

  const saveExperience = (data: ExperienceBase[]) => {
    const exp: ExperienceModel = {
      experiences: data,
    };

    console.log(exp);

    dispatch(save(exp));
  };

  const removeExperience = (exp: ExperienceBase, index: number, removeField: Function) => {
    const isPresentInStore: boolean | undefined = getExperiences?.some((experience) => experience === exp);

    if (exp && isPresentInStore) {
      dispatch(remove(exp));
      removeField(index);
    } else removeField(index);
  }

  React.useEffect(() => {
    initExperienceDetail.experiences = [...getExperiences as ExperienceBase[] || [initExperienceBase]];
  }, [initExperienceDetail.experiences]);

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
                                <h5 className="h5 color color__primary m-0">
                                  {`Experience - ${index + 1}`}
                                </h5>

                                {index > 0 && (
                                  <button
                                    type="button"
                                    className="btn btn__utils red ms-auto"
                                    onClick={() => removeExperience(experience, index, remove)}
                                  >
                                    <IoCloseOutline size={"20px"} />
                                  </button>
                                )}
                              </div>

                              <div className="row gx-3">
                                <div className="col-md-6">
                                  <div className="form-group mb-3">
                                    <label htmlFor={`experiences.${index}.companyName`}>
                                      Company Name
                                    </label>
                                    <Field
                                      type="text"
                                      name={`experiences.${index}.companyName`}
                                      value={experience.companyName}
                                      className={`form-control credential__input`}
                                    />

                                    <ErrorMessage
                                      name={`experiences.${index}.companyName`}
                                      component="span"
                                      className="error"
                                    />
                                  </div>
                                </div>

                                <div className="col-md-6">
                                  <div className="form-group mb-3">
                                    <label htmlFor={`experiences.${index}.position`}>
                                      Position
                                    </label>
                                    <Field
                                      type="text"
                                      name={`experiences.${index}.position`}
                                      value={experience.position}
                                      className={`form-control credential__input`}
                                    />

                                    <ErrorMessage
                                      name={`experiences.${index}.position`}
                                      component="span"
                                      className="error"
                                    />
                                  </div>
                                </div>

                                <div className="col-12">
                                  <div className="form-group">
                                    <label htmlFor={`experiences.${index}.responsibilities`}>
                                      Responsibilities
                                    </label>
                                    <Field
                                      as="textarea"
                                      name={`experiences.${index}.responsibilities`}
                                      value={experience.responsibilities}
                                      className={`form-control credential__textarea`}
                                    />
                                    <ErrorMessage
                                      name={`experiences.${index}.responsibilities`}
                                      component="span"
                                      className="error"
                                    />
                                  </div>
                                </div>
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
