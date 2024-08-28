import React, { useState, useEffect } from "react";
import styles from "./PostAdd.module.css";
import { useFormik } from "formik";
import { useCreatePostMutation } from "../../redux/posts/postsApi";
import Loading from "../Loading/Loading";
import img from './success_1554016.png'
function PostAdd() {
  const [tagValue, setTagValue] = useState<string>("");
  const [createPost, { data, isLoading, error }] = useCreatePostMutation();
  const [imageError, setImageError] = useState('')
  // ---------------------- Form  -----------------------
  const formik = useFormik({
    initialValues: {
      title: "",
      imageUrl: "",
      tags: [] as string[],
      text: "",
    },
    onSubmit: (values) => {
      createPost(values);
      if (data) {
        console.log(data);
      }
    },
    validate: (values) => {
      const errors: { [key: string]: string } = {};
      if (!values.title) {
        errors.title = 'заголовок обязателен';
      }
      if (values.title.length < 3) {
        errors.title = 'минимальная длина - 3 символа';
      }
      if (setImageError.length > 0) {
        errors.imageUrl = imageError
      }
      if (!values.text) {
        errors.text = 'текст обязателен';
      }
      if (values.text.length < 7) {
        errors.text = 'минимальная длина - 7 символа';
      }
      if (errors.name === '' &&
        errors.email === '' &&
        errors.password === '' &&
        errors.confirmPassword === '' &&
        errors.checkbox === '') {
        return {};
      } else {
        return errors;
      }
    }
  });
  // ---------------------- Form  -----------------------

  useEffect(() => {
    const checkImage = async () => {
      const imageRegex =
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/;
      if (imageRegex.test(formik.values.imageUrl)) {
        try {
          const response = await fetch(formik.values.imageUrl);
          if (response) {
            setImageError("");
          } else {
            setImageError("неверный URL картинки");
            console.log(error);
          }
        } catch (error) {
          setImageError("не удалось получить доступ к картинке");
          console.log(error);
        }
      } else {
        setImageError("введите корректный Url");
      }
    };

    if (formik.values.imageUrl) {
      checkImage();
    }
  }, [formik.values.imageUrl]);

  const handleTagAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (tagValue && !formik.values.tags.includes(tagValue)) {
      formik.setFieldValue("tags", [...formik.values.tags, tagValue]);
      setTagValue("");
    }
  };

  const handleTagRemove = (index: number) => {
    formik.setFieldValue("tags", [
      ...formik.values.tags.slice(0, index),
      ...formik.values.tags.slice(index + 1),
    ]);
  };

  if (error) {
    console.log(error);
  }

  return isLoading ? (
    <Loading />
  ) : data ? (
    <div className={styles.post_add_success}>
      <p>статья успешно создана</p>
      <img src={img} alt="success" width={'412px'} height={'412px'} />
    </div>
  ) : (
    <form onSubmit={formik.handleSubmit} className={styles.post_add__container}>
      <p className={styles.post_add__title}>создание статьи</p>
      <div className={styles.post_add__form}>
        <div className={styles.post_add_form__leftblock}>
          <input
            name="title"
            type="text"
            value={formik.values.title}
            onChange={formik.handleChange}
            placeholder={formik.touched.title && formik.errors.title ? formik.errors.title : "заголовок статьи"}
            style={{
              "border": formik.touched.title && formik.errors.title ? "1px solid red" : "initial",
              "color": formik.touched.title && formik.errors.title ? "red" : "initial"
            }}
            className={styles.post_add_form__leftblock__title}
          />
          <input
            name="imageUrl"
            type="text"
            value={formik.values.imageUrl}
            onChange={formik.handleChange}
            placeholder={formik.touched.imageUrl && formik.errors.imageUrl ? formik.errors.imageUrl : "картинка статьи"}
            style={{
              "border": formik.touched.imageUrl && formik.errors.imageUrl ? "1px solid red" : "initial",
              "color": formik.touched.imageUrl && formik.errors.imageUrl ? "red" : "initial"
            }}
            className={styles.post_add_form__leftblock__imgUrl}
          />
          <div className={styles.post_add_form__leftblock__tags}>
            <input
              type="text"
              placeholder="тэг"
              value={tagValue}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleTagAdd(e);
                }
              }}
              onChange={(e) => {
                setTagValue(e.target.value);
              }}
            />
            <button type="button" onClick={handleTagAdd}>
              добавить тэг
            </button>
          </div>

          {formik.values.tags.length > 0 && (
            <ul className={styles.post_add_form__leftblock__tags_output}>
              {formik.values.tags.map((item, index) => {
                return (
                  <li
                    key={index}
                    className={styles.post_add_form__leftblock__tag}
                  >
                    {item}
                    <button onClick={() => handleTagRemove(index)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        id="Bold"
                        viewBox="0 0 24 24"
                        width="18"
                        height="18"
                      >
                        <path d="M14.121,12,18,8.117A1.5,1.5,0,0,0,15.883,6L12,9.879,8.11,5.988A1.5,1.5,0,1,0,5.988,8.11L9.879,12,6,15.882A1.5,1.5,0,1,0,8.118,18L12,14.121,15.878,18A1.5,1.5,0,0,0,18,15.878Z" />
                      </svg>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}

          <button className={styles.post_add__form__create_button} >
            создать статью
          </button>
        </div>
        <textarea
          name="text"
          value={formik.values.text}
          onChange={formik.handleChange}
          placeholder={formik.touched.text && formik.errors.text ? formik.errors.text : "текст статьи"}
            style={{
              "border": formik.touched.text && formik.errors.text ? "1px solid red" : "initial",
              "color": formik.touched.text && formik.errors.text ? "red" : "initial"
            }}
          className={styles.post_add_form__rightblock}
        />
      </div>
    </form>
  );
}

export default PostAdd;
